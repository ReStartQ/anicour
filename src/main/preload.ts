import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'ipc-example'
  | 'settings'
  | 'toggleTheme'
  | 'advancedMedia'
  | 'advancedMediaListEntry'
  | 'newsList'
  | 'newsAdvanced'
  | 'changeNews'
  | 'resetLogin'
  | 'updateMainFromSettings'
  | 'updateMainFromAdvanced'
  | 'updateAdvancedFromMain'
  | 'openExternalLink'
  | 'adultFlag'
  | 'appVersion';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  store: {
    // this store section was added based on instructions from electron react boilerplate documentation on electron store
    get(key: any) {
      return ipcRenderer.sendSync('electron-store-get', key);
    },
    set(property: any, val: any) {
      ipcRenderer.send('electron-store-set', property, val);
    },
    has(key: any) {
      return ipcRenderer.sendSync('electron-store-has', key);
    },
    clear() {
      ipcRenderer.send('electron-store-clear', true);
    },
    // Other method you want to add like has(), reset(), etc.
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
