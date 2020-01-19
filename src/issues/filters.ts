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
    value: "fountain-drinking-water-missing",
    icon: "https://wiki.openstreetmap.org/w/images/a/a1/Fountain-14.svg",
    query: `
  nwr["amenity"="fountain"][!"drinking_water"];`,
    color: "#00FFFF",
    tags: ["amenity=fountain", "drinking_water"],
    edit: ["amenity=fountain"]
  },

  {
    group: "education",
    value: "book-exchange-obsolete-tag",
    icon: "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
    query: `
    // Reuse facility for books
    nwr["reuse:books"="yes"];
    nwr["reuse:books"="only"];

  // Library for booksharing
  nwr["library"="booksharing"];`,
    color: "#A0522D",
    tags: ["amenity=public_bookcase"],
    edit: ["amenity=public_bookcase"]
  },

  {
    group: "education",
    value: "museum-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/a/a9/Museum-16.svg",
    query: `
  nwr["tourism"="museum"][!"fee"];`,
    color: "#DCDCDC",
    tags: ["tourism=museum"],
    edit: ["tourism=museum"]
  },

  {
    group: "education",
    value: "observatory-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/e/e0/Telescope_dome-14.svg",
    query: `
    nwr["man_made"="observatory"][!"fee"];`,
    color: "#00008B",
    tags: ["man_made=observatory", "fee"],
    edit: ["man_made=observatory"]
  },
  {
    group: "education",
    value: "observatory-obsolete-tag",
    icon: "https://wiki.openstreetmap.org/w/images/e/e0/Telescope_dome-14.svg",
    query: `
  nwr["amenity"="observatory"];

  nwr["landuse"="observatory"];`,
    color: "#00008B",
    tags: ["man_made=observatory", "landuse=observatory"],
    edit: ["man_made=observatory", "landuse"]
  },

  {
    group: "community",
    value: "assisted-repair-repair-missing",
    icon: "/lib/temaki-icons/tools.svg",
    query: `
      nwr["repair"="assisted_self_service"];- nwr["repair"="assisted_self_service"][~"^.*:repair$"~"^yes$"];`,
    color: "#1975ae",
    tags: ["repair=assisted_self_service"],
    edit: ["amenity"]
  },
  {
    group: "community",
    value: "assisted-repair-assisted-self-service-missing",
    icon: "/lib/temaki-icons/tools.svg",
    query: `
      nwr["repair"!="assisted_self_service"]["network"~"Repair Caf[eé]",i];
      nwr["repair"!="assisted_self_service"]["name"~"Repair Caf[eé]",i];
      nwr["repair"!="assisted_self_service"]["brand"~"Repair Caf[eé]",i];`,
    color: "#1975ae",
    tags: ["repair=assisted_self_service"],
    edit: ["amenity"]
  },

  {
    group: "object_of_utility",
    value: "bicycle-self-repair-service-missing",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
    nwr["amenity"="bicycle_repair_station"];
      -nwr["amenity"="bicycle_repair_station"][~"^service:bicycle:.*$"~"^yes$"];`,
    color: "#4682B4",
    tags: ["amenity=bicycle_repair_station"],
    edit: ["amenity=bicycle_repair_station"]
  },
  {
    group: "object_of_utility",
    value: "bicycle-self-repair-tools-missing",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
    (nwr["amenity"="bicycle_repair_station"]["service:bicycle:pump"="yes"];
      -nwr["amenity"="bicycle_repair_station"][~"^service:bicycle:(chain_tool|tools|screwdriver|chaintool)$"~"^yes$"];);
    -nwr["amenity"="bicycle_repair_station"]["service:bicycle:tools"="no"];`,
    color: "#4682B4",
    tags: ["amenity=bicycle_repair_station"],
    edit: ["amenity=bicycle_repair_station"]
  },

  {
    group: "object_of_utility",
    value: "bicycle-self-repair-obsolete-tag",
    icon:
      "https://wiki.openstreetmap.org/w/images/0/01/Bicycle_repair_station-14.svg",
    query: `
    nwr["service:bicycle:chaintool"="yes"];`,
    color: "#4682B4",
    tags: ["amenity=bicycle_repair_station"],
    edit: ["amenity=bicycle_repair_station"]
  },

  {
    group: "object_of_utility",
    value: "goods-exchange-reuse-missing",
    icon: "/lib/maki-icons/gift-15.svg",
    query: `
      nwr["amenity"="reuse"];- nwr["amenity"="reuse"][~"^reuse:.*$"~"^yes$"];`,
    color: "#8A2BE2",
    tags: [],
    edit: ["amenity"]
  },
  {
    group: "object_of_utility",
    value: "goods-exchange-obsolete-tag",
    icon: "/lib/maki-icons/gift-15.svg",
    query: `
    // Givebox
    nwr["amenity"="givebox"];

    // Give-away shop
    nwr["shop"]["payment:none"="yes"];

    ${nwrFee(`["shop"]`)}`,
    color: "#8A2BE2",
    tags: [],
    edit: ["amenity"]
  },

  {
    group: "community",
    value: "hackerspace-fee-missing",
    icon: "/lib/temaki-icons/toolbox.svg",
    query: `
      nwr["leisure"="hackerspace"][!"fee"];
      nwr["club"="doityourself"][!"fee"];`,
    color: "#333333",
    tags: ["leisure=hackerspace", "club"],
    edit: ["leisure=hackerspace", "club"]
  },

  {
    group: "community",
    value: "coworking-fee-missing",
    icon: "/lib/maki-icons/building-15.svg",
    query: `
    nwr["amenity"="coworking_space"][!"fee"];
    
    nwr["office"="coworking"][!"fee"];`,
    color: "#8FBC8F",
    tags: ["amenity=coworking_space", "office=coworking", "fee"],
    edit: ["amenity=coworking_space", "office=coworking"]
  },

  {
    group: "health",
    value: "public-shower-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/5/5a/Shower-14.svg",
    query: `
  nwr["amenity"="shower"][!"fee"];`,
    color: "#1E90FF",
    tags: ["amenity=shower"],
    edit: ["amenity=shower"]
  },
  {
    group: "health",
    value: "public-shower-access-missing",
    icon: "https://wiki.openstreetmap.org/w/images/5/5a/Shower-14.svg",
    query: `
  nwr["amenity"="shower"][!"access"];`,
    color: "#1E90FF",
    tags: ["amenity=shower"],
    edit: ["amenity=shower"]
  },

  {
    group: "health",
    value: "toilet-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/f/fa/Toilets-16.svg",
    query: `
  // Public toilet
  nwr["amenity"="toilets"][!fee];

  // Public toilet (Alternativ)
  nwr["building"="toilets"][!fee];`,
    color: "#8B4513",
    tags: ["amenity=toilets", "building=toilets"],
    edit: ["amenity=toilets", "building"]
  },

  {
    group: "sport",
    value: "bath-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/0/01/Public_bath.svg",
    query: `
    nwr["sport"="swimming"][leisure=sports_centre][!"fee"];
    nwr["amenity"="public_bath"][!"fee"];
    nwr["leisure"="water_park"][!"fee"];`,
    color: "#0000CD",
    tags: ["amenity=public_bath", "leisure=water_park"],
    edit: ["amenity=public_bath", "leisure=sports_centre", "leisure=water_park"]
  },
  {
    group: "sport",
    value: "bath-access-missing",
    icon: "https://wiki.openstreetmap.org/w/images/0/01/Public_bath.svg",
    query: `
    nwr["leisure"="swimming_pool"][!"access"];
    nwr["swimming_pool"]["swimming_pool"!="no"]["swimming_pool"!="personal"][!"access"];
    nwr["leisure"="swimming_area"][!"access"];`,
    color: "#0000CD",
    tags: ["leisure=swimming_pool", "swimming_pool=*", "leisure=swimming_area"],
    edit: ["leisure=swimming_pool", "leisure=swimming_area"]
  },

  {
    group: "sport",
    value: "fitness-fitness-station-missing",
    icon: "/lib/maki-icons/fitness-centre-15.svg",
    query: `
  nwr["leisure"="fitness_station"][!"fitness_station"];`,
    color: "#0000FF",
    tags: ["leisure=fitness_station"],
    edit: ["leisure=fitness_station"]
  },

  {
    group: "sport",
    value: "table-soccer-fee-missing",
    icon: "https://wiki.openstreetmap.org/w/images/c/c8/Kicker02.png",
    query: `
      nwr["leisure"="pitch"]["sport"="table_soccer"][!"fee"];`,
    color: "#7CFC00",
    tags: ["sport=table_soccer"],
    edit: ["leisure=pitch"]
  },

  {
    group: "trip",
    value: "animal-fee-missing",
    icon: "/lib/maki-icons/zoo-15.svg",
    query: `
  nwr["tourism"="zoo"][!"fee"];
  nwr["tourism"="aquarium"][!"fee"];`,
    color: "#DAA520",
    tags: ["tourism=zoo"],
    edit: ["tourism=zoo"]
  },
  {
    group: "trip",
    value: "animal-access-missing",
    icon: "/lib/maki-icons/zoo-15.svg",
    query: `
    nwr["attraction"="animal"][!"access"];`,
    color: "#DAA520",
    tags: ["attraction=animal"],
    edit: ["attraction=animal"]
  },
  {
    group: "goods",
    value: "clothes-fee-missing",
    icon: "/lib/maki-icons/clothing-store-15.svg",
    query: `
    nwr["social_facility"="clothing_bank"][!"fee"];`,
    color: "#FF7F50",
    tags: ["social_facility=clothing_bank"],
    edit: ["amenity=social_facility"]
  }
];
