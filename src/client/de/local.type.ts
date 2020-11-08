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

export const type = {
  artwork: { name: "Strassenkunst", description: "" },
  fountain: { name: "Springbrunnen", description: "" },
  "tourist-attraction": { name: "Sehenswürdigkeit", description: "" },
  "archaeological-site": { name: "Archäologische Stätte", description: "" },
  trail: { name: "Lehrpfad", description: "" },
  "battery-recycling": {
    name: "Batterie",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/de/karte/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "oil-recycling": {
    name: "Öl",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/de/karte/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "reusable-bottle-reuse": {
    name: "Mehrwegflasche",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/de/karte/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "rubble-recycling": {
    name: "Steingut",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "plastic-recycling": {
    name: "Plastik",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/en/map/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "hazardous-recycling": {
    name: "Sondermüll",
    description: "",
    externalResources: [
      {
        name: "Recycling Map",
        url: "https://recycling-map.ch/de/karte/?pos/{lat}/{lng}/{zoom}",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
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
        url: "https://www.lesestunden.de/karte-oeffentlicher-buecherschraenke/"
      },
      {
        name: "Little Free Library World Map",
        url: "https://littlefreelibrary.org/ourmap/"
      },
      {
        name: "Liste öffentlicher Bücherschränke",
        url:
          "https://de.wikipedia.org/wiki/Liste_%C3%B6ffentlicher_B%C3%BCcherschr%C3%A4nke",
        bounds: [35.81, -10.15, 55.25, 24.22]
      },
      {
        name: "Tauschgnom",
        url: "https://www.tauschgnom.de/offene-buecherschraenke",
        bounds: [45.54, 5.32, 57.91, 17.45]
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
  kneipp_water_cure: { name: "Kneippanlage", description: "" },
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
        url: "https://www.nachbarschaftshilfe.ch/standorte",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      }
    ]
  },
  "assistance-female": { name: "Für Frauen", description: "" },
  "assistance-male": { name: "Für Männer", description: "" },
  "assistance-senior": { name: "Für Ältere", description: "" },
  "assistance-disabled": { name: "Für Behinderte", description: "" },
  "assistance-homeless": { name: "Für Benachteiligte", description: "" },
  "assistance-migrant": { name: "Für Vertriebene", description: "" },
  "assistance-children": { name: "Für Kinder", description: "" },
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
        url: "https://repair-cafe.ch/de/events",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Reparatur-Initiativen",
        url: "https://www.reparatur-initiativen.de/orte",
        bounds: [45.82, 5.8, 55.26, 17.31]
      },
      {
        name: "Zero Waste Map",
        url: "https://zerowastemap.org/de/"
      },
      {
        name: "iFixit",
        url: "https://de.ifixit.com/Anleitung"
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
        url: "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
      },
      {
        name: "Fahrradselbsthilfewerkstätten in Berlin",
        url:
          "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin",
        bounds: [52.33826, 13.08835, 52.67551, 13.76116]
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
  defibrillator: { name: "Defibrillator", description: "" },
  "food-sharing": {
    name: "Lebensmittel teilen",
    description:
      "An diesem Ort kannst du Lebensmittel abgeben und holen. Die Bedienungen für das abgeben und holen sind sehr unterschiedlich, über die Webseite des Betreibers oder vor Ort kannst du dich darüber informieren.",
    externalResources: [
      {
        name: "Foodsharing",
        url: "https://foodsharing.de/karte",
        bounds: [44.57, 2.63, 55.26, 19.55]
      },
      {
        name: "RestEssBar",
        url: "http://restessbar.ch/de",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Madame Frigos",
        url: "https://www.madamefrigo.ch/de/standorte/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "foodwaste.ch",
        url: "https://foodwaste.ch/lokale-initiativen/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Suspended Coffee",
        url: "https://suspendedcoffees.com/cafes/"
      },
      {
        name: "Suspended Coffee Germany",
        url: "https://suspendedcoffee.de/shops/karte/",
        bounds: [44.57, 2.63, 55.26, 19.55]
      },
      {
        name: "Café Surprise",
        url: "https://surprise.ngo/angebote/cafesurprise/ueber-cafe-surprise/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "mundraub",
        url: "https://mundraub.org/map#z={zoom}&lat={lat}&lng={lng}"
      },
      {
        name: "falling fruit",
        url: "http://fallingfruit.org/?z={zoom}&y={lat}&x={lng}&t=OSM&locale=de"
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
        url: "https://pingstation.de/finden/",
        bounds: [45.71, 5.44, 55.26, 15.29]
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
        url: "https://alles-und-umsonst.de/umsonstladen",
        bounds: [35.4, -10.2, 55.5, 19.1]
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
        url: "https://www.offene-werkstaetten.org/werkstatt-suche",
        bounds: [35.99, 5.06, 55.5, 24.66]
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
        url: "https://www.street-workout.com/",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Playparc",
        url: "https://www.playparc.de/marken/4fcircle/",
        bounds: [35.13, 2.16, 62.53, 32.75]
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
        url: "https://www.zurichvitaparcours.ch/de/Finder",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Trimm-Dich-Pfade",
        url:
          "https://www.trimm-dich-pfad.com/standorte/trimm-dich-pfad-in-meiner-naehe#{lat}/{lng}/{zoom}",
        bounds: [45.11, 2.16, 55.2, 24.4]
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
        url: "http://ch.zoo-infos.org/set.html?karte.php",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Zoo-Infos.de - Deutschland",
        url: "http://www.zoo-infos.de/set.html?karte.php",
        bounds: [47.27, 5.87, 55.1, 15.04]
      },
      {
        name: "Zoo-Infos.org - Österreich",
        url: "http://at.zoo-infos.org/set.html?karte.php",
        bounds: [46.3723, 9.5307, 49.0205, 17.1608]
      },
      {
        name: "Zoo-Infos.org - Frankreich",
        url: "http://fr.zoo-infos.org/set.html?karte.php",
        bounds: [42.13, -5.02, 51.27, 8.43]
      },
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=de",
        bounds: [-32.0, -0.3, 52.3, 68.9]
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
  garden: {
    name: "Garten",
    description: "",
    externalResources: [
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=de",
        bounds: [-32.0, -0.3, 52.3, 68.9]
      }
    ]
  },
  "garden-with-name": {
    name: "Garten (Mit Name)",
    description: "",
    externalResources: [
      {
        name: "Arca-Net",
        url: "http://arca-net.info/map_categories/frame_map.asp?sprache=de",
        bounds: [-32.0, -0.3, 52.3, 68.9]
      }
    ]
  },
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
          "https://www.swisscom.ch/de/about/unternehmen/nachhaltigkeit/mobile-aid.html",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
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
        url: "http://velafrica.ch/de/Machen-Sie-mit/Sammelstellen",
        bounds: [45.818, 5.9559, 47.8085, 10.4923]
      },
      {
        name: "Bikekitchen",
        url: "http://www.heureux-cyclage.org/les-ateliers-dans-le-monde?lang=en"
      },
      {
        name: "Fahrradselbsthilfewerkstätten in Berlin",
        url:
          "https://fahrrad.fandom.com/de/wiki/Fahrradselbsthilfewerkst%C3%A4tten_in_Berlin",
        bounds: [52.33826, 13.08835, 52.67551, 13.76116]
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
};
