/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';

export function resolveHtmlPath(htmlFileName: string, type: number) {
  if (type === 1) {
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}#/settings`);
      url.pathname = htmlFileName;
      console.log(`this is the url href: ${url.href}`);
      console.log(
        `file://${path.resolve(
          __dirname,
          '../renderer/',
          htmlFileName,
        )}#/settings`,
      );
      return url.href;
    }
    // return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)} + '#settings'`;
    return `file://${path.resolve(
      __dirname,
      '../renderer/',
      htmlFileName,
    )}#/settings`;
  }
  if (type === 2) {
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}#/media`);
      url.pathname = htmlFileName;
      console.log(`this is the url href: ${url.href}`);
      console.log(
        `file://${path.resolve(
          __dirname,
          '../renderer/',
          htmlFileName,
        )}#/media`,
      );
      return url.href;
    }
    // return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)} + '#settings'`;
    return `file://${path.resolve(
      __dirname,
      '../renderer/',
      htmlFileName,
    )}#/media`;
  }
  if (type === 3) {
    if (process.env.NODE_ENV === 'development') {
      const port = process.env.PORT || 1212;
      const url = new URL(`http://localhost:${port}#/trailer`);
      url.pathname = htmlFileName;
      console.log(`this is the url href: ${url.href}`);
      console.log(
        `file://${path.resolve(
          __dirname,
          '../renderer/',
          htmlFileName,
        )}#/trailer`,
      );
      return url.href;
    }
    // return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)} + '#settings'`;
    return `file://${path.resolve(
      __dirname,
      '../renderer/',
      htmlFileName,
    )}#/trailer`;
  }
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    console.log(`this is the url href: ${url.href}`);
    console.log(
      `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`,
    );
    return url.href;
  }

  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}
