export const local = {
  code: "",
  minZoomMessageNoLayer: "No layer assigned",
  minZoomMessage: "Zoom in to load locations",
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
    play: "Play",
    trip: "Trip",
    goods: "Goods"
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
  type: {
    artwork: { name: "Artwork", description: "" },
    fountain: { name: "Fountain", description: "" },
    "tourist-attraction": { name: "Tourist attraction", description: "" },
    "archaeological-site": { name: "Archaeological site", description: "" },
    trail: { name: "Educational trail", description: "" },
    "book-exchange": {
      name: "Book exchange",
      description: "",
      externalResources: [
        {
          name: "Bôite À Lire",
          url: "https://www.boite-a-lire.com/"
        },
        {
          name: "OpenBookCase",
          url: "https://openbookcase.org/map"
        },
        {
          name: "Karte öffentlicher Bücherschränke",
          url:
            "https://www.lesestunden.de/karte-oeffentlicher-buecherschraenke/"
        },
        {
          name: "Little Free Library World Map",
          url: "https://littlefreelibrary.org/ourmap/"
        },
        {
          name: "Liste öffentlicher Bücherschränke",
          url:
            "https://de.wikipedia.org/wiki/Liste_%C3%B6ffentlicher_B%C3%BCcherschr%C3%A4nke"
        },
        {
          name: "Tauschgnom",
          url: "https://www.tauschgnom.de/offene-buecherschraenke"
        },
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/"
        }
      ]
    },
    kneipp_water_cure: { name: "Kneipp facility", description: "" },
    castle: { name: "Castle", description: "" },
    mill: { name: "Mill", description: "" },
    history: { name: "History", description: "" },
    memorial: { name: "Memorial", description: "" },
    monument: { name: "Monument", description: "" },
    museum: { name: "Museum", description: "" },
    observatory: { name: "Observatory", description: "" },
    ruins: { name: "Ruins", description: "" },
    cave: { name: "Cave", description: "" },
    natural_monument: { name: "Natural monument", description: "" },
    pond: { name: "Pond", description: "" },
    rock: { name: "Rock", description: "" },
    viewpoint: { name: "Viewpoint", description: "" },
    waterfall: { name: "Waterfall", description: "" },
    assistance: {
      name: "Assistance",
      description: "",
      externalResources: [
        {
          name: "Nachbarschaftshilfe",
          url: "https://www.nachbarschaftshilfe.ch/standorte"
        }
      ]
    },
    "assisted-repair": {
      name: "Assisted repair",
      description:
        "Here you can repair broken things together with professionals. You'll meet new people and usually you'll also get coffee and cake. Well-known events are repair cafés.",
      externalResources: [
        {
          name: "Repair Café Worldwide",
          url: "https://repaircafe.org/en/visit/"
        },
        {
          name: "Repair Café Switzerland",
          url: "https://repair-cafe.ch/de/events"
        },
        {
          name: "Reparatur-Initiativen",
          url: "https://www.reparatur-initiativen.de/orte"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/"
        }
      ]
    },
    barbecue: {
      name: "Barbecue",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "baking-oven": { name: "Baking oven", description: "" },
    "bicycle-rental": {
      name: "Bicycle rental",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "bicycle-self-repair": {
      name: "Bicycle self repair",
      description: "",
      externalResources: [
        {
          name: "Bikekitchen",
          url:
            "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
        },
        {
          name: "Fahrradselbsthilfewerkstätten in Berlin",
          url:
            "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin"
        },
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "charging-station": {
      name: "Charging station",
      description: "",
      externalResources: [
        {
          name: "Open Charge Map",
          url: "https://map.openchargemap.io/"
        }
      ]
    },
    piano: { name: "Piano", description: "" },
    advertising: {
      name: "Advertising space",
      description: "Here you can hang up posters to advertise your concern."
    },
    "community-centre": { name: "Community centre", description: "" },
    "community-garden": {
      name: "Community garden",
      description:
        "Here is a garden which you can cultivate together with others. You can plant, water and harvest vegetables, herbs, flowers and so on and watch them grow."
    },
    "diaper-changing-table": { name: "Diaper-changing table", description: "" },
    "drinking-water": { name: "Drinking water", description: "" },
    "food-sharing": {
      name: "Food sharing",
      description:
        "At this place you can bring and take food. The conditions for bring and take food are very different, you can inform yourself about it on the website of the operator or on site.",
      externalResources: [
        {
          name: "Foodsharing",
          url: "https://foodsharing.de/karte"
        },
        {
          name: "RestEssBar",
          url: "http://restessbar.ch/de"
        },
        {
          name: "Madame Frigos",
          url: "https://www.madamefrigo.ch/en/towns/"
        },
        {
          name: "foodwaste.ch",
          url: "https://foodwaste.ch/lokale-initiativen/"
        },
        {
          name: "Suspended Coffee",
          url: "https://suspendedcoffees.com/cafes/"
        },
        {
          name: "Suspended Coffee Germany",
          url: "https://suspendedcoffee.de/shops/karte/"
        },
        {
          name: "Café Surprise",
          url: "https://surprise.ngo/angebote/cafesurprise/ueber-cafe-surprise/"
        },
        {
          name: "mundraub",
          url: "https://mundraub.org/map#z={zoom}&lat={lat}&lng={lng}"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/"
        }
      ]
    },
    "goods-exchange": {
      name: "Goods exchange",
      description:
        "Here you will find a table, a shelf or a shop to bring and take items. Well-known facilities are give-away shops and giveboxes.",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        },
        {
          name: "PING!-Station",
          url: "https://pingstation.de/finden/"
        },
        {
          name: "umap - Give box",
          url:
            "https://umap.openstreetmap.fr/en/map/give_box_406244#{zoom}/{lat}/{lng}"
        },
        {
          name: "radar.squat.net",
          url: "https://radar.squat.net/en/groups/category/free-shop-market"
        },
        {
          name: "Alles Und Umsonst",
          url: "https://alles-und-umsonst.de/umsonstladen"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/"
        }
      ]
    },
    hackerspace: {
      name: "Hackerspace",
      description: "",
      externalResources: [
        {
          name: "Verbund Offener Werkstätten",
          url: "https://www.offene-werkstaetten.org/werkstatt-suche"
        },
        {
          name: "hackerspaces",
          url: "https://wiki.hackerspaces.org/List_of_hackerspaces"
        }
      ]
    },
    coworking: { name: "Coworking", description: "" },
    contribute: { name: "Contribute", description: "" },
    map: { name: "Map", description: "" },
    openstreetmap: { name: "OpenStreetMap", description: "" },
    internet: {
      name: "Internet",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "public-shower": { name: "Public shower", description: "" },
    pump: {
      name: "Pump",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    toilet: { name: "Public toilet", description: "" },
    basketball: { name: "Basketball", description: "" },
    bath: { name: "Bath", description: "" },
    bikepark: { name: "Bikepark", description: "" },
    skatepark: { name: "Skatepark", description: "" },
    chess: { name: "Street chess", description: "" },
    climbing: {
      name: "Climbing",
      description: "",
      externalResources: [
        {
          name: "the crag",
          url:
            "https://www.thecrag.com/climbing/world/maps#{lat},{lng},{zoom},,auto"
        }
      ]
    },
    fitness: {
      name: "Fitness",
      description: "",
      externalResources: [
        {
          name: "Street Workout",
          url: "https://www.street-workout.com/"
        },
        {
          name: "Playparc",
          url: "https://www.playparc.de/marken/4fcircle/"
        }
      ]
    },
    horizontal_bar: {
      name: "Horizontal bar",
      description: ""
    },
    parallel_bars: {
      name: "Parallel bars",
      description: ""
    },
    rings: {
      name: "Rings",
      description: ""
    },
    "exercise-machine": {
      name: "Exercise machine",
      description: ""
    },
    balance: {
      name: "Balance",
      description: ""
    },
    "fitness-trail": {
      name: "Fitness trail",
      description: "",
      externalResources: [
        {
          name: "Zurich vitaparcours",
          url: "https://www.zurichvitaparcours.ch/de/Finder"
        },
        {
          name: "Trimm-Dich-Pfade",
          url:
            "https://www.trimm-dich-pfad.com/standorte/trimm-dich-pfad-in-meiner-naehe#{lat}/{lng}/{zoom}"
        }
      ]
    },
    sledding: { name: "Sledding", description: "" },
    running: { name: "Running", description: "" },
    soccer: { name: "Soccer", description: "" },
    "table-tennis": { name: "Table tennis", description: "" },
    "table-soccer": { name: "Table soccer", description: "" },
    boules: { name: "Boules", description: "" },
    volleyball: { name: "Volleyball", description: "" },
    animal: {
      name: "Animal enclosure",
      description: "",
      externalResources: [
        {
          name: "Zoo-Infos.org - Switzerland",
          url: "http://ch.zoo-infos.org/set.html?karte.php"
        },
        {
          name: "Zoo-Infos.de - Germany",
          url: "http://www.zoo-infos.de/set-en.html?karte-en.php"
        },
        {
          name: "Zoo-Infos.org - Austria",
          url: "http://at.zoo-infos.org/set-en.html?karte-en.php"
        },
        {
          name: "Zoo-Infos.org - France",
          url: "http://fr.zoo-infos.org/set.html?karte.php"
        }
      ]
    },
    observation: { name: "Animal observation", description: "" },
    maze: { name: "Maze", description: "" },
    webcam: {
      name: "Webcam",
      description: "",
      externalResources: [
        {
          name: "roundshot",
          url:
            "https://www.roundshot.com/xml_1/internet/en/application/d170/f172.cfm"
        },
        {
          name: "Windy",
          url: "https://www.windy.com/en/-Webcams/webcams?{lat},{lng},{zoom}"
        },
        {
          name: "Skyline Webcams",
          url: "https://www.skylinewebcams.com/en/webcam.html"
        },
        {
          name: "Wetter.com",
          url: "https://www.wetter.com/hd-live-webcams/"
        }
      ]
    },
    fireplace: { name: "Fireplace", description: "" },
    garden: { name: "Garden", description: "" },
    "garden-with-name": { name: "Garden (With name)", description: "" },
    "nature-park": { name: "Nature park", description: "" },
    park: { name: "Park", description: "" },
    "park-with-name": { name: "Park (With name)", description: "" },
    "picnic-site": { name: "Picnic site", description: "" },
    square: { name: "Square", description: "" },
    "square-with-name": { name: "Square (With name)", description: "" },
    playground: { name: "Playground", description: "" },
    lounger: { name: "Lounger", description: "" },
    clothes: {
      name: "Clothes",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "clothes-give": { name: "Clothes (Give)", description: "" },
    "clothes-take": { name: "Clothes (Take)", description: "" },
    "clothes-repair": { name: "Clothes (Repair)", description: "" },
    "mobile-phones": {
      name: "Phone",
      description: "",
      externalResources: [
        {
          name: "Swisscom Mobile Aid",
          url:
            "https://www.swisscom.ch/de/about/unternehmen/nachhaltigkeit/mobile-aid.html"
        },
        {
          name: "Labdoo",
          url: "https://www.labdoo.org/content/dootronics-dashboard"
        }
      ]
    },
    "mobile-phones-give": { name: "Phone (Give)", description: "" },
    "mobile-phones-take": { name: "Phone (Take)", description: "" },
    "mobile-phones-repair": { name: "Phone (Repair)", description: "" },
    computers: {
      name: "Computer",
      description: "",
      externalResources: [
        {
          name: "Labdoo",
          url: "https://www.labdoo.org/content/dootronics-dashboard"
        }
      ]
    },
    "computers-give": { name: "Computer (Give)", description: "" },
    "computers-take": { name: "Computer (Take)", description: "" },
    "computers-repair": { name: "Computer (Repair)", description: "" },
    toys: {
      name: "Toy",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "toys-give": { name: "Toy (Give)", description: "" },
    "toys-take": { name: "Toy (Take)", description: "" },
    "toys-rent": { name: "Toy (Rent)", description: "" },
    "toys-repair": { name: "Toy (Repair)", description: "" },
    electronics: {
      name: "Electronic",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "electronics-give": { name: "Electronic (Give)", description: "" },
    "electronics-take": { name: "Electronic (Take)", description: "" },
    "electronics-repair": { name: "Electronic (Repair)", description: "" },
    furniture: {
      name: "Furniture",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "furniture-give": { name: "Furniture (Give)", description: "" },
    "furniture-take": { name: "Furniture (Take)", description: "" },
    "furniture-repair": { name: "Furniture (Repair)", description: "" },
    bicycle: {
      name: "Bicycle",
      description: "",
      externalResources: [
        {
          name: "Velafrica",
          url: "http://velafrica.ch/en/Play-your-part/donate-bicycles"
        },
        {
          name: "Bikekitchen",
          url:
            "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
        },
        {
          name: "Fahrradselbsthilfewerkstätten in Berlin",
          url:
            "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin"
        },
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "bicycle-give": { name: "Bicycle (Give)", description: "" },
    "bicycle-rent": { name: "Bicycle (Rent)", description: "" },
    "bicycle-repair": { name: "Bicycle (Repair)", description: "" },
    "bicycle-pump": { name: "Bicycle (Pump)", description: "" },
    "bicycle-park": { name: "Bicycle (Park)", description: "" },
    "bicycle-charge": { name: "Bicycle (Charge)", description: "" }
  },
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
