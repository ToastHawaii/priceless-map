// Copyright (C) 2020 Markus Peloso
//
// This file is part of Sustainable map.
//
// Sustainable map is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Sustainable map is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Sustainable map.  If not, see <http://www.gnu.org/licenses/>.

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IntroContainer } from "./control/IntroContainer";
import { Filter, Filters } from "./control/Filters";
import { OsmMapContainer } from "./control/OsmMapContainer";
import { setMeta } from "./utilities/meta";
import { Map } from "leaflet";
import { getQueryParams, setQueryParams } from "./utilities/url";
import { Info } from "./control/Info";
import { Search } from "./control/Search";
import { offersfromShort } from "./initMap";
import { Attribute } from "./Generator";

export function App<M>({
  logo: logoElement,
  intro: introElement,
  filters,
  attributes,
  externalResources,
}: {
  logo: any;
  intro: any;
  filters: Filter[];
  attributes: Attribute<M>[];
  externalResources?: any;
}) {
  const { t } = useTranslation();

  const params = getQueryParams();

  let offersParams: string[] = [];
  let initOffers: string[] = [];

  if (!(filters.length <= 1) && params["offers"])
    offersParams = params["offers"].split(",");

  if (params["o"]) offersParams = offersfromShort(params["o"], filters);

  for (const o of offersParams)
    if (initOffers.indexOf(o) === -1)
      for (const f of filters)
        if (f.group + "/" + f.value === o)
          initOffers.push(f.group + "/" + f.value);

  if (filters.length <= 1) {
    initOffers.push(...filters.map((f) => f.group + "/" + f.value));
  }

  const [filterCollapsed, setFilterCollapsed] = useState(!params["offers"]);
  const [info, setInfoValue] = useState<Filter | undefined>(
    filters.find((f) => params["info"] === f.group + "/" + f.value)
  );
  const [intro, setIntro] = useState(!params["info"]);
  const [offers, setOffersValue] = useState<string[]>(initOffers);
  const [map, setMap] = useState<Map | undefined>(undefined);

  function setInfo(value: Filter | undefined) {
    setInfoValue(value);

    setQueryParams({
      offers: getQueryParams()["offers"],
      location: getQueryParams()["location"],
      info: value ? value.group + "/" + value.value : "",
    });
  }

  function setOffers(value: string[]) {
    setOffersValue(value);

    setQueryParams({
      offers: !(filters.length <= 1) ? value.toString() : "",
      location: getQueryParams()["location"],
      info: getQueryParams()["info"],
    });
  }

  function reset() {
    setFilterCollapsed(false);

    document.title = t("title");
    setMeta("description", t("description"));
  }

  useEffect(() => {
    document.title = t("meta.title");
    setMeta("description", t("meta.description"));
    setMeta("application-name", t("meta.titleShort"));
    setMeta("apple-mobile-web-app-title", t("meta.titleShort"));
  });

  return (
    <>
      <OsmMapContainer
        onLoaded={(map) => {
          setMap(map);
        }}
        filterOptions={filters}
        attributes={attributes}
        offers={offers}
        info={info}
        onAbout={() => {
          setIntro(true);
          setInfo(undefined);
          setFilterCollapsed(true);
        }}
        minZoom={14}
      />
      {map ? <Search map={map} /> : null}
      <h1>
        <a href="/">{logoElement}</a>
      </h1>
      {filters.length > 1 ? (
        <Filters
          onOpen={() => {
            setIntro(false);
            setFilterCollapsed(false);
          }}
          onClose={() => {
            setFilterCollapsed(true);
          }}
          onClear={() => {
            setOffers([]);
          }}
          collapsed={filterCollapsed}
          filterOptions={filters}
          offers={offers}
          onActivate={(filter) => {
            setOffers([
              ...new Set([...offers, filter.group + "/" + filter.value]),
            ]);
          }}
          onDeactivate={(f) => {
            setOffers(offers.filter((o) => o !== f.group + "/" + f.value));
          }}
          onInfo={(f) => {
            setOffers([...new Set([...offers, f.group + "/" + f.value])]);
            setInfo(f);
          }}
        />
      ) : null}

      {intro ? (
        <IntroContainer
          onClose={() => {
            setIntro(false);
            reset();
          }}
        >
          {introElement}
        </IntroContainer>
      ) : null}
      {info ? (
        <Info
          map={map}
          onActivate={(filter) => {
            setOffers([
              ...new Set([...offers, filter.group + "/" + filter.value]),
            ]);
          }}
          onDeactivate={(f) => {
            setOffers(offers.filter((o) => o !== f.group + "/" + f.value));
          }}
          onClose={() => {
            setInfo(undefined);
            reset();
          }}
          filter={info}
          filterOptions={filters}
          offers={offers}
          externalResources={externalResources}
        />
      ) : null}
    </>
  );
}
