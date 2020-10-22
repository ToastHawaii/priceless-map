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

import { type } from "./local.type";

export const local = {
  code: "",
  title: "Priceless map",
  description: "Experience the world. Free of charge.",
  minZoomMessageNoLayer: "No layer assigned",
  minZoomMessage: "Zoom in to load locations",
  emptyIndicator: "No locations found",
  linkCopied: "Link copied to the clipboard",
  capacity: "Capacity",
  playground: "For children",
  changing_table: "Has a changing table",
  bottle: "Refilling is possible",
  pump: "Pump",
  tools: "Tools",
  chainTool: "Chain tool",
  internet: "Internet",
  water: "Drinking water",
  bicycle: "Bicycle",
  park: "Park",
  charging: "Charging",
  mobileCharging: "Charging",
  car: "Car",
  mobile: "Mobile phone",
  smallElectronics: "Small Electronics",
  electronics: "Electronics",
  furniture: "Furniture",
  computer: "Computer",
  toy: "Toy",
  clothes: "Clothes",
  freeToGive: "Free to give",
  freeToTake: "Free to take",
  freeToTakeOrGive: "Free to take or give",
  borrow: "Borrow only",
  indoor: "Indoor",
  female: "Female",
  male: "Male",
  hoops: "Hoops",
  light: "Lit",
  covered: "Covered",
  wheelchairYes: "Wheelchair accessible",
  wheelchairLimited: "Limited wheelchair accessible",
  wheelchairNo: "Not wheelchair accessible",
  colour: "Color",
  open: "Open",
  closed: "Closed",
  maybeOpen: "Maybe open",
  maybeOpens: "Maybe opens",
  maybeCloses: "Maybe closes",
  opens: "Opens",
  closes: "Closes",
  thatDependsOn: "That depends on",
  conditionalFee: "Only free at certain times.",
  horizontalBar: "Horizontal bar",
  parallelBars: "Parallel bars",
  rings: "Rings",
  exerciseMachine: "Exercise machine",
  balance: "Balance",
  route: "Route",
  difficulty: "Difficulty",
  externalResources: "Others",
  floor: function (level: number) {
    return `(${level}F)`;
  },
  groundFloor: function (_level: number) {
    return `(GF)`;
  },
  basement: function (level: number) {
    return `(B${Math.abs(level)}F)`;
  },
  group: {
    culture: "Culture",
    education: "Education",
    natural: "Nature",
    object_of_utility: "Objects of utility",
    health: "Health",
    community: "Community",
    sport: "Sport",
    communitySport: "Community sport",
    trip: "Trip",
    goods: "Goods",
    material: "Material recycling"
  },
  amenity: {
    hunting_stand: "Hunting stand"
  },
  leisure: {
    bird_hide: "Place to observe birds",
    wildlife_hide: "Place to observe wildlife"
  },
  man_made: {
    water_well: "Water well",
    watermill: "Watermill",
    windmill: "Windmill",
    mineshaft: "Mineshaft",
    drinking_fountain: "Drinking fountain",
    tower: "Tower",
    beehive: "Beehive",
    insect_hotel: "Insect hotel",
    nesting_site: "Nesting aid"
  },
  landuse: {
    apiary: "Beehive"
  },
  natural: {
    anthill: "Anthill",
    termite_mound: "Termite mound"
  },
  sport: { bowls: "Bowls", boules: "Boules" },
  boules: {
    petanque: "Pétanque",
    lyonnaise: "Jeu provençal",
    boule_de_fort: "Boule de fort",
    pétanque: "Pétanque",
    bocce: "Bocce"
  },
  type: type,
  "piste:difficulty": {
    novice: "Novice",
    easy: "Easy",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
    freeride: "Freeride",
    extreme: "Extreme"
  },
  fitness_station: {
    balance_beam: "Exercise Balance Beam",
    box: "Exercise Box",
    horizontal_bar: "Exercise Horizontal Bar",
    horizontal_ladder: "Exercise Monkey Bars",
    hyperextension: "Hyperextension Station",
    parallel_bars: "Parallel Bars",
    "push-up": "Push-Up Station",
    rings: "Exercise Rings",
    sign: "Exercise Instruction Sign",
    "sit-up": "Sit-Up Station",
    stairs: "Exercise Stairs",
    beam_jump: "Beam jump",
    stepping_stone: "Stepping stone",
    bench: "Bench",
    body_raise: "Body raise",
    slalom: "Slalom",
    stretch_bars: "Stretch bars"
  },
  historic: {
    aircraft: "Aircraft",
    aqueduct: "Aqueduct",
    archaeological_site: "Archaeological site",
    battlefield: "Battlefield",
    boundary_stone: "Boundary stone",
    building: "Building",
    cannon: "Cannon",
    castle: "Castle",
    castle_wall: "Castle wall",
    church: "Church",
    city_gate: "City gate",
    citywalls: "Citywalls",
    farm: "Farm",
    fort: "Fort",
    gallows: "Gallows",
    highwater_mark: "Highwater mark",
    locomotive: "Locomotive",
    manor: "Manor",
    memorial: "Memorial",
    mine: "Mine",
    mine_shaft: "Mine shaft",
    milestone: "Milestone",
    monastery: "Monastery",
    monument: "Monument",
    optical_telegraph: "Optical telegraph",
    pillory: "Pillory",
    railway_car: "Railway car",
    ruins: "Ruins",
    rune_stone: "Rune stone",
    ship: "Ship",
    tomb: "Tomb",
    tower: "Tower",
    tree_shrine: "Tree shrine",
    wayside_cross: "Wayside cross",
    wayside_shrine: "Wayside shrine",
    wreck: "Wreck"
  },
  site_type: {
    megalith: "Megalith",
    bigstone: "Bigstone",
    tumulus: "Tumulus",
    fortification: "Fortification",
    petroglyph: "Petroglyph",
    geoglyph: "Geoglyph",
    city: "Historic city",
    settlement: "Settlement",
    hut_circle: "Hut circle",
    roman_villa: "Roman villa",
    domus: "Domus",
    roman_circus: "Roman circus",
    necropolis: "Necropolis"
  },
  castle_type: {
    defensive: "Defensive castle",
    palace: "Palace",
    stately: "Stately home",
    manor: "Manor house",
    fortress: "Fortress",
    castrum: "Roman fort ",
    shiro: "Shiro",
    kremlin: "Kremlin",
    hillfort: "Hillfort"
  },
  "public_bookcase:type": {
    building: "Public bookcase",
    glass_cabinet: "Public bookcase",
    metal_cabinet: "Public bookcase",
    movable_cabinet: "Public bookcase",
    phone_box: "Public bookcase",
    reading_box: "Public bookcase",
    sculpture: "Public bookcase",
    shelf: "Public bookcase",
    shelter: "Public bookcase",
    wooden_cabinet: "Public bookcase"
  },
  "garden:type": {
    botanical: "Botanical garden",
    community: "Community garden",
    residential: "Residential garden",
    roof_garden: "Roof garden"
  },
  "garden:style": {
    english: "English landscape garden",
    french: "Garden à la française",
    chinese: "Chinese garden",
    japanese: "Japanese garden",
    zen: "Zen garden",
    monastery: "Medieval monastery garden",
    rosarium: "Rose garden",
    herb_garden: "Herb garden",
    medical_garden: "Physic garden",
    kitchen: "Kitchen garden",
    flower_garden: "Flower garden",
    cottage_garden: "Cottage garden",
    walled_garden: "Walled garden"
  }
};
