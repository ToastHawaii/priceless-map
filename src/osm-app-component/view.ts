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

import * as moment from "moment";
import { getOrDefault } from "./data";

export function toTitle(model: {
  name: string;
  address: {
    name: string;
    street: string;
  };
  type: string;
  operator: string;
}) {
  const name =
    model.name ||
    (model.address.name !== model.address.street
      ? model.address.name
      : undefined) ||
    model.type;
  return name + (model.operator ? ` (${model.operator})` : ``);
}

export function toLevel(
  model: number,
  local: {
    groundFloor: (level: number) => string;
    basement: (level: number) => string;
    floor: (level: number) => string;
  }
) {
  if (!isNumeric(model)) return ``;

  if (model === 0) return local.groundFloor(model);

  if (model < 0) return local.basement(model);

  if (model > 0) return local.floor(model);

  return ``;
}

export function toOpenOrClose(
  model: {
    getUnknown: (date?: Date) => string;
    getComment: (date?: Date) => string;
    getState: (date?: Date) => string;
    getNextChange: () => Date;
  },
  local: {
    maybeOpen: string;
    thatDependsOn: string;
    open: string;
    closed: string;
    maybeCloses: string;
    maybeOpens: string;
    closes: string;
    opens: string;
  }
) {
  let output = "";
  try {
    if (model.getUnknown()) {
      output = `<span class="open">${local.maybeOpen}</span>${
        model.getComment()
          ? ` ${local.thatDependsOn}: "${model.getComment()}"`
          : ""
      }`;
    } else {
      output =
        (model.getState()
          ? `<span class="open">${local.open}</span>`
          : `<span class="closed">${local.closed}</span>`) +
        (model.getComment() ? ` "${model.getComment()}"` : ``);
    }
    if (
      typeof model.getNextChange() !== `undefined` &&
      model.getState() !== model.getState(model.getNextChange()) &&
      moment(model.getNextChange()).diff(moment(), "weeks") <= 2
    ) {
      output += ` - `;

      if (model.getUnknown(model.getNextChange()))
        output += model.getState() ? local.maybeCloses : local.maybeOpens;
      else output += model.getState() ? local.closes : local.opens;

      output += ` ${moment(model.getNextChange()).calendar()} ${
        model.getComment(model.getNextChange())
          ? ` "${model.getComment(model.getNextChange())}"`
          : ``
      }`;
    }
  } catch (e) {
    console.warn(e);
    return undefined;
  }
  return output;
}

export function toSeasonal(
  value: string,
  local: { seasonal: { [name: string]: string } }
) {
  return value
    .split(";")
    .map(v => getOrDefault(local, "seasonal")[v])
    .join(", ");
}

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
