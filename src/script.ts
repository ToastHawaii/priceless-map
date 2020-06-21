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

document.addEventListener("click", function (e) {
  const target = (e.target as HTMLElement).parentElement;

  const titleElement = document.querySelector(".attribut .title");
  if (titleElement) titleElement.remove();

  if (target && target.classList.contains("attribut")) {
    const titleElement = document.createElement("span");
    titleElement.className = "title";
    titleElement.innerHTML = target.title;
    target.append(titleElement);

    setTimeout(() => {
      titleElement.remove();
    }, 2000);
  }
});
