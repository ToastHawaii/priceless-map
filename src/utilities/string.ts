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

export function equalsIgnoreCase(
  s1: string | undefined,
  s2: string | undefined
) {
  return (s1 || "").toUpperCase() === (s2 || "").toUpperCase();
}

export function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number
) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}

export function textTruncate(text: string, length = 200, ending = "...") {
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  } else {
    return text;
  }
}
