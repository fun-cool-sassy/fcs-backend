function pickOne(param: string | string[] | undefined): string | undefined {
  if (param == null) {
    return undefined;
  }
  if (param instanceof Array) {
    return param[0];
  }

  return param;
}

export default pickOne;
