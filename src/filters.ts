function nwFee(tag: string) {
  return `nw${tag}["fee"];
nw${tag}["fee:conditional"];`;
}

function nwrFee(tag: string) {
  return `nwr${tag}["fee"];
nwr${tag}["fee:conditional"];`;
}

export const filters: {
  group: string;
  subgroup?: string;
  value: string;
  icon: string;
  button?: string;
  query: string;
  color: string;
  edit: string[];
  tags: string[];
}[] = [
  {
    group: "culture",
    value: "artwork",
    icon: "https://wiki.openstreetmap.org/w/images/1/12/Artwork-14.svg",
    query: `
    // Kunst im öffentlichen Raum
    nwr["tourism"="artwork"];`,
    color: "#F4A460",
    tags: ["tourism=artwork"],
    edit: ["tourism=artwork"]
  },
  {
    group: "culture",
    value: "fountain",
    icon: "https://wiki.openstreetmap.org/w/images/a/a1/Fountain-14.svg",
    query: `
    nwr["amenity"="fountain"];
    nwr["playground"="splash_pad"];`,
    color: "#00FFFF",
    tags: ["amenity=fountain", "playground=splash_pad"],
    edit: ["amenity=fountain", "playground"]
  },
  {
    group: "culture",
    value: "tourist-attraction",
    icon: "/lib/maki-icons/attraction-15.svg",
    query: `
nwr["tourism"="attraction"]["attraction"!="animal"]["attraction"!="maze"];

nwr["tourism"="yes"];

nwr["heritage"];`,
    color: "#FFD700",
    tags: ["tourism=attraction", "tourism=*", "heritage=*"],
    edit: [
      "tourism=attraction",
      "tourism",
      "building",
      "leisure=park",
      "leisure=garden",
      "man_made"
    ]
  },
  {
    group: "culture",
    value: "archaeological-site",
    icon:
      "https://wiki.openstreetmap.org/w/images/7/7d/Archaeological-site-16.svg",
    query: `
    nwr["historic"="archaeological_site"];
    nwr["geological"="palaeontological_site"];`,
    color: "#F4A460",
    tags: ["historic=archaeological_site", "geological=palaeontological_site"],
    edit: ["historic=archaeological_site"]
  },
  {
    group: "education",
    value: "trail",
    icon: "https://wiki.openstreetmap.org/w/images/7/77/Board-14.svg",
    query: `
    nw["information"="board"]["board_type"~"wildlife|plants|geology|nature|planet_walk|astronomy|forestry|botany|biology|birds|tree|panorama|agriculture|science|technology"];
    nw["information"="nature"];
    nw["information"="wild_life"];
    nw["information"="wildlife"];
    relation["type"="route"]["educational"="yes"];
    relation["route"="educational_trail"];`,
    color: "#222222",
    tags: [
      "educational=yes",
      "route=educational_trail",
      "board_type=wildlife",
      "board_type=plants",
      "board_type=geology",
      "board_type=nature",
      "board_type=planet_walk",
      "board_type=astronomy",
      "board_type=forestry",
      "board_type=botany",
      "board_type=biology",
      "board_type=birds",
      "board_type=tree",
      "board_type=panorama",
      "board_type=science",
      "board_type=technology"
    ],
    edit: ["tourism=information", "type=route"]
  },
  {
    group: "education",
    value: "book-exchange",
    icon: "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
    query: `
// Public bookcases
nw["amenity"="public_bookcase"];

// Library free of charge
${nwFee(`["amenity"="library"]`)}`,
    color: "#A0522D",
    tags: ["amenity=public_bookcase", "amenity=library"],
    edit: ["amenity=public_bookcase", "amenity=library"]
  },
  {
    group: "education",
    value: "internet",
    icon: "https://wiki.openstreetmap.org/w/images/8/89/Internet_cafe-14.svg",
    query: `
nwr["internet_access"]["internet_access"!="no"]["internet_access:fee"!~"^(customers|yes)$"];

nwr["wifi"]["wifi"!="no"];`,
    color: "#FF1493",
    tags: ["internet_access=*", "wifi=*"],
    edit: ["amenity", "shop"]
  },
  {
    group: "culture",
    value: "castle",
    icon: "https://wiki.openstreetmap.org/w/images/3/31/Fortress-14.svg",
    query: `
nwr["historic"="castle"][!"ruins"];
nwr["historic"="castle"]["ruins"="no"];

nwr["historic"="tower"][!"ruins"];
nwr["historic"="tower"]["ruins"="no"];

nwr["historic"="fort"][!"ruins"];
nwr["historic"="fort"]["ruins"="no"];`,
    color: "#808080",
    tags: ["historic=castle", "historic=tower", "historic=fort"],
    edit: ["historic=castle", "historic=fort", "historic"]
  },
  {
    group: "culture",
    value: "mill",
    icon: "https://wiki.openstreetmap.org/w/images/0/0b/Windmill-16.svg",
    query: `
nwr["man_made"="watermill"][!"ruins"];
nwr["man_made"="watermill"]["ruins"="no"];

nwr["man_made"="windmill"][!"ruins"];
nwr["man_made"="windmill"]["ruins"="no"];`,
    color: "#e63d00",
    tags: ["man_made=watermill", "man_made=windmill"],
    edit: ["man_made=watermill", "man_made=windmill"]
  },
  {
    group: "culture",
    value: "history",
    icon: "https://wiki.openstreetmap.org/w/images/c/c8/Acheological.png",
    query: `
nwr["historic"!~"^(castle|tower|fort|ruins|memorial|monument|archaeological_site)$"]["building"!="bunker"]["military"!="bunker"];

nw["board_type"="history"];
nw["information"="history"];`,
    color: "#e0e094",
    tags: ["historic=*", "board_type=history"],
    edit: ["historic", "tourism=information"]
  },
  {
    group: "culture",
    value: "memorial",
    icon: "https://wiki.openstreetmap.org/w/images/6/6e/Memorial-16.svg",
    query: `
nwr["historic"="memorial"];`,
    color: "#B8860B",
    tags: ["historic=memorial"],
    edit: ["historic=memorial"]
  },
  {
    group: "culture",
    value: "monument",
    icon: "https://wiki.openstreetmap.org/w/images/9/94/Monument-16.svg",
    query: `
// Historic Monument
nwr["historic"="monument"];`,
    color: "#DAA520",
    tags: ["historic=monument"],
    edit: ["historic=monument"]
  },
  {
    group: "education",
    value: "museum",
    icon: "https://wiki.openstreetmap.org/w/images/a/a9/Museum-16.svg",
    query: `
    ${nwrFee(`["tourism"="museum"]`)}
    ${nwFee(`["tourism"="gallery"]`)}
    ${nwFee(`["amenity"="arts_centre"]`)}`,
    color: "#DCDCDC",
    tags: ["tourism=museum", "tourism=gallery", "amenity=arts_centre"],
    edit: ["tourism=museum", "tourism=gallery", "amenity=arts_centre"]
  },
  {
    group: "education",
    value: "observatory",
    icon: "https://wiki.openstreetmap.org/w/images/e/e0/Telescope_dome-14.svg",
    query: `
${nwrFee(`["man_made"="observatory"]`)}

${nwrFee(`["amenity"="observatory"]`)}

${nwrFee(`["landuse"="observatory"]`)}`,
    color: "#00008B",
    tags: ["man_made=observatory"],
    edit: ["man_made=observatory", "landuse"]
  },
  {
    group: "culture",
    value: "ruins",
    icon:
      "https://wiki.openstreetmap.org/w/images/7/78/Building_ruins_generic.svg",
    query: `
nwr["historic"="ruins"];

nwr["ruins"]["ruins"!="no"];

nwr["building"="ruins"];`,
    color: "#A9A9A9",
    tags: ["historic=ruins", "building=ruins", "ruins=*"],
    edit: ["historic=ruins", "building=ruins", "historic", "building"]
  },
  {
    group: "natural",
    value: "cave",
    icon: "https://wiki.openstreetmap.org/w/images/b/b1/Cave.14.svg",
    query: `
nw["natural"="cave_entrance"];`,
    color: "#2F4F4F",
    tags: ["natural=cave_entrance"],
    edit: ["natural=cave_entrance"]
  },
  {
    group: "natural",
    value: "natural_monument",
    icon: "/lib/maki-icons/park-15.svg",
    query: `
    nw["denotation"="natural_monument"];
    nw["denotation"="landmark"];
    
    node["natural"="tree"][religion];
    way["natural"="tree_row"][religion];   
    nw["denotation"="religious"];
    
    node["natural"="tree"]["historic"];
    way["natural"="tree_row"]["historic"];
    nw["denotation"="memorial"];`,
    color: "#228B22",
    tags: ["denotation=natural_monument", "denotation=landmark"],
    edit: ["natural=tree", "natural=tree_row", "natural"]
  },
  {
    group: "natural",
    value: "pond",
    icon: "/lib/maki-icons/water-15.svg",
    query: `
nwr["natural"="water"]["water"~"^(pond|lake|reservoir|reflecting_pool)$"];`,
    color: "#5F9EA0",
    tags: [
      "natural=water",
      "water=pond",
      "water=lake",
      "water=reservoir",
      "water=reflecting_pool"
    ],
    edit: ["natural=water"]
  },
  {
    group: "natural",
    value: "rock",
    icon: "/lib/maki-icons/circle-15.svg",
    query: `
nwr["natural"="rock"];

nwr["natural"="stone"];`,
    color: "#D3D3D3",
    tags: ["natural=rock", "natural=stone"],
    edit: ["natural=rock", "natural=stone"]
  },
  {
    group: "natural",
    value: "viewpoint",
    icon: "https://wiki.openstreetmap.org/w/images/c/c2/Viewpoint-16.svg",
    query: `
nwr["tourism"="viewpoint"];

nw["viewpoint"="yes"];

nwr["tower:type"="observation"]`,
    color: "#98FB98",
    tags: ["tourism=viewpoint", "viewpoint=*", "tower:type=observation"],
    edit: ["tourism=viewpoint", "man_made=tower", "man_made", "natural"]
  },
  {
    group: "natural",
    value: "waterfall",
    icon: "https://wiki.openstreetmap.org/w/images/7/72/Waterfall-14.svg",
    query: `
nwr["waterway"="waterfall"];

nwr["waterway"="dam"];

nwr["waterway"="weir"];`,
    color: "#20B2AA",
    tags: ["waterway=waterfall", "waterway=dam", "waterway=weir"],
    edit: ["waterway=waterfall", "waterway=dam", "waterway=weir"]
  },
  {
    group: "community",
    value: "assistance",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg",
    query: `
    nwr["social_facility"="outreach"];

    nwr["amenity"="social_centre"];

    ${nwFee(`["healthcare"="counselling"]`)}`,
    color: "#DC143C",
    tags: [
      "social_facility=outreach",
      "amenity=social_centre",
      "healthcare=counselling"
    ],
    edit: [
      "amenity=social_facility",
      "amenity=social_centre",
      "healthcare=counselling"
    ]
  },
  {
    group: "community",
    value: "assisted-repair",
    icon: "/lib/temaki-icons/tools.svg",
    query: `
node["repair"="assisted_self_service"];

nw["leisure"="hackerspace"]["repair"];

node["network"~"Repair Caf[eé]",i];
node["name"~"Repair Caf[eé]",i];
node["brand"~"Repair Caf[eé]",i];`,
    color: "#1975ae",
    tags: ["repair=assisted_self_service", "leisure=hackerspace", "repair=*"],
    edit: ["amenity", "leisure=hackerspace"]
  },
  {
    group: "object_of_utility",
    value: "barbecue",
    icon: "https://wiki.openstreetmap.org/w/images/5/50/Bbq-14.svg",
    query: `
nwr["amenity"="bbq"];

nwr["barbecue_grill"="yes"];

nwr["bbq"="yes"];`,
    color: "#708090",
    tags: ["amenity=bbq", "barbecue_grill=*", "bbq=*"],
    edit: ["amenity=bbq", "tourism"]
  },
  {
    group: "object_of_utility",
    value: "baking-oven",
    icon: "/lib/maki-icons/bakery-15.svg",
    query: `
    nw["amenity"="baking_oven"][!"historic"];
    
    nw["building"="bakehouse"]["disused:amenity"!="baking_oven"]["disused:amenity"!="oven"][!"disused:oven"]["abandoned:amenity"!="baking_oven"]["abandoned:amenity"!="oven"][!"abandoned:oven"][!"shop"][!"historic"];`,
    color: "#D2B48C",
    tags: ["amenity=baking_oven", "building=bakehouse"],
    edit: ["amenity", "building"]
  },
  {
    group: "object_of_utility",
    value: "bicycle-rental",
    icon: "https://wiki.openstreetmap.org/w/images/d/d5/Rental-bicycle-16.svg",
    query: `
    ${nwFee(`["amenity"="bicycle_rental"]`)}`,
    color: "#2E8B57",
    tags: ["amenity=bicycle_rental"],
    edit: ["amenity=bicycle_rental"]
  },
  {
    group: "object_of_utility",
    value: "bicycle-self-repair",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
    nw["amenity"="bicycle_repair_station"]["service:bicycle:tools"!="no"];

    node["repair"="assisted_self_service"]["service:bicycle:repair"="yes"];
    node["repair"="assisted_self_service"]["bicycle:repair"="yes"];
  
    nw["service:bicycle:diy"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "service:bicycle:repair=*",
      "bicycle:repair=*",
      "service:bicycle:diy=*"
    ],
    edit: ["amenity=bicycle_repair_station", "amenity", "shop"]
  },
  {
    group: "object_of_utility",
    value: "charging-station",
    icon:
      "https://wiki.openstreetmap.org/w/images/a/af/Charging_station.16.svg",
    query: `
    (nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"]; 
      - nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
      nw["amenity"="charging_station"]["fee"="no"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#0092da",
    tags: ["amenity=charging_station"],
    edit: ["amenity=charging_station"]
  },
  {
    group: "community",
    value: "community-centre",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/0b/Community_centre-14.svg",
    query: `
nwr["amenity"="community_centre"];`,
    color: "#da532c",
    tags: ["amenity=community_centre"],
    edit: ["amenity=community_centre"]
  },
  {
    group: "community",
    value: "community-garden",
    icon: "/lib/maki-icons/garden-centre-15.svg",
    query: `
nwr["garden:type"="community"];  

nw["landuse"="community_food_growing"];`,
    color: "#228B22",
    tags: ["garden:type=community", "landuse=community_food_growing"],
    edit: ["leisure=garden"]
  },
  {
    group: "health",
    value: "diaper-changing-table",
    icon: "https://wiki.openstreetmap.org/w/images/f/ff/Babycare_01.png",
    query: `
nwr["changing_table"]["changing_table"!="no"]["changing_table:fee"!="yes"]["fee"!="yes"];

nwr["diaper"]["diaper"!="no"]["diaper:fee"!="yes"]["fee"!="yes"];`,
    color: "#F4A460",
    tags: ["changing_table=*"],
    edit: ["amenity=toilets", "amenity", "shop"]
  },
  {
    group: "health",
    value: "drinking-water",
    icon: "https://wiki.openstreetmap.org/w/images/0/08/Drinking-water-16.svg",
    query: `
nwr["drinking_water"="yes"];

nwr["amenity"="drinking_water"];

node["amenity"="water_point"];

nw["drinking_water:refill"="yes"];`,
    color: "#4169E1",
    tags: [
      "amenity=drinking_water",
      "drinking_water=*",
      "amenity=water_point",
      "drinking_water:refill=*"
    ],
    edit: [
      "amenity=drinking_water",
      "amenity=water_point",
      "amenity=toilets",
      "amenity=shelter",
      "tourism=wilderness_hut",
      "highway=rest_area",
      "man_made=water_well",
      "amenity=fountain",
      "natural=spring",
      "amenity"
    ]
  },
  {
    group: "health",
    value: "food-sharing",
    icon: "https://wiki.openstreetmap.org/w/images/3/3c/Foodbank.svg",
    query: `
    nw["social_facility"="food_bank"];
  
    nw["social_facility"="soup_kitchen"];

    nw["amenity"="food_sharing"];
    nw["social_facility"="food_sharing"];

    nw["recycling:food"="yes"];

    nw["reuse"="fridge"];

    nw["amenity"="fridge"];`,
    color: "#FFD700",
    tags: ["social_facility=food_bank", "social_facility=soup_kitchen"],
    edit: ["amenity=social_facility"]
  },
  {
    group: "object_of_utility",
    value: "goods-exchange",
    icon: "/lib/maki-icons/gift-15.svg",
    query: `    
    // Givebox (Preferred tag)
    nw["amenity"="give_box"];

    nw["amenity"="givebox"];

    // Reuse
    nw["amenity"="reuse"]["reuse:books"!="only"];
    
    // Give-away shop
    nw["shop"="charity"]["payment:none"="yes"];
    nw["shop"]["charity"="yes"]["payment:none"="yes"];
    nw["shop"="second_hand"]["payment:none"="yes"];
    nw["shop"]["second_hand"="yes"]["payment:none"="yes"];
    
    nw["shop"="charity"]["fee"="no"];
    nw["shop"]["charity"="yes"]["fee"="no"];
    nw["shop"="second_hand"]["fee"="no"];
    nw["shop"]["second_hand"="yes"]["fee"="no"];
    
    // Toy library free of charge
    nw["amenity"="toy_library"]["fee"="no"];`,
    color: "#8A2BE2",
    tags: [
      "amenity=give_box",
      "shop=charity",
      "shop=second_hand",
      "amenity=toy_library"
    ],
    edit: ["amenity", "shop=charity", "shop=second_hand", "amenity=toy_library"]
  },
  {
    group: "community",
    value: "hackerspace",
    icon: "/lib/temaki-icons/toolbox.svg",
    query: `
    nw["leisure"="hackerspace"]["repair"!="only"];
    
    nw["club"="doityourself"];`,
    color: "#333333",
    tags: ["leisure=hackerspace", "club=doityourself"],
    edit: ["leisure=hackerspace", "club"]
  },
  {
    group: "community",
    value: "contribute",
    icon: "/lib/maki-icons/heart-15.svg",
    query: `
    nw["shop"="charity"];
    nw["office"="charity"];
    nw["club"="charity"];
    nw["charity"]["charity"!="no"];
    nw["operator:type"="charitable"];
    
    nw["operator:type"="community"]["amenity"!="parking"];

    nw["operator:type"="private_non_profit"];

    nw["office"="ngo"];
    nw["operator:type"="ngo"];

    nw["office"="foundation"];

    nw["office"="association"];
    
    nwr["healthcare"="blood_donation"];`,
    color: "#FF69B4",
    tags: [
      "office=charity",
      "shop=charity",
      "charity=yes",
      "operator:type=private_non_profit",
      "operator:type=charitable",
      "operator:type=community",
      "office=ngo",
      "operator:type=ngo",
      "office=foundation",
      "office=association",
      "healthcare=blood_donation"
    ],
    edit: [
      "office=charity",
      "shop=charity",
      "office=ngo",
      "office=foundation",
      "office=association",
      "healthcare=blood_donation",
      "shop",
      "amenity"
    ]
  },
  {
    group: "community",
    value: "coworking",
    icon: "/lib/maki-icons/building-15.svg",
    query: `
    ${nwFee(`["amenity"="coworking_space"]`)}
    
    ${nwFee(`["office"="coworking"]`)}`,
    color: "#8FBC8F",
    tags: ["amenity=coworking_space", "office=coworking"],
    edit: ["amenity=coworking_space", "office=coworking"]
  },
  {
    group: "health",
    value: "public-shower",
    icon: "https://wiki.openstreetmap.org/w/images/5/5a/Shower-14.svg",
    query: `
nw["amenity"="shower"];`,
    color: "#1E90FF",
    tags: ["amenity=shower"],
    edit: ["amenity=shower"]
  },
  {
    group: "object_of_utility",
    value: "pump",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
nw["amenity"="compressed_air"];

nw["compressed_air"="yes"]["compressed_air:fee"!="yes"];

nw["service:bicycle:pump"="yes"];`,
    color: "#00BFFF",
    tags: [
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*"
    ],
    edit: [
      "amenity=compressed_air",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop"
    ]
  },
  {
    group: "health",
    value: "toilet",
    icon: "https://wiki.openstreetmap.org/w/images/f/fa/Toilets-16.svg",
    query: `
// Public toilet
nw["amenity"="toilets"];

// Public toilet (Alternativ)
nw["building"="toilets"];
            
// Toilet in other Feature
nwr["toilets"="yes"];`,
    color: "#8B4513",
    tags: ["amenity=toilets", "building=toilets", "toilets=*"],
    edit: ["amenity=toilets", "building", "amenity"]
  },
  {
    group: "play",
    value: "basketball",
    icon: "/lib/maki-icons/basketball-15.svg",
    query: `
nwr["sport"="basketball"];

nwr["leisure"="pitch"]["sport"~"basketball|multi"];`,
    color: "#FF4500",
    tags: ["leisure=pitch", "sport=basketball", "sport=multi"],
    edit: ["leisure=pitch"]
  },
  {
    group: "sport",
    value: "bath",
    icon: "https://wiki.openstreetmap.org/w/images/0/01/Public_bath.svg",
    query: `
${nwrFee(`["amenity"="public_bath"]`)}
${nwrFee(`["leisure"="water_park"]`)}
nwr["leisure"="bathing_place"];

${nwrFee(`["sport"="swimming"][leisure=sports_centre]`)}

// Show only swimming pools that are not inside a bath
(
  (
    nwr["leisure"="swimming_pool"];  
    nwr["leisure"="swimming_area"];
    nwr["sport"="swimming"][leisure!=sports_centre];
  );
  -(
    (
      wr["amenity"="public_bath"];
      wr["leisure"="water_park"];
      wr["leisure"="sports_centre"];
    );
    map_to_area -> .b;
    (
      nwr(area.b)["leisure"="swimming_pool"];
      nwr(area.b)["leisure"="swimming_area"];
      nwr(area.b)["sport"="swimming"][leisure!=sports_centre];
    );
  );
);`,
    color: "#0000CD",
    tags: [
      "sport=swimming",
      "amenity=public_bath",
      "leisure=water_park",
      "leisure=swimming_pool",
      "leisure=swimming_area"
    ],
    edit: [
      "amenity=public_bath",
      "leisure=sports_centre",
      "leisure=water_park",
      "leisure=swimming_pool",
      "leisure=swimming_area"
    ]
  },
  {
    group: "sport",
    value: "bikepark",
    icon: "/lib/maki-icons/bicycle-15.svg",
    query: `
    nwr["sport"="bmx"]["leisure"!="sports_centre"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee:conditional"];
    
    nwr["sport"="cycling"]["leisure"!="sports_centre"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee:conditional"];`,
    color: "#A52A2A",
    tags: ["sport=bmx", "sport=cycling"],
    edit: ["leisure=track", "landuse=recreation_ground", "leisure=pitch"]
  },
  {
    group: "sport",
    value: "skatepark",
    icon: "/lib/temaki-icons/skateboarding.svg",
    query: `
    nwr["sport"="skateboard"]["leisure"!="sports_centre"];
    nwr["sport"="skateboard"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="skateboard"]["leisure"="sports_centre"]["fee:conditional"];`,
    color: "#E9967A",
    tags: ["sport=skateboard"],
    edit: ["leisure=pitch"]
  },
  {
    group: "play",
    value: "chess",
    icon:
      "https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_pictogram.svg",
    query: `
nw["sport"="chess"];`,
    color: "#000000",
    tags: ["sport=chess"],
    edit: ["leisure=pitch"]
  },
  {
    group: "sport",
    value: "climbing",
    icon: "/lib/temaki-icons/abseiling.svg",
    query: `
nwr["sport"="climbing"]["leisure"!="sports_centre"];
nwr["sport"="climbing"]["leisure"="sports_centre"]["fee"];
nwr["sport"="climbing"]["leisure"="sports_centre"]["fee:conditional"];

nwr["sport"="rock_climbing"]["leisure"!="sports_centre"];
nwr["sport"="rock_climbing"]["leisure"="sports_centre"]["fee"];
nwr["sport"="rock_climbing"]["leisure"="sports_centre"]["fee:conditional"];

nwr["playground"="climbingwall"];`,
    color: "#696969",
    tags: ["sport=climbing", "playground=climbingwall"],
    edit: ["natural", "landuse=recreation_ground", "playground"]
  },
  {
    group: "play",
    value: "boules",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
    nw["leisure"="pitch"]["sport"="boules"];
    nw["leisure"="pitch"]["sport"="bowls"];`,
    color: "#f1c68e",
    tags: ["sport=boules", "sport=bowls"],
    edit: ["leisure=pitch"]
  },
  {
    group: "sport",
    value: "fitness",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    query: `
nwr["leisure"="fitness_station"];

nwr["leisure"="pitch"]["sport"~"fitness|crossfit|exercise|gymnastics|yoga|bodybuilding"];

nw["playground"~"horizontal_bar|exercise|balance(_)?beam|slackline"];

nw["playground:horizontal_bar"="yes"];
nw["playground:exercise"="yes"];
nw["playground:balancebeam"="yes"];
nw["playground:balance_beam"="yes"];
nw["playground:slackline"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    subgroup: "fitness",
    value: "horizontal_bar",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-minus",
    query: `
nwr["fitness_station"~"horizontal_bar"];
nwr["fitness_station:horizontal_bar"="yes"];

nw["playground"~"horizontal_bar"];
nw["playground:horizontal_bar"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    subgroup: "fitness",
    value: "parallel_bars",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-grip-lines-vertical",
    query: `
nwr["fitness_station"~"parallel_bars"];
nwr["fitness_station:parallel_bars"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    subgroup: "fitness",
    value: "rings",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "far fa-circle",
    query: `
nwr["fitness_station"~"rings"];
nwr["fitness_station:rings"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    subgroup: "fitness",
    value: "exercise-machine",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-biking",
    query: `
nwr["fitness_station"~"elliptical_trainer|air_walker|exercise_bike|rower"];

nwr["fitness_station:elliptical_trainer"="yes"];
nwr["fitness_station:air_walker"="yes"];
nwr["fitness_station:exercise_bike"="yes"];
nwr["fitness_station:rower"="yes"];

nw["playground"~"exercise"];
nw["playground:exercise"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    subgroup: "fitness",
    value: "balance",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    button: "fas fa-street-view",
    query: `
nwr["fitness_station"~"slackline|balance(_)?beam"];

nwr["fitness_station:slackline"="yes"];
nwr["fitness_station:balance_beam"="yes"];
nwr["fitness_station:balancebeam"="yes"];

nw["playground"~"slackline|balance(_)?beam"];

nw["playground:slackline"="yes"];
nw["playground:balance_beam"="yes"];
nw["playground:balancebeam"="yes"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station", "sport=*", "playground=*"],
    edit: ["leisure=fitness_station", "playground"]
  },
  {
    group: "sport",
    value: "sledding",
    icon: "/lib/temaki-icons/sledding.svg",
    query: `
nwr["sport"="toboggan"];

nwr["piste:type"="sled"];

nwr["playground"="sledding"];`,
    color: "#D2691E",
    tags: ["sport=toboggan", "piste:type=sled", "playground=sledding"],
    edit: []
  },
  {
    group: "sport",
    value: "fitness-trail",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
nwr["route"="fitness_trail"];`,
    color: "#8B008B",
    tags: ["route=fitness_trail"],
    edit: ["type=route"]
  },
  {
    group: "sport",
    value: "running",
    icon: "/lib/maki-icons/pitch-15.svg",
    query: `
nwr["sport"="running"];

nwr["leisure"="track"]["sport"="athletics"];`,
    color: "#8B0000",
    tags: ["sport=running", "sport=athletics"],
    edit: ["sport=running", "sport=athletics"]
  },
  {
    group: "play",
    value: "soccer",
    icon: "/lib/maki-icons/soccer-15.svg",
    query: `
nwr["sport"="soccer"];

nwr["leisure"="pitch"]["sport"~"soccer|multi"];`,
    color: "#ADFF2F",
    tags: ["leisure=pitch", "sport=soccer", "sport=multi"],
    edit: ["leisure=pitch"]
  },
  {
    group: "play",
    value: "table-tennis",
    icon: "/lib/maki-icons/table-tennis-15.svg",
    query: `
// Table tennis
nw["sport"="table_tennis"];

// Table tennis (obsolete)
nw["leisure"="table_tennis_table"];`,
    color: "#008000",
    tags: ["sport=table_tennis"],
    edit: ["leisure=pitch"]
  },
  {
    group: "play",
    value: "table-soccer",
    icon: "https://wiki.openstreetmap.org/w/images/c/c8/Kicker02.png",
    query: `
    nwr["leisure"="pitch"]["sport"="table_soccer"]["fee"];`,
    color: "#7CFC00",
    tags: ["sport=table_soccer"],
    edit: ["leisure=pitch"]
  },
  {
    group: "play",
    value: "volleyball",
    icon: "/lib/maki-icons/volleyball-15.svg",
    query: `
nwr["sport"="volleyball"];
nwr["sport"="beachvolleyball"];

nwr["leisure"="pitch"]["sport"~"volleyball"];`,
    color: "#F4A460",
    tags: ["leisure=pitch", "sport=volleyball", "sport=beachvolleyball"],
    edit: ["leisure=pitch"]
  },
  {
    group: "trip",
    value: "animal",
    icon: "/lib/maki-icons/zoo-15.svg",
    query: `
nwr["tourism"="zoo"];
nwr["zoo"];

// Show only animals that are not inside a zoo
(
  nwr["attraction"="animal"];
  -(
    wr["tourism"="zoo"];
    map_to_area -> .z;
    (
      nwr(area.z)["attraction"="animal"];
    );
  );
);

nwr["tourism"="aquarium"];

nw["man_made"="beehive"];
nwr["landuse"="apiary"];

nwr["landuse"="animal_keeping"];
nwr["animal_keeping"];
way["landuse"="animal_enclosure"];

way["landuse"="meadow"]["animal"];
way["landuse"="farmyard"]["animal"];

way["landuse"="meadow"]["livestock"];
way["landuse"="farmyard"]["livestock"];
nw["landuse"="livestock"];
wr["meadow"="pasture"];

way["landuse"="meadow"]["species"];
way["landuse"="farmyard"]["species"];

way["landuse"="paddock"];
wr["meadow"="paddock"];`,
    color: "#DAA520",
    tags: [
      "tourism=zoo",
      "attraction=animal",
      "tourism=aquarium",
      "man_made=beehive",
      "landuse=apiary",
      "landuse=animal_keeping",
      "landuse=meadow",
      "landuse=farmyard"
    ],
    edit: [
      "tourism=zoo",
      "attraction=animal",
      "tourism=aquarium",
      "man_made=beehive",
      "landuse=meadow",
      "landuse=farmyard",
      "landuse"
    ]
  },
  {
    group: "trip",
    subgroup: "animal",
    value: "observation",
    icon: "/lib/temaki-icons/binoculars.svg",
    button: "fas fa-binoculars",
    query: `
nw["leisure"="bird_hide"];
nw["leisure"="wildlife_hide"];
nw["observation"="wild_animal"];
nw["man_made"="nesting_site"];
nw["man_made"="insect_hotel"];
node["natural"="anthill"];
node["natural"="termite_mound"];`,
    color: "#DAA520",
    tags: [
      "leisure=bird_hide",
      "leisure=wildlife_hide",
      "observation=wild_animal",
      "man_made=nesting_site",
      "man_made=insect_hotel",
      "natural=anthill",
      "natural=termite_mound"
    ],
    edit: [
      "leisure=bird_hide",
      "man_made=tower",
      "leisure",
      "man_made",
      "natural"
    ]
  },
  {
    group: "trip",
    value: "maze",
    icon: "/lib/temaki-icons/compass.svg",
    query: `
    nwr["attraction"="maze"];
    nwr["leisure"="maze"];`,
    color: "#197419",
    tags: ["attraction=maze"],
    edit: ["attraction=maze"]
  },
  {
    group: "trip",
    value: "webcam",
    icon: "/lib/temaki-icons/security_camera.svg",
    query: `
    node["man_made"="surveillance"]["website"];
    node["man_made"="surveillance"]["contact:website"];
    node["man_made"="surveillance"]["website:webcam"];
    
    node["man_made"="surveillance"]["webcam"];
    node["man_made"="surveillance"]["contact:webcam"];
    node["man_made"="surveillance"]["webcam:url"];
    
    node["man_made"="surveillance"]["url"];
    node["man_made"="surveillance"]["url:webcam"];
    
    node["man_made"="surveillance"]["image"];`,
    color: "#a6a6a6",
    tags: ["man_made=surveillance"],
    edit: ["man_made=surveillance"]
  },
  {
    group: "object_of_utility",
    value: "piano",
    icon: "/lib/maki-icons/music-15.svg",
    query: `
node[amenity=piano][!"shop"];
node[musical_instrument=piano][!"shop"];
node["musical_instrument:piano"=yes][!"shop"];`,
    color: "#008B8B",
    tags: [
      "amenity=piano",
      "musical_instrument=piano",
      "musical_instrument:piano=*"
    ],
    edit: ["amenity"]
  },
  {
    group: "object_of_utility",
    value: "advertising",
    icon: "https://wiki.openstreetmap.org/w/images/2/20/Column-14.svg",
    query: `
    nwr["advertising"]["access"];
    nwr["man_made"="advertising"]["access"];
    
    node["advertising"][!"access"]["operator:type"="community"];
    node["advertising"][!"access"]["operator:type"="public"];
    
    nw["board_type"="notice"]["access"];`,
    color: "#e6007a",
    tags: ["man_made=advertising", "board_type=notice"],
    edit: [
      "advertising=board",
      "advertising=column",
      "advertising=poster_box",
      "advertising=billboard",
      "tourism=information"
    ]
  },
  {
    group: "trip",
    value: "fireplace",
    icon: "https://wiki.openstreetmap.org/w/images/d/df/Firepit.svg",
    query: `
nwr["leisure"="firepit"];

nwr["fireplace"="yes"];

nwr["openfire"="yes"];

nwr["amenity"="bbq"];

nwr["barbecue_grill"="yes"];

nwr["bbq"="yes"];`,
    color: "#B22222",
    tags: [
      "leisure=firepit",
      "fireplace=*",
      "openfire=*",
      "amenity=bbq",
      "barbecue_grill=*",
      "bbq=*"
    ],
    edit: ["leisure=firepit", "amenity=bbq", "tourism"]
  },
  {
    group: "trip",
    value: "map",
    icon: "https://wiki.openstreetmap.org/w/images/c/ca/Map-14.svg",
    query: `
    node["information"="map"];`,
    color: "#FFE4C4",
    tags: ["information=map"],
    edit: ["tourism=information"]
  },
  {
    group: "trip",
    subgroup: "map",
    value: "openstreetmap",
    icon: "https://wiki.openstreetmap.org/w/images/c/ca/Map-14.svg",
    button: "fas fa-heart",
    query: `
    node["information"="map"]["map:source"~"^(OSM|OpenStreetMap)$",i];  
    node["information"="map"]["map_source"~"^(OSM|OpenStreetMap)$",i];    
    node["information"="map"]["mapsource"~"^(OSM|OpenStreetMap)$",i];`,
    color: "#9fd485",
    tags: ["information=map"],
    edit: ["tourism=information"]
  },
  {
    group: "trip",
    value: "garden",
    icon: "/lib/maki-icons/garden-15.svg",
    query: `
nwr["leisure"="garden"];`,
    color: "#BA55D3",
    tags: ["leisure=garden"],
    edit: ["leisure=garden"]
  },
  {
    group: "trip",
    subgroup: "garden",
    value: "garden-with-name",
    icon: "/lib/maki-icons/garden-15.svg",
    button: "far fa-minus-square",
    query: `
nwr["leisure"="garden"]["name"];`,
    color: "#BA55D3",
    tags: ["leisure=garden"],
    edit: ["leisure=garden"]
  },
  {
    group: "natural",
    value: "nature-park",
    icon: "/lib/maki-icons/natural-15.svg",
    query: `
    nwr["leisure"="nature_reserve"];
    nwr["boundary"="national_park"];
    nwr["boundary"="protected_area"];`,
    color: "#006400",
    tags: [
      "leisure=nature_reserve",
      "boundary=national_park",
      "boundary=protected_area"
    ],
    edit: ["leisure=nature_reserve", "boundary"]
  },
  {
    group: "trip",
    value: "park",
    icon: "/lib/maki-icons/park-15.svg",
    query: `
nwr["leisure"="park"];
nwr["landuse"="recreation_ground"];
nwr["leisure"="recreation_ground"];`,
    color: "#90EE90",
    tags: ["leisure=park", "landuse=recreation_ground"],
    edit: ["leisure=park", "landuse=recreation_ground"]
  },
  {
    group: "trip",
    subgroup: "park",
    value: "park-with-name",
    icon: "/lib/maki-icons/park-15.svg",
    button: "far fa-minus-square",
    query: `
nwr["leisure"="park"]["name"];
nwr["landuse"="recreation_ground"]["name"];
nwr["leisure"="recreation_ground"]["name"];`,
    color: "#90EE90",
    tags: ["leisure=park", "landuse=recreation_ground"],
    edit: ["leisure=park", "landuse=recreation_ground"]
  },
  {
    group: "trip",
    value: "picnic-site",
    icon: "https://wiki.openstreetmap.org/w/images/f/fc/Picnic_site.svg",
    query: `
nwr["tourism"="picnic_site"];

nw["leisure"="picnic_table"];

nw["shelter_type"="picnic_shelter"];`,
    color: "#DEB887",
    tags: [
      "tourism=picnic_site",
      "leisure=picnic_table",
      "shelter_type=picnic_shelter"
    ],
    edit: ["tourism=picnic_site", "leisure=picnic_table", "amenity=shelter"]
  },
  {
    group: "trip",
    value: "square",
    icon: "/lib/temaki-icons/pedestrian.svg",
    query: `
nw["place"="square"];

way["highway"="pedestrian"]["area"="yes"];`,
    color: "#666666",
    tags: ["place=square", "highway=pedestrian"],
    edit: ["place=square", "pedestrian"]
  },
  {
    group: "trip",
    subgroup: "square",
    value: "square-with-name",
    icon: "/lib/temaki-icons/pedestrian.svg",
    button: "far fa-minus-square",
    query: `
nw["place"="square"]["name"];

way["highway"="pedestrian"]["area"="yes"]["name"];`,
    color: "#666666",
    tags: ["place=square", "highway=pedestrian"],
    edit: ["place=square", "pedestrian"]
  },
  {
    group: "trip",
    value: "playground",
    icon: "https://wiki.openstreetmap.org/w/images/3/31/Playground-16.svg",
    query: `
    nwr["leisure"="playground"];
    nw["playground"];
    nw[~"^playground:.*$"~".*"];`,
    color: "#32CD32",
    tags: ["leisure=playground", "playground=*"],
    edit: ["leisure=playground", "playground"]
  },
  {
    group: "trip",
    value: "lounger",
    icon: "/lib/maki-icons/beach-15.svg",
    query: `
nw["amenity"="lounger"];
    
nw["amenity"="hammock"];`,
    color: "#e6e600",
    tags: ["amenity=lounger", "amenity=hammock"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "clothes",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    query: `
    // Give
    nw["recycling:clothes"="yes"];

    // Give and take
    nw["social_facility"="clothing_bank"];
    nw["amenity"="give_box"]["clothes"!="no"];

    // Repair
    node["repair"="assisted_self_service"]["service:clothes:repair"="yes"];
    node["repair"="assisted_self_service"]["clothes:repair"="yes"];
    node["repair"="assisted_self_service"]["service:fabrik:repair"="yes"];
    node["repair"="assisted_self_service"]["fabrik:repair"="yes"];`,
    color: "#FF7F50",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity=social_facility", "amenity"]
  },
  {
    group: "goods",
    subgroup: "clothes",
    value: "clothes-give",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:clothes"="yes"];

    nw["social_facility"="clothing_bank"];

    nw["amenity"="give_box"]["clothes"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#FF7F50",
    tags: [
      "amenity=recycling",
      "social_facility=clothing_bank",
      "amenity=give_box"
    ],
    edit: ["amenity=recycling", "amenity=social_facility", "amenity"]
  },
  {
    group: "goods",
    subgroup: "clothes",
    value: "clothes-take",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["social_facility"="clothing_bank"];

    nw["amenity"="give_box"]["clothes"!="no"];`,
    color: "#FF7F50",
    tags: ["social_facility=clothing_bank", "amenity=give_box"],
    edit: ["amenity=social_facility", "amenity"]
  },
  {
    group: "goods",
    subgroup: "clothes",
    value: "clothes-repair",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:clothes:repair"="yes"];
    node["repair"="assisted_self_service"]["clothes:repair"="yes"];
    node["repair"="assisted_self_service"]["service:fabrik:repair"="yes"];
    node["repair"="assisted_self_service"]["fabrik:repair"="yes"];`,
    color: "#FF7F50",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "mobile-phones",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    query: `
    // Give
    nw["recycling:mobile_phones"="yes"];

    // Give and take
    nw["amenity"="give_box"]["electronics"!="no"];
    
    // Repair
    node["repair"="assisted_self_service"]["service:mobile_phone:repair"="yes"];
    node["repair"="assisted_self_service"]["mobile_phone:repair"="yes"];
    
    // Charge
    node["amenity"="device_charging_station"]["fee"!="yes"];`,
    color: "#191970",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*",
      "amenity=device_charging_station"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-give",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:mobile_phones"="yes"];

    nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#191970",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-take",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#191970",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    subgroup: "mobile-phones",
    value: "mobile-phones-repair",
    icon: "/lib/maki-icons/mobile-phone-15.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:mobile_phone:repair"="yes"];
    node["repair"="assisted_self_service"]["mobile_phone:repair"="yes"];`,
    color: "#191970",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "computers",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    query: `
    // Give
    nw["recycling:computers"="yes"];

    // Give and take
    nw["amenity"="give_box"]["electronics"!="no"];
    
    // Repair
    node["repair"="assisted_self_service"]["service:computer:repair"="yes"];
    node["repair"="assisted_self_service"]["computer:repair"="yes"];`,
    color: "#ABAB9A",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "computers",
    value: "computers-give",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:computers"="yes"];

    nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#ABAB9A",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling"]
  },
  {
    group: "goods",
    subgroup: "computers",
    value: "computers-take",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#ABAB9A",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    subgroup: "computers",
    value: "computers-repair",
    icon: "https://wiki.openstreetmap.org/w/images/b/bb/Computer-14.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:computer:repair"="yes"];
    node["repair"="assisted_self_service"]["computer:repair"="yes"];`,
    color: "#ABAB9A",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "toys",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    query: `
    // Give
    nw["recycling:toys"="yes"];

    // Give and take
    nw["amenity"="give_box"];

    // Rent
    nw["amenity"="toy_library"]["fee"="no"];
    
    // Repair
    node["repair"="assisted_self_service"]["service:toy:repair"="yes"];
    node["repair"="assisted_self_service"]["toy:repair"="yes"];`,
    color: "#800000",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "amenity=toy_library",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity=toy_library", "amenity"]
  },
  {
    group: "goods",
    subgroup: "toys",
    value: "toys-give",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:toys"="yes"];

    nw["amenity"="give_box"]["give_box:policy"!="free_to_take"];`,
    color: "#800000",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "toys",
    value: "toys-take",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"];`,
    color: "#800000",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  // {
  //   group: "goods",
  //   subgroup: "toys",
  //   value: "toys-rent",
  //   icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
  //   button: "fas fa-redo-alt",
  //   query: `
  //   nw["amenity"="toy_library"]["fee"="no"];`,
  //   color: "#800000",
  //   tags: ["amenity=toy_library"],
  //   edit: ["amenity=toy_library"]
  // },
  {
    group: "goods",
    subgroup: "toys",
    value: "toys-repair",
    icon: "https://wiki.openstreetmap.org/w/images/6/62/Toys-14.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:toy:repair"="yes"];
    node["repair"="assisted_self_service"]["toy:repair"="yes"];`,
    color: "#800000",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "electronics",
    icon: "/lib/temaki-icons/electronic.svg",
    query: `
    // Give
    nw["recycling:small_electrical_appliances"="yes"];
    nw["recycling:small_appliances"="yes"];
    nw["recycling:electrical_items"="yes"];
    nw["recycling:electrical_appliances"="yes"];
    nw["recycling:electronic"="yes"];
    nw["recycling:electronics"="yes"];

    // Give and take
    nw["amenity"="give_box"]["electronics"!="no"];
  
    // Repair
    node["repair"="assisted_self_service"]["service:small_electronics_device:repair"="yes"];
    node["repair"="assisted_self_service"]["small_electronics_device:repair"="yes"];
    node["repair"="assisted_self_service"]["service:electronics:repair"="yes"];
    node["repair"="assisted_self_service"]["electronics:repair"="yes"];`,
    color: "#800080",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "electronics",
    value: "electronics-give",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:small_electrical_appliances"="yes"];
    nw["recycling:small_appliances"="yes"];
    nw["recycling:electrical_items"="yes"];
    nw["recycling:electrical_appliances"="yes"];
    nw["recycling:electronic"="yes"];
    nw["recycling:electronics"="yes"];

    nw["amenity"="give_box"]["electronics"!="no"]["give_box:policy"!="free_to_take"];`,
    color: "#800080",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "electronics",
    value: "electronics-take",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"]["electronics"!="no"];`,
    color: "#800080",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    subgroup: "electronics",
    value: "electronics-repair",
    icon: "/lib/temaki-icons/electronic.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:small_electronics_device:repair"="yes"];
    node["repair"="assisted_self_service"]["small_electronics_device:repair"="yes"];
    node["repair"="assisted_self_service"]["service:electronics:repair"="yes"];
    node["repair"="assisted_self_service"]["electronics:repair"="yes"];`,
    color: "#800080",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    value: "furniture",
    icon: "/lib/temaki-icons/furniture.svg",
    query: `
    // Give
    nw["recycling:furniture"="yes"];

    // Give and take
    nw["amenity"="give_box"];
    
    // Repair
    node["repair"="assisted_self_service"]["service:furniture:repair"="yes"];
    node["repair"="assisted_self_service"]["furniture:repair"="yes"];`,
    color: "#B8860B",
    tags: [
      "amenity=recycling",
      "amenity=give_box",
      "repair=assisted_self_service",
      "repair=*"
    ],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "furniture",
    value: "furniture-give",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:furniture"="yes"];

    nw["amenity"="give_box"]["give_box:policy"!="free_to_take"];`,
    color: "#B8860B",
    tags: ["amenity=recycling", "amenity=give_box"],
    edit: ["amenity=recycling", "amenity"]
  },
  {
    group: "goods",
    subgroup: "furniture",
    value: "furniture-take",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-long-arrow-alt-left",
    query: `
    nw["amenity"="give_box"];`,
    color: "#B8860B",
    tags: ["amenity=give_box"],
    edit: ["amenity"]
  },
  {
    group: "goods",
    subgroup: "furniture",
    value: "furniture-repair",
    icon: "/lib/temaki-icons/furniture.svg",
    button: "fas fa-tools",
    query: `
    node["repair"="assisted_self_service"]["service:furniture:repair"="yes"];
    node["repair"="assisted_self_service"]["furniture:repair"="yes"];`,
    color: "#B8860B",
    tags: ["repair=assisted_self_service", "repair=*"],
    edit: ["amenity"]
  },

  {
    group: "goods",
    value: "bicycle",
    icon: "/lib/maki-icons/bicycle-15.svg",
    query: `
    // Give
    nw["recycling:bicycles"="yes"];
  
    // Rent
    ${nwFee(`["amenity"="bicycle_rental"]`)}

    // Repair
    nw["amenity"="bicycle_repair_station"];
    node["repair"="assisted_self_service"]["service:bicycle:repair"="yes"];
    node["repair"="assisted_self_service"]["bicycle:repair"="yes"];
    nw["service:bicycle:diy"="yes"];

    // Pump
    nw["amenity"="compressed_air"];
    nw["compressed_air"="yes"];
    nw["service:bicycle:pump"="yes"];

    // Park
    nwr["sport"="bmx"]["leisure"!="sports_centre"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee:conditional"];
    nwr["sport"="cycling"]["leisure"!="sports_centre"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee:conditional"];
    
    // Charge
    (nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]; 
    - nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
    nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=recycling",
      "amenity=bicycle_rental",
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "repair=*",
      "service:bicycle:repair=*",
      "service:bicycle:diy=*",
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*",
      "sport=bmx",
      "sport=cycling",
      "amenity=charging_station"
    ],
    edit: [
      "amenity=recycling",
      "amenity=bicycle_rental",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop",
      "leisure=track",
      "landuse=recreation_ground",
      "leisure=pitch",
      "amenity=charging_station"
    ]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-give",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-long-arrow-alt-right",
    query: `
    nw["recycling:bicycles"="yes"];`,
    color: "#4682B4",
    tags: ["amenity=recycling"],
    edit: ["amenity=recycling"]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-rent",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-redo-alt",
    query: `
    ${nwFee(`["amenity"="bicycle_rental"]`)}`,
    color: "#4682B4",
    tags: ["amenity=bicycle_rental"],
    edit: ["amenity=bicycle_rental"]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-repair",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-tools",
    query: `
    nw["amenity"="bicycle_repair_station"]["service:bicycle:tools"!="no"];

    node["repair"="assisted_self_service"]["service:bicycle:repair"="yes"];
    node["repair"="assisted_self_service"]["bicycle:repair"="yes"];

    nw["service:bicycle:diy"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=bicycle_repair_station",
      "repair=assisted_self_service",
      "repair=*",
      "service:bicycle:repair=*",
      "service:bicycle:diy=*"
    ],
    edit: ["amenity=bicycle_repair_station", "amenity", "shop"]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-pump",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-tachometer-alt",
    query: `
    nw["amenity"="compressed_air"];

    nw["compressed_air"="yes"];

    nw["service:bicycle:pump"="yes"];`,
    color: "#4682B4",
    tags: [
      "amenity=compressed_air",
      "compressed_air=*",
      "service:bicycle:pump=*"
    ],
    edit: [
      "amenity=compressed_air",
      "amenity=bicycle_repair_station",
      "amenity",
      "shop"
    ]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-park",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-infinity",
    query: `
    nwr["sport"="bmx"]["leisure"!="sports_centre"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="bmx"]["leisure"="sports_centre"]["fee:conditional"];
    
    nwr["sport"="cycling"]["leisure"!="sports_centre"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee"];
    nwr["sport"="cycling"]["leisure"="sports_centre"]["fee:conditional"];`,
    color: "#4682B4",
    tags: ["sport=bmx", "sport=cycling"],
    edit: ["leisure=track", "landuse=recreation_ground", "leisure=pitch"]
  },
  {
    group: "goods",
    subgroup: "bicycle",
    value: "bicycle-charge",
    icon: "/lib/maki-icons/bicycle-15.svg",
    button: "fas fa-charging-station",
    query: `
    (nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]; 
    - nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"][~"^authentication:.*$"~"^yes$"];);
    nw["amenity"="charging_station"]["fee"="no"]["bicycle"="yes"]["parking:fee"!="yes"]["authentication:none"="yes"];`,
    color: "#4682B4",
    tags: ["amenity=charging_station"],
    edit: ["amenity=charging_station"]
  }
];
