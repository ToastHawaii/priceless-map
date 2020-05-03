export const local = {
  code: "de",
  minZoomMessageNoLayer: "Keine Ebene zugewiesen",
  minZoomMessage: "Vergrössern, um Standorte zu laden",
  capacity: "Kapazität",
  playground: "Für Kinder",
  changing_table: "Hat einen Wickeltisch",
  bottle: "Nachfüllen ist möglich",
  pump: "Pumpe",
  tools: "Werkzeuge",
  chainTool: "Kettennietdrücker",
  internet: "Internet",
  water: "Trinkwasser",
  bicycle: "Velo",
  park: "Park",
  charging: "Aufladen",
  mobileCharging: "Aufladen",
  car: "Auto",
  mobile: "Smartphone",
  smallElectronics: "Kleine Elektrongeräte",
  electronics: "Elektrongeräte",
  furniture: "Möbel",
  computer: "Computer",
  toy: "Spielzeug",
  clothes: "Kleider",
  freeToGive: "Nur bringen",
  freeToTake: "Nur mitnehmen",
  freeToTakeOrGive: "Mitnehmen und bringen",
  borrow: "Nur ausleihen",
  indoor: "Drinnen",
  female: "Frau",
  male: "Mann",
  hoops: "Körbe",
  light: "Beleuchtet",
  covered: "Überdacht",
  wheelchairYes: "Rollstuhlgerecht",
  wheelchairLimited: "Limitiert Rollstuhlgerecht",
  wheelchairNo: "Nicht Rollstuhlgerecht",
  open: "Geöffnet",
  closed: "Geschlossen",
  maybeOpen: "Vielleicht geöffnet",
  maybeOpens: "Öffnet vielleicht",
  maybeCloses: "Schliesst vielleicht",
  opens: "Öffnet",
  closes: "Schliesst",
  thatDependsOn: "Das hängt ab von",
  conditionalFee: "Nur zu bestimmten Zeiten kostenlos.",
  horizontalBar: "Reck",
  parallelBars: "Parallelbarren",
  rings: "Ringe",
  exerciseMachine: "Übungsgerät",
  balance: "Gleichgewicht",
  route: "Routen",
  difficulty: "Schwierigkeitsgrad",
  externalResources: "Andere",
  floor: function (level: number) {
    return `(${level}. OG)`;
  },
  groundFloor: function (_level: number) {
    return `(EG)`;
  },
  basement: function (level: number) {
    return `(${Math.abs(level)}. UG)`;
  },
  group: {
    culture: "Kultur",
    education: "Bildung",
    natural: "Natur",
    object_of_utility: "Hilfsmittel",
    health: "Gesundheit",
    community: "Gemeinschaft",
    sport: "Sport",
    play: "Spiel",
    trip: "Ausflug",
    goods: "Gegenstände"
  },
  amenity: {
    hunting_stand: "Hochsitz für Jäger"
  },
  leisure: {
    bird_hide: "Versteck um Vögel zu beobachten",
    wildlife_hide: "Versteck um Wildtiere zu beobachten"
  },
  man_made: {
    water_well: "Brunnen",
    watermill: "Wassermühle",
    windmill: "Windmühle",
    mineshaft: "Schacht",
    drinking_fountain: "Trinkbrunnen",
    tower: "Turm",
    beehive: "Bienenstock",
    insect_hotel: "Insektenhotel",
    nesting_site: "Nisthilfe"
  },
  landuse: {
    apiary: "Bienenstock"
  },
  natural: {
    anthill: "Ameisenhügel",
    termite_mound: "Termitenhügel"
  },
  sport: { bowls: "Bowls", boules: "Boule" },
  boules: {
    petanque: "Pétanque",
    lyonnaise: "Jeu Provençal",
    boule_de_fort: "Boule de fort",
    pétanque: "Pétanque",
    bocce: "Boccia"
  },
  type: {
    artwork: { name: "Strassenkunst", description: "" },
    fountain: { name: "Springbrunnen", description: "" },
    "tourist-attraction": { name: "Sehenswürdigkeit", description: "" },
    "archaeological-site": { name: "Archäologische Stätte", description: "" },
    trail: { name: "Lehrpfad", description: "" },
    "book-exchange": {
      name: "Bücher Tausch",
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
          url: "https://zerowastemap.org/de/"
        }
      ]
    },
    kneipp_water_cure : { name: "Kneippanlage", description: "" },
    castle: { name: "Burg", description: "" },
    mill: { name: "Mühle", description: "" },
    history: { name: "Geschichte", description: "" },
    memorial: { name: "Gedenkstätte", description: "" },
    monument: { name: "Monument", description: "" },
    museum: { name: "Museum", description: "" },
    observatory: { name: "Observatorium", description: "" },
    ruins: { name: "Ruine", description: "" },
    cave: { name: "Höhle", description: "" },
    natural_monument: { name: "Naturdenkmal", description: "" },
    pond: { name: "Teich", description: "" },
    rock: { name: "Fels", description: "" },
    viewpoint: { name: "Aussichtpunkt", description: "" },
    waterfall: { name: "Wasserfall", description: "" },
    assistance: {
      name: "Unterstützung",
      description: "",
      externalResources: [
        {
          name: "Nachbarschaftshilfe",
          url: "https://www.nachbarschaftshilfe.ch/standorte"
        }
      ]
    },
    "assisted-repair": {
      name: "Begleitete Reparatur",
      description:
        "Hier kannst du defekte Gegenstände gemeinsam mit Profis reparieren. Du triffts neue Leute und meistens gibt es auch Kaffee und Kuchen. Bekannte Veranstaltungen sind Repair Cafés.",
      externalResources: [
        {
          name: "Repair Café Weltweit",
          url: "https://repaircafe.org/de/besuchen/"
        },
        {
          name: "Repair Café Schweiz",
          url: "https://repair-cafe.ch/de/events"
        },
        {
          name: "Reparatur-Initiativen",
          url: "https://www.reparatur-initiativen.de/orte"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/de/"
        }
      ]
    },
    barbecue: {
      name: "Grill",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "baking-oven": { name: "Backofen", description: "" },
    "bicycle-rental": {
      name: "Velo Verleih",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "bicycle-self-repair": {
      name: "Velo Selbstreparatur",
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
      name: "Ladestation",
      description: "",
      externalResources: [
        {
          name: "Open Charge Map",
          url: "https://map.openchargemap.io/"
        }
      ]
    },
    piano: { name: "Klavier", description: "" },
    advertising: {
      name: "Werbefläche",
      description:
        "Hier kannst du Plakate anbringen um für deine Sache zu werben."
    },
    "community-centre": { name: "Gemeinschaftscenter", description: "" },
    "community-garden": {
      name: "Gemeinschaftsgarten",
      description:
        "Hier ist ein Garten, welcher du gemeinsam mit anderen bewirtschaften kannst. Du kannst Gemüse, Kräuter, Blumen etc. anpflanzen, giessen und ernten und beim Wachsen zuschauen."
    },
    "diaper-changing-table": { name: "Wickeltische", description: "" },
    "drinking-water": { name: "Trinkwasser", description: "" },
    "food-sharing": {
      name: "Lebensmittel teilen",
      description:
        "An diesem Ort kannst du Lebensmittel abgeben und holen. Die Bedienungen für das abgeben und holen sind sehr unterschiedlich, über die Webseite des Betreibers oder vor Ort kannst du dich darüber informieren.",
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
          url: "https://www.madamefrigo.ch/de/standorte/"
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
          url: "https://zerowastemap.org/de/"
        }
      ]
    },
    "goods-exchange": {
      name: "Waren Tausch",
      description:
        "Hier findest du einen Tisch, ein Regal oder ein Laden um Gegenstände zu bringen und zu holen. Bekannte Einrichtungen sind Umsonstläden und Giveboxen.",
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
            "https://umap.openstreetmap.fr/de/map/give_box_406244#{zoom}/{lat}/{lng}"
        },
        {
          name: "radar.squat.net",
          url: "https://radar.squat.net/de/groups/category/free-shop-market"
        },
        {
          name: "Alles Und Umsonst",
          url: "https://alles-und-umsonst.de/umsonstladen"
        },
        {
          name: "Zero Waste Map",
          url: "https://zerowastemap.org/de/"
        }
      ]
    },
    hackerspace: {
      name: "Offene Werkstatt",
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
    coworking: { name: "Zusammenarbeit", description: "" },
    contribute: { name: "Beitragen", description: "" },
    map: { name: "Karte", description: "" },
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
    "public-shower": { name: "Öffentliche Dusche", description: "" },
    pump: {
      name: "Pumpe",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    toilet: { name: "Öffentliche Toilette", description: "" },
    basketball: { name: "Basketball", description: "" },
    bath: { name: "Bad", description: "" },
    bikepark: { name: "Bikepark", description: "" },
    skatepark: { name: "Skatepark", description: "" },
    chess: { name: "Strassenschach", description: "" },
    climbing: {
      name: "Klettern",
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
      name: "Reck",
      description: ""
    },
    parallel_bars: {
      name: "Parallelbarren",
      description: ""
    },
    rings: {
      name: "Ringe",
      description: ""
    },
    "exercise-machine": {
      name: "Übungsgerät",
      description: ""
    },
    balance: {
      name: "Gleichgewicht",
      description: ""
    },
    "fitness-trail": {
      name: "Vitaparcours",
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
    sledding: { name: "Schlitteln", description: "" },
    running: { name: "Laufsport", description: "" },
    soccer: { name: "Fussball", description: "" },
    "table-tennis": { name: "Tischtennis", description: "" },
    "table-soccer": { name: "Tischfussball", description: "" },
    boules: { name: "Boule", description: "" },
    volleyball: { name: "Volleyball", description: "" },
    animal: {
      name: "Tiere",
      description: "",
      externalResources: [
        {
          name: "Zoo-Infos.org - Schweiz",
          url: "http://ch.zoo-infos.org/set.html?karte.php"
        },
        {
          name: "Zoo-Infos.de - Deutschland",
          url: "http://www.zoo-infos.de/set.html?karte.php"
        },
        {
          name: "Zoo-Infos.org - Österreich",
          url: "http://at.zoo-infos.org/set.html?karte.php"
        },
        {
          name: "Zoo-Infos.org - Frankreich",
          url: "http://fr.zoo-infos.org/set.html?karte.php"
        }
      ]
    },
    observation: { name: "Tiere beobachten", description: "" },
    maze: { name: "Irrgarten", description: "" },
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
          url: "https://www.windy.com/de/-Webcams/webcams?{lat},{lng},{zoom}"
        },
        {
          name: "Skyline Webcams",
          url: "https://www.skylinewebcams.com/de/webcam.html"
        },
        {
          name: "Wetter.com",
          url: "https://www.wetter.com/hd-live-webcams/"
        }
      ]
    },
    fireplace: { name: "Feuerstelle", description: "" },
    garden: { name: "Garten", description: "" },
    "garden-with-name": { name: "Garten (Mit Name)", description: "" },
    "nature-park": { name: "Naturpark", description: "" },
    park: { name: "Park", description: "" },
    "park-with-name": { name: "Park (Mit Name)", description: "" },
    "picnic-site": { name: "Picknickplatz", description: "" },
    square: { name: "Platz", description: "" },
    "square-with-name": { name: "Platz (Mit Name)", description: "" },
    playground: { name: "Spielplatz", description: "" },
    lounger: { name: "Liege", description: "" },
    clothes: {
      name: "Kleider",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "clothes-give": { name: "Kleider (Geben)", description: "" },
    "clothes-take": { name: "Kleider (Bekommen)", description: "" },
    "clothes-repair": { name: "Kleider (Reparieren)", description: "" },
    "mobile-phones": {
      name: "Handy",
      description: "",
      externalResources: [
        {
          name: "Swisscom Mobile Aid",
          url:
            "https://www.swisscom.ch/de/about/unternehmen/nachhaltigkeit/mobile-aid.html"
        },
        {
          name: "Labdoo",
          url: "https://www.labdoo.org/de/content/dootronics-dashboard"
        }
      ]
    },
    "mobile-phones-give": { name: "Handy (Geben)", description: "" },
    "mobile-phones-take": { name: "Handy (Bekommen)", description: "" },
    "mobile-phones-repair": { name: "Handy (Reparieren)", description: "" },
    computers: {
      name: "Computer",
      description: "",
      externalResources: [
        {
          name: "Labdoo",
          url: "https://www.labdoo.org/de/content/dootronics-dashboard"
        }
      ]
    },
    "computers-give": { name: "Computer (Geben)", description: "" },
    "computers-take": { name: "Computer (Bekommen)", description: "" },
    "computers-repair": { name: "Computer (Reparieren)", description: "" },
    toys: {
      name: "Spielzeug",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "toys-give": { name: "Spielzeug (Geben)", description: "" },
    "toys-take": { name: "Spielzeug (Bekommen)", description: "" },
    "toys-rent": { name: "Spielzeug (Ausleihen)", description: "" },
    "toys-repair": { name: "Spielzeug (Reparieren)", description: "" },
    electronics: {
      name: "Elektrogerät",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "electronics-give": { name: "Elektrogerät (Geben)", description: "" },
    "electronics-take": { name: "Elektrogerät (Bekommen)", description: "" },
    "electronics-repair": {
      name: "Elektrogerät (Reparieren)",
      description: ""
    },
    furniture: {
      name: "Möbel",
      description: "",
      externalResources: [
        {
          name: "Pumpipumpe",
          url: "https://map.pumpipumpe.ch/"
        }
      ]
    },
    "furniture-give": { name: "Möbel (Geben)", description: "" },
    "furniture-take": { name: "Möbel (Bekommen)", description: "" },
    "furniture-repair": { name: "Möbel (Reparieren)", description: "" },
    bicycle: {
      name: "Velo",
      description: "",
      externalResources: [
        {
          name: "Velafrica",
          url: "http://velafrica.ch/de/Machen-Sie-mit/Sammelstellen"
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
    "bicycle-give": { name: "Velo (Geben)", description: "" },
    "bicycle-rent": { name: "Velo (Ausleihen)", description: "" },
    "bicycle-repair": { name: "Velo (Reparieren)", description: "" },
    "bicycle-pump": { name: "Velo (Aufpumpen)", description: "" },
    "bicycle-park": { name: "Velo (Park)", description: "" },
    "bicycle-charge": { name: "Velo (Aufladen)", description: "" }
  },
  "piste:difficulty": {
    novice: "Sehr leicht",
    easy: "Leicht",
    intermediate: "Mittel",
    advanced: "Schwer",
    expert: "Sehr schwer",
    freeride: "Freeride",
    extreme: "Extrem schwer"
  },
  fitness_station: {
    balance_beam: "Schwebebalken",
    box: "Sprungbox",
    horizontal_bar: "Reck",
    horizontal_ladder: "Hangelleiter",
    hyperextension: "Hyperextension-Bank",
    parallel_bars: "Parallelbarren",
    "push-up": "Liegestützstation",
    rings: "Ringe",
    sign: "Übungsanleitungstafel",
    "sit-up": "Sit-Up-Station",
    stairs: "Übungsstiege",
    beam_jump: "Beam jump",
    stepping_stone: "Stepping stone",
    bench: "Bank",
    body_raise: "Körper heben",
    slalom: "Slalom",
    stretch_bars: "Dehnen"
  },
  historic: {
    aircraft: "Flugzeug",
    aqueduct: "Aquädukt",
    archaeological_site: "Ausgrabungsstätte",
    battlefield: "Schlachtfeld",
    boundary_stone: "Grenzstein",
    building: "Gebäude",
    cannon: "Kanone",
    castle: "Burg",
    castle_wall: "Stadtmauer",
    church: "Kirche",
    city_gate: "Stadttor",
    citywalls: "Stadtmauer",
    farm: "Farm",
    fort: "Fort",
    gallows: "Galgen",
    highwater_mark: "Hochwassermarke",
    locomotive: "Lokomotive",
    manor: "Herrenhaus",
    memorial: "Denkmal",
    mine: "Mine",
    mine_shaft: "Schacht",
    milestone: "Meilenstein",
    monastery: "Kloster",
    monument: "Monument",
    optical_telegraph: "Optischer Telegraf",
    pillory: "Pranger",
    railway_car: "Eisenbahnwagen",
    ruins: "Ruine",
    rune_stone: "Runenstein",
    ship: "Schiff",
    tomb: "Grab",
    tower: "Turm",
    tree_shrine: "Baum",
    wayside_cross: "Wegkreuz",
    wayside_shrine: "Schrein",
    wreck: "Wrack"
  },
  site_type: {
    megalith: "Steinsetzung",
    bigstone: "Bearbeiteter Grossstein",
    tumulus: "Hügelgrab",
    fortification: "Befestigungsanlage",
    petroglyph: "Felsbild",
    geoglyph: "Erdzeichnung",
    city: "Historische Stadt",
    settlement: "Siedlung",
    hut_circle: "Hüttenkreis",
    roman_villa: "Römische Villa",
    domus: "Domus",
    roman_circus: "Zirkus (Antikes Rom)",
    necropolis: "Totenstadt, Nekropolis"
  },
  castle_type: {
    defensive: "Burg",
    palace: "Palast",
    stately: "Schloss ",
    manor: "Herrenhaus",
    fortress: "Festung",
    castrum: "Römische Militärlager",
    shiro: "Shiro",
    kremlin: "Kreml",
    hillfort: "Hügelfort"
  },
  "public_bookcase:type": {
    building: "Öffentliche Tauschbibliothek",
    glass_cabinet: "Öffentlicher Bücherschrank",
    metal_cabinet: "Öffentlicher Bücherschrank",
    movable_cabinet: "Öffentlicher Bücherschrank",
    phone_box: "Öffentliche Buchkabine",
    reading_box: "Öffentliche Bücherbox",
    sculpture: "Öffentlicher Bücherschrank",
    shelf: "Öffentliches Bücherregal",
    shelter: "Öffentliches Bücherregal",
    wooden_cabinet: "Öffentlicher Bücherschrank"
  },
  "garden:type": {
    botanical: "Botanischer Garten",
    community: "Gemeinschaftsgarten",
    residential: "Hausgarten",
    roof_garden: "Dachgarten"
  },
  "garden:style": {
    english: "Englischer Garten",
    french: "Französischer Garten",
    chinese: "Chinesischer Garten",
    japanese: "Japanischer Garten",
    zen: "Zen Garten",
    monastery: "Klostergarten",
    rosarium: "Rosengarten",
    herb_garden: "Kräutergarten",
    medical_garden: "Apothekergarten",
    kitchen: "Nutzgarten",
    flower_garden: "Ziergarten",
    cottage_garden: "Bauerngarten"
  }
};
