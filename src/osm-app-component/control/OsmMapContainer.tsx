import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { Map } from "leaflet";
import { Menu } from "./Menu";
import { Attribute } from "../Generator";
import { initMap } from "../initMap";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filters";
import { OverPassLayer } from "./OverPassLayer";
import L from "leaflet";

let initalized = false;
type Props<M> = {
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
  }[];
  attributes: Attribute<M>[];
  info: Filter | undefined;
  globalFilter?: (tags: any, group: any, value: any) => boolean;
  minZoom: number;
  offers: string[];
  onAbout: () => void;
  onLoaded: (map: Map) => void;
};

export function Init<M>({
  onLoaded,
  filterOptions,
  minZoom,
  offers,
}: Props<M>) {
  const { t } = useTranslation();
  const map = useMap();

  useEffect(() => {
    if (!initalized) {
      onLoaded(map);
      initMap(filterOptions, map, t, minZoom, offers);
    }
    initalized = true;
  });

  return null;
}

export function OsmMapContainer<M>(props: Props<M>) {
  return (
    <MapContainer id="map" center={{ lat: 47.37, lng: 8.54 }} zoom={14}>
      <TileLayer
        opacity={0.7}
        attribution='Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> | POI via <a href="https://www.overpass-api.de/">Overpass</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Init {...props} />
      {props.offers.map((offer) => {
        const filter = props.filterOptions.filter(
          (f) => f.group + "/" + f.value === offer
        )[0];
        if (!filter) throw new Error("Unexpected undefined: filter");

        return (
          <OverPassLayer
            key={offer}
            filter={filter}
            attributes={props.attributes}
            minZoom={props.minZoom}
            single={props.filterOptions.length <= 1}
            isActive={() => {
              return offer.includes(filter.group + "/" + filter.value);
            }}
            globalFilter={props.globalFilter}
          ></OverPassLayer>
        );
      })}
      <Menu
        filterOptions={props.filterOptions}
        offers={props.offers}
        onAbout={props.onAbout}
      />
      <EmptyIndicator minZoom={props.minZoom} offers={props.offers} />
    </MapContainer>
  );
}
function EmptyIndicator({
  minZoom,
  offers,
}: {
  minZoom: number;
  offers: string[];
}) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  function calcVisible() {
    setVisible(
      countMarkersInView(map) === 0 &&
        offers.length > 0 &&
        map.getZoom() >= minZoom
    );
  }

  const map = useMapEvents({
    layeradd() {
      calcVisible();
    },
    zoomend() {
      calcVisible();
    },
    moveend() {
      calcVisible();
    },
  });

  useEffect(() => {
    calcVisible();
  });

  if (!visible) {
    return null;
  }

  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control-emptyIndicator leaflet-control">
        {t("emptyIndicator")}
      </div>
    </div>
  );
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
