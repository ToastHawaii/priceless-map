import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filters";
import { Map } from "leaflet";
import { overpassSubs, partAreaVisible } from "../initMap";
import { setMeta } from "../utilities/meta";
import { getJson } from "../utilities/jsonRequest";

declare var taginfo_taglist: any;

export function Info({
  map,
  filter,
  filterOptions,
  offers,
  externalResources,
  onActivate,
  onDeactivate,
  onClose,
}: {
  map: Map | undefined;
  filter: Filter;
  filterOptions: Filter[];
  offers: string[];
  externalResources?: any;
  onActivate: (filter: Filter) => void;
  onDeactivate: (filter: Filter) => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [first, setFirst] = useState(true);
  const [open, setOpen] = useState(false);

  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    setFirst(true);
    setOpen(false);
  }, [filter]);

  useEffect(() => {
    setDescription(t("type." + filter.value + ".description"));
  }, [t, filter]);

  useEffect(() => {
    document.title = `${t("type." + filter.value + ".name")} - ${t("title")}`;
    setMeta("description", description);
  }, [t, filter, description]);

  useEffect(() => {
    if (!description) {
      if (filter.tags) {
        const tags = [];
        const keys = [];

        for (const t of filter.tags) {
          if (/=/gi.test(t)) {
            tags.push(`Tag:${t}`);
            keys.push(`Key:${t.split(/=/gi)[0]}`);
          } else keys.push("Key:" + t);
        }
        getJson("https://wiki.openstreetmap.org/w/api.php", {
          format: "json",
          action: "wbgetentities",
          languages: t("code"),
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
          setDescription(description);
        });
      }
    }
  }, [t, filter, description]);

  useEffect(() => {
    if (!map) {
      return;
    }
    partAreaVisible(map);
  });

  const filters = filterOptions.filter(
    (f) => f.group === filter.group && f.subgroup === filter.value
  );

  if (!map) {
    return null;
  }

  return (
    <div className="info-container">
      <div className="info">
        <h4>{t("type." + filter.value + ".name")}</h4>
        <span className="text">{description}</span>
        {filters.length > 0 ? (
          <div className="filters">
            {t("info.moreFilters")}
            {filters.map((f) => (
              <React.Fragment key={`${f.group}/${f.value}`}>
                <label
                  className={
                    "filter filter-sub filter-" + f.group + "-" + f.value
                  }
                >
                  <input
                    value={`${f.group}/${f.value}`}
                    type="checkbox"
                    checked={offers.includes(`${f.group}/${f.value}`)}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        onActivate(f);
                      } else {
                        onDeactivate(f);
                      }
                    }}
                  />
                  <div className="filter-sub-background"></div>
                  <div className="filter-label">
                    <i className={`${f.button}`} style={{ color: f.color }}></i>{" "}
                    <span>{t("type." + f.value + ".name")}</span>
                  </div>
                </label>
              </React.Fragment>
            ))}
          </div>
        ) : null}
        <hr />
        <small>
          <details open={open}>
            <summary
              onClick={(e) => {
                e.preventDefault();

                setOpen(!open);
                if (first) {
                  setFirst(false);
                  taginfo_taglist.convert_to_taglist(".taglist");
                }
              }}
            >
              <strong>{t("info.osmTags")}</strong>
            </summary>
            <br />
            <div className="wiki">
              <div
                className="taglist"
                data-taginfo-taglist-tags={filter.tags.join()}
                data-taginfo-taglist-options={`{"with_count": true, "lang": "${t(
                  "code"
                )}"}`}
              >
                {filter.tags.join()}
              </div>
            </div>
            <strong>{t("info.query")}</strong>
            <code className="query">{overpassSubs(filter.query).trim()}</code>
            <a
              className="link"
              target="_blank"
              href={`https://overpass-turbo.eu/?Q=${encodeURI(
                `[out:json][timeout:30][bbox:{{bbox}}];
(
${overpassSubs(filter.query).trim()}
);
out center;`
              )}`}
              rel="noreferrer"
            >
              {t("info.overpassTurbo")}
            </a>
          </details>
        </small>
        <small className="external">
          {externalResources?.[filter.value] &&
          externalResources[filter.value].length > 0 ? (
            <>
              <br />
              <span className="external-label">
                {t("info.externalResources")}:{" "}
              </span>
              {externalResources[filter.value].map((external: any) => {
                return (
                  <span key={external.name} className="external-separator">
                    <a
                      className={`external-link${
                        external.bounds ? " part-area-visible" : ""
                      }`}
                      href={external.url}
                      target="_blank"
                      part-area-visible={external.bounds?.join(",")}
                      onClick={(e) => {
                        const latlng = map.getCenter();
                        const zoom = map.getZoom();
                        const bounds = map.getBounds();

                        window.open(
                          external.url
                            .replace(/\{lat\}/i, latlng.lat + "")
                            .replace(/\{lng\}/i, latlng.lng + "")
                            .replace(/\{zoom\}/i, zoom + "")
                            .replace(
                              /\{bbox\}/i,
                              `${bounds.getNorthWest().lat},${
                                bounds.getNorthWest().lng
                              },${bounds.getSouthEast().lat},${
                                bounds.getSouthEast().lng
                              }`
                            ),
                          "_blank"
                        );
                        return false;
                      }}
                      rel="noreferrer"
                    >
                      {external.name}
                    </a>{" "}
                  </span>
                );
              })}
            </>
          ) : null}
        </small>
      </div>
      <button className="close-button" onClick={handleCloseClick}>
        ×
      </button>
    </div>
  );
}
