// Copyright (C) 2020 Markus Peloso
//
// This file is part of Priceless map.
//
// Priceless map is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Priceless map is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Priceless map.  If not, see <http://www.gnu.org/licenses/>.

import { initMap, parseOpeningHours } from "../osm-app-component";
import { filters } from "./filters";
import "../osm-app-component/style.scss";
import { attributes } from "./attributes";
import { TFunction } from "i18next";
import externalResourcesEn from "./en/externalResources.json";
import externalResourcesDe from "./de/externalResources.json";

export function init(t: TFunction<"translation", undefined>) {
  initMap(
    "https://priceless.zottelig.ch/",
    filters,
    attributes,
    t,
    (tags, _group, value) => {
      if (
        tags.fee &&
        !equalsIgnoreCase(tags.fee, "no") &&
        !equalsIgnoreCase(tags.fee, "donation") &&
        !equalsIgnoreCase(tags.fee, "interval") &&
        !equalsIgnoreCase(tags.fee, "free") &&
        !equalsIgnoreCase(tags.fee, "none") &&
        !parseOpeningHours(tags.fee, t("code")) &&
        !tags["fee:conditional"]
      )
        return true;
      if (
        tags.access &&
        !equalsIgnoreCase(tags.access, "yes") &&
        !equalsIgnoreCase(tags.access, "permissive")
      )
        return true;
      if (
        equalsIgnoreCase(value, "toilets") &&
        tags["toilets:access"] &&
        !equalsIgnoreCase(tags["toilets:access"], "yes") &&
        !equalsIgnoreCase(tags["toilets:access"], "permissive")
      )
        return true;

      return false;
    },
    undefined,
    t("code") === "de" ? externalResourcesDe : externalResourcesEn
  );
}

export function equalsIgnoreCase(
  s1: string | undefined,
  s2: string | undefined
) {
  return (s1 || "").toUpperCase() === (s2 || "").toUpperCase();
}
