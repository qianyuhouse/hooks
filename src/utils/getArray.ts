export function getArray<T>(val?: T) {
  return Array.isArray(val)
    ? val
    : val !== undefined && val !== null
      ? [val]
      : [];
}
