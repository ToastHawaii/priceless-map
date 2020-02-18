import { toUrl, utilQsString } from "./utilities/url";
import { Generator, Attribute } from "./Generator";
import { links } from "./links";
import {
  onImageLoaded,
  toWikimediaCommonsUrl,
  toMapillaryUrl
} from "./utilities/image";
import { toTitle, toLevel, toOpenOrClose } from "./view";
import { getJson } from "./utilities/jsonRequest";
import { getHtmlElement } from "./utilities/html";
import { parseOpeningHours } from "./map";
import * as L from "leaflet";
import { attributeDescriptions } from "./attributeDescriptions";

export function createPricelessOverPassLayer<M>(
  value: string,
  icon: string,
  query: string,
  attributes: Attribute<M>[],
  local: any,
  color: string
) {
  return new (L as any).OverPassLayer({
    markerIcon: L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color:${color ||
        "#000000"};" class="marker-pin"></div><img class="${value}-icon" src="${icon}">`,
      iconSize: [36, 48],
      iconAnchor: [18, 48]
    }),
    minZoomIndicatorEnabled: true,
    minZoomIndicatorOptions: {
      position: "bottomleft",
      minZoomMessageNoLayer: local.minZoomMessageNoLayer,
      minZoomMessage: local.minZoomMessage
    },
    minZoom: 14,
    query: `(${query});out center;`,
    onSuccess(data: { elements: any[] }) {
      for (let i = 0; i < data.elements.length; i++) {
        let pos: {
          lat: number;
          lng: number;
        };
        let marker;
        const e = data.elements[i];
        if (e.id in this._ids) continue;
        if (
          e.tags.fee &&
          e.tags.fee !== "no" &&
          !parseOpeningHours(e.tags.fee, local.code || "en") &&
          !e.tags["fee:conditional"]
        )
          continue;
        if (
          e.tags.access &&
          e.tags.access !== "yes" &&
          e.tags.access !== "permissive"
        )
          continue;
        if (
          value === "toilets" &&
          e.tags["toilets:access"] &&
          e.tags["toilets:access"] !== "yes" &&
          e.tags["toilets:access"] !== "permissive"
        )
          this._ids[e.id] = true;
        if (e.type === "node") {
          pos = L.latLng(e.lat, e.lon);
        } else {
          pos = L.latLng(e.center.lat, e.center.lon);
        }
        if (this.options.markerIcon) {
          marker = L.marker(pos, { icon: this.options.markerIcon });
        } else {
          marker = L.circle(pos, 20, {
            stroke: false,
            fillColor: "#E54041",
            fillOpacity: 0.9
          });
        }
        const model = {
          name:
            e.tags["name:" + (local.code || "en")] ||
            e.tags.name ||
            e.tags["piste:name"],
          type:
            local["public_bookcase:type"][e.tags["public_bookcase:type"]] ||
            local["garden:type"][e.tags["garden:type"]] ||
            local["garden:style"][e.tags["garden:style"]] ||
            local["castle_type"][e.tags["castle_type"]] ||
            local["historic"][e.tags["historic"]] ||
            local["fitness_station"][e.tags["fitness_station"]] ||
            local["site_type"][e.tags["site_type"]] ||
            e.tags["species:" + (local.code || "en")] ||
            e.tags.species ||
            e.tags["genus:" + (local.code || "en")] ||
            e.tags.genus ||
            local.man_made[e.tags["man_made"]] ||
            local.type[value].name,
          operator:
            e.tags.operator || e.tags["heritage:operator"] || e.tags.brand,
          address: {
            name: "",
            postcode: e.tags["addr:postcode"] || "",
            locality: e.tags["addr:city"] || "",
            street: e.tags["addr:street"] || "",
            houseNumber: e.tags["addr:housenumber"] || "",
            level: e.tags["level"] || "",
            latitude: pos.lat,
            longitude: pos.lng
          },
          opening:
            parseOpeningHours(e.tags.service_times, local.code || "en") ||
            parseOpeningHours(e.tags.opening_hours, local.code || "en"),
          conditionalFee:
            e.tags.fee &&
            (parseOpeningHours(e.tags.fee, local.code || "en") ||
              e.tags["fee:conditional"]),
          img: "",
          description: ""
        };
        model.img =
          model.img ||
          toWikimediaCommonsUrl(e.tags.wikimedia_commons) ||
          toMapillaryUrl(e.tags.mapillary) ||
          toUrl(e.tags.flickr) ||
          toWikimediaCommonsUrl(e.tags.image) ||
          toUrl(e.tags.picture) ||
          toUrl(e.tags["website:webcam"]) ||
          toUrl(e.tags["webcam"]) ||
          toUrl(e.tags["contact:webcam"]) ||
          toUrl(e.tags["webcam:url"]) ||
          toUrl(e.tags["url:webcam"]) ||
          "";
        model.description =
          e.tags["description:" + (local.code || "en")] || e.tags.description;
        const attributesGenerator = new Generator<M>(attributes);
        const linksGenerator = new Generator(links);
        const attributDescriptionGenerator = new Generator(
          attributeDescriptions
        );
        let isLoaded = false;
        const contentElement = document.createElement("div");
        contentElement.innerHTML = `<div id="hcard-Name" class="vcard">
          <a style="float:right;" href="https://www.openstreetmap.org/edit?${
            e.type
          }=${
          e.id
        }"><i class="fas fa-pencil-alt"></i></a><strong class="name" title="${toTitle(
          model
        )}">${toTitle(model)}</strong>
        <div class="adr">
        
        ${attributesGenerator.render(local, e.tags, value, {} as M)}
        
         <div class="street-address">${model.address.street} ${
          model.address.houseNumber
        } ${toLevel(parseFloat(model.address.level), local)}</div>
            <span class="postal-code">${model.address.postcode}</span>
         <span class="region">${model.address.locality}</span>
        </div>
        ${
          model.opening
            ? `<br><div>${toOpenOrClose(model.opening, local)}</div>`
            : ``
        }
        ${
          model.conditionalFee ? `<br><div>${local.conditionalFee}</div>` : ``
        } <br/>
        <div class="geo">
         <small>
         <a href="https://maps.apple.com/?${utilQsString({
           ll: `${model.address.latitude},${model.address.longitude}`,
           q: toTitle(model)
         })}">
           ${local.route}
         </a>
         </small>
        </div>
        <div class="img-container">
        ${
          model.img
            ? `
          <br />
          <img class="img" dynamic-src="${model.img}"/>`
            : ``
        }   
        </div>
        <div class="description">    
        ${
          model.description
            ? `
          ${!model.img ? `<br />` : ``}
          <small>
            ${model.description}
          </small>`
            : ``
        }    
        </div>
        <div> 
          ${
            !attributDescriptionGenerator.empty(e.tags, value, {}, local)
              ? `
          <br />
          <small>
            ${attributDescriptionGenerator.render(
              local,
              e.tags,
              value,
              {},
              `<br />`
            )}
          </small>`
              : ``
          }   
        </div>
        <div class="contact">
          ${
            !linksGenerator.empty(e.tags, value, {}, local)
              ? `
          <br />
          ${linksGenerator.render(local, e.tags, value, {})}`
              : ``
          }     
        </div>
        </div>`;
        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(() => {
          if (!isLoaded) {
            isLoaded = true;
            const img = contentElement.querySelector(
              ".img"
            ) as HTMLImageElement;
            if (img) img.src = img.getAttribute("dynamic-src") || img.src;
            {
              // Enrich Address
              getJson<any>(
                "https://nominatim.openstreetmap.org/reverse",
                {
                  format: "json",
                  addressdetails: "1",
                  namedetails: "1",
                  lat: pos.lat,
                  lon: pos.lng
                },
                result => {
                  model.address.name =
                    result.namedetails.name || result.namedetails.official_name;
                  model.address.postcode =
                    model.address.postcode || result.address.postcode || "";
                  model.address.locality =
                    model.address.locality ||
                    result.address.city ||
                    result.address.town ||
                    result.address.village ||
                    result.address.suburb ||
                    result.address.neighbourhood ||
                    result.address.state ||
                    result.address.county ||
                    "";
                  if (!model.address.street) {
                    model.address.street =
                      result.address.path ||
                      result.address.footway ||
                      result.address.road ||
                      result.address.cycleway ||
                      result.address.pedestrian ||
                      result.address.farmyard ||
                      result.address.construction ||
                      result.namedetails.name ||
                      result.namedetails.official_name ||
                      result.address.neighbourhood ||
                      "";
                    model.address.houseNumber =
                      model.address.houseNumber ||
                      result.address.house_number ||
                      "";
                  }
                  const name = getHtmlElement(".name", contentElement);
                  name.innerHTML = toTitle(model);
                  name.title = toTitle(model);
                  getHtmlElement(
                    ".street-address",
                    contentElement
                  ).innerHTML = `${model.address.street} ${
                    model.address.houseNumber
                  } ${toLevel(parseFloat(model.address.level), local)}`;
                  getHtmlElement(".postal-code", contentElement).innerHTML =
                    model.address.postcode;
                  getHtmlElement(".region", contentElement).innerHTML =
                    model.address.locality;
                  popup.update();
                }
              );
            }
            {
              // Enrich Data
              const qid = e.tags.wikidata || e.tags["species:wikidata"];
              getJson<any>(
                "https://www.wikidata.org/w/api.php",
                {
                  format: "json",
                  action: "wbgetentities",
                  formatversion: "2",
                  ids: qid,
                  props: "labels|descriptions|claims|sitelinks",
                  sitefilter: (local.code || "en") + "wiki",
                  languages: local.code || "en",
                  languagefallback: "0",
                  origin: "*"
                },
                r => {
                  if (r && r.error) return;
                  if (!r.entities[qid]) return;
                  const entity = r.entities[qid];
                  let i;
                  let description;
                  if (
                    entity.descriptions &&
                    Object.keys(entity.descriptions).length > 0
                  ) {
                    description =
                      entity.descriptions[Object.keys(entity.descriptions)[0]]
                        .value;
                  }
                  let label;
                  if (entity.labels && Object.keys(entity.labels).length > 0) {
                    label = entity.labels[Object.keys(entity.labels)[0]].value;
                  }
                  const result: {
                    title: string;
                    description: string;
                    imageURL?: string;
                    wiki?: {
                      title: string;
                      url: string;
                    };
                  } = {
                    title: label,
                    description: description
                  };
                  // add image
                  if (entity.claims) {
                    const imageroot =
                      "https://commons.wikimedia.org/w/index.php";
                    const props = ["P154", "P18"]; // logo image, image
                    let prop;
                    let image;
                    for (i = 0; i < props.length; i++) {
                      prop = entity.claims[props[i]];
                      if (prop && Object.keys(prop).length > 0) {
                        image =
                          prop[Object.keys(prop)[0]].mainsnak.datavalue.value;
                        if (image) {
                          result.imageURL = `${imageroot}?${utilQsString({
                            title: "Special:Redirect/file/" + image,
                            width: 300
                          })}`;
                        }
                        break;
                      }
                    }
                  }
                  if (entity.sitelinks) {
                    // check each, in order of preference
                    const w = (local.code || "en") + "wiki";
                    if (entity.sitelinks[w]) {
                      const title = entity.sitelinks[w].title;
                      result.wiki = {
                        title: title,
                        url: `https://${local.code ||
                          "en"}.wikipedia.org/wiki/${title.replace(/ /g, "_")}`
                      };
                    }
                  }
                  model.name =
                    model.name ||
                    result.title ||
                    (result.wiki && result.wiki.title);
                  model.description = model.description || result.description;
                  model.img = model.img || result.imageURL || "";
                  getHtmlElement(".name", contentElement).innerHTML = toTitle(
                    model
                  );
                  getHtmlElement(".name", contentElement).title = toTitle(
                    model
                  );
                  getHtmlElement(
                    ".description",
                    contentElement
                  ).innerHTML = model.description
                    ? `${!model.img ? `<br />` : ``}<small>${
                        model.description
                      }</small>`
                    : ``;
                  getHtmlElement(
                    ".img-container",
                    contentElement
                  ).innerHTML = model.img
                    ? `<br /><img class="img" src="${model.img}"/>`
                    : ``;
                  getHtmlElement(
                    ".contact",
                    contentElement
                  ).innerHTML = !linksGenerator.empty(
                    e.tags,
                    value,
                    {
                      website: result.wiki ? result.wiki.url : undefined
                    },
                    local
                  )
                    ? `
    <br />
    ${linksGenerator.render(local, e.tags, value, {
      website: result.wiki ? result.wiki.url : undefined
    })}`
                    : ``;
                  if (model.img) {
                    onImageLoaded(model.img, (loaded: boolean) => {
                      if (!loaded) {
                        getHtmlElement(
                          ".img",
                          contentElement
                        ).outerHTML = `<a class="img" href="${model.img}" target="_blank"><i class="far fa-image fa-2x"></i></a>`;
                      }
                      popup.update();
                    });
                  }
                  popup.update();
                }
              );
            }
            if (model.img) {
              onImageLoaded(model.img, (loaded: boolean) => {
                if (!loaded)
                  getHtmlElement(
                    ".img",
                    contentElement
                  ).outerHTML = `<a class="img" href="${model.img}" target="_blank"><i class="far fa-image fa-2x"></i></a>`;
                popup.update();
              });
            }
          }
          return contentElement;
        });
        marker.bindPopup(popup);
        this._markers.addLayer(marker);
      }
    }
  });
}
