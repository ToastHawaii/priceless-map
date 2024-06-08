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

export function groupBy<T>(xs: T[], prop: string): { [p: string]: T[] } {
  return xs.reduce((groups: any, item: any) => {
    const val = item[prop];
    groups[val] = groups[val] || [];
    groups[val].push(item);
    return groups;
  }, {}) as any;
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Simple object check.
 */
export function isObject(item: any) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 */
export function mergeDeep<T, S>(target: T, source: S) {
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!(target as any)[key]) Object.assign(target as any, { [key]: {} });
        mergeDeep((target as any)[key], source[key]);
      } else {
        Object.assign(target as any, { [key]: source[key] });
      }
    }
  }
  return target;
}
