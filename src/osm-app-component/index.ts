// Copyright (C) 2020 Markus Peloso
//
// This file is part of osm-app-component.
//
// osm-app-component is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// osm-app-component is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with osm-app-component.  If not, see <http://www.gnu.org/licenses/>.

import * as L from "leaflet";
import * as opening_hours from "opening_hours";
import * as moment from "moment";
import { Solver } from "./coloriz/Solver";
import { Color, hexToRgb } from "./coloriz/Color";
import { setQueryParams, getQueryParams, combine } from "./utilities/url";
import { Attribute } from "./Generator";
import { getJson } from "./utilities/jsonRequest";
import { get, set } from "./utilities/storage";
import { groupBy, delay, getRandomInt, mergeDeep } from "./utilities/data";
import { toString } from "./utilities/string";
import {
  getHtmlElement,
  getHtmlElements,
  createElement,
} from "./utilities/html";
import { createOverPassLayer, isIOS, shareLink } from "./createOverPassLayer";

import BigNumber from "bignumber.js";
import { funding } from "./funding";
import "leaflet/dist/leaflet.css";
import "leaflet-overpass-layer/dist/OverPassLayer.css";
import "./style.less";
import "details-element-polyfill";

// Fix: https://github.com/Leaflet/Leaflet/issues/4968
import icon from "leaflet/dist/images/marker-icon.png";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

document.addEventListener("click", (e) => {
  const titleElement = document.querySelector(".attribut .title");
  if (titleElement) titleElement.remove();

  for (const target of e.composedPath() as HTMLElement[]) {
    if (target?.classList?.contains("attribut")) {
      const titleElement = createElement("span", target.title, ["title"]);
      titleElement.setAttribute(
        "style",
        `top:${target?.offsetTop + 20}px;left:${target?.offsetLeft}px;`
      );
      target.append(titleElement);

      setTimeout(() => {
        titleElement.remove();
      }, 2000);
    }
  }
});

document.addEventListener("click", async (e) => {
  for (const target of e.composedPath() as HTMLElement[]) {
    if (target?.tagName?.toUpperCase() === "DETAILS") {
      await delay(0);
      scrollIntoViewIfNeeded(target);
    }
  }
});

function scrollIntoViewIfNeeded(target: HTMLElement) {
  if (target.getBoundingClientRect().bottom > window.innerHeight) {
    target.scrollIntoView(false);
  }

  if (target.getBoundingClientRect().top < 0) {
    target.scrollIntoView();
  }
}

declare var taginfo_taglist: any;

let map: L.Map;
const layers: { [name: string]: L.Layer } = {};
let offers: string[] = [];

export async function initMap<M>(
  baseUrl: string,
  filterOptions: {
    id: number;
    group: string;
    subgroup?: string;
    order?: number;
    value: string;
    icon: string;
    button?: string;
    query: string;
    color: string;
    edit: string[];
    tags: string[];
  }[],
  attributes: Attribute<M>[],
  local: any,
  globalFilter?: (tags: any) => boolean,
  minZoom = 14
) {
  const existingLocal = await import(
    /* webpackChunkName: "[request]" */ `./${local.code || "en"}/local`
  );

  local = mergeDeep(local, existingLocal.local);

  getHtmlElement(".search").addEventListener("submit", (ev) => {
    ev.preventDefault();
    search();
    return false;
  });

  let watchLocation = false;
  getHtmlElement(".geo").addEventListener("click", () => {
    watchLocation = !watchLocation;
    if (watchLocation) {
      map.locate({ setView: true, maxZoom: 16, watch: true });
    } else {
      map.stopLocate();
    }

    return false;
  });

  getHtmlElement(".toggle").addEventListener("click", () => {
    getHtmlElement(".menu-group").classList.toggle("collapsed");
  });

  getHtmlElement("#filters .right-collapse").addEventListener("click", () => {
    if (document.getElementById("filters")?.className) {
      document.getElementById("filters")?.classList.remove("right-collapsed");
    } else {
      document.getElementById("filters")?.classList.add("right-collapsed");
    }
  });

  getHtmlElement("#filters .filters-clear").addEventListener("click", () => {
    const inputs = getHtmlElements("#filters input");

    for (const input of inputs.filter((i) => i.checked)) {
      input.checked = false;
      input.dispatchEvent(new Event("change"));
    }
  });

  (getHtmlElement(".about") as HTMLLinkElement).href = combine(
    baseUrl,
    `${local.code ? `${local.code}/` : ""}docs`
  );

  (getHtmlElement(".donate") as HTMLLinkElement).href =
    funding[local.code] || funding.en;

  const shareButton = getHtmlElement(".share");
  shareButton.addEventListener("click", (e) => {
    e.preventDefault();

    const info = getQueryParams()["info"];
    const bbox = map.getBounds();
    shareLink(
      `${window.location.origin}${window.location.pathname}?${
        offers.length > 0 && !(filterOptions.length <= 1)
          ? `o=${offersToShort(offers, filterOptions)}&`
          : ``
      }b=${toString(bbox.getSouth(), 4)},${toString(
        bbox.getWest(),
        4
      )},${toString(bbox.getNorth(), 4)},${toString(bbox.getEast(), 4)}${
        info ? `&info=${info}` : ``
      }`,
      shareButton,
      local,
      local.title,
      local.description
    );
  });

  const startTheme = localStorage.getItem("theme") || "system";
  if (!startTheme) {
    localStorage.setItem("theme", startTheme);
  }

  function setThemeClass(theme: string) {
    const isSystemThemeDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if ((theme === "system" && isSystemThemeDark) || theme === "dark") {
      document.documentElement.classList.add("theme-mode-dark");
    } else {
      document.documentElement.classList.remove("theme-mode-dark");
    }

    if (theme === "system") {
      document.documentElement.classList.add("theme-mode-system");
    } else {
      document.documentElement.classList.remove("theme-mode-system");
    }
  }

  setThemeClass(startTheme);

  getHtmlElements(".theme").forEach((e) => {
    e.addEventListener("click", () => {
      let theme = localStorage.getItem("theme") || "system";

      const isSystemThemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (isSystemThemeDark) {
        if (theme === "system") {
          theme = "light";
        } else if (theme === "light") {
          theme = "dark";
        } else if (theme === "dark") {
          theme = "system";
        }
      } else {
        if (theme === "system") {
          theme = "dark";
        } else if (theme === "dark") {
          theme = "light";
        } else if (theme === "light") {
          theme = "system";
        }
      }

      localStorage.setItem("theme", theme);
      setThemeClass(theme);
    });
  });

  getHtmlElement(".note").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    window.location.href = `https://www.openstreetmap.org/note/new#map=${zoom}/${latlng.lat}/${latlng.lng}`;
  });

  getHtmlElement(".edit").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    let presets = "";
    for (const o of offers) {
      const p = filterOptions
        .filter((f) => `${f.group}/${f.value}` === o)
        .map((o) => o.edit.map((t) => t.replace(/=/gi, "/")).join(","))
        .filter((o) => o)
        .join(",");
      presets += (presets && p ? "," : "") + p;
    }

    if (isIOS())
      window.location.href = `https://gomaposm.com/edit?center=${latlng.lat},${latlng.lng}&zoom=${zoom}`;
    else
      window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
        latlng.lat
      }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  });

  moment.locale(local.code || "en");

  const attribution = [
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a>',
    'POI via <a href="https://www.overpass-api.de/">Overpass</a>',
  ];

  const osm = new L.TileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: attribution.join(" | "),
    }
  );

  type State = { lat: number; lng: number; zoom: number };

  const state = get<State>("position") || {
    lat: 47.37,
    lng: 8.54,
    zoom: minZoom,
  };

  map = new L.Map("map")
    .addLayer(osm)
    .setView(new L.LatLng(state.lat, state.lng), state.zoom);

  // placeholders for the L.marker and L.circle representing user's current position and accuracy
  let currentPosition: L.Layer | L.Marker<any>;
  let currentAccuracy: L.Layer | L.Circle<any>;

  map.on("moveend zoomend", () => {
    updateCount(local, minZoom);
    const center = map.getCenter();
    const state = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    set<State>("position", state);
  });

  let timeoutToken: any;
  let popopopen = false;
  map
    .on("movestart zoomstart popupopen", () => {
      if (timeoutToken) clearTimeout(timeoutToken);
      getHtmlElement("html").classList.remove("help");
    })
    .on("moveend zoomend popupclose", () => {
      timeoutToken = setTimeout(() => {
        if (!popopopen) getHtmlElement("html").classList.add("help");
      }, 1500);
    });
  map
    .on("popupopen", () => {
      popopopen = true;
    })
    .on("popupclose", () => {
      popopopen = false;
    });

  function partAreaVisible() {
    const visibles = getHtmlElements(`.external-link`);
    let hasPrev = false;
    for (const e of visibles) {
      if (!e.classList.contains("part-area-visible")) {
        if (
          e.previousElementSibling?.className === "external-separator" &&
          hasPrev
        )
          (e.previousElementSibling as HTMLElement).style.display = "";

        hasPrev = true;
        continue;
      }

      const c = (e.getAttribute("part-area-visible") || "")
        .split(",")
        .map((n) => parseFloat(n));

      (e.previousElementSibling as HTMLElement).style.display = "none";

      if (e.nextElementSibling as HTMLElement)
        (e.nextElementSibling as HTMLElement).style.display = "none";

      if (
        map
          .getBounds()
          .intersects(
            L.latLngBounds(L.latLng(c[0], c[1]), L.latLng(c[2], c[3]))
          )
      ) {
        if (
          e.previousElementSibling?.className === "external-separator" &&
          hasPrev
        )
          (e.previousElementSibling as HTMLElement).style.display = "";

        e.classList.remove("part-area-hidden");
        hasPrev = true;
      } else {
        e.classList.add("part-area-hidden");
      }
    }
    const hiddens = getHtmlElements(`.part-area-hidden`);
    if (visibles.length === hiddens.length) {
      getHtmlElements(".external-label").forEach(
        (l) => (l.style.display = "none")
      );
    } else {
      getHtmlElements(".external-label").forEach((l) => (l.style.display = ""));
    }
  }

  map.on("moveend zoomend", partAreaVisible);

  map.on(
    "locationfound",
    (e: { accuracy: number; latlng: L.LatLngExpression }) => {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (currentPosition) {
        map.removeLayer(currentPosition);
        map.removeLayer(currentAccuracy);
      }

      const radius = e.accuracy / 2;

      currentPosition = L.marker(e.latlng).addTo(map);

      currentAccuracy = L.circle(e.latlng, radius).addTo(map);

      map.locate({ watch: true, setView: false });
    }
  );

  function search(value?: string) {
    value =
      value ||
      (document.getElementById("osm-search") as HTMLInputElement).value;

    setQueryParams({
      offers: !(filterOptions.length <= 1) ? offers.toString() : "",
      location: value,
      info: getQueryParams()["info"],
    });

    getJson("https://nominatim.openstreetmap.org/search", {
      format: "json",
      q: value,
      limit: 1,
    }).then((r) => {
      const result = r[0];
      if (!result) return;
      map.flyToBounds([
        [result.boundingbox[0], result.boundingbox[2]],
        [result.boundingbox[1], result.boundingbox[3]],
      ]);
    });
  }

  function hashchange(single: boolean) {
    const params = getQueryParams();

    if (!single) {
      let offersParams: string[] = [];

      if (params["offers"]) offersParams = params["offers"].split(",");
      else if (params["o"])
        offersParams = offersfromShort(params["o"], filterOptions);

      for (const o of offersParams)
        if (offers.indexOf(o) === -1)
          for (const f of filterOptions)
            if (f.group + "/" + f.value === o) {
              offers.push(f.group + "/" + f.value);
              init(
                f.group,
                f.value,
                f.icon,
                f.query,
                attributes,
                local,
                f.color,
                minZoom,
                single,
                globalFilter
              );

              (
                getHtmlElement(
                  `#filters input[value='${f.group + "/" + f.value}']`
                ) as HTMLInputElement
              ).checked = true;

              if (params["info"] === f.group + "/" + f.value)
                showInfoContainer(f);
            }
    } else {
      for (const f of filterOptions)
        init(
          f.group,
          f.value,
          f.icon,
          f.query,
          attributes,
          local,
          f.color,
          minZoom,
          single,
          globalFilter
        );
    }

    if (params["location"]) search(params["location"]);
    else if (params["b"]) {
      const bounds = params["b"].split(",").map((b) => parseFloat(b));
      map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ]);
    }
  }

  function showInfoContainer(f: { value: string; query: string; tags: any[] }) {
    document.title = `${local.type[f.value].name} - ${local.title}`;

    const infoContainer = getHtmlElement(".info-container");

    infoContainer.style.display = "block";
    getHtmlElement(".info h4", infoContainer).innerText =
      local.type[f.value].name;
    (
      getHtmlElement(".info .link", infoContainer) as HTMLAnchorElement
    ).href = `http://overpass-turbo.eu/?Q=${encodeURI(
      `[out:json][timeout:30][bbox:{{bbox}}];
(
${overpassSubs(f.query).trim()}
);
out center;`
    )}`;
    getHtmlElement(".info .query", infoContainer).innerText = overpassSubs(
      f.query
    ).trim();

    const wikiElement = getHtmlElement(".info .wiki", infoContainer);

    wikiElement.innerHTML = `<div class="taglist"
data-taginfo-taglist-tags="${f.tags.join()}"
data-taginfo-taglist-options='{"with_count": true, "lang": "${local.code}"}'>
</div>`;
    let first = true;

    getHtmlElement("summary", infoContainer).addEventListener("click", () => {
      if (first) {
        taginfo_taglist.convert_to_taglist(".taglist");
        first = false;
      }
    });

    getHtmlElement(".info .text", infoContainer).innerText = "";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", local.description);

    if (local.type[f.value].description) {
      getHtmlElement(".info .text", infoContainer).innerText =
        local.type[f.value].description;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", local.type[f.value].description);
    } else {
      if (f.tags) {
        const tags = [];
        const keys = [];

        for (const t of f.tags) {
          if (/=/gi.test(t)) {
            tags.push(`Tag:${t}`);
            keys.push(`Key:${t.split(/=/gi)[0]}`);
          } else keys.push("Key:" + t);
        }
        getJson("https://wiki.openstreetmap.org/w/api.php", {
          format: "json",
          action: "wbgetentities",
          languages: local.code || "en",
          languagefallback: "0",
          props: "descriptions",
          origin: "*",
          sites: "wiki",
          titles: [tags.join("|"), keys.join("|")].filter((t) => t).join("|"),
        }).then((r) => {
          if (r && r.error) return;

          let description = "";
          for (const prop in r.entities) {
            if (!r.entities.hasOwnProperty(prop)) continue;

            const entity = r.entities[prop];

            if (
              entity.descriptions &&
              Object.keys(entity.descriptions).length > 0
            ) {
              description =
                entity.descriptions[Object.keys(entity.descriptions)[0]].value;

              break;
            }
          }
          getHtmlElement(".info .text", infoContainer).innerText = description;
          document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", description);
        });
      }
    }

    getHtmlElement(".info .external", infoContainer).innerText = "";

    if (
      local.type[f.value].externalResources &&
      local.type[f.value].externalResources.length > 0
    ) {
      const links = [];
      for (const external of local.type[f.value].externalResources) {
        links.push(
          `<a class="external-link${
            external.bounds ? " part-area-visible" : ""
          }" href="${external.url}" target="_blank"${
            external.bounds
              ? ` part-area-visible="${external.bounds.join(",")}"`
              : ""
          } href="${external.url}">${external.name}</a>`
        );
      }

      getHtmlElement(
        ".info .external",
        infoContainer
      ).innerHTML = `<br/><span class="external-label">${
        local.externalResources
      }: </span>${links.join(`<span class="external-separator">, </span>`)}`;
    }

    for (const a of getHtmlElements(".external-link")) {
      a.addEventListener("click", () => {
        const latlng = map.getCenter();
        const zoom = map.getZoom();
        const bounds = map.getBounds();

        window.open(
          (a as HTMLAnchorElement).href
            .replace(/\{lat\}/i, latlng.lat + "")
            .replace(/\{lng\}/i, latlng.lng + "")
            .replace(/\{zoom\}/i, zoom + "")
            .replace(
              /\{bbox\}/i,
              `${bounds.getNorthWest().lat},${bounds.getNorthWest().lng},${
                bounds.getSouthEast().lat
              },${bounds.getSouthEast().lng}`
            ),
          "_blank"
        );
        return false;
      });
    }
  }

  window.addEventListener("hashchange", () => {
    hashchange(filterOptions.length <= 1);
  });

  setTimeout(() => {
    if (filterOptions.length > 1) offers = [];
    else offers = filterOptions.map((f) => `${f.group}/${f.value}`);
    hashchange(filterOptions.length <= 1);
  }, 0);

  const params = getQueryParams();

  let offersParams: string[] = [];

  if (!(filterOptions.length <= 1) && params["offers"])
    offersParams = params["offers"].split(",");

  if (params["o"]) offersParams = offersfromShort(params["o"], filterOptions);

  for (const o of offersParams)
    if (offers.indexOf(o) === -1)
      for (const f of filterOptions)
        if (f.group + "/" + f.value === o) offers.push(f.group + "/" + f.value);

  if (params["location"]) {
    search(params["location"]);
  } else if (params["b"]) {
    const bounds = params["b"].split(",").map((b) => parseFloat(b));
    map.fitBounds([
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]],
    ]);
  }

  map.on("popupopen", (e) => {
    const marker = (e as L.PopupEvent & { popup: { _source: L.Marker } }).popup
      ._source;
    const latLng = marker.getLatLng();
    setQueryParams({
      offers: !(filterOptions.length <= 1) ? offers.toString() : "",
      location: `${latLng.lat},${latLng.lng}`,
      info: getQueryParams()["info"],
    });
  });

  let iconColors = "";
  for (const f of filterOptions) {
    if (f.color) {
      const rgb = hexToRgb(f.color);
      const color = new Color(rgb[0], rgb[1], rgb[2]);
      const solver = new Solver(color);
      const result = solver.solve();

      iconColors += `.${f.value}-icon{${result.filter.replace(
        /filter:/gi,
        "filter: brightness(0%)"
      )}}`;
    }
  }
  const style = createElement("style", iconColors);
  document.head.appendChild(style);

  if (filterOptions.length > 1) {
    const groups = groupBy(
      filterOptions
        .sort((a, b) =>
          local.type[a.value].name.localeCompare(local.type[b.value].name)
        )
        .sort((a, b) =>
          local.group[a.group].localeCompare(local.group[b.group])
        )
        .sort((a, b) => (a.subgroup || "").localeCompare(b.subgroup || ""))
        .sort((a, b) => (b.order || 1000) - (a.order || 1000)),
      "group"
    );
    for (const k in groups) {
      const group = groups[k];
      const detailsElement = createElement("details");

      const count = offers.filter((o) => o.startsWith(k + "/")).length;
      const countElement = createElement("span", count ? `(${count})` : "", [
        "count",
      ]);
      const labelElement = createElement("span", local.group[k]);
      const summaryElement = createElement("summary");
      summaryElement.appendChild(labelElement);
      summaryElement.insertBefore(countElement, labelElement);
      detailsElement.appendChild(summaryElement);

      for (const f of group) {
        let contentElement: HTMLLabelElement;

        if (!f.subgroup) {
          contentElement = createElement(
            "label",
            `
            <input value="${k + "/" + f.value}" type="checkbox" />
            <div class="filter-background"></div>
            <div class="filter-label">
              <img class="${f.value}-icon"
                src="${f.icon}"
              />
              <span>${local.type[f.value].name}</span>
            </div>`,
            ["filter", "filter-" + k + "-" + f.value]
          );

          const aElement = createElement(
            "a",
            `<i class="fas fa-info-circle"></i>`
          );
          aElement.title = local.type[f.value].name;
          aElement.href = `?offers=${k + "/" + f.value}&info=${
            k + "/" + f.value
          }`;
          aElement.addEventListener("click", (ev) => {
            ev.preventDefault();

            const params = getQueryParams();

            const input = getHtmlElement("input", contentElement);
            if (!input.checked) {
              input.checked = true;
              input.dispatchEvent(new Event("change"));
            }

            showInfoContainer(f);

            params["info"] = f.group + "/" + f.value;

            partAreaVisible();

            return false;
          });
          detailsElement.appendChild(aElement);
          getHtmlElement(".info-container .close-button").addEventListener(
            "click",
            () => {
              getHtmlElement(".info-container").style.display = "none";

              document.title = local.title;
              document
                .querySelector('meta[name="description"]')
                ?.setAttribute("content", local.description);

              const params = getQueryParams();
              params["info"] = "";
              setQueryParams(params);
            }
          );

          detailsElement.appendChild(contentElement);
        } else {
          const group = getHtmlElement(
            ".filter-" + k + "-" + f.subgroup,
            detailsElement
          );

          contentElement = createElement(
            "label",
            `<input value="${k + "/" + f.value}" type="checkbox" />
                <div class="filter-sub-background"></div>
                <i class="${f.button}" style="color: ${f.color}" title="${
              local.type[f.value].name
            }"></i>`,
            ["filter", "filter-sub", "filter-" + k + "-" + f.value]
          );

          detailsElement.insertBefore(contentElement, group);
        }

        getHtmlElement("input", contentElement).addEventListener(
          "change",
          function () {
            if (this.checked) {
              offers.push(k + "/" + f.value);
              init(
                f.group,
                f.value,
                f.icon,
                f.query,
                attributes,
                local,
                f.color,
                minZoom,
                filterOptions.length <= 1,
                globalFilter
              );
            } else {
              const index = offers.indexOf(k + "/" + f.value);
              if (index > -1) offers.splice(index, 1);

              map.removeLayer(layers[k + "/" + f.value]);
            }

            const count = offers.filter((o) => o.startsWith(k + "/")).length;
            countElement.innerText = count ? `(${count})` : "";

            const params = getQueryParams();
            if (!(filterOptions.length <= 1))
              params["offers"] = offers.toString();
            setQueryParams(params);

            updateCount(local, minZoom);

            if (offers.length >= 1) {
              getHtmlElement("#filters .filters-clear").style.display = "";
            } else {
              getHtmlElement("#filters .filters-clear").style.display = "none";
            }
          }
        );
      }
      getHtmlElement("#filters").appendChild(detailsElement);
    }
  }

  if (offers.length >= 1) {
    getHtmlElement("#filters .filters-clear").style.display = "";
  } else {
    getHtmlElement("#filters .filters-clear").style.display = "none";
  }
}

function init<M>(
  group: string,
  value: string,
  icon: string,
  query: string,
  attributes: Attribute<M>[],
  local: any,
  color: string,
  minZoom: number,
  single: boolean,
  globalFilter?: (tags: any) => boolean
) {
  layers[group + "/" + value] = createOverPassLayer(
    group,
    value,
    icon,
    query,
    attributes,
    local,
    color,
    minZoom,
    single,
    () => {
      const filterElement = document.querySelector(
        `#filters input[value='${group + "/" + value}']`
      ) as HTMLInputElement;
      if (filterElement) return filterElement.checked;
      else return true;
    },
    globalFilter
  );
  map.addLayer(layers[group + "/" + value]);
}

export function overpassSubs(query: string) {
  return query
    .replace(
      /&part/g,
      `["access"!~"^(private|no|customers|customer|permit)$"]["fee"!="yes"]`
    )
    .replace(/&access/g, `["access"!~"^(private|no)$"]`)
    .replace(
      /&free/g,
      `[~"fee(:conditional){0,1}"~"no|donation|interval|free|none|(PH|SH|\((:{0,1}dusk|sun|dawn)[^)]*(:{0,1}-|\\+)[^)]*\)|(:{0,1}dusk|sun|dawn).*hours|(:{0,1}dusk|sun|dawn|\d{1,2}[.:]\d{2})\+|\d\s*-\s*(mo|tu|we|th|fr|sa|su)\\b|-\s*\d{1,2}[:.]\d{2}\s*\+{0,1}|[^0-9a-z .{0,1}]\s*-{0,1}\s*\d{0,2}:\d{2}\s*[^+]{0,1}|\d{1,2}:\d{2}\s*-{0,1}\s*\d{0,2}:\d{2}\s*\\+{0,1}|^(:{0,1}(:{0,1}[0-1][0-9]|2[0-4])(:{0,1}[1-5][0-9]|0[0-9])\s*-\s*){2}$)"]`
    );
}

export function parseOpeningHours(
  openingHours: string | undefined,
  localCode: string
) {
  if (!openingHours) return undefined;

  try {
    return new (opening_hours as any)(openingHours, null, {
      locale: localCode,
    });
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

let emptyIndicatorElement: HTMLDivElement | undefined;

export function updateCount(local: any, minZoom: number) {
  const visible =
    countMarkersInView(map) === 0 &&
    offers.length > 0 &&
    map.getZoom() >= minZoom;
  if (visible && !emptyIndicatorElement) {
    emptyIndicatorElement = createElement(
      "div",
      `<div class="leaflet-control-emptyIndicator leaflet-control">${local.emptyIndicator}</div>`,
      ["leaflet-bottom", "leaflet-left"]
    );

    getHtmlElement(".leaflet-control-container").appendChild(
      emptyIndicatorElement
    );
  } else if (!visible && emptyIndicatorElement) {
    emptyIndicatorElement.remove();
    emptyIndicatorElement = undefined;
  }
}

function countMarkersInView(map: L.Map) {
  let count = 0;
  const mapBounds = map.getBounds();
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      if (mapBounds.contains(layer.getLatLng())) {
        count++;
      }
    }
  });
  return count;
}

function offersToShort(
  value: string[],
  filters: {
    id: number;
    group: string;
    value: string;
  }[]
) {
  const max = Math.max(...filters.map((f) => f.id));

  let result = "0";
  for (let i = 0; i < max; i++) {
    result += "0";
  }

  for (const o of value) {
    const pos =
      max - filters.filter((f) => o === f.group + "/" + f.value)[0].id;
    result = result.slice(0, pos) + "1" + result.slice(pos + 1, result.length);
  }

  return new BigNumber(result, 2).toString(36);
}

function offersfromShort(
  value: string,
  filters: {
    id: number;
    group: string;
    value: string;
  }[]
) {
  const v = new BigNumber(value, 36).toString(2);

  const offers: string[] = [];

  let id = v.length - 1;
  for (const o of v) {
    if (o === "1") {
      const filter = filters.filter((f) => f.id === id)[0];
      offers.push(filter.group + "/" + filter.value);
    }
    id--;
  }

  return offers;
}

setInterval(async () => {
  if (!document.getElementsByTagName("html")[0].classList.contains("help"))
    return;

  const markers: HTMLElement[] = [];

  if (!map) return;
  const mapBounds = map.getBounds();
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      if (mapBounds.contains(layer.getLatLng())) {
        markers.push((layer as L.Marker).getElement() as HTMLElement);
      }
    }
  });

  const marker = markers[getRandomInt(0, markers.length - 1)];

  if (!marker) return;

  marker.style.animation = "0.4s ease-in-out 0s forwards alternate pin-top";

  await delay(400);

  marker.style.animation = "";
}, 2000);
