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

import { Attribute, Tags } from "osm-app-component/dist/Generator";

const template = (title: string, icon: string, value?: string) =>
  `<div class="attribut"><i class="${icon}"></i>${
    value !== undefined ? " " + value : ""
  } ${title}</div>`;

export const attributes: Attribute<{}>[] = [
  {
    check: (tags) => !!tags.colour,
    template: (local, tags) =>
      `<div class="attribut"><i class="fas fa-circle" style="color:${tags.colour};"></i> ${local.colour}</div>`,
  },
  {
    check: (tags) =>
      (!!tags.internet_access &&
        tags.internet_access !== "no" &&
        tags["internet_access:fee"] !== "customers" &&
        tags["internet_access:fee"] !== "yes") ||
      (!!tags.wifi && tags.wifi !== "no"),
    template: (local) =>
      template(
        local.internet,
        "fas fa-wifi",

        [
          tags["internet_access:ssid"],
          tags[`internet_access:description:${local.code || "en"}`] ||
            tags["internet_access:description"],
        ]
          .filter((el) => el)
          .join(": ")
      ),
  },
  {
    check: (tags) => !!tags["piste:difficulty"],
    template: (local, tags) =>
      template(
        local.difficulty,
        "fas fa-exclamation-circle",
        (local["piste:difficulty"] as any)[tags["piste:difficulty"] || ""]
      ),
  },
  {
    check: (tags) =>
      tags["bottle"] === "yes" || tags["drinking_water:refill"] === "yes",
    template: (local) => template(local.bottle, "fas fa-wine-bottle"),
  },
  {
    check: (tags, value) => !!tags.capacity && value === "book-exchange",
    template: (local, tags) =>
      template(local.capacity, "fas fa-book", tags.capacity),
  },
  {
    check: (tags) =>
      tags["amenity"] === "drinking_water" ||
      tags["amenity"] === "water_point" ||
      tags["drinking_water"] === "yes" ||
      tags["drinking_water:refill"] === "yes",
    template: (local, tags) =>
      template(
        local.water,
        "fas fa-tint",
        tags[`drinking_water:description:${local.code || "en"}`] ||
          tags["drinking_water:description"]
      ),
  },
  {
    check: (tags) =>
      tags["service:bicycle:pump"] === "yes" ||
      tags["amenity"] === "compressed_air" ||
      tags["compressed_air"] === "yes",
    template: (local) => template(local.pump, "fas fa-tachometer-alt"),
  },
  {
    check: (tags) =>
      tags.leisure === "playground" ||
      tags.leisure === "paddling_pool" ||
      !!tags.playground ||
      tags.swimming_pool === "paddling_pool" ||
      tags.swimming_pool === "kids" ||
      tags.swimming_pool === "wading" ||
      tags.swimming_pool === "children's_pool" ||
      tags.children === "designated" ||
      tags.children === "yes" ||
      (tags.kids_area === "yes" && tags["kids_area:fee"] !== "yes") ||
      /child|juvenile|orphan|children|youth|family/gi.test(
        tags["social_facility:for"] || ""
      ) ||
      /juvenile|child|multigeneration|orphan|children|youth|family|multigeneration/gi.test(
        tags["community_centre:for"] || ""
      ),
    template: (local) => template(local.playground, "fas fa-child"),
  },
  {
    check: (tags) =>
      (!!tags.changing_table &&
        tags.changing_table !== "no" &&
        tags["changing_table:fee"] !== "yes") ||
      (!!tags.diaper && tags.diaper !== "no" && tags["diaper:fee"] !== "yes") ||
      (!!tags.baby_feeding && tags.baby_feeding !== "no"),
    template: (local, tags) =>
      template(
        local.changing_table,
        "fas fa-baby",

        tags[`changing_table:description:${local.code || "en"}`] ||
          tags[`diaper:description:${local.code || "en"}`] ||
          tags["changing_table:description"] ||
          tags["diaper:description"]
      ),
  },
  {
    check: (tags) =>
      tags["service:bicycle:tools"] === "yes" ||
      tags["service:bicycle:diy"] === "yes",
    template: (local) => template(local.tools, "fas fa-tools"),
  },
  {
    check: (tags) =>
      tags["service:bicycle:tools"] === "yes" ||
      tags["service:bicycle:diy"] === "yes" ||
      tags["service:bicycle:chain_tool"] === "yes" ||
      tags["service:bicycle:chaintool"] === "yes" ||
      tags["shop"] === "shoe_repair" ||
      tags["craft"] === "bag_repair" ||
      tags["craft"] === "shoe_repair" ||
      tags["repair"] === "ski" ||
      hasPropThatEndsWith(tags, "repair", "yes"),
    template: (local) => template(local.repair, "fas fa-tools"),
  },
  {
    check: (tags) =>
      tags["service:bicycle:chain_tool"] === "yes" ||
      tags["service:bicycle:chaintool"] === "yes",
    template: (local) => template(local.chainTool, "fas fa-link"),
  },
  {
    check: (tags) =>
      tags["service:bicycle:repair"] === "yes" ||
      tags["bicycle:repair"] === "yes" ||
      tags["reuse:bicycles"] === "yes" ||
      tags["recycling:bicycles"] === "yes" ||
      tags["bicycle"] === "yes",
    template: (local) => template(local.bicycle, "fas fa-bicycle"),
  },
  {
    check: (tags) => tags["car"] === "yes",
    template: (local) => template(local.car, "fas fa-car-side"),
  },
  {
    check: (tags) =>
      tags["service:clothes:repair"] === "yes" ||
      tags["clothes:repair"] === "yes" ||
      tags["service:fabrik:repair"] === "yes" ||
      tags["fabrik:repair"] === "yes" ||
      tags["reuse:clothes"] === "yes" ||
      tags["recycling:clothes"] === "yes" ||
      tags["recycling:textiles"] === "yes" ||
      tags["recycling:belts"] === "yes" ||
      tags["craft"] === "bag_repair" ||
      tags["shop"] === "clothes",
    template: (local) => template(local.clothes, "fas fa-tshirt"),
  },
  {
    check: (tags) => tags["recycling:batteries"] === "yes",
    template: (local) => template(local.battery, "fas fa-battery-full"),
  },
  {
    check: (tags) => tags["recycling:car_batteries"] === "yes",
    template: (local) => template(local.carBattery, "fas fa-car-battery"),
  },
  {
    check: (tags) => tags["recycling:cooking_oil"] === "yes",
    template: (local) => template(local.cookingOil, "fas fa-fill-drip"),
  },
  {
    check: (tags) => tags["recycling:engine_oil"] === "yes",
    template: (local) => template(local.engineOil, "fas fa-oil-can"),
  },
  {
    check: (tags) =>
      tags["recycling:oil"] === "yes" || tags["recycling:waste_oil"] === "yes",
    template: (local) => template(local.oil, "fas fa-oil-can"),
  },
  {
    check: (tags) => tags["recycling:paint"] === "yes",
    template: (local) => template(local.paint, "fas fa-brush"),
  },
  {
    check: (tags) => tags["recycling:hazardous_waste"] === "yes",
    template: (local) => template(local.hazardous, "fas fa-skull-crossbones"),
  },
  {
    check: (tags) => tags["recycling:hydrargyrum"] === "yes",
    template: (local) => template(local.hydrargyrum, "fas fa-thermometer-full"),
  },
  {
    check: (tags) => tags["recycling:plastic"] === "yes",
    template: (local) => template(local.plastic, "fas fa-cube"),
  },
  {
    check: (tags) => tags["recycling:plastic_bottles"] === "yes",
    template: (local) => template(local.plastic_bottles, "fas fa-wine-bottle"),
  },
  {
    check: (tags) => tags["recycling:plastic_packaging"] === "yes",
    template: (local) => template(local.plastic_packaging, "fas fa-cube"),
  },
  {
    check: (tags) => tags["recycling:PET"] === "yes",
    template: (local) => template(local.PET, "fas fa-wine-bottle"),
  },
  {
    check: (tags) => tags["recycling:plastic_bags"] === "yes",
    template: (local) => template(local.plastic_bags, "fas fa-shopping-bag"),
  },
  {
    check: (tags) => tags["recycling:polyester"] === "yes",
    template: (local) => template(local.polyester, "fas fa-tshirt"),
  },
  {
    check: (tags) =>
      tags["recycling:polystyrene_foam"] === "yes" ||
      tags["recycling:styrofoam"] === "yes",
    template: (local) => template(local.polystyrene_foam, "fas fa-box"),
  },
  {
    check: (tags) =>
      tags["recycling:rubble"] === "yes" ||
      tags["recycling:hardcore"] === "yes",
    template: (local) => template(local.rubble, "fas fa-shapes"),
  },
  {
    check: (tags) =>
      /^(yes|only)$/gi.test(tags.shoe_repair || "") ||
      tags["repair"] === "shoes" ||
      tags["shop"] === "shoe_repair" ||
      tags["craft"] === "shoe_repair" ||
      tags["recycling:shoes"] === "yes" ||
      tags["shop"] === "shoes",
    template: (local) => template(local.shoes, "fas fa-shoe-prints"),
  },
  {
    check: (tags) =>
      tags["service:mobile_phone:repair"] === "yes" ||
      tags["mobile_phone:repair"] === "yes" ||
      tags["reuse:mobile_phones"] === "yes" ||
      tags["recycling:mobile_phones"] === "yes",
    template: (local) => template(local.mobile, "fas fa-mobile-alt"),
  },
  {
    check: (tags) =>
      tags["service:small_electronics_device:repair"] === "yes" ||
      tags["small_electronics_device:repair"] === "yes" ||
      tags["service:electronics:repair"] === "yes" ||
      tags["electronics:repair"] === "yes" ||
      tags["recycling:small_electrical_appliances"] === "yes" ||
      tags["recycling:small_appliances"] === "yes" ||
      tags["recycling:electrical_items"] === "yes" ||
      tags["recycling:electrical_appliances"] === "yes" ||
      tags["recycling:electronic"] === "yes" ||
      tags["recycling:electronics"] === "yes" ||
      tags["reuse:small_electrical_appliances"] === "yes" ||
      tags["reuse:small_appliances"] === "yes" ||
      tags["reuse:electrical_items"] === "yes" ||
      tags["reuse:electrical_appliances"] === "yes" ||
      tags["reuse:electronics"] === "yes" ||
      tags["reuse:electronic"] === "yes",
    template: (local) => template(local.electronics, "fas fa-plug"),
  },
  {
    check: (tags) =>
      tags["service:furniture:repair"] === "yes" ||
      tags["furniture:repair"] === "yes" ||
      tags["reuse:furniture"] === "yes" ||
      tags["recycling:furniture"] === "yes",
    template: (local) => template(local.furniture, "fas fa-chair"),
  },
  {
    check: (tags) =>
      tags["service:computer:repair"] === "yes" ||
      tags["computer:repair"] === "yes" ||
      tags["reuse:computers"] === "yes" ||
      tags["recycling:computers"] === "yes",
    template: (local) => template(local.computer, "fas fa-laptop"),
  },
  {
    check: (tags) =>
      tags["service:toy:repair"] === "yes" ||
      tags["toy:repair"] === "yes" ||
      tags["reuse:toys"] === "yes" ||
      tags["recycling:toys"] === "yes",
    template: (local) => template(local.toy, "fas fa-horse"),
  },
  {
    check: (tags) =>
      hasPropThatStartsWith(tags, "recycling:", "yes") ||
      tags.composting === "yes",
    template: (local) =>
      template(local.freeToGive, "fas fa-long-arrow-alt-right"),
  },
  {
    check: (tags) => tags["reuse:policy"] === "free_to_take",
    template: (local) =>
      template(local.freeToTake, "fas fa-long-arrow-alt-left"),
  },
  {
    check: (tags) =>
      tags["reuse:policy"] === "free_to_take_or_give" ||
      (!tags["reuse:policy"] &&
        (tags["amenity"] === "reuse" ||
          hasPropThatStartsWith(tags, "reuse:", "yes") ||
          tags["amenity"] === "give_box" ||
          tags["amenity"] === "freeshop")),
    template: (local) =>
      template(local.freeToTakeOrGive, "fas fa-exchange-alt"),
  },
  {
    check: (tags) =>
      (tags.amenity === "library" && tags.library !== "booksharing") ||
      tags.amenity === "toy_library" ||
      tags.amenity === "bicycle_rental" ||
      tags.amenity === "bicycle_library" ||
      tags.shop === "bicycle_rental" ||
      tags.amenity === "bicycle_sharing" ||
      tags.shop === "tool_hire" ||
      tags.amenity === "ski_rental" ||
      tags.shop === "ski_rental" ||
      tags.ski === "rental" ||
      hasPropThatEndsWith(tags, "rental", "yes") ||
      hasPropThatEndsWith(tags, "rental", "only") ||
      tags.amenity === "piano",
    template: (local) => template(local.borrow, "fas fa-redo-alt"),
  },
  {
    check: (tags) => tags.sport === "bmx" || tags.sport === "cycling",
    template: (local) => template(local.park, "fas fa-infinity"),
  },
  {
    check: (tags) => tags.amenity === "charging_station",
    template: (local) => template(local.charging, "fas fa-charging-station"),
  },
  {
    check: (tags) => tags.amenity === "device_charging_station",
    template: (local) => template(local.mobileCharging, "fas fa-battery-full"),
  },
  {
    check: (tags) => !!tags.hoops,
    template: (local, tags) =>
      `<div class="attribut"><img style="height: 13px;vertical-align: text-top;" src="/lib/maki-icons/basketball-15.svg"> ${tags.hoops} ${local.hoops}</div>`,
  },
  {
    check: (tags) =>
      tags.female === "yes" ||
      /woman|women/gi.test(tags["social_facility:for"] || "") ||
      /woman|women/gi.test(tags["community_centre:for"] || "") ||
      tags.unisex === "yes",
    template: (local) => template(local.female, "fas fa-female"),
  },
  {
    check: (tags) =>
      tags.male === "yes" ||
      /^men|^man/gi.test(tags["social_facility:for"] || "") ||
      /^men|^man/gi.test(tags["community_centre:for"] || "") ||
      tags.unisex === "yes",
    template: (local) => template(local.male, "fas fa-male"),
  },
  {
    check: (tags) =>
      /senior|elderly/gi.test(tags["social_facility:for"] || "") ||
      /senior|multigeneration/gi.test(tags["community_centre:for"] || ""),
    template: (local) => template(local.senior, "fas fa-blind"),
  },
  {
    check: (tags) =>
      /disabled|mental_health|diseased/gi.test(
        tags["social_facility:for"] || ""
      ) || /disabled/gi.test(tags["community_centre:for"] || ""),
    template: (local) => template(local.disabled, "fab fa-accessible-icon"),
  },
  {
    check: (tags) =>
      /homeless|underprivileged|drug_addicted|unemployed/gi.test(
        tags["social_facility:for"] || ""
      ),
    template: (local) => template(local.homeless, "fas fa-angle-up"),
  },
  {
    check: (tags) =>
      /migrant|refugees|refugee|displaced|migrants/gi.test(
        tags["social_facility:for"] || ""
      ) ||
      /immigrant/gi.test(tags["community_centre:for"] || "") ||
      /displaced/gi.test(tags["emergency:social_facility:for"] || ""),
    template: (local) => template(local.migrant, "fas fa-running"),
  },
  {
    check: (tags) =>
      (tags.lgbtq && tags.lgbtq !== "no") ||
      /LGBTI/gi.test(tags["social_facility:for"] || "") ||
      /lgbtq|homosexual/gi.test(tags["community_centre:for"] || "") ||
      /welcome|yes|only/gi.test(tags.gay || ""),
    template: (local) => template(local.lgbtq, "fas fa-rainbow"),
  },
  {
    check: (tags) =>
      tags.location === "indoor" ||
      tags["public_bookcase:type"] === "building" ||
      !!(tags.indoor && tags.indoor !== "no") ||
      !!(tags.building && tags.building !== "no"),
    template: (local) => template(local.indoor, "far fa-building"),
  },
  {
    check: (tags) =>
      (!!tags.covered && tags.covered !== "no") || tags.amenity === "shelter",
    template: (local) => template(local.covered, "fas fa-chevron-up"),
  },
  {
    check: (tags) => tags.lit === "yes",
    template: (local) => template(local.light, "far fa-lightbulb"),
  },
  {
    check: (tags) =>
      /horizontal_bar/gi.test(tags["fitness_station"] || "") ||
      tags["fitness_station:horizontal_bar"] === "yes" ||
      /horizontal_bar/gi.test(tags["playground"] || "") ||
      tags["playground:horizontal_bar"] === "yes",
    template: (local) => template(local.horizontalBar, "fas fa-minus"),
  },
  {
    check: (tags) =>
      /parallel_bars/gi.test(tags["fitness_station"] || "") ||
      tags["fitness_station:parallel_bars"] === "yes",
    template: (local) =>
      template(local.parallelBars, "fas fa-grip-lines-vertical"),
  },
  {
    check: (tags) =>
      /rings/gi.test(tags["fitness_station"] || "") ||
      tags["fitness_station:rings"] === "yes",
    template: (local) => template(local.rings, "far fa-circle"),
  },
  {
    check: (tags) =>
      /elliptical_trainer|air_walker|exercise_bike|rower/gi.test(
        tags["fitness_station"] || ""
      ) ||
      tags["fitness_station:elliptical_trainer"] === "yes" ||
      tags["fitness_station:air_walker"] === "yes" ||
      tags["fitness_station:exercise_bike"] === "yes" ||
      tags["fitness_station:rower"] === "yes" ||
      /exercise/gi.test(tags["playground"] || "") ||
      tags["playground:exercise"] === "yes",
    template: (local) => template(local.exerciseMachine, "fas fa-biking"),
  },
  {
    check: (tags) =>
      /slackline|balance(_)?beam/gi.test(tags["fitness_station"] || "") ||
      tags["fitness_station:slackline"] === "yes" ||
      tags["fitness_station:balance_beam"] === "yes" ||
      tags["fitness_station:balancebeam"] === "yes" ||
      /slackline|balance(_)?beam/gi.test(tags["playground"] || "") ||
      tags["playground:slackline"] === "yes" ||
      tags["playground:balance_beam"] === "yes" ||
      tags["playground:balancebeam"] === "yes",
    template: (local) => template(local.balance, "fas fa-street-view"),
  },
  {
    check: (tags) => !!wheelchairAccess(tags, {}),
    template: (local, tags) => {
      const access = wheelchairAccess(tags, local);
      return `<div class="attribut"><i class="fab fa-accessible-icon"></i> <i class="fas fa-${
        access?.icon
      }" style="color: ${access?.color};"></i> ${access?.text}${
        !!(
          tags[`wheelchair:description:${local.code || "en"}`] ||
          tags["wheelchair:description"]
        )
          ? ": " +
            (tags[`wheelchair:description:${local.code || "en"}`] ||
              tags["wheelchair:description"])
          : ""
      }</div>`;
    },
  },
  {
    check: (tags, _value, _model, local) =>
      !!(tags["emergency"] === "defibrillator") &&
      !!(
        tags[`defibrillator:location:${local.code || "en"}`] ||
        tags["defibrillator:location"]
      ),
    template: (local, tags) =>
      template(
        local.defibrillator,
        "fas fa-heartbeat",
        tags[`defibrillator:location:${local.code || "en"}`] ||
          tags["defibrillator:location"]
      ),
  },
];

function wheelchairAccess(tags: Tags, local: any) {
  switch (tags["wheelchair"]) {
    case "yes":
    case "designated":
      return {
        text: local.wheelchair?.yes,
        color: "green",
        icon: "check-circle",
      };
    case "limited":
      return {
        text: local.wheelchair?.limited,
        color: "orange",
        icon: "exclamation-circle",
      };
    case "no":
      return { text: local.wheelchair?.no, color: "red", icon: "times-circle" };
    default:
      // do not display for others values or undefined
      return undefined;
  }
}

function hasPropThatStartsWith(tags: any, name: string, value: string) {
  for (const tag in tags) {
    if (
      tags.hasOwnProperty(tag) &&
      tag.toUpperCase().startsWith(name.toUpperCase()) &&
      tags[tag] === value
    ) {
      return true;
    }
  }
  return false;
}

function hasPropThatEndsWith(tags: any, name: string, value: string) {
  for (const tag in tags) {
    if (
      tags.hasOwnProperty(tag) &&
      tag.toUpperCase().endsWith(name.toUpperCase()) &&
      tags[tag] === value
    ) {
      return true;
    }
  }
  return false;
}
