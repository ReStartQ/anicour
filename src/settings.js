const { ipcRenderer } = require("electron");

function setStorageMyToken(myToken){ //accepts String
    localStorage.setItem("myToken", myToken);
}
function getStorageMyToken(){
    return localStorage.getItem("myToken"); //returns string
}

function storeMyToken(){
    let tokenInput=document.getElementById("userTokenInput");
    setStorageMyToken(tokenInput.value);
    console.log(getStorageMyToken());
}



function setStorageMyUserName(myUserName){ //accepts String
    localStorage.setItem("myUserName", myUserName);
}

function storeMyUsername(){
    let usernameInput = document.getElementById("usernameInput");
    setStorageMyUserName(usernameInput.value);
    console.log(getStorageMyUserName());
    getUserID(getStorageMyUserName());
    console.log(getStorageUserId());
}

function setStorageMyAniListJSONData(myListData){ //accepts JSON object
    let myListDataString = myListData.stringify();
    localStorage.setItem("myAniListData", myListDataString);
}

function setStorageMyAdultContent(userFlag){ //accepts boolean
    if (userFlag==true){
        localStorage.setItem("myAdultContent", "true");
    }
    if (userFlag==false){
        localStorage.setItem("myAdultContent", "false");
    }
}

function setUserTitlePreference(myPreference){ //accepts string
    localStorage.setItem("userTitlePreference", myPreference);
}

function setDefaultListPreference(myPreference){ //accepts string
    localStorage.setItem("defaultListPreference", myPreference);
}

function setDefaultUserSettingsTab(myPreference){
    localStorage.setItem("defaultUserSettingsTab", myPreference);
}

function getDefaultUserSettingsTab(){
    return localStorage.getItem("defaultUserSettingsTab");
}

function getStorageMyToken(){
    return localStorage.getItem("myToken"); //returns string
}

function getStorageMyUserName(){
    return localStorage.getItem("myUserName"); //returns string
}

function getStorageMyAniListJSONData(){
    return JSON.parse(localStorage.getItem("myAniListData")); //this returns a JSON object
}

function getStorageMyAdultContent(){ //returns boolean
    if(localStorage.getItem("myAdultContent")=="false"){
        return false;
    }
    if(localStorage.getItem("myAdultContent")=="true"){
        return true;
    }

    return false;
}

function getUserTitlePreference(){ //returns string
    return localStorage.getItem("userTitlePreference");
}

function getDefaultListPreference(){ //returns string
    return localStorage.getItem("defaultListPreference");
}


//event listeners

document.getElementById("resetLoginButton").addEventListener("click", ()=>{ //closes window
    sendResetLoginData();
});


document.getElementById("cancelButton").addEventListener("click", ()=>{ //closes window
    window.close();
});

document.getElementById("cancelButton2").addEventListener("click", ()=>{ //closes window
    window.close();
});





ipcRenderer.on('asynchronous-message', function (evt, message) {
    
});

function sendResetLoginData(){
    ipcRenderer.send("msg","clearLogin");
}

function setUserTitlePreference(myPreference){ //accepts string
    localStorage.setItem("userTitlePreference", myPreference);
}

function setDefaultListPreference(myPreference){ //accepts string
    localStorage.setItem("defaultListPreference", myPreference);
}

function setDefaultSearchPreference(myPreference){
    localStorage.setItem("defaultSearchPreference", myPreference);
}

function setMyMediaBoxColorPreference(myPreference){
    localStorage.setItem("defaultMediaBoxColors", myPreference)
}

function getMyMediaBoxColorPreference(){
    return localStorage.getItem("defaultMediaBoxColors");
}

function getUserTitlePreference(){ //returns string
    return localStorage.getItem("userTitlePreference");
}

function getDefaultListPreference(){ //returns string
    return localStorage.getItem("defaultListPreference");
}

function getDefaultSearchPreference(){
    return localStorage.getItem("defaultSearchPreference");
}

function setUserId(myUserId){
    localStorage.setItem("userId", myUserId);
}
function getStorageUserId(){
    return localStorage.getItem("userId");
}

async function getUserID(myName){
    //single object search
    var query = `
    query ($name: String){
            User(name:$name){
                id
            }
        }
    `;

    var variables = {
        name: myName
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataForUserID)
                        .catch(handleError);
    return 0;
}

async function handleDataForUserID(data) {
    const datajsonstring = JSON.stringify(data);
    console.log(datajsonstring);
    let myId = data.data.User.id;
    setUserId(myId);
}

//handle error
function handleError(error) {
    console.error(error);
}

//handles json response
function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}


function storeSettingValues1(){
    let listTitleSelectVal=document.getElementById("defaultListNameSelect").value;
    let userDefaultColorsVal=document.getElementById("defaultColorsSelect").value;
    console.log(listTitleSelectVal);
    setUserTitlePreference(listTitleSelectVal);
    setMyMediaBoxColorPreference(userDefaultColorsVal);
}

function storeSettingValues2(){
    let listStartVal=document.getElementById("defaultListSelect").value;
    let searchStartVal=document.getElementById("defaultSearch").value;
    let defaultSettingsTabVal=document.getElementById("userDefaultSettingsTab").value;
    console.log(listStartVal);
    console.log(searchStartVal);
    console.log(defaultSettingsTabVal);
    setDefaultListPreference(listStartVal);
    setDefaultSearchPreference(searchStartVal);
    setDefaultUserSettingsTab(defaultSettingsTabVal);
}



function openSettingsTab(settingsNumber){
    switch(settingsNumber){
        case 1:
            document.getElementById("settingsAccount").style.display="grid";
            document.getElementById("settingsAppearance").style.display="none";
            document.getElementById("settingsStartUp").style.display="none";
            document.getElementById("accountButton").className="active";
            document.getElementById("appearanceButton").className="sideBarButtons";
            document.getElementById("startUpButton").className="sideBarButtons";
            break;
        case 2:
            document.getElementById("settingsAppearance").style.display="grid";
            document.getElementById("settingsAccount").style.display="none";
            document.getElementById("settingsStartUp").style.display="none";
            document.getElementById("accountButton").className="sideBarButtons";
            document.getElementById("appearanceButton").className="active";
            document.getElementById("startUpButton").className="sideBarButtons";
            break;
        case 3:
            document.getElementById("settingsStartUp").style.display="grid";
            document.getElementById("settingsAccount").style.display="none";
            document.getElementById("settingsAppearance").style.display="none";
            document.getElementById("accountButton").className="sideBarButtons";
            document.getElementById("appearanceButton").className="sideBarButtons";
            document.getElementById("startUpButton").className="active";
            break;
        default:
            document.getElementById("settingsAccount").style.display="grid";
            document.getElementById("settingsAppearance").style.display="none";
            document.getElementById("settingsStartUp").style.display="none";
            document.getElementById("accountButton").className="active";
            document.getElementById("appearanceButton").className="sideBarButtons";
            document.getElementById("startUpButton").className="sideBarButtons";
    }
}


document.addEventListener('DOMContentLoaded', ()=> {
    //default list
    if(getDefaultListPreference()==null||getDefaultListPreference()=="animeList"){
        document.getElementById("defaultListSelect").value="animeList"; //set initial value
    }
    if(getDefaultListPreference()=="mangaList"){
        document.getElementById("defaultListSelect").value="mangaList"; //set initial value
    }
    if(getDefaultListPreference()=="lightNovelList"){
        document.getElementById("defaultListSelect").value="lightNovelList"; //set initial value
    }

    //default title preference
    if(getUserTitlePreference()==null||getUserTitlePreference()=="Romaji"){
        document.getElementById("defaultListNameSelect").value="Romaji"; //set initial value
    }
    if(getUserTitlePreference()=="English"){
        document.getElementById("defaultListNameSelect").value="English"; //set initial value
    }
    if(getUserTitlePreference()=="Native"){
        document.getElementById("defaultListNameSelect").value="Native"; //set initial value
    }



    //default search tab
    if(getDefaultSearchPreference()==null||getDefaultListPreference()=="All"){
        document.getElementById("defaultSearch").value="All"; //set initial value
    }
    if(getDefaultSearchPreference()=="Anime"){
        document.getElementById("defaultSearch").value="Anime"; //set initial value
    }
    if(getDefaultSearchPreference()=="Manga"){
        document.getElementById("defaultSearch").value="Manga"; //set initial value
    }
    if(getDefaultSearchPreference()=="Light Novel"){
        document.getElementById("defaultSearch").value="Light Novel"; //set initial value
    }

    //default settings tab
    if(getDefaultUserSettingsTab()==null||getDefaultUserSettingsTab()=="Account"){
        openSettingsTab(1);
        document.getElementById("userDefaultSettingsTab").value="Account";
    }
    if(getDefaultUserSettingsTab()=="Appearance"){
        openSettingsTab(2);
        document.getElementById("userDefaultSettingsTab").value=getDefaultUserSettingsTab();
    }
    if(getDefaultUserSettingsTab()=="Startup"){
        openSettingsTab(3);
        document.getElementById("userDefaultSettingsTab").value=getDefaultUserSettingsTab();
    }


    //default colors
    if(getMyMediaBoxColorPreference()==null||getMyMediaBoxColorPreference()=="Blue/Yellow/Orange"){
        document.getElementById("defaultColorsSelect").value="Blue/Yellow/Orange";
    }
    if(getMyMediaBoxColorPreference()=="Blue/Green/Red"){
        document.getElementById("defaultColorsSelect").value="Blue/Green/Red";
    }
});



