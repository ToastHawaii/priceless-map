import md5 = require("md5");
import { httpRegex } from "./url";

export function onImageLoaded(
  src: string,
  handler: {
    (loaded: boolean): void;
    (loaded: boolean): void;
    (arg0: boolean): void;
    (arg0: boolean): void;
    (arg0: boolean): void;
  }
) {
  const img = new Image();
  img.addEventListener("load", () => {
    handler(true);
  });
  img.addEventListener("error", () => {
    handler(false);
  });
  img.src = src;
  if (img.complete) handler(true);
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

  return `https://d1cuyjsrcm0gby.cloudfront.net/${mapillary}/thumb-320.jpg`;
}

function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number
) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}
