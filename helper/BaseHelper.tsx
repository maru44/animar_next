export const extractValueList = (
  lst: { [key: string]: any }[],
  key: string
) => {
  const ret: any[] = [];
  lst &&
    lst.forEach((dict, idx) => {
      const value = dict[key];
      ret.push(value);
    });
  return ret;
};
