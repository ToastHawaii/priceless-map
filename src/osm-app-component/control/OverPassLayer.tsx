import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Attribute } from "../Generator";
import { useTranslation } from "react-i18next";
import { Filter } from "./Filters";
import { createOverPassLayer } from "../createOverPassLayer";

export function OverPassLayer<M>({
  filter,
  attributes,
  minZoom,
  single,
  isActive,
  globalFilter,
}: {
  filter: Filter;
  attributes: Attribute<M>[];
  minZoom: number;
  single: boolean;
  isActive: () => boolean;
  globalFilter?: (tags: any, group: string, value: string) => boolean;
}) {
  const { t } = useTranslation();
  const map = useMap();

  useEffect(() => {
    let removed = false;
    const layer = createOverPassLayer(
      filter.group,
      filter.value,
      filter.icon,
      filter.query,
      attributes as any,
      t,
      filter.color,
      minZoom,
      single,
      () => !removed && isActive(),
      globalFilter
    );
    map.addLayer(layer);

    return () => {
      removed = true;
      map.removeLayer(layer);
    };
  });

  return null;
}
