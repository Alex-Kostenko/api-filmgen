export const parseUrlUtil = (value: string): string => {
  const url = value
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/g, '')
    .replace(/\s/g, '+');

  return url;
};
