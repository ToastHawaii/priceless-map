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

export const httpRegex = /^https?:\/\//i;

export function toUrl(url: string | undefined) {
  if (!url) return undefined;

  if (!httpRegex.test(url)) return `http://${url}`;

  return url;
}

export function toWikipediaUrl(wikipedia: string | undefined) {
  if (!wikipedia) return undefined;

  if (httpRegex.test(wikipedia)) return wikipedia;

  return `https://wikipedia.org/wiki/${wikipedia}`;
}

export function toFacebookUrl(url: string | undefined) {
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

export function getQueryParams() {
  if (!(window.location.search && window.location.search.substr(1))) return {};

  const hash = window.location.search.substr(1);

  const result = hash
    .split("&")
    .reduce((result: { [k: string]: string }, item) => {
      const parts = item.split("=");
      result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
      return result;
    }, {});

  return result;
}

export function setQueryParams(params: {
  [p: string]: string | number | boolean | undefined;
}) {
  const s = Object.keys(params)
    .filter(key => params[key])
    .map(
      key =>
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key] || "")
    )
    .join("&");

  window.history.replaceState(
    {},
    "",
    window.location.origin + window.location.pathname + (s ? "?" + s : "")
  );
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
    .filter(key => params[key])
    .map(
      key =>
        encodeURIComponent(key) + "=" + encodeURIComponent(params[key] || "")
    )
    .join("&");

  window.removeEventListener("hashchange", hashChangeEventListener);
  window.location.hash = s ? "#" + s : "";
  setTimeout(() => {
    window.addEventListener("hashchange", hashChangeEventListener);
  }, 0);
}

export function combine(...parts: string[]) {
  return parts
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/[\/]*$/g, "");
      } else {
        return part.trim().replace(/(^[\/]*|[\/]*$)/g, "");
      }
    })
    .filter(x => x.length)
    .join("/");
}
