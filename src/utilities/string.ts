export function equalsIgnoreCase(
  s1: string | undefined,
  s2: string | undefined
) {
  return (s1 || "").toUpperCase() === (s2 || "").toUpperCase();
}

export function startsWithIgnoreCase(
  s: string,
  searchString: string,
  position?: number
) {
  return s.toUpperCase().startsWith(searchString.toUpperCase(), position);
}

export function textTruncate(text: string, length = 200, ending = "...") {
  if (text.length > length) {
    return text.substring(0, length - ending.length) + ending;
  } else {
    return text;
  }
}
