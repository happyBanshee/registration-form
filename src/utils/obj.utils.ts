export const ObjectUtils = {
  isNullOrUndefined: <T>(object: T | null | undefined): object is null | undefined =>
    typeof object === 'undefined' || object === null
};
