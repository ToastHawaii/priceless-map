export function set<T extends {}>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function get<T extends {}>(key: string): T | undefined {
  const v = localStorage.getItem(key);
  if (!v) return undefined;
  return JSON.parse(v);
}
