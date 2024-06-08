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

import { Attribute } from "./Generator";
import { toUrl, toFacebookUrl, toWikipediaUrl } from "./utilities/url";

const template = (url: string, icon: string) =>
  `<a href="${url}" target="_blank"><i class="${icon} fa-lg"></i></a>&ensp;`;

export const links: Attribute<{
  website?: string;
}>[] = [
  {
    check: (tags, _value, model, t) =>
      !!(
        tags.website ||
        tags[`${t("code")}:wikipedia`] ||
        tags.wikipedia ||
        model.website ||
        tags.url ||
        tags["contact:website"] ||
        tags["facebook"] ||
        tags["contact:facebook"] ||
        tags["brand:website"] ||
        tags[`brand:wikipedia:${t("code")}`] ||
        tags["brand:wikipedia"] ||
        tags["network:website"] ||
        tags[`network:wikipedia:${t("code")}`] ||
        tags["network:wikipedia"] ||
        tags["operator:website"] ||
        tags[`operator:wikipedia:${t("code")}`] ||
        tags["operator:wikipedia"] ||
        tags["opening_hours:url"]
      ),
    template: (t, tags, _value, model) =>
      template(
        toUrl(tags.website) ||
          toWikipediaUrl(
            tags[`${t("code")}:wikipedia`] || tags.wikipedia
          ) ||
          toUrl(model.website) ||
          toUrl(tags.url) ||
          toUrl(tags["contact:website"]) ||
          toFacebookUrl(tags["facebook"]) ||
          toFacebookUrl(tags["contact:facebook"]) ||
          tags["brand:website"] ||
          tags[`brand:wikipedia:${t("code")}`] ||
          tags["brand:wikipedia"] ||
          tags["network:website"] ||
          tags[`network:wikipedia:${t("code")}`] ||
          tags["network:wikipedia"] ||
          tags["operator:website"] ||
          tags[`operator:wikipedia:${t("code")}`] ||
          tags["operator:wikipedia"] ||
          toUrl(tags["opening_hours:url"]) ||
          "",
        "fas fa-globe"
      )
  },
  {
    check: tags => !!(tags.email || tags["contact:email"]),
    template: (_local, tags) =>
      template(
        `mailto:${tags.email || tags["contact:email"]}`,
        "far fa-envelope"
      )
  },
  {
    check: tags =>
      !!(tags.phone || tags["contact:phone"] || tags["contact:mobile"]),
    template: (_local, tags) =>
      template(
        `tel:${tags.phone || tags["contact:phone"] || tags["contact:mobile"]}`,
        "fas fa-mobile-alt"
      )
  }
];
