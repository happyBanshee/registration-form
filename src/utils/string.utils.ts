export const StringUtils = {
  isString: (value: any): value is string => {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  },
  areStrings: (values: any[]): values is string[] => {
    return values.every((value) => StringUtils.isString(value));
  }
};
