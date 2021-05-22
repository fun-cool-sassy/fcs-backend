import pickOne from "./pick-one";

function normalizeQuery<T>(
  arr: string | string[] | undefined,
  convert: (string: string) => T
): T | undefined {
  const parse = pickOne(arr);
  if (parse == null) {
    return undefined;
  }
  return convert(parse);
}

export default normalizeQuery;
