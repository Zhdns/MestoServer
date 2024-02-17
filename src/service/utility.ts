import { DEFAULT_ABOUT, DEFAULT_NAME, urlRegex } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const urlChecker = (url: string) => urlRegex.test(url);
export const defaultName = (name: string | null) => {
  if (!name) {
    return DEFAULT_NAME;
  }
  return name;
};
export const defaultAbout = (about: string | null) => {
  if (!about) {
    return DEFAULT_ABOUT;
  }
  return about;
};
