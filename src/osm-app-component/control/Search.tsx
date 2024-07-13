import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Map } from "leaflet";
import { GeoButton } from "./GeoButton";
import { getJson } from "../utilities/jsonRequest";
import { getQueryParams, setQueryParams } from "../utilities/url";

export function search(map: Map, value: string) {
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

export function searchCountry(map: Map, country: string) {
  getJson("https://nominatim.openstreetmap.org/search", {
    format: "json",
    country: country,
    limit: 1,
  }).then((r) => {
    const result = r[0];
    if (!result) return;
    map.flyToBounds(
      [
        [result.boundingbox[0], result.boundingbox[2]],
        [result.boundingbox[1], result.boundingbox[3]],
      ],
      { animate: false }
    );
  });
}

export function Search({ map }: { map: Map }) {
  const { t } = useTranslation();

  const inputRef = useRef<HTMLInputElement>(null);

  const location = getQueryParams()["location"];

  function submitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!inputRef.current) {
      return false;
    }

    const value = inputRef.current.value;

    setQueryParams({
      offers: getQueryParams()["offers"],
      location: value,
      info: getQueryParams()["info"],
    });

    search(map, value);

    return false;
  }

  return (
    <div className="box">
      <div className="container">
        <form className="search" onSubmit={submitHandle}>
          <GeoButton map={map} />
          <input
            ref={inputRef}
            type="search"
            id="osm-search"
            placeholder={t("search.placeholder")}
            required
            defaultValue={location}
          />
          <button className="icon" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
