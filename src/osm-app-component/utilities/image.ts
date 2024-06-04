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

import * as md5 from "md5";
import { httpRegex } from "./url";
import { startsWithIgnoreCase } from "./string";

export async function isImage(src: string) {
  return new Promise<boolean>(resolve => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(true);
    });
    img.addEventListener("error", () => {
      resolve(false);
    });
    img.src = src;
    if (img.complete) resolve(true);
  });
}

export function toWikimediaCommonsUrl(source: string) {
  if (!source) return undefined;

  let category = "";

  if (startsWithIgnoreCase(source, "Category:"))
    category = source.substring(9, source.length);
  else if (
    startsWithIgnoreCase(source, "https://commons.wikimedia.org/wiki/Category:")
  )
    category = source.substring(44, source.length);
  else if (
    startsWithIgnoreCase(source, "http://commons.wikimedia.org/wiki/Category:")
  )
    category = source.substring(43, source.length);

  if (category)
    return "https://commons.wikimedia.org/wiki/Category:" + category;

  let fileName = "";

  if (startsWithIgnoreCase(source, "File:"))
    fileName = source.substring(5, source.length);
  else if (
    startsWithIgnoreCase(source, "https://commons.wikimedia.org/wiki/File:")
  )
    fileName = source.substring(40, source.length);
  else if (
    startsWithIgnoreCase(source, "http://commons.wikimedia.org/wiki/File:")
  )
    fileName = source.substring(39, source.length);
  else if (httpRegex.test(source)) {
    return source;
  } else return "";

  fileName = decodeURI(fileName).replace(/ /g, "_");

  const hash = md5(fileName);
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash.substring(
    0,
    1
  )}/${hash.substring(0, 2)}/${fileName}/320px-${fileName}`;
}

export function toMapillaryUrl(mapillary: string) {
  if (!mapillary) return undefined;

  if (httpRegex.test(mapillary)) return mapillary;

  return `https://www.mapillary.com/map/im/${mapillary}`;
}
