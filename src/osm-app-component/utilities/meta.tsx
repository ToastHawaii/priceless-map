export function setMeta(name: string, value: string) {
  document
    .querySelector("meta[name='" + name + "']")
    ?.setAttribute("value", value);
}
