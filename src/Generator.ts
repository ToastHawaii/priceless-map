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

export type Local = { [t: string]: string };
export type Tags = { [t: string]: string } & { wheelchair: string };
export type Attribute<M> = {
  check: (tags: Tags, value: string, model: M, local: Local) => boolean;
  template: (local: Local, tags: Tags, value: string, model: M) => string;
};

export class Generator<M extends {}> {
  public constructor(private attributes: Attribute<M>[]) {}

  public empty(tags: Tags, value: string, model: M, local: Local) {
    return (
      this.attributes.filter(attribute =>
        attribute.check(tags, value, model, local)
      ).length <= 0
    );
  }

  public render(
    local: Local,
    tags: Tags,
    value: string,
    model: M,
    separator: string = ""
  ) {
    return this.attributes
      .map(attribute =>
        attribute.check(tags, value, model, local)
          ? attribute.template(local, tags, value, model)
          : ""
      )
      .filter(el => el)
      .join(separator);
  }
}
