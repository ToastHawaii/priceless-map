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

export const httpRegex = /^https?:\/\//i;

export function toUrl(url: string | undefined) {
  if (!url) return undefined;

  if (!httpRegex.test(url)) return `http://${url}`;

  return url;
}

export function toWikipediaUrl(wikipedia: string) {
  if (!wikipedia) return undefined;

  if (httpRegex.test(wikipedia)) return wikipedia;

  return `https://wikipedia.org/wiki/${wikipedia}`;
}

export function toFacebookUrl(url: string) {
  if (!url) return undefined;

  if (/^www\./i.test(url)) return `https://${url}`;

  if (!httpRegex.test(url)) return `https://www.facebook.com/${url}`;

  return url;
}

export function utilQsString(obj: any, noencode?: boolean) {
  // encode everything except special characters used in certain hash parameters:
  // "/" in map states, ":", ",", {" and "}" in background
  function softEncode(s: string | number | boolean) {
    return encodeURIComponent(s).replace(
      /(%2F|%3A|%2C|%7B|%7D)/g,
      decodeURIComponent
    );
  }
  return Object.keys(obj)
    .sort()
    .map(
      key =>
        `${encodeURIComponent(key)}=${
          noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key])
        }`
    )
    .join("&");
}

export function getHashParams() {
  if (!(window.location.hash && window.location.hash.substr(1))) return {};

  const hash = window.location.hash.substr(1);

  const result = hash
    .split("&")
    .reduce((result: { [k: string]: string }, item) => {
      const parts = item.split("=");
      result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      return result;
    }, {});

  return result;
}

export function setHashParams(
  params: { [p: string]: string | number | boolean | undefined },
  hashChangeEventListener: {
    (this: Window, ev: HashChangeEvent): any;
    (this: Window, ev: HashChangeEvent): any;
  }
) {
  const s = Object.keys(params)
    .map(
      key =>
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key] || "")
    )
    .join("&");

  if (s) {
    window.removeEventListener("hashchange", hashChangeEventListener);
    window.location.hash = "#" + s;
    setTimeout(() => {
      window.addEventListener("hashchange", hashChangeEventListener);
    }, 0);
  }
}
