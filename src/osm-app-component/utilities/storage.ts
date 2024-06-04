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

export function set<T extends {}>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get<T extends {}>(key: string): T | undefined {
  try {
    const v = localStorage.getItem(key);
    if (!v) return undefined;
    return JSON.parse(v);
  } catch {
    return undefined;
  }
}
