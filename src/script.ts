import { initMap } from "./map";
import { filters } from "./filters";
import { attributes } from "./attributes";
import { local } from "./local";
import { local as deLocal } from "./de/local";

initMap(
  filters,
  attributes,
  document.documentElement.lang === "de" ? deLocal : local
);

import "details-element-polyfill";
import { createElement } from "./utilities/html";

document.addEventListener("click", e => {
  const titleElement = document.querySelector(".attribut .title");
  if (titleElement) titleElement.remove();

  for (const target of e.composedPath()) {
    if (
      target &&
      (target as HTMLElement).classList &&
      (target as HTMLElement).classList.contains("attribut")
    ) {
      const titleElement = createElement(
        "span",
        (target as HTMLElement).title,
        ["title"]
      );

      (target as HTMLElement).append(titleElement);

      setTimeout(() => {
        titleElement.remove();
      }, 2000);
    }
  }
});
