import * as L from "leaflet";
import overPassLayer from "leaflet-overpass-layer";

declare module "leaflet" {
  var OverPassLayer: typeof overPassLayer;
}
