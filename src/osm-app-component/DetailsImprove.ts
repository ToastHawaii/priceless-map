import { delay } from "./utilities/data";

document.addEventListener("click", async (e) => {
  for (const target of e.composedPath() as HTMLElement[]) {
    if (target?.tagName?.toUpperCase() === "DETAILS") {
      await delay(0);
      scrollIntoViewIfNeeded(target);
    }
  }
});
function scrollIntoViewIfNeeded(target: HTMLElement) {
  if (target.getBoundingClientRect().bottom > window.innerHeight) {
    target.scrollIntoView(false);
  }

  if (target.getBoundingClientRect().top < 0) {
    target.scrollIntoView();
  }
}
