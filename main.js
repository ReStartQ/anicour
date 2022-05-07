const electron = require('electron');
const url = require('url');
const path = require('path');
const fetch = require('node-fetch');
const { emit } = require('process');

const {app, ipcMain, BrowserWindow, Menu} = electron;

var environment = process.env.NODE_ENV;

let mainWindow;
let addWindow;
let settingWindow;


//listen for app to be ready
app.on('ready', ()=> {
  //create new window
  mainWindow = new BrowserWindow({
    //setting icon for app
    width: 1024,
    height: 768,
    icon: __dirname + '/icons/Courier App Icon 1.1.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  //load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Quit app when closed
  mainWindow.on('close',function() {
    app.quit()
  });
  mainWindow.webContents.on('did-finish-load', () => {
    //console.log("webcontents loaded");
  });
  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on("msg",(event,data)=>{
  if(data=="search"){
    console.log(data);
  }
  if(data=="settings"){
    console.log(data);
    createSettingWindow();
  }
  if(data=="refresh"){
    console.log(data);
  }
  if(data=="openMediaInfo"){

  }
  if(data=="need-token"||data=="need-username"){
    createSettingWindow();
  }
  if(data=="clearLogin"){
    settingWindow.webContents.session.clearStorageData({storages: ['cookies']}); //clears cookies for login
  }
  
  if(data=="info"){
    createInfoWindow();
  }

  if(Array.isArray(data)==true&&data.length>=30){
    addWindow.once('ready-to-show', () => {
      addWindow.webContents.send('asynchronous-message', data); //send over the array to build the window
    });
  }
  
  if(data=="info2"){
    createInfoWindow2();
  }

  if(Array.isArray(data)==true&&data.length>=18&&data.length<=22){
    addWindow2.once('ready-to-show', () => {
      addWindow2.webContents.send('asynchronous-message', data); //send over the array to build the window
    });
  }

  if(Array.isArray(data)==true&&data.length>=10&&data.length<=11){
    mainWindow.webContents.send('asynchronous-message', data);
  }

});

//Handle create add mainWindow
function createInfoWindow(){
  //create new window
  addWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title:'Info',
    //setting icon for app
    icon: __dirname + '/icons/restore-window.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  addWindow.setMenuBarVisibility(false);
  //load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/infoWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Garbage collection handler
  addWindow.on('close', function() {
    addWindow = null
  });
}

function createSettingWindow(){
  //create new window
  settingWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title:'Settings',
    //setting icon for app
    icon: __dirname + '/icons/settings-gear.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  settingWindow.setMenuBarVisibility(false);
  //load html into window
  settingWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/settingWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Garbage collection handler
  settingWindow.on('close', function() {
    settingWindow = null
  });
  //settingWindow.webContents.session.clearStorageData(); //clears data
  //.webContents.session.clearCache();
}

function createInfoWindow2(){
  //create new window
  addWindow2 = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title:'Testing New Window',
    //setting icon for app
    icon: __dirname + '/icons/restore-window.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  addWindow2.setMenuBarVisibility(false);
  //load html into window
  addWindow2.loadURL(url.format({
    pathname: path.join(__dirname, 'src/infoWindow2.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Garbage collection handler
  addWindow2.on('close', function() {
    addWindow2 = null
  });
}

function createUpdateWindow(){
  //create new window
  updateWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title:'Testing New Window',
    //setting icon for app
    icon: __dirname + '/icons/Courier App Icon 1.1.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  updateWindow.setMenuBarVisibility(false);
  //load html into window
  updateWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/updateWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //Garbage collection handler
  updateWindow.on('close', function() {
    updateWindow = null
  });
}

//Create menu template
const mainMenuTemplate = [
  {
    label: 'View',
    submenu:[
      {
        label: 'Search',
        accelerator: process.platform == 'darwin' ? 'Option+S' : 'Alt+1',
        click(){
          mainWindow.webContents.send('asynchronous-message', 'searchView');
        }
      },
      {
        label: 'Anime List',
        accelerator: process.platform == 'darwin' ? 'Option+A' : 'Alt+2',
        click(){
          mainWindow.webContents.send('asynchronous-message', 'animeListView');
        }
      },
      {
        label: 'Manga List',
        accelerator: process.platform == 'darwin' ? 'Option+W' : 'Alt+3',
        click(){
          mainWindow.webContents.send('asynchronous-message', 'mangaListView');
        }
      },
      {
        label: 'Light Novel List',
        accelerator: process.platform == 'darwin' ? 'Option+D' : 'Alt+4',
        click(){
          mainWindow.webContents.send('asynchronous-message', 'lightNovelListView');
        }
      }
      /*,{
        label: 'Visual Novel List',
        click(){
          mainWindow.webContents.send('asynchronous-message', 'visualNovelListView');
        }
      }
      */
    ]
  }
];



mainMenuTemplate.push({
  label: 'Help',
  submenu:[
    {
      label: 'Setup?', //redirect to github page
      accelerator: process.platform == 'darwin' ? 'Option+H' : 'Ctrl+H',
      click(){
        mainWindow.webContents.send('asynchronous-message', 'Help');
      }
    },
    {
      role: 'reload'
    },
    {
      label: 'Quit',
      accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      click(){
        app.quit();
      }
    }
  ]
});


//if mac, add empty object to Menu
if (process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}


// Add developer tool items if not in production
/*if (process.env.NODE_ENV.trim() !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'F12' : 'F12',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
          console.log(environment);
        }
      }
    ]
  });
}*/


