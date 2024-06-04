import * as L from "leaflet";
import * as LOL from "leaflet-overpass-layer";

declare module "leaflet" {
  var OverPassLayer: typeof LOL.overPassLayer;
  type IOverPassLayer = LOL.IOverPassLayer;
}
