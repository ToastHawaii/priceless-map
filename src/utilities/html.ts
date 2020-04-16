export function getHtmlElement<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  contentElement?: ParentNode
): HTMLElementTagNameMap[K];
export function getHtmlElement(
  selectors: string,
  contentElement?: ParentNode
): HTMLElement;
export function getHtmlElement(
  selectors: string,
  contentElement: ParentNode = document
): HTMLElement {
  const element = contentElement.querySelector(selectors);

  if (!element) throw `Element ${selectors} not found.`;

  return element as HTMLElement;
}

export function getHtmlElements(
  selectors: string,
  contentElement?: ParentNode
): HTMLElement[];
export function getHtmlElements(
  selectors: string,
  contentElement: ParentNode = document
): HTMLElement[] {
  const elements: HTMLElement[] = [];
  contentElement.querySelectorAll(selectors).forEach(v => {
    elements.push(v as HTMLElement);
  });

  return elements;
}
