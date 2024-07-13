/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, session, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Store from 'electron-store';
import * as cheerio from 'cheerio';
import axios from 'axios';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.autoInstallOnAppQuit = true;
  }
}

let mainWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;
let mediaWindow: BrowserWindow | null = null;

const schema: any = {
  theme: {
    type: 'boolean',
    default: true,
  },
  listServiceType: {
    type: 'string',
    default: 'AniList',
  },
  newsServiceType: {
    type: 'string',
    default: 'MyAnimeList',
  },
  myAnimeListUsername: {
    type: 'string',
    default: '',
  },
  myAnimeListToken: {
    type: 'string',
    default: '',
  },
  aniListUsername: {
    type: 'string',
    default: '',
  },
  aniListToken: {
    type: 'string',
    default: '',
  },
  aniListId: {
    type: 'number',
    default: 0,
  },
  titlePreference: {
    type: 'string',
    default: 'Romaji',
  },
  defaultView: {
    type: 'number',
    default: 0,
  },
  defaultLink: {
    type: 'string',
    default: 'AniList',
  },
  isAdult: {
    type: 'boolean',
    default: false,
  },
  defaultAddStatus: {
    type: 'string',
    default: 'CURRENT',
  },
  seasonChange: {
    type: 'string',
    default: 'Early',
  },
  nextAiringEpisode: {
    type: 'string',
    default: 'Show',
  },
  defaultSeasonSort: {
    type: 'number',
    default: 2,
  },
};

const store = new Store({ schema });

// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});
ipcMain.on('electron-store-has', async (event, key) => {
  event.returnValue = store.has(key);
});
ipcMain.on('electron-store-clear', async (event, val) => {
  store.clear();
});

ipcMain.on('toggleTheme', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: toggle`;
  console.log(msgTemplate(arg));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mainWindow.webContents.send('toggleTheme', arg[0]);
  if (mediaWindow != null) {
    mediaWindow.webContents.send('toggleTheme', arg[0]);
  }
});

ipcMain.on('updateMainFromSettings', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: updateMainFromSettings`;
  console.log(msgTemplate(arg));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mainWindow.webContents.send('updateMainFromSettings', arg);
});

ipcMain.on('adultFlag', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: adultFlag`;
  console.log(msgTemplate(arg));
  store.set('isAdult', arg[0]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mainWindow.webContents.send('adultFlag', arg[0]);
});

ipcMain.on('resetLogin', async (event, val) => {
  await session.defaultSession.clearStorageData();
});

async function getNewsAdv(url: string, myTitle: string) {
  const result: any = {};
  if (url.startsWith('https://myanimelist.net/')) {
    const myVar = await axios.get(url).then((res) => {
      const htmlData = res.data;
      const $ = cheerio.load(htmlData);
      $('a').each(function () {
        // replace all a tags with blanks
        const oldSrc = $(this).attr('target');
        const newSrc = `_blank`;
        $(this).attr('target', newSrc);
      });
      /* $('a').each(function () {
        // if a local address, edits the href
        const oldSrc = $(this).attr('href');
        if (oldSrc?.startsWith('http') === false) {
          const newSrc = `https://myanimelist.net/${oldSrc}`;
          $(this).attr('href', newSrc);
        }
      }); */
      $('iframe').each(function () {
        /* const iframeChildren = $(this).children();
        console.log(iframeChildren);
        $(iframeChildren).empty(); */
        $(this).attr('allowfullscreen', 'true');
        $(this).attr('loading', 'lazy');
        // $(this).attr('allow', 'geolocation *');
      });

      $('.show_button').each(function () {
        $(this).css('display', 'none');
      });

      $('.hide_button').each(function () {
        $(this).css('display', 'none');
      });

      $('.spoiler_content').each(function () {
        $(this).css('display', 'inline-block');
      });

      const title = $(
        '#content > div.content-left > div > div:nth-child(2) > div > h1',
      ).html();
      const titleURL = $(
        '#content > div.content-left > div > div:nth-child(2) > div > h1 > a',
      ).attr('href');
      const author = $(
        '#content > div.content-left > div > div:nth-child(2) > div > div.news-info-block.clearfix.mt16.mb20 > div.information.ml8.fs11.ff-avenir > a:nth-child(1)',
      ).text();
      const authorUrl = $(
        '#content > div.content-left > div > div:nth-child(2) > div > div.news-info-block.clearfix.mt16.mb20 > div.information.ml8.fs11.ff-avenir > a:nth-child(1)',
      ).attr('href');
      const main = $(
        '#content > div.content-left > div > div:nth-child(2) > div > div.content.clearfix',
      ).html();

      const date = $(
        '#content > div.content-left > div > div:nth-child(2) > div > div.news-info-block.clearfix.mt16.mb20 > div.information.ml8.fs11.ff-avenir',
      ).html();

      result.title = myTitle;
      result.titleURL = url;
      result.author = author;
      result.authorUrl = authorUrl;
      result.main = main;
      result.date = date;
    });
  }
  if (url.startsWith('https://www.animenewsnetwork.com/')) {
    console.log('ANN');
    const myVar = await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'application/json',
        },
      })
      .then((res) => {
        const htmlData = res.data;
        const $ = cheerio.load(htmlData);

        $('a').each(function () {
          // replace all a tags with blanks
          const oldSrc = $(this).attr('target');
          const newSrc = `_blank`;
          $(this).attr('target', newSrc);
        });
        /* $('a').each(function () {
          // if a local address, edits the href
          const oldSrc = $(this).attr('href');
          if (oldSrc?.startsWith('http') === false) {
            const newSrc = `https://www.animenewsnetwork.com${oldSrc}`;
            $(this).attr('href', newSrc);
          }
        }); */
        $('iframe').each(function () {
          $(this).attr('allowfullscreen', 'true');
          $(this).attr('loading', 'lazy');
        });

        $('img').each(function () {
          const myBase = 'https://cdn.animenewsnetwork.com';
          const myDataSrc = $(this).attr('data-src');
          $(this).attr('src', myBase + myDataSrc);
        });
        const date = $('#page-title > small').text();
        const main = $(
          '#content-zone > div > div.text-zone.easyread-width > div > div.meat',
        ).html();
        const title = $('#page_header').text();

        const href = $('#content-zone > div > div:nth-child(3) > a').attr(
          'href',
        );
        const site = 'https://www.animenewsnetwork.com';
        const discussionLink = site + href;

        const pageLink = url;

        const author = $('#page-title')
          .text()
          .slice($('#page-title').text().lastIndexOf(' by ') + 4);

        result.title = myTitle;
        result.titleURL = pageLink;
        result.author = `by ${author}`;
        result.authorUrl = '';
        result.main = main;
        result.date = date;
      });
  }
  console.log(result);
  return result;
}

async function getAnnNewsList() {
  const result: any = [];
  const myVar = await axios
    .get('https://www.animenewsnetwork.com/news/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
      },
    })
    .then((res) => {
      const htmlData = res.data;
      const $ = cheerio.load(htmlData);
      // $('div.herald.box.news');
      // "div[class='herald box news']"
      $("div[class='herald box news t-news']").each(function (index, element) {
        // element and this is interchangable
        console.log(index);
        // get div class = thumbnail lazyload w/ data-src attr (image)
        const thumbnailLazy = $(element)
          .find("div[class='thumbnail lazyload']")
          .attr('data-src');
        const CDN = 'https://cdn.animenewsnetwork.com';
        const image = CDN + thumbnailLazy;
        console.log(image);
        // get text of div class = category news (type)
        const type = $(element).find("div[class='category news']").text();
        console.log(type);
        // get a tag href then append it to the end of https://www.animenewsnetwork.com/ for the full link (link)
        const siteURL = 'https://www.animenewsnetwork.com';
        const href = $(element)
          .find("div[class='thumbnail lazyload'] > a")
          .attr('href');
        const link = siteURL + href;
        console.log(link);
        // get time datetime attr and text (time)
        const time = $(element).find('time').first().attr('datetime');
        const timeString = $(element).find('time').first().text();
        console.log(time);
        console.log(timeString);
        const title = $(element).find("div[class='wrap'] > div > h3").text();
        console.log(title);
        // get span class = intro text for (title)
        const intro = $(element).find("span[class='intro']").text();
        console.log(intro);
        // get span class = full text for (description)
        const full = $(element).find("span[class='full']").text();
        console.log(full);
        const description = intro + full;
        console.log(description);
        console.log('-------');
        // console.log($(element).html());
        const myResult: any = {};
        myResult.image = image;
        myResult.link = link;
        myResult.title = title;
        myResult.text = description;
        myResult.time = time;
        myResult.timeString = timeString;
        myResult.key = index;
        result.push(myResult);
      });
    });
  console.log(result);
  return result;
}

// no vid
// https://myanimelist.net/news/68375931

// vid
// https://myanimelist.net/news/68368560

// pv collection
// https://myanimelist.net/news/68295066

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('changeNews', async (event, arg) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  mainWindow.webContents.send('changeNews', arg[0]);
  store.set('newsServiceType', arg[0] ? 'MyAnimeList' : 'AnimeNewsNetwork');
});

ipcMain.on('newsList', async (event, arg) => {
  const result = await getAnnNewsList();
  event.reply('newsList', result);
});

ipcMain.on('newsAdvanced', async (event, arg) => {
  const msgTemplate: any = await getNewsAdv(arg[0], arg[1]);
  event.reply('newsAdvanced', msgTemplate);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')({ showDevTools: false }); // showDevTools false makes it so that dev console isnt shown by default
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createNewSettingsWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  settingsWindow = new BrowserWindow({
    show: false,
    width: 860,
    height: 650,
    icon: getAssetPath('gear.png'),
    webPreferences: {
      nodeIntegration: true, // this is for future database use = true
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      // devTools: false,
      webviewTag: false,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    parent: mainWindow,
    modal: true,
    maximizable: false,
    minimizable: false,
    resizable: false,
    autoHideMenuBar: true,
  });

  // settingsWindow.loadURL(resolveHtmlPath('index.html', 1));
  settingsWindow.loadURL(resolveHtmlPath('index.html', 1));

  settingsWindow.on('ready-to-show', () => {
    if (!settingsWindow) {
      throw new Error('"settingsWindow" is not defined');
    }

    settingsWindow.show();
    settingsWindow.setTitle('Settings');
  });

  /*
      if (process.env.START_MINIMIZED) {
      settingsWindow.minimize();
      settingsWindow.setTitle('Settings');
    } else {
      settingsWindow.show();
      settingsWindow.setTitle('Settings');
    }
  */

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
};

const createNewMediaWindow = async (arg: any) => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mediaWindow = new BrowserWindow({
    show: false,
    width: 860,
    height: 666,
    icon: getAssetPath('lightweight-48.png'),
    webPreferences: {
      nodeIntegration: true, // this is for future database use = true
      sandbox: false, // changed to true
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity: false,
    },
    autoHideMenuBar: true,
    maximizable: false,
    minimizable: false,
    resizable: false,
  });

  // mediaWindow.loadURL(resolveHtmlPath('index.html', 2));
  if (arg.length === 3) {
    mediaWindow.loadURL(resolveHtmlPath('index.html', 3));
  } else {
    mediaWindow.loadURL(resolveHtmlPath('index.html', 2));
  }

  mediaWindow.on('ready-to-show', () => {
    if (!mediaWindow) {
      throw new Error('"mediaWindow" is not defined');
    }

    mediaWindow.show();
    mediaWindow.setTitle(arg[0]);
    if (mediaWindow !== null) {
      mediaWindow.webContents.send('advancedMedia', arg);
    }
  });

  /*
      if (process.env.START_MINIMIZED) {
      mediaWindow.minimize();
      mediaWindow.setTitle(arg[0]);
      if (mediaWindow !== null) {
        mediaWindow.webContents.send('advancedMedia', arg);
      }
    } else {
      mediaWindow.show();
      mediaWindow.setTitle(arg[0]);
      if (mediaWindow !== null) {
        mediaWindow.webContents.send('advancedMedia', arg);
      }
    }
  */

  mediaWindow.webContents.setWindowOpenHandler((details) => {
    console.log(details);
    if (details.url !== null) {
      shell.openExternal(details.url);
    }
    return { action: 'deny' };
  });

  mediaWindow.on('closed', () => {
    mediaWindow = null;
  });
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 800,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true, // this is for future database = true
      sandbox: false,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
      webSecurity: false,
      webviewTag: true,
    },
  });

  // win.loadURL(`file://${__dirname}/app.html#/login`);
  // resolveHtmlPath('index.html', 0)
  // 'http://localhost:1212/settings'
  mainWindow.loadURL(resolveHtmlPath('index.html', 0));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    // close other windows if main window is closed
    if (mediaWindow !== null) {
      mediaWindow.close();
      mediaWindow = null;
    }
    if (settingsWindow !== null) {
      settingsWindow.close();
      settingsWindow = null;
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */
ipcMain.on('settings', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: settings`;
  console.log(msgTemplate(arg));
  event.reply('settings', msgTemplate('pong'));
  if (settingsWindow === null) {
    createNewSettingsWindow();
  }
});

ipcMain.on('advancedMedia', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: media`;
  console.log(arg[0]);
  event.reply('', msgTemplate('pong'));
  if (mediaWindow === null) {
    await createNewMediaWindow(arg);
  } else {
    mediaWindow.setTitle(arg[0]);
    if (mediaWindow !== null) {
      mediaWindow.webContents.send('advancedMedia', arg);
      mediaWindow.focus();
    }
  }
});

ipcMain.on('advancedMediaListEntry', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: media`;
  console.log(arg[0]);
  event.reply('', msgTemplate('pong'));

  if (mediaWindow !== null) {
    mediaWindow.webContents.send('advancedMedia', arg);
  }
});

ipcMain.on('updateMainFromAdvanced', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: media`;
  console.log(arg[0]);
  event.reply('', msgTemplate('pong'));
  if (mainWindow !== null) {
    mainWindow.webContents.send('updateMainFromAdvanced', arg);
  }
});

ipcMain.on('openExternalLink', async (event, arg: any) => {
  console.log('openExternalLink');
  shell.openExternal(arg[0]);
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.on('appVersion', async (event, arg: any) => {
  console.log('appVersion');
  settingsWindow?.webContents.send('appVersion', [app.getVersion()]);
});
