/**
 * @flow
 */

// TODO(jim): Snack and Web should share this file.
export const isEmptyOrNull = (text: any) => {
  return !text || !text.trim();
};

export const stripProtocol = (text: string) => {
  return text.replace(/(^\w+:|^)\/\//, '');
};

export const ellipsize = (text: string, length: number) => {
  return text.substring(0, length) + (text.length > length ? '...' : '');
};

export const pluralize = (text: string, count: number) => {
  return count > 1 || count === 0 ? `${text}s` : text;
};

export const getRenderedLength = (text: any) => {
  if (isEmptyOrNull(text)) {
    return 0;
  }

  let length = text.length;

  for (let i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code >= 0xd800 && code <= 0xdfff) {
      length--;
      i++;
    }
  }

  return length;
};
