import { initMap } from "./map";
import { filters } from "./filters";
import { attributes } from "./attributes";
import { local } from "./local";
import { local as deLocal } from "./de/local";
import { filters as issuesFilters } from "./issues/filters";
import { local as issuesLocal } from "./issues/local";
import { local as issuesDeLocal } from "./issues/de/local";
import { mergeDeep } from "./utilities/mergeDeep";

if (location.search !== "?issues")
  initMap(
    filters,
    attributes,
    document.documentElement.lang === "de" ? deLocal : local
  );
else
  initMap(
    issuesFilters,
    attributes,
    document.documentElement.lang === "de"
      ? mergeDeep(deLocal, issuesDeLocal)
      : mergeDeep(local, issuesLocal)
  );


import "details-element-polyfill";
