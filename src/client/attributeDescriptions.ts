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

import { Attribute } from "osm-app-component/dist/Generator";

const template = (icon: string, description: string | undefined) =>
  `<div><i class="${icon}"></i> ${description}</div>`;

export const attributeDescriptions: Attribute<{ website?: string }>[] = [
  {
    check: (tags, _value, _model, local) =>
      !!(
        tags["amenity"] === "drinking_water" ||
        tags["amenity"] === "water_point" ||
        tags["drinking_water"] === "yes"
      ) &&
      !!(
        tags[`drinking_water:description:${local.code || "en"}`] ||
        tags["drinking_water:description"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-tint",
        tags[`drinking_water:description:${local.code || "en"}`] ||
          tags["drinking_water:description"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      !!(tags["emergency"] === "defibrillator") &&
      !!(
        tags[`defibrillator:location:${local.code || "en"}`] ||
        tags["defibrillator:location"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-heartbeat",
        tags[`defibrillator:location:${local.code || "en"}`] ||
          tags["defibrillator:location"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      ((!!tags.internet_access &&
        tags.internet_access !== "no" &&
        tags["internet_access:fee"] !== "customers" &&
        tags["internet_access:fee"] !== "yes") ||
        (!!tags.wifi && tags.wifi !== "no")) &&
      !!(
        tags["internet_access:ssid"] ||
        tags[`internet_access:description:${local.code || "en"}`] ||
        tags["internet_access:description"]
      ),
    template: (local, tags) =>
      template(
        "fas fa-wifi",
        [
          tags["internet_access:ssid"],
          tags[`internet_access:description:${local.code || "en"}`] ||
            tags["internet_access:description"]
        ]
          .filter(el => el)
          .join(": ")
      )
  },
  {
    check: (tags, _value, _model, local) =>
      (!!tags.changing_table &&
        tags.changing_table !== "no" &&
        tags["changing_table:fee"] !== "yes" &&
        !!(
          tags[`changing_table:description:${local.code || "en"}`] ||
          tags["changing_table:description"]
        )) ||
      (!!tags.diaper &&
        tags.diaper !== "no" &&
        tags["diaper:fee"] !== "yes" &&
        !!(
          tags[`diaper:description:${local.code || "en"}`] ||
          tags["diaper:description"]
        )),
    template: (local, tags) =>
      template(
        "fas fa-baby",
        tags[`changing_table:description:${local.code || "en"}`] ||
          tags[`diaper:description:${local.code || "en"}`] ||
          tags["changing_table:description"] ||
          tags["diaper:description"]
      )
  },
  {
    check: (tags, _value, _model, local) =>
      !!tags.wheelchair &&
      !!(
        tags[`wheelchair:description:${local.code || "en"}`] ||
        tags["wheelchair:description"]
      ),
    template: (local, tags) =>
      template(
        "fab fa-accessible-icon",
        tags[`wheelchair:description:${local.code || "en"}`] ||
          tags["wheelchair:description"]
      )
  }
];
