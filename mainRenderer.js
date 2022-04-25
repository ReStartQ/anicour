

const {ipcRenderer, shell, contextBridge} = require('electron');

var today = new Date();
var helpAddress = "https://github.com/ReStartQ/Courier/blob/main/HELP.md";

//HTML scripts
function openTab(evt, tabType) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    if (thisListId==2 && tabType=="Completed"||thisListId==2 && tabType=="On hold"||thisListId==2 && tabType=="Dropped"||thisListId==2 && tabType=="All"){
      tabType+="2";
    }
    else if(thisListId==3 && tabType=="Completed"||thisListId==3 && tabType=="On hold"||thisListId==3 && tabType=="Dropped"||thisListId==3 && tabType=="Plan to read"||thisListId==3 && tabType=="Reading"||thisListId==3 && tabType=="All"){
      if(tabType=="Plan to read"||tabType=="Reading"){
        tabType+="2";
      }
      else{
        tabType+="3";
      }
    }
    else if(thisListId==4 && tabType=="Completed"||thisListId==4 && tabType=="On hold"||thisListId==4 && tabType=="Dropped"||thisListId==4 && tabType=="All"){
      tabType+="4";
    }
    else{
      //leave it alone
    }
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabType).style.display = "grid";
    evt.currentTarget.className += " active";

    //document.getElementById("tabCount").textContent = "Count: " + document.getElementById(tabType).childElementCount;
}

var thisListId = 1;
function swapList(listId,evt){
    var listLinks;
    listLinks = document.getElementsByClassName("listLinks");
    for (i = 0; i < listLinks.length; i++) {
        listLinks[i].className = listLinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    
    document.getElementById("myFilterList").style.display="none";
    document.getElementById("myFilterLabels").style.display="none";

    if (listId==1){
        thisListId=1;
        document.getElementById("myList").style.display="grid";
        document.getElementById("myListLabelButtons").style.display="flex";
        document.getElementById("mySearchList").style.display= "none";
        document.getElementById("mySearchListLabelButtons").style.display= "none";
        document.getElementById("ReadingButton").style.display= "none";
        document.getElementById("PlayingButton").style.display= "none";
        document.getElementById("PlanToReadButton").style.display= "none";
        document.getElementById("PlanToPlayButton").style.display= "none";
        document.getElementById("WatchingButton").style.display= "grid";
        document.getElementById("PlanToWatchButton").style.display= "grid";
        document.getElementById("SortAnime").style.display= "grid";
        document.getElementById("SortManga").style.display= "none";
        document.getElementById("SortLN").style.display= "none";
        document.getElementById("SortVN").style.display= "none";
        //if not up or down
        if(document.getElementById("sortUp").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown2").style.display="none";
            document.getElementById("sortDown3").style.display="none";

            //if marked then set it back to sortUp 
            document.getElementById("sortUp").style.display="grid";
        }
        else if(document.getElementById("sortDown").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown2").style.display="none";
            document.getElementById("sortDown3").style.display="none";

            //if marked then set it back to sortDown
            document.getElementById("sortDown").style.display="grid";
        }
        else{ //default if nothing has been marked
            document.getElementById("mySort").style.display="grid";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown2").style.display="none";
            document.getElementById("sortDown3").style.display="none";
        }
        document.getElementById("WatchingButton").click(); //default tab when switching lists

    }
    else if(listId==2){
        thisListId=2;
        document.getElementById("myList").style.display="grid";
        document.getElementById("myListLabelButtons").style.display="flex";
        document.getElementById("mySearchList").style.display= "none";
        document.getElementById("mySearchListLabelButtons").style.display= "none";
        document.getElementById("WatchingButton").style.display= "none";
        document.getElementById("PlayingButton").style.display= "none";
        document.getElementById("PlanToWatchButton").style.display= "none";
        document.getElementById("PlanToPlayButton").style.display= "none";
        document.getElementById("ReadingButton").style.display= "grid";
        document.getElementById("PlanToReadButton").style.display= "grid";
        document.getElementById("SortLN").style.display= "none";
        document.getElementById("SortAnime").style.display= "none";
        document.getElementById("SortManga").style.display= "grid";
        document.getElementById("SortVN").style.display= "none";
        if(document.getElementById("sortUp2").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown3").style.display="none";

            //if marked then set it back to sortUp 
            document.getElementById("sortUp2").style.display="grid";
        }
        else if(document.getElementById("sortDown2").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown3").style.display="none";

            //if marked then set it back to sortDown
            document.getElementById("sortDown2").style.display="grid";
        }
        else{ //default if nothing has been marked
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="grid";
            document.getElementById("mySort3").style.display="none";


            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp3").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown3").style.display="none";
        }
        document.getElementById("ReadingButton").click(); //default tab when switching lists
    }
    else if(listId==3){
        thisListId=3;
        document.getElementById("myList").style.display="grid";
        document.getElementById("myListLabelButtons").style.display="flex";
        document.getElementById("mySearchList").style.display= "none";
        document.getElementById("mySearchListLabelButtons").style.display= "none";
        document.getElementById("WatchingButton").style.display= "none";
        document.getElementById("PlayingButton").style.display= "none";
        document.getElementById("PlanToWatchButton").style.display= "none";
        document.getElementById("PlanToPlayButton").style.display= "none";
        document.getElementById("ReadingButton").style.display= "grid";
        document.getElementById("PlanToReadButton").style.display= "grid";
        document.getElementById("SortManga").style.display= "none";
        document.getElementById("SortAnime").style.display= "none";
        document.getElementById("SortLN").style.display= "grid";
        document.getElementById("SortVN").style.display= "none";
        if(document.getElementById("sortUp3").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown2").style.display="none";

            //if marked then set it back to sortUp 
            document.getElementById("sortUp3").style.display="grid";
        }
        else if(document.getElementById("sortDown3").getAttribute("data-mark")==1){
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="none";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown2").style.display="none";

            //if marked then set it back to sortDown
            document.getElementById("sortDown3").style.display="grid";
        }
        else{ //default if nothing has been marked
            document.getElementById("mySort").style.display="none";
            document.getElementById("mySort2").style.display="none";
            document.getElementById("mySort3").style.display="grid";

            //display none on all up or down buttons that are not part of the tab
            document.getElementById("sortUp").style.display="none";
            document.getElementById("sortUp2").style.display="none";
            document.getElementById("sortDown").style.display="none";
            document.getElementById("sortDown2").style.display="none";
        }
        document.getElementById("ReadingButton").click(); //default tab when switching lists
    }
    else{
        thisListId=4;
        //these two are for the default state on myList and myListLabelButtons. Just in case it was switched to search view.
        document.getElementById("myList").style.display="grid";
        document.getElementById("myListLabelButtons").style.display="flex";
        //these two are to turn off search view
        document.getElementById("mySearchList").style.display= "none";
        document.getElementById("mySearchListLabelButtons").style.display= "none";
        document.getElementById("WatchingButton").style.display= "none";
        document.getElementById("ReadingButton").style.display= "none";
        document.getElementById("PlanToWatchButton").style.display= "none";
        document.getElementById("PlanToReadButton").style.display= "none";
        document.getElementById("PlayingButton").style.display= "grid";
        document.getElementById("PlanToPlayButton").style.display= "grid";
        document.getElementById("SortManga").style.display= "none";
        document.getElementById("SortLN").style.display= "none";
        document.getElementById("SortAnime").style.display= "none";
        document.getElementById("SortVN").style.display= "grid";
        document.getElementById("PlayingButton").click(); //default tab when switching lists
    }
}

function openSearchTab(evt,tabType){
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("searchTab");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    
    // Get all elements with class="searchTablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("searchTabLinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabType).style.display = "grid";
    evt.currentTarget.className += " active";
}

var mySearchTabStart=1;

function swapToSearch(){
    var listLinks;
    listLinks = document.getElementsByClassName("listLinks");
    for (i = 0; i < listLinks.length; i++) {
        listLinks[i].className = listLinks[i].className.replace(" active", "");
    }
    thisSearchButton=document.getElementById("sidebarSearchButton");
    thisSearchButton.className += " active";
    document.getElementById("myList").style.display="none";
    document.getElementById("myListLabelButtons").style.display="none";
    document.getElementById("mySearchList").style.display= "grid";
    document.getElementById("mySearchAnimeTab").style.display= "grid";
    document.getElementById("mySearchMangaTab").style.display= "none";
    document.getElementById("mySearchTab").style.display= "none";
    document.getElementById("mySearchLightNovelTab").style.display= "none";
    document.getElementById("mySearchVisualNovelTab").style.display= "none";
    document.getElementById("mySearchListLabelButtons").style.display= "flex";
    switch(mySearchTabStart){
        case 1:
            document.getElementById("searchAllButton").click();
            break;
        case 2:
            document.getElementById("searchAnimeButton").click();
            break;
        case 3:
            document.getElementById("searchMangaButton").click();
            break;
        case 4:
            document.getElementById("searchLightNovelButton").click();
            break;
        default:
            document.getElementById("searchAllButton").click();
    }
    document.getElementById("myFilterList").style.display="none";
    document.getElementById("myFilterLabels").style.display="none";
    document.getElementById("searchBarInput").focus();
}

function  mySearchTabPreference(myPreference){
    switch(myPreference){
        case 1:
            mySearchTabStart=1;
            break;
        case 2:
            mySearchTabStart=2;
            break;
        case 3:
            mySearchTabStart=3;
            break;
        case 4:
            mySearchTabStart=4;
            break;
        default:
            mySearchTabStart=1;
    }
}

//adult content

var isAdultContent = false; //adult content value

function setAdult(value){
    if(value==true){
        isAdultContent=true; //store in memory later
    }
    else{
        isAdultContent=false;
    }
}

//user title preference
function setTitlePreference(value){
    if(value==2){
        titlePreference="English";
    }
    else if(value==3){
        titlePreference="Native";
    }
    else{
        titlePreference="Romaji";
    }
}

//ipcRenderer 
ipcRenderer.on('asynchronous-message', async function (evt, message) {
    if (message=='animeListView'){
        document.getElementById("animeListButton").click();
    }
    else if(message=='mangaListView'){
        document.getElementById("mangaListButton").click();
    }
    else if(message=='lightNovelListView'){
        document.getElementById("lightNovelListButton").click();
    }
    else if(message=='visualNovelListView'){
        document.getElementById("visualNovelListButton").click();
    }
    else if(message=='searchView'){
        document.getElementById("sidebarSearchButton").click();
    }
    else if(Array.isArray(message)==true&&message.length>=10&&message.length<=11){
        
        console.log(message);
        let animeFlag=false;
        let mangaFlag=false;
        if(message.length==10){
            animeFlag=true;
        }
        if(message.length==11){
            mangaFlag=true;
        }
        let format = message.pop();
        let mediaId = message.pop();
        let type = message.pop();
        let episodes, chapters, volumes;
    
        if(type == "ANIME"){
            episodes=message.pop();
        }
        else{
            chapters = message.pop();
            volumes = message.pop();
        }
    
        let status = message.pop();
        let startDate = message.pop();
        let finishDate = message.pop();
        let notes = message.pop();
        let repeat = message.pop();
        let score = message.pop();
        processAdvancedInput(format,mediaId,type,episodes,chapters,volumes,status,startDate,finishDate,notes,repeat,score);

        let [yearStart,monthStart,dayStart] = startDate.split('-');
        monthStart = parseInt(monthStart).toString();
        dayStart = parseInt(dayStart).toString();

        let [yearFinish,monthFinish,dayFinish] = finishDate.split('-');
        monthFinish = parseInt(monthFinish).toString();
        dayFinish = parseInt(dayFinish).toString();

        let myStatus;
        switch(status){
            case "Watching":
                myStatus = "CURRENT";
                break;
            case "Completed":
                myStatus = "COMPLETED";
                break;
            case "On hold":
                myStatus = "PAUSED";
                break;
            case "Dropped":
                myStatus = "DROPPED";
                break;
            case "Plan to watch":
                myStatus = "PLANNING";
                break;
            case "Reading":
                myStatus = "CURRENT";
                break;
            case "Reading2":
                myStatus = "CURRENT";
                break;    
            case "Completed2":
                myStatus = "COMPLETED";
                break;
            case "Completed3":
                myStatus = "COMPLETED";
                break;
            case "On hold2":
                myStatus = "PAUSED";
                break;
            case "On hold3":
                myStatus = "PAUSED";
                break;
            case "Dropped2":
                myStatus = "DROPPED";
                break;
            case "Dropped3":
                myStatus = "DROPPED";
                break;
            case "Plan to read":
                myStatus = "PLANNING";
                break;
            case "Plan to read2":
                myStatus = "PLANNING";
                break;
        }

        if(yearFinish===""){
            yearFinish="null";
        }
        if(monthFinish===""){
            monthFinish="null";
        }
        if(dayFinish===""){
            dayFinish="null";
        }

        if(yearStart===""){
            yearStart="null";
        }
        if(monthStart===""){
            monthStart="null";
        }
        if(dayStart===""){
            dayStart="null";
        }

        console.log(startDate);
        console.log(yearStart);
        console.log(monthStart);
        console.log(dayStart);
        console.log(finishDate);
        console.log(yearFinish);
        console.log(monthFinish);
        console.log(dayFinish);
        let finishDateNullFlag=false;
        let startDateNullFlag=false;
        if(finishDate===""){
            console.log('no finish date');
            finishDateNullFlag=true;
        }   
        if(startDate===""){
            console.log('no finish date');
            startDateNullFlag=true;
        }
        if(animeFlag==true){
            if(startDateNullFlag==true&&finishDateNullFlag==true){
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeAdvanced0(mediaId,myStatus,episodes,score,notes,repeat);
                document.getElementById("updatingNotification").style.display="none";
            }
            else{
                if(finishDateNullFlag==true){
                    document.getElementById("updatingNotification").style.display="block";
                    await saveMyEntryAnimeAdvanced1(mediaId,myStatus,episodes,score,notes,yearStart,monthStart,dayStart,repeat);
                    document.getElementById("updatingNotification").style.display="none";
                }
                if(startDateNullFlag==true){
                    document.getElementById("updatingNotification").style.display="block";
                    await saveMyEntryAnimeAdvanced2(mediaId,myStatus,episodes,score,notes,yearFinish,monthFinish,dayFinish,repeat);
                    document.getElementById("updatingNotification").style.display="none";
                }
            }
            if(startDateNullFlag==false&&finishDateNullFlag==false){
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeAdvanced(mediaId,myStatus,episodes,score,notes,yearStart,monthStart,dayStart,yearFinish,monthFinish,dayFinish,repeat);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
        if(mangaFlag==true){
            if(startDateNullFlag==true&&finishDateNullFlag==true){
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaAdvanced0(mediaId,myStatus,chapters, volumes, score,notes,repeat);
                document.getElementById("updatingNotification").style.display="none";
            }
            else{
                if(finishDateNullFlag==true){
                    document.getElementById("updatingNotification").style.display="block";
                    await saveMyEntryMangaAdvanced1(mediaId,myStatus,chapters, volumes, score,notes,yearStart,monthStart,dayStart,repeat);
                    document.getElementById("updatingNotification").style.display="none";
                }
                if(startDateNullFlag==true){
                    document.getElementById("updatingNotification").style.display="block";
                    await saveMyEntryMangaAdvanced2(mediaId,myStatus,chapters, volumes,score,notes,yearFinish,monthFinish,dayFinish,repeat);
                    document.getElementById("updatingNotification").style.display="none";
                }
            }
            if(startDateNullFlag==false&&finishDateNullFlag==false){
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaAdvanced(mediaId,myStatus, chapters, volumes,score,notes,yearStart,monthStart,dayStart,yearFinish,monthFinish,dayFinish,repeat);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
    }
    else if(message=='Help'){
        shell.openExternal(helpAddress);
    }
    else{
        //nothing
    }
});


//ipcRenderer functions
function sendSettingsData(){
    ipcRenderer.send("msg","settings");
}
async function sendRefreshData(){
    ipcRenderer.send("msg","refresh");
    await refreshList();

}

function resetPageCounter(){
    pageCounter=1;
}

function setPageFlagTrue(){
    pageFlag=true;
}

function setPageFlagFalse(){
    pageFlag=false;
}



var pageFlag=true;
var pageCounter=1;
var onListFlag=true;
//search bar process
async function sendSearchData(){
    ipcRenderer.send("msg","search");
    let sbi = document.getElementById("searchBarInput").value;
    while(pageFlag===true){
        await searchAniListProcessAuthOnList(sbi, isAdultContent, pageCounter);
    }

    setPageFlagTrue();
    onListFlag=false;

    while(pageFlag===true){
        await searchAniListProcessAuthNotOnList(sbi, isAdultContent, pageCounter);
    }

    setPageFlagTrue();
    onListFlag=true;
    swapToSearch();

}

var myToken = getStorageMyToken();
function setMyToken(token){
    myToken=token;
}

function sendNoTokenData(){
    ipcRenderer.send("msg","need-token");
}

function sendNoUserName(){
    ipcRenderer.send("msg","need-username");
}

//eventListeners
document.getElementById("refreshButtonId").addEventListener("click", ()=>{
    sendRefreshData();
});
document.getElementById("settingsButtonId").addEventListener("click", ()=>{
    sendSettingsData();
});

document.getElementById("searchButtonId").addEventListener("click", ()=>{
    sendSearchData();
});
document.getElementById("searchBarInput").addEventListener("keydown", (e)=>{
    if(e.code==="Enter"){
        sendSearchData();
    }
});

document.getElementById("searchBarInput").addEventListener("input", ()=>{
    console.log("input");
    //check where you are at and which buttons are active
    checkActiveStatus();
    filterMyList();
});

function checkActiveStatus(){
    let sidebarSearch = document.getElementById("sidebarSearchButton");
    let animeListButton = document.getElementById("animeListButton");
    let mangaListButton = document.getElementById("mangaListButton");
    let lightNovelListButton = document.getElementById("lightNovelListButton");
    let filterLabels = document.getElementById("myFilterLabels");

    if(searchBarInput.value==""){ //if search bar value is nothing, stay at same place
        if(sidebarSearch.className.includes("active")==true){
            document.getElementById("myList").style.display="none";
            document.getElementById("mySearchList").style.display="grid";
            document.getElementById("myFilterList").style.display="none";
            document.getElementById("mySearchListLabelButtons").style.display="flex";
            filterLabels.style.display="none";
        }
        if(animeListButton.className.includes("active")==true){
            document.getElementById("myList").style.display="grid";
            document.getElementById("mySearchList").style.display="none";
            document.getElementById("myFilterList").style.display="none";
            document.getElementById("myListLabelButtons").style.display="flex";
            document.getElementById("mySearchListLabelButtons").style.display="none";
            filterLabels.style.display="none";
        }
        
        if(mangaListButton.className.includes("active")==true){
            document.getElementById("myList").style.display="grid";
            document.getElementById("mySearchList").style.display="none";
            document.getElementById("myFilterList").style.display="none";
            document.getElementById("myListLabelButtons").style.display="flex";
            document.getElementById("mySearchListLabelButtons").style.display="none";
            filterLabels.style.display="none";
        }
        if(lightNovelListButton.className.includes("active")==true){
            document.getElementById("myList").style.display="grid";
            document.getElementById("mySearchList").style.display="none";
            document.getElementById("myFilterList").style.display="none";
            document.getElementById("myListLabelButtons").style.display="flex";
            document.getElementById("mySearchListLabelButtons").style.display="none";
            filterLabels.style.display="none";
        }
    }
    else{ //show filter tab
        document.getElementById("myFilterList").style.display="grid";
        document.getElementById("FilterListTab").style.display="grid";
        document.getElementById("myList").style.display="none";
        document.getElementById("mySearchList").style.display="none";
        document.getElementById("myListLabelButtons").style.display="none";
        document.getElementById("mySearchListLabelButtons").style.display="none";


        filterLabels.style.display="grid";
    }
}



var listDefaultPreference=1; //user preference
var userName = getStorageMyUserName();
var globalUserId = getStorageUserId();

function setUserId(myUserId){
    localStorage.setItem("userId", myUserId);
}

function getStorageUserId(){
    return localStorage.getItem("userId");
}


//when DOM loaded
document.addEventListener('DOMContentLoaded', ()=> {
    //set to default list when DOM loaded
    if(getDefaultListPreference()==null){
        listDefaultPreference=1;
    }
    if(getDefaultListPreference()=="animeList"){
        listDefaultPreference=1;
    }
    if(getDefaultListPreference()=="mangaList"){
        listDefaultPreference=2;
    }
    if(getDefaultListPreference()=="lightNovelList"){
        listDefaultPreference=3;
    }
    if(getDefaultListPreference()=="visualNovelList"){
        listDefaultPreference=4;
    }


    //isAdultContent
    if(getStorageMyAdultContent()==false){
        isAdultContent=false;
    }
    
    if(getStorageMyAdultContent()==true){
        isAdultContent=true;
    }

    //title preference
    if(getUserTitlePreference()==null){ //default case if there is no storage item
        setTitlePreference(1);
    }

    if(getUserTitlePreference()=="Romaji"){
        setTitlePreference(1);
    }
    if(getUserTitlePreference()=="English"){
        setTitlePreference(2);
    }
    if(getUserTitlePreference()=="Native"){
        setTitlePreference(3);
    }



    if (listDefaultPreference==1){
        document.getElementById("animeListButton").click();
    }
    else if(listDefaultPreference==2){
        document.getElementById("mangaListButton").click();
    }
    else if(listDefaultPreference==3){
        document.getElementById("lightNovelListButton").click();
    }
    else if(listDefaultPreference==4){
        document.getElementById("visualNovelListButton").click();
    }
    else{
        document.getElementById("animeListButton").click();
    }

    switch(getDefaultSearchPreference()){
        case "All":
            mySearchTabStart=1;
            break;
        case "Anime":
            mySearchTabStart=2;
            break;
        case "Manga":
            mySearchTabStart=3;
            break;
        case "Light Novel":
            mySearchTabStart=4;
            break;
        default:
            mySearchTabStart=1;
    }

    if(getMyMediaBoxColorPreference()==null||getMyMediaBoxColorPreference()=="Blue/Yellow/Orange"){
        myColorPreference=2;
    }
    if(getMyMediaBoxColorPreference()=="Blue/Green/Red"){
        myColorPreference=1;
    }
    

    //check for token and if there is no token send to ipcMain message so that it can open setting window to allow user to setup the token
    if(myToken!=null){
        //saveMyEntryManga(94970, "CURRENT", 11, 12, 10); //youjitsu
        //saveMyEntryAnime(131586,"CURRENT",6,0); //86
        //deleteMyEntryAnime(235657532); //made in abyss
        startUpList();
    }
    else{
        //send message to main to open settings window and set it up
        if(userName!=null){ 

        }
        else{
            sendNoTokenData();
        }
    }



});


async function startUpList(){
    await refreshList();
    /*if (listDefaultPreference==1){
        document.getElementById("tabCount").textContent = "Count: " + document.getElementById("Watching").childElementCount;
    }
    else if(listDefaultPreference==2){
        document.getElementById("tabCount").textContent = "Count: " + document.getElementById("Reading").childElementCount;
    }
    else if(listDefaultPreference==3){
        document.getElementById("tabCount").textContent = "Count: " + document.getElementById("Reading2").childElementCount;
    }
    else if(listDefaultPreference==4){
        document.getElementById("tabCount").textContent = "Count: " + document.getElementById("Playing").childElementCount;
    }
    else{
        document.getElementById("tabCount").textContent = "Count: " + document.getElementById("Watching").childElementCount;
    }*/
}

//userId is 146538
async function refreshList(){
    //while(pageFlag===true){
      //  await getMyList(pageCounter,146538);
    //}
    //setPageFlagTrue();
    document.getElementById('refreshImage').className="refreshButtonImage";
    await getMyListFromCollectionAnime(globalUserId);
    await getMyListFromCollectionManga(globalUserId);

    reSortMyListAnime();
    reSortMyListManga();
    reSortMyListLN();

    document.getElementById('refreshImage').className="refreshButtonImageOff";
    return 0;
}


//handles single data
function handleDataSingle(data) {
    const datajsonstring = JSON.stringify(data);
    console.log(datajsonstring);
}

function handleDataSingleLookUp(data) {
    const datajsonstring = JSON.stringify(data);
    console.log(datajsonstring);
    let myFocusedMediaId=data.data.MediaList.id;
    deleteMyEntryAnime(myFocusedMediaId);
}

function handleDataSingleLookUpAdd(data) {
    const datajsonstring = JSON.stringify(data);
    console.log(datajsonstring);
    //let myFocusedMediaId=data.data.MediaList.id;
    //addMyEntry(myFocusedMediaId, "CURRENT");
}


//fetching function
function fetching(u, options){
    return fetch(u, options).then(handleResponse).then(handleData).catch(handleError);
}

//handles json response
function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

const thisSearchTab = document.getElementById("mySearchTab");
const thisSearchAnimeTab = document.getElementById("mySearchAnimeTab");
const thisSearchMangaTab = document.getElementById("mySearchMangaTab");
const thisSearchLightNovelTab = document.getElementById("mySearchLightNovelTab");
const thisSearchVisualNovelTab = document.getElementById("mySearchVisualNovelTab");
const searchFrag = document.createDocumentFragment();
const searchFragAnime = document.createDocumentFragment();
const searchFragManga = document.createDocumentFragment();
const searchFragLightNovels = document.createDocumentFragment();
const searchFragVisualNovels = document.createDocumentFragment();

var titlePreference = "Romaji"; //current preference
var myMediaType;

function calculateMyType(dataType, dataFormat){
    if(dataType=="ANIME"){
        myMediaType="anime";
    }
    else{
        if(dataFormat=="NOVEL"){
            myMediaType="lightNovel";
        }
        else{
            myMediaType="manga";
        }
    }
}

var totalSubtractor = 0;

async function handleData(myData) {
    const datajsonstring = JSON.stringify(myData);
    console.log(datajsonstring);

    if(totalSubtractor==0&&onListFlag==true){
        removeAllChildNodes(thisSearchTab); //reset, if there was a previous search
        removeAllChildNodes(thisSearchAnimeTab);
        removeAllChildNodes(thisSearchMangaTab);
        removeAllChildNodes(thisSearchLightNovelTab);
    }

    //page stuff
    let dataTotal, dataCurrentPage, dataLastPage, dataHasNextPage, dataPerPage;
    dataTotal=myData.data.Page.pageInfo.total;
    dataCurrentPage=myData.data.Page.pageInfo.currentPage;
    dataLastPage=myData.data.Page.pageInfo.lastPage;
    dataHasNextPage=myData.data.Page.pageInfo.hasNextPage;
    dataPerPage=myData.data.Page.pageInfo.perPage; //dataPerPage is set at 50

    if(dataHasNextPage===true){
        setPageFlagTrue();
        pageCounter++;

    }
    else{
        setPageFlagFalse();
        resetPageCounter();
    }



    //media stuff
    for (let i=0; (i<(dataTotal-totalSubtractor)&&i<dataPerPage); i++){
        let dataID, dataType, dataFormat, dataTitleRomaji, dataTitleEnglish, dataTitleNative, dataStatus, 
        dataAverageScore, dataEpisodes, dataChapters, dataVolumes, dataStartDateDay, dataStartDateMonth, dataStartDateYear,
        dataSeason, dataSeasonYear, dataCoverImage, dataOnList;

        

        dataID=myData.data.Page.media[i].id;
        //console.log(dataID);

        dataType=myData.data.Page.media[i].type;
        //console.log(dataType);

        dataFormat=myData.data.Page.media[i].format;
        //console.log(dataFormat);     

        dataTitleRomaji=myData.data.Page.media[i].title.romaji;
        if(dataTitleRomaji!=null){
            //console.log(dataTitleRomaji);
        }

        dataTitleEnglish=myData.data.Page.media[i].title.english;
        if(dataTitleEnglish!=null){
            //console.log(dataTitleEnglish);
        }

        dataTitleNative=myData.data.Page.media[i].title.native;
        if(dataTitleNative!=null){
            //console.log(dataTitleNative);
        }

        dataStatus=myData.data.Page.media[i].status;
        //console.log(dataStatus);

        dataAverageScore=myData.data.Page.media[i].averageScore;
        if(dataAverageScore!=null){
            //console.log(dataAverageScore);
        }

        dataEpisodes=myData.data.Page.media[i].episodes;
        if(dataEpisodes!=null){
            //console.log(dataEpisodes);
        }

        dataChapters=myData.data.Page.media[i].chapters;
        if(dataChapters!=null){
            //console.log(dataChapters);
        }

        dataVolumes=myData.data.Page.media[i].volumes;
        if(dataVolumes!=null){
            //console.log(dataVolumes);
        }

        dataSeason=myData.data.Page.media[i].season;
        if(dataSeason!=null){
            //console.log(dataSeason);
        }

        dataSeasonYear=myData.data.Page.media[i].dataSeasonYear;
        if(dataSeasonYear!=null){
            console.log(dataSeasonYear);
        }

        dataStartDateDay=myData.data.Page.media[i].startDate.day;
        //console.log(dataStartDateDay);

        dataStartDateMonth=myData.data.Page.media[i].startDate.month;
        //console.log(dataStartDateMonth);

        dataStartDateYear=myData.data.Page.media[i].startDate.year;
        //console.log(dataStartDateYear);

        dataCoverImage=myData.data.Page.media[i].coverImage.medium;
        //console.log(dataCoverImage);


        let thisMediaBox = document.createElement('div');
        thisMediaBox.className = "searchMediaBox";
        thisMediaBox.setAttribute('data-id', dataID);
        thisMediaBox.setAttribute('data-type', dataType);
        thisMediaBox.setAttribute('data-format', dataFormat);
        thisMediaBox.setAttribute('data-titleromaji', dataTitleRomaji);
        thisMediaBox.setAttribute('data-titleenglish', dataTitleEnglish);
        thisMediaBox.setAttribute('data-titlenative', dataTitleNative);
        thisMediaBox.setAttribute('data-status', dataStatus);
        thisMediaBox.setAttribute('data-averagescore', dataAverageScore);
        thisMediaBox.setAttribute('data-episodes', dataEpisodes);
        thisMediaBox.setAttribute('data-chapters', dataChapters);
        thisMediaBox.setAttribute('data-volumes', dataVolumes);
        thisMediaBox.setAttribute('data-season', dataSeason);
        thisMediaBox.setAttribute('data-startdateday', dataStartDateDay);
        thisMediaBox.setAttribute('data-startdatemonth', dataStartDateMonth);
        thisMediaBox.setAttribute('data-startdateyear', dataStartDateYear);
        thisMediaBox.setAttribute('data-seasonyear', dataSeasonYear);
        

        let dataGenres = myData.data.Page.media[i].genres;
        let dataSiteUrl = myData.data.Page.media[i].siteUrl;
        let dataDescription = myData.data.Page.media[i].description;
        let dataCoverImageLarge = dataCoverImage=myData.data.Page.media[i].coverImage.large;

        thisMediaBox.setAttribute('data-genres', dataGenres);
        thisMediaBox.setAttribute('data-siteurl', dataSiteUrl);
        thisMediaBox.setAttribute('data-description', dataDescription);
        thisMediaBox.setAttribute('data-coverimagelarge', dataCoverImageLarge);
        



        //create element and then set class name and source
        let thisMediaImage = document.createElement('img'); 
        thisMediaImage.className = "mediaImage";
        thisMediaImage.title = "More information";
        thisMediaImage.src=dataCoverImage; 


        //Find out the user preference
        let thisMediaTitle = document.createElement('div');
        thisMediaTitle.className = "mediaTitle";
        if(titlePreference=="Romaji"){
            thisMediaTitle.textContent = dataTitleRomaji;
        }
        else if(titlePreference=="English"){
            thisMediaTitle.textContent = dataTitleEnglish;
        }
        else{
            thisMediaTitle.textContent = dataTitleNative;
        }

        //check if the data for title is null and if it is make adjustments
        if(titlePreference=="English" && dataTitleEnglish==null){
            thisMediaTitle.textContent = dataTitleRomaji;
        }

        if(titlePreference=="Romaji" && dataTitleRomaji==null){
            thisMediaTitle.textContent = dataTitleNative;
        }


        //find out if it is on the user's list or not and have add to list or remove from list on it
        let thisMediaOptions = document.createElement('div');
        thisMediaOptions.className = "mediaOptions";
        if(onListFlag==true){
            let thisMediaOptionsText1 =document.createElement('button');
            let minusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            minusSVG.setAttribute('width','20');
            minusSVG.setAttribute('height','20');
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d','M2,12 H2,18');
            path.setAttribute('stroke','white');
            path.setAttribute('stroke-width','5');
            path.setAttribute('fill','white');
            minusSVG.appendChild(path);
            thisMediaOptionsText1.appendChild(minusSVG);
            thisMediaOptionsText1.className="removeButton";
            thisMediaOptionsText1.title="Remove from list";
            thisMediaOptions.appendChild(thisMediaOptionsText1);
        }
        if(onListFlag==false){
            let thisMediaOptionsText2=document.createElement('button');
            let plusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            plusSVG.setAttribute('width','20');
            plusSVG.setAttribute('height','20');
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d','M2,11 H2,18 M10,2 V2,19');
            path.setAttribute('stroke','white');
            path.setAttribute('stroke-width','5');
            path.setAttribute('fill','white');
            plusSVG.appendChild(path);
            thisMediaOptionsText2.appendChild(plusSVG);
            thisMediaOptionsText2.className="addButton";
            thisMediaOptionsText2.title="Add to list";
            thisMediaOptions.appendChild(thisMediaOptionsText2);
        }

        //display media info
        let thisMediaInfo = document.createElement('ul');
        thisMediaInfo.className = "mediaInfo";
        let info1 =  document.createElement('li');
        info1.textContent = "Score: " + dataAverageScore +"%";
        let info2 =  document.createElement('li');
        info2.textContent = "Episodes: " + dataEpisodes;
        let info3 =  document.createElement('li');
        info3.textContent = "Volumes: " + dataVolumes;
        let info4 =  document.createElement('li');
        info4.textContent = "Chapters: " + dataChapters;
        let info5 =  document.createElement('li');
        info5.textContent = "Type: " + dataFormat;
        let info6 =  document.createElement('li');
        info6.textContent = "Season: " + dataSeason + " " + dataStartDateYear;
        let info7 = document.createElement('li');
        info7.textContent = "Released: " + dataStartDateMonth + "/" + dataStartDateDay + "/" + dataStartDateYear;


        let info1alt =  document.createElement('li');
        info1alt.textContent = "Score: ?";
        let info2alt =  document.createElement('li');
        info2alt.textContent = "Episodes: ?";
        let info3alt =  document.createElement('li');
        info3alt.textContent = "Volumes: ?";
        let info4alt =  document.createElement('li');
        info4alt.textContent = "Chapters: ?";
        let info5alt =  document.createElement('li');
        info5alt.textContent = "Type: ?";
        let info6alt =  document.createElement('li');
        info6alt.textContent = "Season: ?";
        let info7alt = document.createElement('li');
        info7alt.textContent = "Released: ?";

        calculateMyType(dataType,dataFormat); //calculates it in global variable myMediaType

        //add to mediaBox
        thisMediaBox.appendChild(thisMediaImage);
        thisMediaBox.appendChild(thisMediaTitle);
        thisMediaBox.appendChild(thisMediaOptions);


        if(dataEpisodes!=null&&dataType=="ANIME"){
            thisMediaInfo.appendChild(info2);
        }
        if(dataEpisodes==null&&dataType=="ANIME"){
            thisMediaInfo.appendChild(info2alt);
        }
        if(dataChapters!=null&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info4);
        }
        if(dataChapters==null&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info4alt);
        }
        if(dataVolumes!=null&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info3);
        }
        if(dataVolumes==null&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info3alt);
        }

        if(dataAverageScore!=null){
            thisMediaInfo.appendChild(info1);
        }
        if(dataAverageScore==null){
            thisMediaInfo.appendChild(info1alt);
        }

        if(dataFormat!=null){
            thisMediaInfo.appendChild(info5);
        }
        if(dataFormat==null&&dataType=="ANIME"){
            thisMediaInfo.appendChild(info5alt);
        }
        if(dataSeason!=null){
            thisMediaInfo.appendChild(info6);
        }
        if(dataSeason==null&&dataType=="ANIME"){
            thisMediaInfo.appendChild(info6alt);
        }
        if(dataStartDateDay!=null&&dataStartDateMonth!=null&&dataStartDateYear!=null&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info7);
        }
        if((dataStartDateDay==null||dataStartDateMonth==null||dataStartDateYear==null)&&dataType=="MANGA"){
            thisMediaInfo.appendChild(info7alt);
        }


        thisMediaBox.appendChild(thisMediaInfo); //no more changes to media info here

        let thisMediaBoxClone = thisMediaBox.cloneNode(true);
        thisMediaBoxClone.className = "searchMediaBox";
        
        if(dataStatus=="RELEASING"){
            if(myColorPreference==1){
                thisMediaBox.style.borderColor="yellowgreen";
                thisMediaBoxClone.style.borderColor="yellowgreen";
            }
            else{
                thisMediaBox.style.borderColor="goldenrod";
                thisMediaBoxClone.style.borderColor="goldenrod";
            }
        }
        if(dataStatus=="NOT_YET_RELEASED"){
            if(myColorPreference==1){
                thisMediaBox.style.borderColor="orangered";
                thisMediaBoxClone.style.borderColor="orangered";
            }
            else{
                thisMediaBox.style.borderColor="sienna";
                thisMediaBoxClone.style.borderColor="sienna";
            }
        }

        //if anime, then do this format
        if(myMediaType=="anime"){
            searchFragAnime.appendChild(thisMediaBoxClone);
        }
        else if(myMediaType=="lightNovel"){//if light novel, then do this format
            searchFragLightNovels.appendChild(thisMediaBoxClone);
        }
        else{//if manga, then do this format
            searchFragManga.appendChild(thisMediaBoxClone);
        }


        searchFrag.appendChild(thisMediaBox);
    }
    if(dataHasNextPage===true){
        totalSubtractor+=50;
    }
    else{
        totalSubtractor=0;
    }

    

    thisSearchTab.appendChild(searchFrag);
    thisSearchAnimeTab.appendChild(searchFragAnime);
    thisSearchMangaTab.appendChild(searchFragManga);
    thisSearchLightNovelTab.appendChild(searchFragLightNovels);
    return 0;
}


//handle error
function handleError(error) {
    console.error(error);
}
//throw it in here later
function aniListSearchFunction(){

}


function removeAllChildNodes(parent){ 
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}



//change page number if hasNextPage is true
//isAdultContent is based on user preference
async function searchAniListProcess(sbi,isAdultContent, counter){
    var query = `query ($page: Int, $isAdult: Boolean, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {    
            pageInfo {
                total     
                currentPage      
                lastPage      
                hasNextPage      
                perPage    
            } 
            media (search: $search, isAdult: $isAdult) {
                id   
                type
                format
                title {     
                    romaji
                    english
                    native
                }  
                status
                episodes
                averageScore
                chapters
                volumes  
                startDate{
                    day
                    month
                    year
                }
                season
                seasonYear
                coverImage{
                    medium
                }
            }  
        }
    }
    `;
    var variables = {
        search:sbi,
        isAdult: isAdultContent,
        page: counter,
        perPage: 50 //50 is max per page
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

    await fetching(u, options);


    return 0;
}


async function searchAniListProcessAuthOnList(sbi,isAdultContent, counter){
    var query = `query ($page: Int, $isAdult: Boolean, $perPage: Int, $search: String, $onList: Boolean) {
        Page (page: $page, perPage: $perPage) {    
            pageInfo {
                total     
                currentPage      
                lastPage      
                hasNextPage      
                perPage    
            } 
            media (search: $search, isAdult: $isAdult, onList: $onList) {
                id   
                type
                format
                title {     
                    romaji
                    english
                    native
                }  
                status
                episodes
                averageScore
                chapters
                volumes  
                genres
                description
                siteUrl
                startDate{
                    day
                    month
                    year
                }
                season
                seasonYear
                coverImage{
                    medium
                    large
                }
                
            }  
        }
    }
    `;
    var variables = {
        search:sbi,
        isAdult: isAdultContent,
        page: counter,
        perPage: 50, //50 is max per page
        onList: true
    };
    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    await fetching(u, options);


    return 0;
}

async function searchAniListProcessAuthNotOnList(sbi,isAdultContent, counter){
    var query = `query ($page: Int, $isAdult: Boolean, $perPage: Int, $search: String, $onList: Boolean) {
        Page (page: $page, perPage: $perPage) {    
            pageInfo {
                total     
                currentPage      
                lastPage      
                hasNextPage      
                perPage    
            } 
            media (search: $search, isAdult: $isAdult, onList: $onList) {
                id   
                type
                format
                title {     
                    romaji
                    english
                    native
                }  
                status
                episodes
                averageScore
                chapters
                volumes  
                genres
                description
                siteUrl
                startDate{
                    day
                    month
                    year
                }
                season
                seasonYear
                coverImage{
                    medium
                    large
                }
                
            }  
        }
    }
    `;
    var variables = {
        search:sbi,
        isAdult: isAdultContent,
        page: counter,
        perPage: 50, //50 is max per page
        onList: false
    };
    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    await fetching(u, options);


    return 0;
}






//FOR INFO WINDOW DETAILS
function singleObjectSearchAnime(myID){
    //single object search
    var query = `
    query ($id: Int){
    Media (id: $id, type: ANIME) { 
        id
        title{
            romaji
            english 
            native
        }
        genres
        description
        siteUrl
        coverImage{
            large
        }
        averageScore
        popularity
    }
    }
    `;

    var variables = {
        id: myID
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

        fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
}

function singleObjectSearchManga(myID){
    //single object search
    var query = `
    query ($id: Int){
        Media (id: $id, type: MANGA) { 
            id
            title{
                romaji
                english 
                native
            }
            genres
            description
            siteUrl
            coverImage{
                large
            }
            averageScore
            popularity
        }
        }
    `;

    var variables = {
        id: myID
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

        fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
}


async function handleDataForUserID(data) {
    const datajsonstring = JSON.stringify(data);
    console.log(datajsonstring);
}

var storageUserName = getStorageMyUserName();

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




/*
    sort: *The following*
    SCORE
    SCORE_DESC

    MEDIA_TITLE_ROMAJI
    MEDIA_TITLE_ROMAJI_DESC
    MEDIA_TITLE_ENGLISH
    MEDIA_TITLE_ENGLISH_DESC
    MEDIA_TITLE_NATIVE
    MEDIA_TITLE_NATIVE_DESC

    PROGRESS
    PROGRESS_DESC

    PROGRESS_VOLUMES
    PROGRESS_VOLUMES_DESC

    STATUS
    STATUS_DESCENDING
*/

async function getMyListFromCollectionAnime(myUserID){
    //single object search
    var query = `
    query ($userId: Int){
            MediaListCollection(userId:$userId, type:ANIME sort:UPDATED_TIME_DESC){
                lists{
                    status
                    isSplitCompletedList
                    isCustomList
                    name
                    entries{
                        media{
                            id
                            title{
                                romaji
                                english 
                                native
                            }
                            season
                            seasonYear
                            episodes
                            chapters
                            volumes
                            type
                            format
                            status
                            coverImage{
                                medium
                                large
                            }
                            startDate{
                                year
                                month
                                day
                            }
                            description
                            genres
                            status
                            siteUrl
                            duration
                            averageScore
                            meanScore
                            mediaListEntry {
                                mediaId
                                progress
                                progressVolumes
                                userId
                                id
                                user{
                                    name
                                }
                                status
                            }
                        }
                        mediaId
                        progress
                        progressVolumes
                        score
                        status
                        notes
                        startedAt{
                            year
                            month
                            day
                        }
                        completedAt{
                            year
                            month
                            day
                        }
                        repeat
                    }
                }
            }
        }
    `;

    var variables = {
        userId: myUserID
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
        await fetchingForList(u, options);
        return 0;
}



async function getMyListFromCollectionManga(myUserID){
    //single object search
    var query = `
    query ($userId: Int){
            MediaListCollection(userId:$userId, type:MANGA, sort:UPDATED_TIME_DESC){
                lists{
                    status
                    isSplitCompletedList
                    isCustomList
                    name
                    entries{
                        media{
                            id
                            title{
                                romaji
                                english 
                                native
                            }
                            season
                            seasonYear
                            episodes
                            chapters
                            volumes
                            type
                            format
                            status
                            coverImage{
                                medium
                                large
                            }
                            startDate{
                                year
                                month
                                day
                            }
                            description
                            genres
                            status
                            siteUrl
                            duration
                            averageScore
                            meanScore
                            mediaListEntry {
                                mediaId
                                progress
                                progressVolumes
                                userId
                                id
                                user{
                                    name
                                }
                                status
                            }
                        }
                        mediaId
                        progress
                        progressVolumes
                        score
                        status
                        notes
                        startedAt{
                            year
                            month
                            day
                        }
                        completedAt{
                            year
                            month
                            day
                        }
                        repeat
                    }
                }
            }
        }
    `;

    var variables = {
        userId: myUserID
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };
        await fetchingForList2(u, options);
        return 0;
}



//progress volumes does not work, need to make the sort


async function fetchingForList(u, options){
    return fetch(u, options).then(handleResponse).then(handleDataFromListCollection).catch(handleError);
}

async function fetchingForList2(u, options){
    return fetch(u, options).then(handleResponse).then(handleDataFromListCollectionManga).catch(handleError);
}

async function handleDataFromListCollectionManga(myData){
    const datajsonstring = JSON.stringify(myData);
    console.log("manga list refreshed")

    let listArrayTotal = myData.data.MediaListCollection.lists.length;

    let dynamicArrayActualListNumbers= new Array(); //numbers for list array that are real lists

    for(let i=0; i<listArrayTotal;i++){
        if(myData.data.MediaListCollection.lists[i].isCustomList==false&&myData.data.MediaListCollection.lists[i].isSplitCompletedList==false){
            dynamicArrayActualListNumbers.push(i); //only push the ones that are not custom and split completed lists
        }
    }


    removeAllChildNodes(thisMangaReadingTab);
    removeAllChildNodes(thisMangaCompletedTab);
    removeAllChildNodes(thisMangaDroppedTab);
    removeAllChildNodes(thisMangaOnHoldTab);
    removeAllChildNodes(thisMangaPlanToReadTab);
    removeAllChildNodes(thisMangaAllTab);
    removeAllChildNodes(thisLightNovelReadingTab);
    removeAllChildNodes(thisLightNovelCompletedTab);
    removeAllChildNodes(thisLightNovelDroppedTab);
    removeAllChildNodes(thisLightNovelOnHoldTab);
    removeAllChildNodes(thisLightNovelPlanToReadTab);
    removeAllChildNodes(thisLightNovelAllTab);

    dynamicArrayActualListNumbers.forEach(element => {
        for(let i = 0; i<myData.data.MediaListCollection.lists[element].entries.length; i++){

            let dataID, dataType, dataFormat, dataTitleRomaji, dataTitleEnglish, dataTitleNative, dataStatus, 
            dataEpisodes, dataChapters, dataVolumes, dataStartDateDay, dataStartDateMonth, dataStartDateYear,
            dataSeason, dataSeasonYear, dataCoverImage; 
            let dataMyStatus, dataMyScore, dataMediaStatus, dataMyProgress, dataMyProgressVolumes, dataMyMediaID;
            //new ones        
            dataMyStatus=myData.data.MediaListCollection.lists[element].entries[i].status;
            //console.log(dataMyStatus);       
            dataMyScore=myData.data.MediaListCollection.lists[element].entries[i].score;
            //console.log(dataMyScore);
            dataMyProgress=myData.data.MediaListCollection.lists[element].entries[i].progress;
            //console.log(dataMyProgress);
            dataMyProgressVolumes=myData.data.MediaListCollection.lists[element].entries[i].progressVolumes;
            //console.log(dataMyProgressVolumes);
            dataID=myData.data.MediaListCollection.lists[element].entries[i].mediaId;
            //console.log(dataID);
            dataMyMediaID= myData.data.MediaListCollection.lists[element].entries[i].mediaId;
            //console.log(dataMyMediaID);

            //old media stuff
            dataTitleRomaji=myData.data.MediaListCollection.lists[element].entries[i].media.title.romaji;
            if(dataTitleRomaji!=null){
                //console.log(dataTitleRomaji);
            }

            dataTitleEnglish=myData.data.MediaListCollection.lists[element].entries[i].media.title.english;
            if(dataTitleEnglish!=null){
                //console.log(dataTitleEnglish);
            }

            dataTitleNative=myData.data.MediaListCollection.lists[element].entries[i].media.title.native;
            if(dataTitleNative!=null){
                //console.log(dataTitleNative);
            }

            dataSeason=myData.data.MediaListCollection.lists[element].entries[i].media.season;
            if(dataSeason!=null){
                //console.log(dataSeason);
            }

            dataSeasonYear=myData.data.MediaListCollection.lists[element].entries[i].media.dataSeasonYear; //idk about this
            if(dataSeasonYear!=null){
                //console.log(dataSeasonYear);
            }

            dataEpisodes=myData.data.MediaListCollection.lists[element].entries[i].media.episodes;
            if(dataEpisodes!=null){
                //console.log(dataEpisodes);
            }

            dataChapters=myData.data.MediaListCollection.lists[element].entries[i].media.chapters;
            if(dataChapters!=null){
                //console.log(dataChapters);
            }

            dataVolumes=myData.data.MediaListCollection.lists[element].entries[i].media.volumes;
            if(dataVolumes!=null){
                //console.log(dataVolumes);
            }

            dataType=myData.data.MediaListCollection.lists[element].entries[i].media.type;
            //console.log(dataType);

            dataFormat=myData.data.MediaListCollection.lists[element].entries[i].media.format;
            //console.log(dataFormat);     

            dataStatus=myData.data.MediaListCollection.lists[element].entries[i].media.status;
            //console.log(dataStatus);

            dataStartDateDay=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.day;
            //console.log(dataStartDateDay);

            dataStartDateMonth=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.month;
            //console.log(dataStartDateMonth);

            dataStartDateYear=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.year;
            //console.log(dataStartDateYear);

            dataCoverImage=myData.data.MediaListCollection.lists[element].entries[i].media.coverImage.medium;
            //console.log(dataCoverImage);

            
            dataMediaStatus=myData.data.MediaListCollection.lists[element].entries[i].media.status;
            //console.log(dataMediaStatus);

            //extra stuff for advanced media window
            let dataDescription, dataGenres, dataSiteUrl, dataDuration,dataAverageScore, dataMeanScore, dataCoverImageLarge, 
            dataMyNotes, dataMyStartDateYear,dataMyStartDateMonth, dataMyStartDateDay, dataMyCompletedDateYear, 
            dataMyCompletedDateMonth, dataMyCompletedDateDay,dataListEntryId;

            dataDescription=myData.data.MediaListCollection.lists[element].entries[i].media.description;
            dataGenres=myData.data.MediaListCollection.lists[element].entries[i].media.genres;
            dataSiteUrl=myData.data.MediaListCollection.lists[element].entries[i].media.siteUrl;
            dataDuration=myData.data.MediaListCollection.lists[element].entries[i].media.duration;
            dataAverageScore=myData.data.MediaListCollection.lists[element].entries[i].media.averageScore;
            dataMeanScore=myData.data.MediaListCollection.lists[element].entries[i].media.meanScore;
            dataCoverImageLarge=myData.data.MediaListCollection.lists[element].entries[i].media.coverImage.large;
            dataMyNotes =myData.data.MediaListCollection.lists[element].entries[i].notes;
            dataMyStartDateYear = myData.data.MediaListCollection.lists[element].entries[i].startedAt.year;
            dataMyStartDateMonth = myData.data.MediaListCollection.lists[element].entries[i].startedAt.month;
            dataMyStartDateDay = myData.data.MediaListCollection.lists[element].entries[i].startedAt.day;
            dataMyCompletedDateYear = myData.data.MediaListCollection.lists[element].entries[i].completedAt.year;
            dataMyCompletedDateMonth = myData.data.MediaListCollection.lists[element].entries[i].completedAt.month;
            dataMyCompletedDateDay = myData.data.MediaListCollection.lists[element].entries[i].completedAt.day;
            dataListEntryId = myData.data.MediaListCollection.lists[element].entries[i].media.mediaListEntry.id;



            let thisMediaBox = document.createElement('div');
            thisMediaBox.className = "mediaBox";
            thisMediaBox.setAttribute('data-id', dataID);
            thisMediaBox.setAttribute('data-type', dataType);
            thisMediaBox.setAttribute('data-format', dataFormat);
            thisMediaBox.setAttribute('data-titleromaji', dataTitleRomaji);
            thisMediaBox.setAttribute('data-titleenglish', dataTitleEnglish);
            thisMediaBox.setAttribute('data-titlenative', dataTitleNative);
            thisMediaBox.setAttribute('data-status', dataStatus);
            thisMediaBox.setAttribute('data-episodes', dataEpisodes);
            thisMediaBox.setAttribute('data-chapters', dataChapters);
            thisMediaBox.setAttribute('data-volumes', dataVolumes);
            thisMediaBox.setAttribute('data-season', dataSeason);
            thisMediaBox.setAttribute('data-startdateday', dataStartDateDay);
            thisMediaBox.setAttribute('data-startdatemonth', dataStartDateMonth);
            thisMediaBox.setAttribute('data-startdateyear', dataStartDateYear);
            thisMediaBox.setAttribute('data-seasonyear', dataSeasonYear);
            thisMediaBox.setAttribute('data-myscore', dataMyScore);
            thisMediaBox.setAttribute('data-myprogress', dataMyProgress);
            thisMediaBox.setAttribute('data-myprogressvolumes', dataMyProgressVolumes);
            thisMediaBox.setAttribute('data-mediaid', dataMyMediaID);
            thisMediaBox.setAttribute('data-mystatus', dataMyStatus);


            thisMediaBox.setAttribute('data-mediastatus', dataMediaStatus);

            //new stuff for advanced
            thisMediaBox.setAttribute('data-description', dataDescription);
            thisMediaBox.setAttribute('data-genres', dataGenres);
            thisMediaBox.setAttribute('data-siteurl', dataSiteUrl);
            thisMediaBox.setAttribute('data-duration', dataDuration);
            thisMediaBox.setAttribute('data-averagescore', dataAverageScore);
            thisMediaBox.setAttribute('data-meanscore', dataMeanScore);
            thisMediaBox.setAttribute('data-coverimage', dataCoverImage);
            thisMediaBox.setAttribute('data-coverimagelarge', dataCoverImageLarge);
            thisMediaBox.setAttribute('data-mynotes', dataMyNotes);
            thisMediaBox.setAttribute('data-mystartdateyear', dataMyStartDateYear);
            thisMediaBox.setAttribute('data-mystartdatemonth', dataMyStartDateMonth);
            thisMediaBox.setAttribute('data-mystartdateday', dataMyStartDateDay);
            thisMediaBox.setAttribute('data-mycompleteddateyear', dataMyCompletedDateYear);
            thisMediaBox.setAttribute('data-mycompleteddatemonth', dataMyCompletedDateMonth);
            thisMediaBox.setAttribute('data-mycompleteddateday', dataMyCompletedDateDay);
            thisMediaBox.setAttribute('data-listentryid', dataListEntryId);
            
            let dataRepeat = myData.data.MediaListCollection.lists[element].entries[i].repeat;
            thisMediaBox.setAttribute('data-repeat', dataRepeat);


            //create element and then set class name and source
            let thisMediaImage = document.createElement('img'); 
            thisMediaImage.className = "mediaImage";
            thisMediaImage.title = "More information";
            thisMediaImage.src=dataCoverImage; 



            //Find out the user preference
            let thisMediaTitle = document.createElement('div');
            thisMediaTitle.className = "mediaTitle";
            if(titlePreference=="Romaji"){
                thisMediaTitle.textContent = dataTitleRomaji;
            }
            else if(titlePreference=="English"){
                thisMediaTitle.textContent = dataTitleEnglish;
            }
            else{
                thisMediaTitle.textContent = dataTitleNative;
            }

            //check if the data for title is null and if it is make adjustments
            if(titlePreference=="English" && dataTitleEnglish==null){
                thisMediaTitle.textContent = dataTitleRomaji;
            }

            if(titlePreference=="Romaji" && dataTitleRomaji==null){
                thisMediaTitle.textContent = dataTitleNative;
            }

            

            //find out if it is on the user's list or not and have add to list or remove from list on it
            let thisMediaOptions = document.createElement('div');
            thisMediaOptions.className = "mediaOptions";

            let thisMediaOptionsText1 = document.createElement('button');


            let minusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            minusSVG.setAttribute('width','20');
            minusSVG.setAttribute('height','20');
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d','M2,12 H2,18');
            path.setAttribute('stroke','white');
            path.setAttribute('stroke-width','5');
            path.setAttribute('fill','white');
            minusSVG.appendChild(path);
            thisMediaOptionsText1.appendChild(minusSVG);

            thisMediaOptionsText1.className="removeButton";
            thisMediaOptionsText1.title="Remove from list";
            thisMediaOptions.appendChild(thisMediaOptionsText1);



            //display media info
            let thisMediaInfo = document.createElement('ul');
            thisMediaInfo.className = "mediaInfo";
            let info1 =  document.createElement('li');
            info1.textContent = "Score:" 
            let info1Score = document.createElement('input');
            info1Score.className = "scoreInput";
            info1Score.type = "number";
            info1Score.value=dataMyScore;
            info1Score.min=0;
            info1Score.max=10;
            info1.appendChild(info1Score); 
            let info1ScoreInfo = document.createTextNode("/10");
            info1.appendChild(info1ScoreInfo);
            let info2EpisInput = document.createElement('input');
            info2EpisInput.className="episodeInput";
            info2EpisInput.type = "number";
            info2EpisInput.min = 0;
            info2EpisInput.max = dataEpisodes;
            info2EpisInput.value = dataMyProgress;
            info2EpisInput.step = "1";
            //event listener to check when value inside input is greater than or equal to the number of episodes, then move to completed
            let info2Epis = document.createElement('li');
            info2Epis.textContent = "Episodes: ";
            info2Epis.appendChild(info2EpisInput);
            let info2EpisInfo = document.createTextNode("/" + dataEpisodes);
            info2Epis.appendChild(info2EpisInfo);
            let info2Chap = document.createElement('li');
            let info2ChapInput = document.createElement('input');
            info2ChapInput.className="chapterInput";
            info2ChapInput.type = "number";
            info2ChapInput.min=0;
            info2ChapInput.max=dataChapters;
            info2ChapInput.value=dataMyProgress;
            info2ChapInput.step = "1"; 
            info2Chap.textContent = "Chapters: ";
            info2Chap.appendChild(info2ChapInput);
            let info2ChapInfo=document.createTextNode("/" + dataChapters);
            info2Chap.appendChild(info2ChapInfo);
            let info2Vol = document.createElement('li');
            info2Vol.textContent = "Volumes: ";
            let info2VolInput =document.createElement('input');
            info2VolInput.className="volumeInput";
            info2VolInput.type="number";
            info2VolInput.min=0;
            info2VolInput.max=dataVolumes;
            info2VolInput.step = "1";
            info2VolInput.value=dataMyProgressVolumes;
            info2Vol.appendChild(info2VolInput);
            let info2VolInfo = document.createTextNode("/" + dataVolumes);
            info2Vol.appendChild(info2VolInfo);
            let info2=  document.createElement('li');
            info2.textContent = "Episodes: " + dataEpisodes;
            let info3 =  document.createElement('li');
            info3.textContent = "Volumes: " + dataVolumes;
            let info4 =  document.createElement('li');
            info4.textContent = "Chapters: " + dataChapters;
            let info5 =  document.createElement('li');
            info5.textContent = "Type: " + dataFormat;
            let info6 =  document.createElement('li');
            info6.textContent = "Season: " + dataSeason + " " + dataStartDateYear;
            let info7 = document.createElement('li');
            info7.textContent = "Released: " + dataStartDateMonth + "/" + dataStartDateDay + "/" + dataStartDateYear;


            let info1alt =  document.createElement('li');
            info1alt.textContent = "Score: ";
            let info2alt =  document.createElement('li');
            info2alt.textContent = "Episodes: ";
            let info2altEpisInput = document.createElement('input');
            info2altEpisInput.className="episodeInput";
            info2altEpisInput.type="number";
            info2altEpisInput.value=dataMyProgress;
            info2altEpisInput.min=0;
            info2altEpisInput.max=99999;
            info2alt.appendChild(info2altEpisInput);
            let info2altEpisInfo = document.createTextNode("/?");
            info2alt.appendChild(info2altEpisInfo);



            let info4alt =  document.createElement('li');
            info4alt.textContent = "Chapters: ";
            let info4altChapInput = document.createElement('input');
            info4altChapInput.className="chapterInput";
            info4altChapInput.type="number";
            info4altChapInput.value=dataMyProgress;
            info4altChapInput.min=0;
            info4altChapInput.max=99999;
            info4alt.appendChild(info4altChapInput);
            let info4altChapInfo = document.createTextNode("/?");
            info4alt.appendChild(info4altChapInfo);


            let info3alt =  document.createElement('li');
            info3alt.textContent = "Volumes: ";
            let info3altVolInput = document.createElement('input');
            info3altVolInput.className="volumeInput";
            info3altVolInput.type="number";
            info3altVolInput.value=dataMyProgressVolumes;
            info3altVolInput.min=0;
            info3altVolInput.max=99999;
            info3alt.appendChild(info3altVolInput);
            let info3altVolInfo = document.createTextNode("/?");
            info3alt.appendChild(info3altVolInfo);

            let info5alt =  document.createElement('li');
            info5alt.textContent = "Type: ";
            let info6alt =  document.createElement('li');
            info6alt.textContent = "Season: ";
            let info7alt = document.createElement('li');
            info7alt.textContent = "Released: ";

            calculateMyType(dataType,dataFormat); //calculates it in global variable myMediaType

            //add to mediaBox
            thisMediaBox.appendChild(thisMediaImage);
            thisMediaBox.appendChild(thisMediaTitle);
            thisMediaBox.appendChild(thisMediaOptions);


            if(dataEpisodes!=null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info2Epis);
            }
            if(dataEpisodes==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info2alt);
            }

            if(dataChapters!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info2Chap);
            }
            if(dataChapters==null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info4alt);
            }
            if(dataVolumes!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info2Vol);
            }
            if(dataVolumes==null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info3alt);
            }

            if(dataMyScore!=null){
                thisMediaInfo.appendChild(info1);
            }
            else{
                thisMediaInfo.appendChild(info1alt)
            }
            if(dataFormat!=null){
                thisMediaInfo.appendChild(info5);
            }
            if(dataFormat==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info5alt);
            }
            if(dataSeason!=null){
                thisMediaInfo.appendChild(info6);
            }
            if(dataSeason==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info6alt);
            }
            if(dataStartDateDay!=null&&dataStartDateMonth!=null&&dataStartDateYear!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info7);
            }
            if((dataStartDateDay==null||dataStartDateMonth==null||dataStartDateYear==null)&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info7alt);
            }

            let updateItem =document.createElement('li');
            let updateButton = document.createElement('button');
            let updateButtonText = document.createTextNode("Update");
            updateButton.appendChild(updateButtonText);
            updateButton.className = "updateButton";
            updateButton.title = "Update media";
            updateItem.appendChild(updateButton);
            thisMediaInfo.appendChild(updateItem);

            thisMediaBox.appendChild(thisMediaInfo); //no more changes to media info here

            let thisMediaBoxClone = thisMediaBox.cloneNode(true);
            thisMediaBoxClone.className = "mediaBox";
            
            let thisMediaBoxCloneFilter = thisMediaBoxClone.cloneNode(true);
            thisMediaBoxCloneFilter.className = "mediaBoxFilter";


            if(dataStatus=="RELEASING"){
                if(myColorPreference==1){
                    thisMediaBox.style.borderColor="yellowgreen";
                    thisMediaBoxClone.style.borderColor="yellowgreen";
                    thisMediaBoxCloneFilter.style.borderColor="yellowgreen";
                }
                else{
                    thisMediaBox.style.borderColor="goldenrod";
                    thisMediaBoxClone.style.borderColor="goldenrod";
                    thisMediaBoxCloneFilter.style.borderColor="goldenrod";
                }
            }
            if(dataStatus=="NOT_YET_RELEASED"){
                if(myColorPreference==1){
                    thisMediaBox.style.borderColor="orangered";
                    thisMediaBoxClone.style.borderColor="orangered";
                    thisMediaBoxCloneFilter.style.borderColor="orangered";
                }
                else{
                    thisMediaBox.style.borderColor="sienna";
                    thisMediaBoxClone.style.borderColor="sienna";
                    thisMediaBoxCloneFilter.style.borderColor="sienna";
                }
            }

            //if anime, then do this format
            if(myMediaType=="anime"){
                if(dataMyStatus=="CURRENT"){
                    listFragAW.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragAOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragAC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragAD.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragAPTW.appendChild(thisMediaBoxClone);
                }
            }
            else if(myMediaType=="lightNovel"){//if light novel, then do this format
                if(dataMyStatus=="CURRENT"){
                    listFragLNR.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragLNOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragLNC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragLND.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragLNPTW.appendChild(thisMediaBoxClone);
                }
            }
            else if(myMediaType=="manga"){//if manga, then do this format
                if(dataMyStatus=="CURRENT"){
                    listFragMR.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragMOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragMC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragMD.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragMPTW.appendChild(thisMediaBoxClone);
                }
            }

            if(myMediaType=="manga"){
                listFragMAll.appendChild(thisMediaBox);
            }
            if(myMediaType=="lightNovel"){
                listFragLNAll.appendChild(thisMediaBox);
            }

            listFragFilter.appendChild(thisMediaBoxCloneFilter);
            
            

        }
    });

    thisAnimeWatchingTab.appendChild(listFragAW);
    thisAnimeCompletedTab.appendChild(listFragAC);
    thisAnimeOnHoldTab.appendChild(listFragAOH);
    thisAnimeDroppedTab.appendChild(listFragAD);
    thisAnimePlanToWatchTab.appendChild(listFragAPTW);

    thisLightNovelReadingTab.appendChild(listFragLNR);
    thisLightNovelCompletedTab.appendChild(listFragLNC);
    thisLightNovelOnHoldTab.appendChild(listFragLNOH);
    thisLightNovelDroppedTab.appendChild(listFragLND);
    thisLightNovelPlanToReadTab.appendChild(listFragLNPTW);

    thisMangaReadingTab.appendChild(listFragMR);
    thisMangaCompletedTab.appendChild(listFragMC);
    thisMangaOnHoldTab.appendChild(listFragMOH);
    thisMangaDroppedTab.appendChild(listFragMD);
    thisMangaPlanToReadTab.appendChild(listFragMPTW);


    thisAnimeAllTab.appendChild(listFragAAll);
    thisMangaAllTab.appendChild(listFragMAll);
    thisLightNovelAllTab.appendChild(listFragLNAll);
    
    document.getElementById("FilterListTab").appendChild(listFragFilter);

    return 0;
}

async function handleDataFromListCollection(myData){ //handle data Anime list
    const datajsonstring = JSON.stringify(myData);
    console.log("anime list refreshed");


    let listArrayTotal = myData.data.MediaListCollection.lists.length;
    let dynamicArrayActualListNumbers= new Array(); //numbers for list array that are real lists

    for(let i=0; i<listArrayTotal;i++){
        if(myData.data.MediaListCollection.lists[i].isCustomList==false&&myData.data.MediaListCollection.lists[i].isSplitCompletedList==false){
            dynamicArrayActualListNumbers.push(i); //only push the ones that are not custom and split completed lists
        }
    }

    let listNumber1, listNumber2, listNumber3, listNumber4, listNumber5;



    //console.log(listArrayTotal);

    removeAllChildNodes(thisAnimeWatchingTab);
    removeAllChildNodes(thisAnimeCompletedTab);
    removeAllChildNodes(thisAnimeDroppedTab);
    removeAllChildNodes(thisAnimeOnHoldTab);
    removeAllChildNodes(thisAnimePlanToWatchTab);
    removeAllChildNodes(thisAnimeAllTab);
    /*removeAllChildNodes(thisMangaReadingTab);
    removeAllChildNodes(thisMangaCompletedTab);
    removeAllChildNodes(thisMangaDroppedTab);
    removeAllChildNodes(thisMangaOnHoldTab);
    removeAllChildNodes(thisMangaPlanToReadTab);
    removeAllChildNodes(thisMangaAllTab);*/
    //removeAllChildNodes(thisLightNovelReadingTab);
    //removeAllChildNodes(thisLightNovelCompletedTab);
    //removeAllChildNodes(thisLightNovelDroppedTab);
    //removeAllChildNodes(thisLightNovelOnHoldTab);
    //removeAllChildNodes(thisLightNovelPlanToReadTab);
    //removeAllChildNodes(thisLightNovelAllTab);

    removeAllChildNodes(document.getElementById("FilterListTab"));

    dynamicArrayActualListNumbers.forEach(element => {
        for(let i = 0; i<myData.data.MediaListCollection.lists[element].entries.length; i++){
            let dataID, dataType, dataFormat, dataTitleRomaji, dataTitleEnglish, dataTitleNative, dataStatus, 
            dataEpisodes, dataChapters, dataVolumes, dataStartDateDay, dataStartDateMonth, dataStartDateYear,
            dataSeason, dataSeasonYear, dataCoverImage; 
            let dataMyStatus, dataMyScore, dataMediaStatus, dataMyProgress, dataMyProgressVolumes, dataMyMediaID;
            //new ones        
            dataMyStatus=myData.data.MediaListCollection.lists[element].entries[i].status;
            //console.log(dataMyStatus);       
            dataMyScore=myData.data.MediaListCollection.lists[element].entries[i].score;
            //console.log(dataMyScore);
            dataMyProgress=myData.data.MediaListCollection.lists[element].entries[i].progress;
            //console.log(dataMyProgress);
            dataMyProgressVolumes=myData.data.MediaListCollection.lists[element].entries[i].progressVolumes;
            //console.log(dataMyProgressVolumes);
            dataID=myData.data.MediaListCollection.lists[element].entries[i].mediaId;
            //console.log(dataID);
            dataMyMediaID= myData.data.MediaListCollection.lists[element].entries[i].mediaId;
            //console.log(dataMyMediaID);

            //old media stuff
            dataTitleRomaji=myData.data.MediaListCollection.lists[element].entries[i].media.title.romaji;
            if(dataTitleRomaji!=null){
                //console.log(dataTitleRomaji);
            }

            dataTitleEnglish=myData.data.MediaListCollection.lists[element].entries[i].media.title.english;
            if(dataTitleEnglish!=null){
                //console.log(dataTitleEnglish);
            }

            dataTitleNative=myData.data.MediaListCollection.lists[element].entries[i].media.title.native;
            if(dataTitleNative!=null){
                //console.log(dataTitleNative);
            }

            dataSeason=myData.data.MediaListCollection.lists[element].entries[i].media.season;
            if(dataSeason!=null){
                //console.log(dataSeason);
            }

            dataSeasonYear=myData.data.MediaListCollection.lists[element].entries[i].media.dataSeasonYear; //idk about this
            if(dataSeasonYear!=null){
                //console.log(dataSeasonYear);
            }

            dataEpisodes=myData.data.MediaListCollection.lists[element].entries[i].media.episodes;
            if(dataEpisodes!=null){
                //console.log(dataEpisodes);
            }

            dataChapters=myData.data.MediaListCollection.lists[element].entries[i].media.chapters;
            if(dataChapters!=null){
                //console.log(dataChapters);
            }

            dataVolumes=myData.data.MediaListCollection.lists[element].entries[i].media.volumes;
            if(dataVolumes!=null){
                //console.log(dataVolumes);
            }

            dataType=myData.data.MediaListCollection.lists[element].entries[i].media.type;
            //console.log(dataType);

            dataFormat=myData.data.MediaListCollection.lists[element].entries[i].media.format;
            //console.log(dataFormat);     

            dataStatus=myData.data.MediaListCollection.lists[element].entries[i].media.status;
            //console.log(dataStatus);

            dataStartDateDay=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.day;
            //console.log(dataStartDateDay);

            dataStartDateMonth=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.month;
            //console.log(dataStartDateMonth);

            dataStartDateYear=myData.data.MediaListCollection.lists[element].entries[i].media.startDate.year;
            //console.log(dataStartDateYear);

            dataCoverImage=myData.data.MediaListCollection.lists[element].entries[i].media.coverImage.medium;
            //console.log(dataCoverImage);

            
            dataMediaStatus=myData.data.MediaListCollection.lists[element].entries[i].media.status;
            //console.log(dataMediaStatus);

            //extra stuff for advanced media window
            let dataDescription, dataGenres, dataSiteUrl, dataDuration,dataAverageScore, dataMeanScore, dataCoverImageLarge, 
            dataMyNotes, dataMyStartDateYear,dataMyStartDateMonth, dataMyStartDateDay, dataMyCompletedDateYear, 
            dataMyCompletedDateMonth, dataMyCompletedDateDay,dataListEntryId;

            dataDescription=myData.data.MediaListCollection.lists[element].entries[i].media.description;
            dataGenres=myData.data.MediaListCollection.lists[element].entries[i].media.genres;
            dataSiteUrl=myData.data.MediaListCollection.lists[element].entries[i].media.siteUrl;
            dataDuration=myData.data.MediaListCollection.lists[element].entries[i].media.duration;
            dataAverageScore=myData.data.MediaListCollection.lists[element].entries[i].media.averageScore;
            dataMeanScore=myData.data.MediaListCollection.lists[element].entries[i].media.meanScore;
            dataCoverImageLarge=myData.data.MediaListCollection.lists[element].entries[i].media.coverImage.large;
            dataMyNotes =myData.data.MediaListCollection.lists[element].entries[i].notes;
            dataMyStartDateYear = myData.data.MediaListCollection.lists[element].entries[i].startedAt.year;
            dataMyStartDateMonth = myData.data.MediaListCollection.lists[element].entries[i].startedAt.month;
            dataMyStartDateDay = myData.data.MediaListCollection.lists[element].entries[i].startedAt.day;
            dataMyCompletedDateYear = myData.data.MediaListCollection.lists[element].entries[i].completedAt.year;
            dataMyCompletedDateMonth = myData.data.MediaListCollection.lists[element].entries[i].completedAt.month;
            dataMyCompletedDateDay = myData.data.MediaListCollection.lists[element].entries[i].completedAt.day;
            dataListEntryId = myData.data.MediaListCollection.lists[element].entries[i].media.mediaListEntry.id;


            let thisMediaBox = document.createElement('div');
            thisMediaBox.className = "mediaBox";
            thisMediaBox.setAttribute('data-id', dataID);
            thisMediaBox.setAttribute('data-type', dataType);
            thisMediaBox.setAttribute('data-format', dataFormat);
            thisMediaBox.setAttribute('data-titleromaji', dataTitleRomaji);
            thisMediaBox.setAttribute('data-titleenglish', dataTitleEnglish);
            thisMediaBox.setAttribute('data-titlenative', dataTitleNative);
            thisMediaBox.setAttribute('data-status', dataStatus);
            thisMediaBox.setAttribute('data-episodes', dataEpisodes);
            thisMediaBox.setAttribute('data-chapters', dataChapters);
            thisMediaBox.setAttribute('data-volumes', dataVolumes);
            thisMediaBox.setAttribute('data-season', dataSeason);
            thisMediaBox.setAttribute('data-startdateday', dataStartDateDay);
            thisMediaBox.setAttribute('data-startdatemonth', dataStartDateMonth);
            thisMediaBox.setAttribute('data-startdateyear', dataStartDateYear);
            thisMediaBox.setAttribute('data-seasonyear', dataStartDateYear);
            thisMediaBox.setAttribute('data-myscore', dataMyScore);
            thisMediaBox.setAttribute('data-myprogress', dataMyProgress);
            thisMediaBox.setAttribute('data-myprogressvolumes', dataMyProgressVolumes);
            thisMediaBox.setAttribute('data-mediaid', dataMyMediaID);
            thisMediaBox.setAttribute('data-mystatus', dataMyStatus);
            thisMediaBox.setAttribute('data-mediastatus', dataMediaStatus);

            //new stuff for advanced
            thisMediaBox.setAttribute('data-description', dataDescription);
            thisMediaBox.setAttribute('data-genres', dataGenres);
            thisMediaBox.setAttribute('data-siteurl', dataSiteUrl);
            thisMediaBox.setAttribute('data-duration', dataDuration);
            thisMediaBox.setAttribute('data-averagescore', dataAverageScore);
            thisMediaBox.setAttribute('data-meanscore', dataMeanScore);
            thisMediaBox.setAttribute('data-coverimage', dataCoverImage);
            thisMediaBox.setAttribute('data-coverimagelarge', dataCoverImageLarge);
            thisMediaBox.setAttribute('data-mynotes', dataMyNotes);
            thisMediaBox.setAttribute('data-mystartdateyear', dataMyStartDateYear);
            thisMediaBox.setAttribute('data-mystartdatemonth', dataMyStartDateMonth);
            thisMediaBox.setAttribute('data-mystartdateday', dataMyStartDateDay);
            thisMediaBox.setAttribute('data-mycompleteddateyear', dataMyCompletedDateYear);
            thisMediaBox.setAttribute('data-mycompleteddatemonth', dataMyCompletedDateMonth);
            thisMediaBox.setAttribute('data-mycompleteddateday', dataMyCompletedDateDay);
            thisMediaBox.setAttribute('data-listentryid', dataListEntryId);

            let dataRepeat = myData.data.MediaListCollection.lists[element].entries[i].repeat;
            thisMediaBox.setAttribute('data-repeat', dataRepeat);



            //create element and then set class name and source
            let thisMediaImage = document.createElement('img'); 
            thisMediaImage.className = "mediaImage";
            thisMediaImage.title = "More information";
            thisMediaImage.src=dataCoverImage; 



            //Find out the user preference
            let thisMediaTitle = document.createElement('div');
            thisMediaTitle.className = "mediaTitle";
            if(titlePreference=="Romaji"){
                thisMediaTitle.textContent = dataTitleRomaji;
            }
            else if(titlePreference=="English"){
                thisMediaTitle.textContent = dataTitleEnglish;
            }
            else{
                thisMediaTitle.textContent = dataTitleNative;
            }

            //check if the data for title is null and if it is make adjustments
            if(titlePreference=="English" && dataTitleEnglish==null){
                thisMediaTitle.textContent = dataTitleRomaji;
            }

            if(titlePreference=="Romaji" && dataTitleRomaji==null){
                thisMediaTitle.textContent = dataTitleNative;
            }

            

            //find out if it is on the user's list or not and have add to list or remove from list on it
            let thisMediaOptions = document.createElement('div');
            thisMediaOptions.className = "mediaOptions";

            let thisMediaOptionsText1 = document.createElement('button');


            let minusSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            minusSVG.setAttribute('width','20');
            minusSVG.setAttribute('height','20');
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d','M2,12 H2,18');
            path.setAttribute('stroke','white');
            path.setAttribute('stroke-width','5');
            path.setAttribute('fill','white');
            minusSVG.appendChild(path);
            thisMediaOptionsText1.appendChild(minusSVG);

            thisMediaOptionsText1.className="removeButton";
            thisMediaOptionsText1.title="Remove from list";
            thisMediaOptions.appendChild(thisMediaOptionsText1);



            //display media info
            let thisMediaInfo = document.createElement('ul');
            thisMediaInfo.className = "mediaInfo";
            let info1 =  document.createElement('li');
            info1.textContent = "Score:" ;
            let info1Score = document.createElement('input');
            info1Score.className="scoreInput";
            info1Score.type = "number";
            info1Score.value=dataMyScore;
            info1Score.min=0;
            info1Score.max=10;
            info1.appendChild(info1Score); 
            let info1ScoreInfo = document.createTextNode("/10");
            info1.appendChild(info1ScoreInfo);
            let info2EpisInput = document.createElement('input');
            info2EpisInput.className="episodeInput";
            info2EpisInput.type = "number";
            info2EpisInput.min = 0;
            info2EpisInput.max = dataEpisodes;
            info2EpisInput.value = dataMyProgress;
            info2EpisInput.step = "1";
            //event listener to check when value inside input is greater than or equal to the number of episodes, then move to completed
            let info2Epis = document.createElement('li');
            info2Epis.textContent = "Episodes: ";
            info2Epis.appendChild(info2EpisInput);
            let info2EpisInfo = document.createTextNode("/" + dataEpisodes);
            info2Epis.appendChild(info2EpisInfo);
            let info2Chap = document.createElement('li');
            let info2ChapInput = document.createElement('input');
            info2ChapInput.className="chapterInput";
            info2ChapInput.type = "number";
            info2ChapInput.min=0;
            info2ChapInput.max=dataChapters;
            info2ChapInput.value=dataMyProgress;
            info2ChapInput.step = "1"; 
            info2Chap.textContent = "Chapters: ";
            info2Chap.appendChild(info2ChapInput);
            let info2ChapInfo=document.createTextNode("/" + dataChapters);
            info2Chap.appendChild(info2ChapInfo);
            let info2Vol = document.createElement('li');
            info2Vol.textContent = "Volumes: ";
            let info2VolInput =document.createElement('input');
            info2VolInput.className="volumeInput";
            info2VolInput.type="number";
            info2VolInput.min=0;
            info2VolInput.max=dataVolumes;
            info2VolInput.step = "1";
            info2VolInput.value=dataMyProgressVolumes;
            info2Vol.appendChild(info2VolInput);
            let info2VolInfo = document.createTextNode("/" + dataVolumes);
            info2Vol.appendChild(info2VolInfo);
            let info2=  document.createElement('li');
            info2.textContent = "Episodes: " + dataEpisodes;
            let info3 =  document.createElement('li');
            info3.textContent = "Volumes: " + dataVolumes;
            let info4 =  document.createElement('li');
            info4.textContent = "Chapters: " + dataChapters;
            let info5 =  document.createElement('li');
            info5.textContent = "Type: " + dataFormat;
            let info6 =  document.createElement('li');
            info6.textContent = "Season: " + dataSeason + " " + dataStartDateYear;
            let info7 = document.createElement('li');
            info7.textContent = "Released: " + dataStartDateMonth + "/" + dataStartDateDay + "/" + dataStartDateYear;


            let info1alt =  document.createElement('li');
            info1alt.textContent = "Score: ";
            let info2alt =  document.createElement('li');
            info2alt.textContent = "Episodes: ";
            let info2altEpisInput = document.createElement('input');
            info2altEpisInput.className="episodeInput";
            info2altEpisInput.type="number";
            info2altEpisInput.value=dataMyProgress;
            info2altEpisInput.min=0;
            info2altEpisInput.max=99999;
            info2alt.appendChild(info2altEpisInput);
            let info2altEpisInfo = document.createTextNode("/?");
            info2alt.appendChild(info2altEpisInfo);

            let info3alt =  document.createElement('li');
            info3alt.textContent = "Volumes: ";
            let info4alt =  document.createElement('li');
            info4alt.textContent = "Chapters: ";
            let info5alt =  document.createElement('li');
            info5alt.textContent = "Type: ";
            let info6alt =  document.createElement('li');
            info6alt.textContent = "Season: ";
            let info7alt = document.createElement('li');
            info7alt.textContent = "Released: ";

            calculateMyType(dataType,dataFormat); //calculates it in global variable myMediaType

            //add to mediaBox
            thisMediaBox.appendChild(thisMediaImage);
            thisMediaBox.appendChild(thisMediaTitle);
            thisMediaBox.appendChild(thisMediaOptions);


            if(dataEpisodes!=null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info2Epis);
            }
            if(dataEpisodes==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info2alt);
            }

            if(dataVolumes!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info2Vol);
            }
            if(dataVolumes==null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info3alt);
            }
            if(dataChapters!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info2Chap);
            }
            if(dataChapters==null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info4alt);
            }
            if(dataMyScore!=null){
                thisMediaInfo.appendChild(info1);
            }
            else{
                thisMediaInfo.appendChild(info1alt)
            }
            if(dataFormat!=null){
                thisMediaInfo.appendChild(info5);
            }
            if(dataFormat==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info5alt);
            }
            if(dataSeason!=null){
                thisMediaInfo.appendChild(info6);
            }
            if(dataSeason==null&&dataType=="ANIME"){
                thisMediaInfo.appendChild(info6alt);
            }
            if(dataStartDateDay!=null&&dataStartDateMonth!=null&&dataStartDateYear!=null&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info7);
            }
            if((dataStartDateDay==null||dataStartDateMonth==null||dataStartDateYear==null)&&dataType=="MANGA"){
                thisMediaInfo.appendChild(info7alt);
            }

            let updateItem =document.createElement('li');
            let updateButton = document.createElement('button');
            let updateButtonText = document.createTextNode("Update");
            updateButton.appendChild(updateButtonText);
            updateButton.className = "updateButton";
            updateButton.title = "Update media";
            updateItem.appendChild(updateButton);
            thisMediaInfo.appendChild(updateItem);

            thisMediaBox.appendChild(thisMediaInfo); //no more changes to media info here

            let thisMediaBoxClone = thisMediaBox.cloneNode(true);
            thisMediaBoxClone.className = "mediaBox";

            let thisMediaBoxCloneFilter = thisMediaBoxClone.cloneNode(true);
            thisMediaBoxCloneFilter.className = "mediaBoxFilter";
            
            if(dataStatus=="RELEASING"){
                if(myColorPreference==1){
                    thisMediaBox.style.borderColor="yellowgreen";
                    thisMediaBoxClone.style.borderColor="yellowgreen";
                    thisMediaBoxCloneFilter.style.borderColor="yellowgreen";
                }
                else{
                    thisMediaBox.style.borderColor="goldenrod";
                    thisMediaBoxClone.style.borderColor="goldenrod";
                    thisMediaBoxCloneFilter.style.borderColor="goldenrod";
                }
            }
            if(dataStatus=="NOT_YET_RELEASED"){
                if(myColorPreference==1){
                    thisMediaBox.style.borderColor="orangered";
                    thisMediaBoxClone.style.borderColor="orangered";
                    thisMediaBoxCloneFilter.style.borderColor="orangered";
                }
                else{
                    thisMediaBox.style.borderColor="sienna";
                    thisMediaBoxClone.style.borderColor="sienna";
                    thisMediaBoxCloneFilter.style.borderColor="sienna";
                }
            }

            //if anime, then do this format
            if(myMediaType=="anime"){
                if(dataMyStatus=="CURRENT"){
                    listFragAW.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragAOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragAC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragAD.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragAPTW.appendChild(thisMediaBoxClone);
                }
            }
            else if(myMediaType=="lightNovel"){//if light novel, then do this format
                if(dataMyStatus=="CURRENT"){
                    listFragLNR.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragLNOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragLNC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragLND.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragLNPTW.appendChild(thisMediaBoxClone);
                }
            }
            else if(myMediaType=="manga"){//if manga, then do this format
                if(dataMyStatus=="CURRENT"){
                    listFragMR.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PAUSED"){
                    listFragMOH.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="COMPLETED"){
                    listFragMC.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="DROPPED"){
                    listFragMD.appendChild(thisMediaBoxClone);
                }
                if(dataMyStatus=="PLANNING"){
                    listFragMPTW.appendChild(thisMediaBoxClone);
                }
            }

            listFragAAll.appendChild(thisMediaBox);

            listFragFilter.appendChild(thisMediaBoxCloneFilter);

            
        }
    });

    thisAnimeWatchingTab.appendChild(listFragAW);
    thisAnimeCompletedTab.appendChild(listFragAC);
    thisAnimeOnHoldTab.appendChild(listFragAOH);
    thisAnimeDroppedTab.appendChild(listFragAD);
    thisAnimePlanToWatchTab.appendChild(listFragAPTW);

    thisLightNovelReadingTab.appendChild(listFragLNR);
    thisLightNovelCompletedTab.appendChild(listFragLNC);
    thisLightNovelOnHoldTab.appendChild(listFragLNOH);
    thisLightNovelDroppedTab.appendChild(listFragLND);
    thisLightNovelPlanToReadTab.appendChild(listFragLNPTW);

    thisMangaReadingTab.appendChild(listFragMR);
    thisMangaCompletedTab.appendChild(listFragMC);
    thisMangaOnHoldTab.appendChild(listFragMOH);
    thisMangaDroppedTab.appendChild(listFragMD);
    thisMangaPlanToReadTab.appendChild(listFragMPTW);


    thisAnimeAllTab.appendChild(listFragAAll);
    thisMangaAllTab.appendChild(listFragMAll);
    thisLightNovelAllTab.appendChild(listFragLNAll);

    document.getElementById("FilterListTab").appendChild(listFragFilter);

    return 0;
}

var myFocusedMediaId;


getUserID(storageUserName);

//ANIME Frags
const thisAnimeWatchingTab = document.getElementById("Watching");
const thisAnimeCompletedTab = document.getElementById("Completed");
const thisAnimeOnHoldTab = document.getElementById("On hold");
const thisAnimeDroppedTab = document.getElementById("Dropped");
const thisAnimePlanToWatchTab = document.getElementById("Plan to watch");
const thisAnimeAllTab = document.getElementById("All");

const listFragAW = document.createDocumentFragment();
const listFragAC = document.createDocumentFragment();
const listFragAOH = document.createDocumentFragment();
const listFragAD = document.createDocumentFragment();
const listFragAPTW = document.createDocumentFragment();
const listFragAAll = document.createDocumentFragment();


//MANGA Frags
const thisMangaReadingTab = document.getElementById("Reading");
const thisMangaCompletedTab = document.getElementById("Completed2");
const thisMangaOnHoldTab = document.getElementById("On hold2");
const thisMangaDroppedTab = document.getElementById("Dropped2");
const thisMangaPlanToReadTab = document.getElementById("Plan to read");
const thisMangaAllTab = document.getElementById("All2");

const listFragMR = document.createDocumentFragment();
const listFragMC = document.createDocumentFragment();
const listFragMOH = document.createDocumentFragment();
const listFragMD = document.createDocumentFragment();
const listFragMPTW = document.createDocumentFragment();
const listFragMAll = document.createDocumentFragment();

//LN Frags
const thisLightNovelReadingTab = document.getElementById("Reading2");
const thisLightNovelCompletedTab = document.getElementById("Completed3");
const thisLightNovelOnHoldTab = document.getElementById("On hold3");
const thisLightNovelDroppedTab = document.getElementById("Dropped3");
const thisLightNovelPlanToReadTab = document.getElementById("Plan to read2");
const thisLightNovelAllTab = document.getElementById("All3");

const listFragLNR = document.createDocumentFragment();
const listFragLNC = document.createDocumentFragment();
const listFragLNOH = document.createDocumentFragment();
const listFragLND = document.createDocumentFragment();
const listFragLNPTW = document.createDocumentFragment();
const listFragLNAll = document.createDocumentFragment();

const listFragFilter = document.createDocumentFragment();




var aniListUserName;
var myColorPreference;


//Local Storage Functions
function setStorageMyToken(myToken){ //accepts String
    localStorage.setItem("myToken", myToken);
}

function setStorageMyUserName(myUserName){ //accepts String
    localStorage.setItem("myUserName", myUserName);
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

function setDefaultSearchPreference(myPreference){
    localStorage.setItem("defaultSearchPreference", myPreference);
}

function setMyMediaBoxColorPreference(myPreference){
    localStorage.setItem("defaultMediaBoxColors", myPreference)
}

function getMyMediaBoxColorPreference(){
    return localStorage.getItem("defaultMediaBoxColors");
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

function getDefaultSearchPreference(){
    return localStorage.getItem("defaultSearchPreference");
}

function storeMyToken(){
    let tokenInput=document.getElementById("userTokenInput");
    setStorageMyToken(tokenInput.value);
    console.log("token has been stored");
}


//mutations

//STATUS can be CURRENT, PAUSED, PLANNING, COMPLETED, DROPPED
async function saveMyEntryAnime(mediaID, userStatus, userProgress, userScore){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score) { 
            mediaId
            progress
            score
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryAnimeCompleteDate(mediaID, userStatus, userProgress, userScore, completeYear, completeMonth, completeDay){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $year: Int, $month: Int, $day: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score, completedAt:{year:$year month:$month day:$day}) { 
            mediaId
            status
            progress
            score
            completedAt{
                year 
                month
                day
            }
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore,
        year: completeYear,
        month: completeMonth,
        day: completeDay
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryMangaCompleteDate(mediaID, userStatus, userProgress, userProgressVolumes, userScore, completeYear, completeMonth, completeDay){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $year: Int, $month: Int, $day: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, completedAt:{year:$year month:$month day:$day}) { 
            mediaId
            status
            progress
            progressVolumes
            score
            completedAt{
                year 
                month
                day
            }
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore,
        year: completeYear,
        month: completeMonth,
        day: completeDay
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}


async function saveMyEntryManga(mediaID, userStatus, userProgress, userProgressVolumes, userScore){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score) { 
            mediaId
            progress
            progressVolumes
            score
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryAnimeAdvanced(mediaID, userStatus, userProgress, userScore, userNotes, startYear, startMonth, startDay, completeYear, completeMonth, completeDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $year2: Int, $month2: Int, $day2: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score, notes: $notes, startedAt:{year:$year month:$month day:$day}, completedAt:{year:$year2 month:$month2 day:$day2}, repeat:$repeat) { 
            mediaId
            status
            progress
            score
            notes
            startedAt{
                year
                month
                day
            }
            completedAt{
                year 
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        year2: completeYear,
        month2: completeMonth,
        day2: completeDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}
async function saveMyEntryAnimeAdvanced0(mediaID, userStatus, userProgress, userScore, userNotes, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $notes: String, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score, notes: $notes, repeat:$repeat) { 
            mediaId
            status
            progress
            score
            notes
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore,
        notes: userNotes,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryAnimeAdvanced1(mediaID, userStatus, userProgress, userScore, userNotes, startYear, startMonth, startDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score, notes: $notes, startedAt:{year:$year month:$month day:$day}, repeat:$repeat) { 
            mediaId
            status
            progress
            score
            notes
            startedAt{
                year
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryAnimeAdvanced2(mediaID, userStatus, userProgress, userScore, userNotes, startYear, startMonth, startDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score, notes: $notes, completedAt:{year:$year month:$month day:$day}, repeat:$repeat) { 
            mediaId
            status
            progress
            score
            notes
            completedAt{
                year
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryMangaAdvanced(mediaID, userStatus, userProgress, userProgressVolumes, userScore, userNotes, startYear, startMonth, startDay, completeYear, completeMonth, completeDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $year2: Int, $month2: Int, $day2: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, notes: $notes, startedAt:{year:$year month:$month day:$day}, completedAt:{year:$year2 month:$month2 day:$day2}, repeat:$repeat) { 
            mediaId
            status
            progress
            progressVolumes
            score
            notes
            startedAt{
                year
                month
                day
            }
            completedAt{
                year 
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        year2: completeYear,
        month2: completeMonth,
        day2: completeDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryMangaAdvanced0(mediaID, userStatus, userProgress, userProgressVolumes, userScore, userNotes, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $notes: String, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, notes: $notes, repeat:$repeat) { 
            mediaId
            status
            progress
            progressVolumes
            score
            notes
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore,
        notes: userNotes,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryMangaAdvanced1(mediaID, userStatus, userProgress, userProgressVolumes, userScore, userNotes, startYear, startMonth, startDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, notes: $notes, startedAt:{year:$year month:$month day:$day}, repeat:$repeat) { 
            mediaId
            status
            progress
            progressVolumes
            score
            notes
            startedAt{
                year
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}

async function saveMyEntryMangaAdvanced2(mediaID, userStatus, userProgress, userProgressVolumes, userScore, userNotes, startYear, startMonth, startDay, userRepeats){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $progressVolumes: Int, $score: Float, $notes: String, $year: Int, $month: Int, $day: Int, $repeat: Int){
        SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, progressVolumes: $progressVolumes, score: $score, notes: $notes, completedAt:{year:$year month:$month day:$day}, repeat:$repeat) { 
            mediaId
            status
            progress
            progressVolumes
            score
            notes
            completedAt{
                year 
                month
                day
            }
            repeat
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus,
        progress: userProgress,
        progressVolumes: userProgressVolumes,
        score: userScore,
        notes: userNotes,
        year: startYear,
        month: startMonth,
        day: startDay,
        repeat: userRepeats
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}



async function addMyEntry(mediaID, userStatus){
    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus){
        SaveMediaListEntry (mediaId: $mediaId, status: $status) { 
            mediaId
        }
    }
    `;

    var variables = {
        mediaId: mediaID,
        status: userStatus
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}


//uses medialist id and not mediaid
async function deleteMyEntryAnime(listEntryId){
    var query = `
    mutation ($id: Int){
        DeleteMediaListEntry (id: $id) { 
            deleted
        }
    }
    `;

    var variables = {
        id: listEntryId
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingle)
                        .catch(handleError);
        return 0;
}


async function LookUpMyEntryRemove(myUserId, myMediaId){
    var query = `
    query ($userId: Int, $mediaId: Int){
        MediaList (userId: $userId, mediaId:$mediaId) { 
            id
        }
    }
    `;

    var variables = {
        userId: myUserId,
        mediaId: myMediaId
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingleLookUp)
                        .catch(handleError);
        return 0;
}

async function LookUpMyEntryAdd(myUserId, myMediaId){
    var query = `
    query ($userId: Int, $mediaId: Int){
        MediaList (userId: $userId, mediaId:$mediaId) { 
            id
        }
    }
    `;

    var variables = {
        userId: myUserId,
        mediaId: myMediaId
    };


    var u = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + myToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

        await fetch(u, options).then(handleResponse)
                        .then(handleDataSingleLookUpAdd)
                        .catch(handleError);
        return 0;
}



function compareAscendingFormat(a,b){
    if (a.dataset.format < b.dataset.format)
        return -1;
    if (a.dataset.format > b.dataset.format)
        return 1;
    return 0;
}

function compareDescendingFormat(a,b){
    if (a.dataset.format > b.dataset.format)
        return -1;
    if (a.dataset.format < b.dataset.format)
        return 1;
    return 0;
}

function compareAscendingSeason(a,b){
    //value sort where spring -> summer -> fall -> winter
    //for season, the values to be stored in the array can be 1-spring, 2-summer, 3-fall, 4-winter. Then sort by numbers.
    let mySeasonA=a.dataset.season; 
    let mySeasonB=b.dataset.season;

    let yearDifference = b.dataset.seasonyear-a.dataset.seasonyear;

    const seasons = ['SPRING','SUMMER','FALL','WINTER'];
    if(yearDifference!=0){
        return yearDifference;
    }
    else{
        return seasons.indexOf(mySeasonB) - seasons.indexOf(mySeasonA);
    }

}

function compareDescendingSeason(a,b){
    //value sort where spring -> summer -> fall -> winter
    //for season, the values to be stored in the array can be 1-spring, 2-summer, 3-fall, 4-winter. Then sort by numbers.
    let mySeasonA=a.dataset.season; 
    let mySeasonB=b.dataset.season;

    let yearDifference = a.dataset.seasonyear-b.dataset.seasonyear;

    const seasons = ['SPRING','SUMMER','FALL','WINTER'];
    if(yearDifference!=0){
        return yearDifference;
    }
    else{
        return seasons.indexOf(mySeasonA) - seasons.indexOf(mySeasonB);
    }

}

function compareDescendingTitle(a,b){
    let userPreference = getUserTitlePreference();
    let valueA, valueB;
    if(userPreference==null){ //default case if there is no storage item
        valueA = a.dataset.titleromaji.toLowerCase();
        valueB = b.dataset.titleromaji.toLowerCase();
    }
    if(userPreference=="Romaji"){
        valueA = a.dataset.titleromaji.toLowerCase();
        valueB = b.dataset.titleromaji.toLowerCase();
    }
    if(userPreference=="English"){
        valueA = a.dataset.titleenglish.toLowerCase();
        valueB = b.dataset.titleenglish.toLowerCase();
    }
    if(userPreference=="Native"){
        valueA = a.dataset.titlenative;
        valueB = b.dataset.titlenative;
        return valueA.localeCompare(valueB, 'ja');
    }

    if (valueA < valueB)
        return -1;
    if (valueA > valueB)
        return 1;
    return 0;
}

function compareAscendingTitle(a,b){
    let userPreference = getUserTitlePreference();
    let valueA, valueB;
    if(userPreference==null){ //default case if there is no storage item
        valueA = a.dataset.titleromaji.toLowerCase();
        valueB = b.dataset.titleromaji.toLowerCase();
    }
    if(userPreference=="Romaji"){
        valueA = a.dataset.titleromaji.toLowerCase();
        valueB = b.dataset.titleromaji.toLowerCase();
    }
    if(userPreference=="English"){
        valueA = a.dataset.titleenglish.toLowerCase();
        valueB = b.dataset.titleenglish.toLowerCase();
    }
    if(userPreference=="Native"){
        valueA = a.dataset.titlenative;
        valueB = b.dataset.titlenative;
        return valueB.localeCompare(valueA, 'ja');
    }

    if (valueA > valueB)
        return -1;
    if (valueA < valueB)
        return 1;
    return 0;
}

function compareAscendingScore(a,b){
    let valueA=a.dataset.myscore;
    let valueB=b.dataset.myscore;

    return valueB-valueA;
}

function compareDescendingScore(a,b){
    let valueA=a.dataset.myscore;
    let valueB=b.dataset.myscore;

    return valueA-valueB;
}

function compareAscendingProgress(a,b){
    let valueA=a.dataset.myprogress;
    let valueB=b.dataset.myprogress;
    return valueB-valueA;
}

function compareDescendingProgress(a,b){
    let valueA=a.dataset.myprogress;
    let valueB=b.dataset.myprogress;
    return valueA-valueB;
}

function compareAscendingProgressVolumes(a,b){
    let valueA=a.dataset.myprogressvolumes;
    let valueB=b.dataset.myprogressvolumes;

    return valueB-valueA;
}

function compareDescendingProgressVolumes(a,b){
    let valueA=a.dataset.myprogressvolumes;
    let valueB=b.dataset.myprogressvolumes;

    return valueA-valueB;
}

//anime sort for format + season
function sortMyListAnime(sortType,sortWay){ //first value is for type(1) or season(0). second value is for ascending(1) or descending(0)
    let myArray = new Array();
    let watchingTab = document.getElementById("Watching");
    let completedTab = document.getElementById("Completed");
    let onHoldTab = document.getElementById("On hold");
    let droppedTab = document.getElementById("Dropped");
    let planToWatchTab = document.getElementById("Plan to watch");
    let allTab = document.getElementById("All");

    const mediaBoxCountWatching = watchingTab.childElementCount;
    const mediaBoxCountCompleted = completedTab.childElementCount;
    const mediaBoxCountOnHold = onHoldTab.childElementCount;
    const mediaBoxCountDropped = droppedTab.childElementCount;
    const mediaBoxCountPlanToWatch = planToWatchTab.childElementCount;
    const mediaBoxCountAll = allTab.childElementCount;

    if(sortType=="1"){ //type sort aka data-format sort

        /*Watching Format Sort*/
        for(let i = 0; i<mediaBoxCountWatching; i++){ //store in array
            myArray.push(watchingTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(watchingTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountWatching; i++){
            watchingTab.appendChild(myArray.pop(watchingTab.childNodes[i]));
        }



        /*Completed Format Sort*/
        for(let i = 0; i<mediaBoxCountCompleted; i++){ //store in array
            myArray.push(completedTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted; i++){
            completedTab.appendChild(myArray.pop(completedTab.childNodes[i]));
        }
        


        /*OnHold Format Sort*/
        for(let i = 0; i<mediaBoxCountOnHold; i++){ //store in array
            myArray.push(onHoldTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold; i++){
            onHoldTab.appendChild(myArray.pop(onHoldTab.childNodes[i]));
        }




        /*Dropped Format Sort*/
        for(let i = 0; i<mediaBoxCountDropped; i++){ //store in array
            myArray.push(droppedTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped; i++){
            droppedTab.appendChild(myArray.pop(droppedTab.childNodes[i]));
        }



        /*Plan To Watch Format Sort*/
        for(let i = 0; i<mediaBoxCountPlanToWatch; i++){ //store in array
            myArray.push(planToWatchTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToWatchTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToWatch; i++){
            planToWatchTab.appendChild(myArray.pop(planToWatchTab.childNodes[i]));
        }


        /*All Format Sort*/
        for(let i = 0; i<mediaBoxCountAll; i++){ //store in array
            myArray.push(allTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab);
        //sort it by data-format alphabetical ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingFormat);
        }
        else{ //if descending
            myArray.sort(compareDescendingFormat);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll; i++){
            allTab.appendChild(myArray.pop(allTab.childNodes[i]));
        }

    } 
    else{
        /*Watching Season Sort*/
        for(let i = 0; i<mediaBoxCountWatching; i++){//store array
            myArray.push(watchingTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(watchingTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountWatching; i++){
            watchingTab.appendChild(myArray.pop(watchingTab.childNodes[i]));
        }



        /*Completed Season Sort*/
        for(let i = 0; i<mediaBoxCountCompleted; i++){//store array
            myArray.push(completedTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted; i++){
            completedTab.appendChild(myArray.pop(completedTab.childNodes[i]));
        }



        /*On Hold Season Sort*/
        for(let i = 0; i<mediaBoxCountOnHold; i++){//store array
            myArray.push(onHoldTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold; i++){
            onHoldTab.appendChild(myArray.pop(onHoldTab.childNodes[i]));
        }

        /*Dropped Season Sort*/
        for(let i = 0; i<mediaBoxCountDropped; i++){//store array
            myArray.push(droppedTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped; i++){
            droppedTab.appendChild(myArray.pop(droppedTab.childNodes[i]));
        }



        /*Plan To Watch Season Sort*/
        for(let i = 0; i<mediaBoxCountPlanToWatch; i++){//store array
            myArray.push(planToWatchTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToWatchTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToWatch; i++){
            planToWatchTab.appendChild(myArray.pop(planToWatchTab.childNodes[i]));
        }


        /*All Season Sort*/
        for(let i = 0; i<mediaBoxCountAll; i++){//store array
            myArray.push(allTab.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab);
        //sort it by season ascending or descending depending on sortway value
        if (sortWay==1){//if ascending
            myArray.sort(compareAscendingReleaseDate);
        }
        else{ //if descending
            myArray.sort(compareDescendingReleaseDate);
        }
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll; i++){
            allTab.appendChild(myArray.pop(allTab.childNodes[i]));
        }

    }
}

function compareAscendingReleaseDate(a,b){
    let startDateDayA=a.dataset.startdateday; 
    let startDateMonthA=a.dataset.startdatemonth;
    let startDateYearA=a.dataset.startdateyear;

    let startDateDayB=b.dataset.startdateday; 
    let startDateMonthB=b.dataset.startdatemonth;
    let startDateYearB=b.dataset.startdateyear;

    let dayDifference = startDateDayB-startDateDayA;
    let monthDifference = startDateMonthB-startDateMonthA;
    let yearDifference = startDateYearB-startDateYearA;

    if(yearDifference!=0){
        return yearDifference;
    }
    if(monthDifference!=0){
        return monthDifference;
    }
    if(dayDifference!=0){
        return dayDifference;
    }
}

function compareDescendingReleaseDate(a,b){
    let startDateDayA=a.dataset.startdateday; 
    let startDateMonthA=a.dataset.startdatemonth;
    let startDateYearA=a.dataset.startdateyear;

    let startDateDayB=b.dataset.startdateday; 
    let startDateMonthB=b.dataset.startdatemonth;
    let startDateYearB=b.dataset.startdateyear;

    let dayDifference = startDateDayA-startDateDayB;
    let monthDifference = startDateMonthA-startDateMonthB;
    let yearDifference = startDateYearA-startDateYearB;

    if(yearDifference!=0){
        return yearDifference;
    }
    if(monthDifference!=0){
        return monthDifference;
    }
    if(dayDifference!=0){
        return dayDifference;
    }
}

//manga sort for released date
function sortMyListMangaReleased(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }

        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }



        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }



        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

    }
}

function sortMyListMangaVolumes(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }



    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        




        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }




        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }




        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }



        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }





        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

        

    }
}

function sortMyListManga(sortType, sortWay){
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }

        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }

        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }

        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }

        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }

        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }

}

function sortMyListLN(sortType,sortWay){
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }

        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }

        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }

        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }

        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }

        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}


function sortMyListAnimeTitle(sortWay){
    let myArray = new Array();
    let watchingTab = document.getElementById("Watching");
    let completedTab = document.getElementById("Completed");
    let onHoldTab = document.getElementById("On hold");
    let droppedTab = document.getElementById("Dropped");
    let planToWatchTab = document.getElementById("Plan to watch");
    let allTab = document.getElementById("All");

    const mediaBoxCountWatching = watchingTab.childElementCount;
    const mediaBoxCountCompleted = completedTab.childElementCount;
    const mediaBoxCountOnHold = onHoldTab.childElementCount;
    const mediaBoxCountDropped = droppedTab.childElementCount;
    const mediaBoxCountPlanToWatch = planToWatchTab.childElementCount;
    const mediaBoxCountAll = allTab.childElementCount;

    /*Watching Format Sort*/
    for(let i = 0; i<mediaBoxCountWatching; i++){ //store in array
        myArray.push(watchingTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(watchingTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountWatching; i++){
        watchingTab.appendChild(myArray.pop(watchingTab.childNodes[i]));
    }



    /*Completed Format Sort*/
    for(let i = 0; i<mediaBoxCountCompleted; i++){ //store in array
        myArray.push(completedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(completedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountCompleted; i++){
        completedTab.appendChild(myArray.pop(completedTab.childNodes[i]));
    }
    


    /*OnHold Format Sort*/
    for(let i = 0; i<mediaBoxCountOnHold; i++){ //store in array
        myArray.push(onHoldTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(onHoldTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountOnHold; i++){
        onHoldTab.appendChild(myArray.pop(onHoldTab.childNodes[i]));
    }




    /*Dropped Format Sort*/
    for(let i = 0; i<mediaBoxCountDropped; i++){ //store in array
        myArray.push(droppedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(droppedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountDropped; i++){
        droppedTab.appendChild(myArray.pop(droppedTab.childNodes[i]));
    }



    /*Plan To Watch Format Sort*/
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){ //store in array
        myArray.push(planToWatchTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(planToWatchTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){
        planToWatchTab.appendChild(myArray.pop(planToWatchTab.childNodes[i]));
    }


    /*All Format Sort*/
    for(let i = 0; i<mediaBoxCountAll; i++){ //store in array
        myArray.push(allTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(allTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingTitle);
    }
    else{ //if descending
        myArray.sort(compareDescendingTitle);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountAll; i++){
        allTab.appendChild(myArray.pop(allTab.childNodes[i]));
    }
}

function sortMyListAnimeScore(sortWay){
    let myArray = new Array();
    let watchingTab = document.getElementById("Watching");
    let completedTab = document.getElementById("Completed");
    let onHoldTab = document.getElementById("On hold");
    let droppedTab = document.getElementById("Dropped");
    let planToWatchTab = document.getElementById("Plan to watch");
    let allTab = document.getElementById("All");

    const mediaBoxCountWatching = watchingTab.childElementCount;
    const mediaBoxCountCompleted = completedTab.childElementCount;
    const mediaBoxCountOnHold = onHoldTab.childElementCount;
    const mediaBoxCountDropped = droppedTab.childElementCount;
    const mediaBoxCountPlanToWatch = planToWatchTab.childElementCount;
    const mediaBoxCountAll = allTab.childElementCount;

    /*Watching Format Sort*/
    for(let i = 0; i<mediaBoxCountWatching; i++){ //store in array
        myArray.push(watchingTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(watchingTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountWatching; i++){
        watchingTab.appendChild(myArray.pop(watchingTab.childNodes[i]));
    }



    /*Completed Format Sort*/
    for(let i = 0; i<mediaBoxCountCompleted; i++){ //store in array
        myArray.push(completedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(completedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountCompleted; i++){
        completedTab.appendChild(myArray.pop(completedTab.childNodes[i]));
    }
    


    /*OnHold Format Sort*/
    for(let i = 0; i<mediaBoxCountOnHold; i++){ //store in array
        myArray.push(onHoldTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(onHoldTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountOnHold; i++){
        onHoldTab.appendChild(myArray.pop(onHoldTab.childNodes[i]));
    }




    /*Dropped Format Sort*/
    for(let i = 0; i<mediaBoxCountDropped; i++){ //store in array
        myArray.push(droppedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(droppedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountDropped; i++){
        droppedTab.appendChild(myArray.pop(droppedTab.childNodes[i]));
    }



    /*Plan To Watch Format Sort*/
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){ //store in array
        myArray.push(planToWatchTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(planToWatchTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){
        planToWatchTab.appendChild(myArray.pop(planToWatchTab.childNodes[i]));
    }


    /*All Format Sort*/
    for(let i = 0; i<mediaBoxCountAll; i++){ //store in array
        myArray.push(allTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(allTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingScore);
    }
    else{ //if descending
        myArray.sort(compareDescendingScore);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountAll; i++){
        allTab.appendChild(myArray.pop(allTab.childNodes[i]));
    }
}


function sortMyListAnimeProgress(sortWay){
    let myArray = new Array();
    let watchingTab = document.getElementById("Watching");
    let completedTab = document.getElementById("Completed");
    let onHoldTab = document.getElementById("On hold");
    let droppedTab = document.getElementById("Dropped");
    let planToWatchTab = document.getElementById("Plan to watch");
    let allTab = document.getElementById("All");

    const mediaBoxCountWatching = watchingTab.childElementCount;
    const mediaBoxCountCompleted = completedTab.childElementCount;
    const mediaBoxCountOnHold = onHoldTab.childElementCount;
    const mediaBoxCountDropped = droppedTab.childElementCount;
    const mediaBoxCountPlanToWatch = planToWatchTab.childElementCount;
    const mediaBoxCountAll = allTab.childElementCount;

    /*Watching Format Sort*/
    for(let i = 0; i<mediaBoxCountWatching; i++){ //store in array
        myArray.push(watchingTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(watchingTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountWatching; i++){
        watchingTab.appendChild(myArray.pop(watchingTab.childNodes[i]));
    }



    /*Completed Format Sort*/
    for(let i = 0; i<mediaBoxCountCompleted; i++){ //store in array
        myArray.push(completedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(completedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountCompleted; i++){
        completedTab.appendChild(myArray.pop(completedTab.childNodes[i]));
    }
    


    /*OnHold Format Sort*/
    for(let i = 0; i<mediaBoxCountOnHold; i++){ //store in array
        myArray.push(onHoldTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(onHoldTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountOnHold; i++){
        onHoldTab.appendChild(myArray.pop(onHoldTab.childNodes[i]));
    }




    /*Dropped Format Sort*/
    for(let i = 0; i<mediaBoxCountDropped; i++){ //store in array
        myArray.push(droppedTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(droppedTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountDropped; i++){
        droppedTab.appendChild(myArray.pop(droppedTab.childNodes[i]));
    }



    /*Plan To Watch Format Sort*/
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){ //store in array
        myArray.push(planToWatchTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(planToWatchTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountPlanToWatch; i++){
        planToWatchTab.appendChild(myArray.pop(planToWatchTab.childNodes[i]));
    }


    /*All Format Sort*/
    for(let i = 0; i<mediaBoxCountAll; i++){ //store in array
        myArray.push(allTab.childNodes[i]);
    }
    //remove from DOM
    removeAllChildNodes(allTab);
    //sort it by data-format alphabetical ascending or descending depending on sortway value
    if (sortWay==1){//if ascending
        myArray.sort(compareAscendingProgress);
    }
    else{ //if descending
        myArray.sort(compareDescendingProgress);
    }
    //adding back to DOM
    for(let i = 0; i<mediaBoxCountAll; i++){
        allTab.appendChild(myArray.pop(allTab.childNodes[i]));
    }


}

function sortMyListMangaTitle(sortWay){
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }



    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        




        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }




        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }




        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }



        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }





        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

        

    }
}

function sortMyListMangaScore(sortWay){
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }



    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        




        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }




        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }




        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }



        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }





        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }

        

    }
}

function sortMyListMangaChapters(sortWay){
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending
        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }


        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }


        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }


        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }


        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }


        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }



    }
    else{ //descending

        /*Manga Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading1; i++){//store array
            myArray.push(readingTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading1; i++){
            readingTab1.appendChild(myArray.pop(readingTab1.childNodes[i]));
        }
        




        /*Manga Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted1; i++){//store array
            myArray.push(completedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted1; i++){
            completedTab1.appendChild(myArray.pop(completedTab1.childNodes[i]));
        }




        /*Manga On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold1; i++){//store array
            myArray.push(onHoldTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold1; i++){
            onHoldTab1.appendChild(myArray.pop(onHoldTab1.childNodes[i]));
        }




        /*Manga Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped1; i++){//store array
            myArray.push(droppedTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped1; i++){
            droppedTab1.appendChild(myArray.pop(droppedTab1.childNodes[i]));
        }



        /*Manga Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){//store array
            myArray.push(planToReadTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead1; i++){
            planToReadTab1.appendChild(myArray.pop(planToReadTab1.childNodes[i]));
        }





        /*Manga All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll1; i++){//store array
            myArray.push(allTab1.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab1);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll1; i++){
            allTab1.appendChild(myArray.pop(allTab1.childNodes[i]));
        }


    }
}

function sortMyListLNReleased(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }



        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }



        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }


        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }



        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingReleaseDate);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}

function sortMyListLNVolumes(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }



        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }



        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }


        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }



        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingProgressVolumes);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}

function sortMyListLNChapters(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }



        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }



        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }


        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }



        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingProgress);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}

function sortMyListLNScore(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }



        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }



        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }


        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }



        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingScore);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}

function sortMyListLNTitle(sortWay){ //sortWay is ascending(1) or descending(0)
    let myArray = new Array(); //array to be used
    
    //tabs
    let readingTab1 = document.getElementById("Reading");
    let readingTab2 = document.getElementById("Reading2");
    let completedTab1 = document.getElementById("Completed2");
    let completedTab2 = document.getElementById("Completed3");
    let onHoldTab1 = document.getElementById("On hold2");
    let onHoldTab2 = document.getElementById("On hold3");
    let droppedTab1 = document.getElementById("Dropped2");
    let droppedTab2 = document.getElementById("Dropped3");
    let planToReadTab1 = document.getElementById("Plan to read");
    let planToReadTab2 = document.getElementById("Plan to read2");
    let allTab1 = document.getElementById("All2");
    let allTab2 = document.getElementById("All3");

    //tab element count
    const mediaBoxCountReading1 = readingTab1.childElementCount;
    const mediaBoxCountReading2 = readingTab2.childElementCount;
    const mediaBoxCountCompleted1 = completedTab1.childElementCount;
    const mediaBoxCountCompleted2 = completedTab2.childElementCount;
    const mediaBoxCountOnHold1 = onHoldTab1.childElementCount;
    const mediaBoxCountOnHold2 = onHoldTab2.childElementCount;
    const mediaBoxCountDropped1 = droppedTab1.childElementCount;
    const mediaBoxCountDropped2 = droppedTab2.childElementCount;
    const mediaBoxCountPlanToRead1 = planToReadTab1.childElementCount;
    const mediaBoxCountPlanToRead2 = planToReadTab2.childElementCount;
    const mediaBoxCountAll1 = allTab1.childElementCount;
    const mediaBoxCountAll2 = allTab2.childElementCount;

    if(sortWay==1){ //ascending


        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }


        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }


        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }

        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }


        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }


        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareAscendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
    else{ //descending

        /*LN Reading Tab Sort*/
        for(let i = 0; i<mediaBoxCountReading2; i++){//store array
            myArray.push(readingTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(readingTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountReading2; i++){
            readingTab2.appendChild(myArray.pop(readingTab2.childNodes[i]));
        }



        /*LN Completed Tab Sort*/
        for(let i = 0; i<mediaBoxCountCompleted2; i++){//store array
            myArray.push(completedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(completedTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountCompleted2; i++){
            completedTab2.appendChild(myArray.pop(completedTab2.childNodes[i]));
        }



        /*LN On Hold Tab Sort*/
        for(let i = 0; i<mediaBoxCountOnHold2; i++){//store array
            myArray.push(onHoldTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(onHoldTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountOnHold2; i++){
            onHoldTab2.appendChild(myArray.pop(onHoldTab2.childNodes[i]));
        }


        /*LN Dropped Tab Sort*/
        for(let i = 0; i<mediaBoxCountDropped2; i++){//store array
            myArray.push(droppedTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(droppedTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountDropped2; i++){
            droppedTab2.appendChild(myArray.pop(droppedTab2.childNodes[i]));
        }



        /*LN Plan To Read Tab Sort*/
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){//store array
            myArray.push(planToReadTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(planToReadTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountPlanToRead2; i++){
            planToReadTab2.appendChild(myArray.pop(planToReadTab2.childNodes[i]));
        }

        
        /*LN All Tab Sort*/
        for(let i = 0; i<mediaBoxCountAll2; i++){//store array
            myArray.push(allTab2.childNodes[i]);
        }
        //remove from DOM
        removeAllChildNodes(allTab2);
        //sort by date released
        myArray.sort(compareDescendingTitle);
        //adding back to DOM
        for(let i = 0; i<mediaBoxCountAll2; i++){
            allTab2.appendChild(myArray.pop(allTab2.childNodes[i]));
        }
    }
}


function swapBetweenSortButtons(sortState){
    let animeSortSelect = document.getElementById("SortAnime");
    let mangaSortSelect = document.getElementById("SortManga");
    let lightNovelSortSelect = document.getElementById("SortLN");

    let mySort = document.getElementById("mySort");
    let mySort2 = document.getElementById("mySort2");
    let mySort3 = document.getElementById("mySort3");

    let sortUp = document.getElementById("sortUp");
    let sortUp2 = document.getElementById("sortUp2");
    let sortUp3 = document.getElementById("sortUp3");

    let sortDown = document.getElementById("sortDown");
    let sortDown2 = document.getElementById("sortDown2");
    let sortDown3 = document.getElementById("sortDown3");

    switch(sortState){
        case 0: //neutral state
            mySort.style.display="none";
            sortUp.style.display="none";
            sortDown.style.display="grid"; //going down
            sortDown.setAttribute("data-mark", 1);
            sortUp.setAttribute("data-mark", 0);

            if(animeSortSelect.style.display==="grid"){ //check if in anime tab
                console.log("anime block");
                switch(animeSortSelect.value){
                    case "title":
                        sortMyListAnimeTitle(0);
                        break;
                    case "score":
                        sortMyListAnimeScore(0);
                        break;
                    case "type":
                        sortMyListAnime(1,0);
                        break;
                    case "episode progress":
                        sortMyListAnimeProgress(0);
                        break;
                    case "season":
                        sortMyListAnime(0,0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            
            break;
        case 1: //up state
            sortUp.style.display="none";
            sortDown.style.display="grid"; //going down
            sortDown.setAttribute("data-mark", 1);
            sortUp.setAttribute("data-mark", 0);

            if(animeSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("anime block");
                switch(animeSortSelect.value){
                    case "title":
                        sortMyListAnimeTitle(0);
                        break;
                    case "score":
                        sortMyListAnimeScore(0);
                        break;
                    case "type":
                        sortMyListAnime(1,0);
                        break;
                    case "episode progress":
                        sortMyListAnimeProgress(0);
                        break;
                    case "season":
                        sortMyListAnime(0,0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        case 2: //down state
            sortUp.style.display="grid"; //going up
            sortDown.style.display="none"; 
            sortDown.setAttribute("data-mark", 0);
            sortUp.setAttribute("data-mark", 1);
            if(animeSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("anime block");
                switch(animeSortSelect.value){
                    case "title":
                        sortMyListAnimeTitle(1);
                        break;
                    case "score":
                        sortMyListAnimeScore(1);
                        break;
                    case "type":
                        sortMyListAnime(1,1);
                        break;
                    case "episode progress":
                        sortMyListAnimeProgress(1);
                        break;
                    case "season":
                        sortMyListAnime(0,1);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        case 3: //neutral manga state
            mySort2.style.display="none";
            sortUp2.style.display="none";
            sortDown2.style.display="grid"; //going down
            sortDown2.setAttribute("data-mark", 1);
            sortUp2.setAttribute("data-mark", 0);
            if(mangaSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("manga block");
                switch(mangaSortSelect.value){
                    case "title":
                        sortMyListMangaTitle(0);
                        break;
                    case "score":
                        sortMyListMangaScore(0);
                        break;
                    case "chapter progress":
                        sortMyListMangaChapters(0);
                        break;
                    case "volume progress":
                        sortMyListMangaVolumes(0);
                        break;
                    case "released":
                        sortMyListMangaReleased(0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        case 4: //up state
            sortUp2.style.display="none";
            sortDown2.style.display="grid"; //going down
            sortDown2.setAttribute("data-mark", 1);
            sortUp2.setAttribute("data-mark", 0);
            if(mangaSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("manga block");
                switch(mangaSortSelect.value){
                    case "title":
                        sortMyListMangaTitle(0);
                        break;
                    case "score":
                        sortMyListMangaScore(0);
                        break;
                    case "chapter progress":
                        sortMyListMangaChapters(0);
                        break;
                    case "volume progress":
                        sortMyListMangaVolumes(0);
                        break;
                    case "released":
                        sortMyListMangaReleased(0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;

        case 5: //down state
            sortUp2.style.display="grid"; //going up
            sortDown2.style.display="none"; 
            sortDown2.setAttribute("data-mark", 0);
            sortUp2.setAttribute("data-mark", 1);
            if(mangaSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("manga block");
                switch(mangaSortSelect.value){
                    case "title":
                        sortMyListMangaTitle(1);
                        break;
                    case "score":
                        sortMyListMangaScore(1);
                        break;
                    case "chapter progress":
                        sortMyListMangaChapters(1);
                        break;
                    case "volume progress":
                        sortMyListMangaVolumes(1);
                        break;
                    case "released":
                        sortMyListMangaReleased(1);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;

        case 6: //neutral state LN
            mySort3.style.display="none";
            sortUp3.style.display="none";
            sortDown3.style.display="grid"; //going down
            sortDown3.setAttribute("data-mark", 1);
            sortUp3.setAttribute("data-mark", 0);
            if(lightNovelSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("light novel block");
                switch(lightNovelSortSelect.value){
                    case "title":
                        sortMyListLNTitle(0);
                        break;
                    case "score":
                        sortMyListLNScore(0);
                        break;
                    case "chapter progress":
                        sortMyListLNChapters(0);
                        break;
                    case "volume progress":
                        sortMyListLNVolumes(0);
                        break;
                    case "released":
                        sortMyListLNReleased(0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        case 7: //up state
            sortUp3.style.display="none";
            sortDown3.style.display="grid"; //going down
            sortDown3.setAttribute("data-mark", 1);
            sortUp3.setAttribute("data-mark", 0);
            if(lightNovelSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("light novel block");
                switch(lightNovelSortSelect.value){
                    case "title":
                        sortMyListLNTitle(0);
                        break;
                    case "score":
                        sortMyListLNScore(0);
                        break;
                    case "chapter progress":
                        sortMyListLNChapters(0);
                        break;
                    case "volume progress":
                        sortMyListLNVolumes(0);
                        break;
                    case "released":
                        sortMyListLNReleased(0);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        

        case 8: //down state
            sortUp3.style.display="grid"; //going up
            sortDown3.style.display="none"; 
            sortDown3.setAttribute("data-mark", 0);
            sortUp3.setAttribute("data-mark", 1);
            if(lightNovelSortSelect.style.display=="grid"){ //check if in anime tab
                console.log("light novel block");
                switch(lightNovelSortSelect.value){
                    case "title":
                        sortMyListLNTitle(1);
                        break;
                    case "score":
                        sortMyListLNScore(1);
                        break;
                    case "chapter progress":
                        sortMyListLNChapters(1);
                        break;
                    case "volume progress":
                        sortMyListLNVolumes(1);
                        break;
                    case "released":
                        sortMyListLNReleased(1);
                        break;
                    default:
                        console.log("nothing");
                }
            }
            break;
        default:
            break;
    }
}

function reSortMyListAnime(){
    let sortAnimeVal = document.getElementById("SortAnime").value;
    let mySortDown = document.getElementById("sortDown");
    let mySortUp = document.getElementById("sortUp");
    switch(sortAnimeVal){
        case "title":
            if(mySortUp.style.display=="grid"){
                console.log("title up");
                sortMyListAnimeTitle(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("title down");
                sortMyListAnimeTitle(0);
            }
            break
        case "score":
            console.log("score");
            if(mySortUp.style.display=="grid"){
                console.log("score up");
                sortMyListAnimeScore(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("score down");
                sortMyListAnimeScore(0);
            }
            break
        case "type":
            console.log("type");
            if(mySortUp.style.display=="grid"){
                console.log("type up");
                sortMyListAnime(1,1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("type down");
                sortMyListAnime(1,0);
            }
            break
        case "episode progress":
            console.log("episode progress");
            if(mySortUp.style.display=="grid"){
                console.log("episode up");
                sortMyListAnimeProgress(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("episode down");
                sortMyListAnimeProgress(0);
            }
            break    
        case "season":
            console.log("season");
            if(mySortUp.style.display=="grid"){
                console.log("season up");
                sortMyListAnime(0,1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("season down");
                sortMyListAnime(0,0);
            }
            break    
        default:
            console.log("nothing");
    }
}

function reSortMyListManga(){
    let sortAnimeVal = document.getElementById("SortManga").value;
    let mySortDown = document.getElementById("sortDown2");
    let mySortUp = document.getElementById("sortUp2");
    switch(sortAnimeVal){
        case "title":
            if(mySortUp.style.display=="grid"){
                console.log("title up");
                sortMyListMangaTitle(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("title down");
                sortMyListMangaTitle(0);
            }
            break
        case "score":
            if(mySortUp.style.display=="grid"){
                console.log("score up");
                sortMyListMangaScore(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("score down");
                sortMyListMangaScore(0);
            }
            break
        case "chapter progress":
            if(mySortUp.style.display=="grid"){
                console.log("chapters up");
                sortMyListMangaChapters(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("chapters down");
                sortMyListMangaChapters(0);
            }
            break
        case "volume progress":
            if(mySortUp.style.display=="grid"){
                console.log("volumes up");
                sortMyListMangaVolumes(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("volumes down");
                sortMyListMangaVolumes(0);
            }
            break    
        case "released":
            if(mySortUp.style.display=="grid"){
                console.log("released up");
                sortMyListMangaReleased(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("released down");
                sortMyListMangaReleased(0);
            }
            break    
        default:
            console.log("nothing");
    }
}

function reSortMyListLN(){
    let sortAnimeVal = document.getElementById("SortLN").value;
    let mySortDown = document.getElementById("sortDown3");
    let mySortUp = document.getElementById("sortUp3");
    switch(sortAnimeVal){
        case "title":
            if(mySortUp.style.display=="grid"){
                console.log("title up");
                sortMyListLNTitle(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("title down");
                sortMyListLNTitle(0);
            }
            break
        case "score":
            if(mySortUp.style.display=="grid"){
                console.log("score up");
                sortMyListLNScore(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("score down");
                sortMyListLNScore(0);
            }
            break
        case "chapter progress":
            if(mySortUp.style.display=="grid"){
                console.log("chapters up");
                sortMyListLNChapters(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("chapters down");
                sortMyListLNChapters(0);
            }
            break
        case "volume progress":
            if(mySortUp.style.display=="grid"){
                console.log("volumes up");
                sortMyListLNVolumes(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("volumes down");
                sortMyListLNVolumes(0);
            }
            break    
        case "released":
            if(mySortUp.style.display=="grid"){
                console.log("released up");
                sortMyListLNReleased(1);
            }
            if(mySortDown.style.display=="grid"){
                console.log("released down");
                sortMyListLNReleased(0);
            }
            break    
        default:
            console.log("nothing");
    }
}

document.getElementById("SortAnime").addEventListener("change", ()=>{
    reSortMyListAnime();
});

document.getElementById("SortManga").addEventListener("change", ()=>{
    reSortMyListManga();
});

document.getElementById("SortLN").addEventListener("change", ()=>{
    reSortMyListLN();
});


function filterMyList(){
    let filterListTab = document.getElementById("FilterListTab");
    let input = document.getElementById("searchBarInput");
    let filterInput = input.value.toLowerCase();

    let filterListCount = filterListTab.childElementCount;


    for (i = 0; i < filterListCount; i++) {
        let titleValueRomaji = filterListTab.childNodes[i].getAttribute("data-titleromaji");
        let titleValueEnglish = filterListTab.childNodes[i].getAttribute("data-titleenglish");
        let titleValueNative = filterListTab.childNodes[i].getAttribute("data-titlenative");

        if (titleValueRomaji.toLowerCase().split(" ").join("").indexOf(filterInput.split(" ").join("")) > -1||titleValueEnglish.toLowerCase().split(" ").join("").indexOf(filterInput.split(" ").join("")) > -1||titleValueNative.toLowerCase().split(" ").join("").indexOf(filterInput.split(" ").join("")) > -1) {
            filterListTab.childNodes[i].style.display = "grid";
        } 
        else if(titleValueRomaji.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').split(" ").join("").indexOf(filterInput.split(" ").join("")) > -1||titleValueEnglish.toLowerCase().replace(/[^a-zA-Z0-9]/g, '').split(" ").join("").indexOf(filterInput.split(" ").join("")) > -1){
            filterListTab.childNodes[i].style.display = "grid";
        }
        else {
            filterListTab.childNodes[i].style.display = "none";
        }
    }
}



function removeOthers(mediaId){
    mediaBoxClass = document.getElementsByClassName("mediaBox");
    mediaBoxFilterClass = document.getElementsByClassName("mediaBoxFilter");

    for(let i=0;i < mediaBoxClass.length; i++){
        if(mediaBoxClass[i].getAttribute("data-mediaId")==mediaId){
            mediaBoxClass[i].remove();
            console.log("removed from lists");
        }
    }

    for(let i=0;i < mediaBoxFilterClass.length; i++){
        if(mediaBoxFilterClass[i].getAttribute("data-mediaId")==mediaId){
            mediaBoxFilterClass[i].remove();
            console.log("removed from filter");
        }
    }
}


function updateOthersAnime(mediaId,mediaEpisodes,mediaScore,isCompleted){
    mediaBoxClass = document.getElementsByClassName("mediaBox");
    mediaBoxFilterClass = document.getElementsByClassName("mediaBoxFilter");
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth()+1;
    let todayDay = today.getDate();
    for(let i=0;i < mediaBoxClass.length; i++){
        if(mediaBoxClass[i].getAttribute("data-mediaId")==mediaId){
            //find path to input value for episode and score
            console.log("found on list");
            mediaBoxClass[i].childNodes[3].childNodes[0].childNodes[1].value=mediaEpisodes;
            mediaBoxClass[i].childNodes[3].childNodes[1].childNodes[1].value=mediaScore;
            mediaBoxClass[i].setAttribute('data-myprogress', mediaEpisodes);
            mediaBoxClass[i].setAttribute('data-myscore', mediaScore);
            if(isCompleted==true){
                mediaBoxClass[i].setAttribute('data-mystatus', 'COMPLETED');
                mediaBoxClass[i].setAttribute('data-mycompleteddateyear', todayYear.toString());
                mediaBoxClass[i].setAttribute('data-mycompleteddatemonth', todayMonth.toString());
                mediaBoxClass[i].setAttribute('data-mycompleteddateday', todayDay.toString());
            }
        }
    }

    for(let i=0;i < mediaBoxFilterClass.length; i++){
        if(mediaBoxFilterClass[i].getAttribute("data-mediaId")==mediaId){
            //find path to input value for episode and score
            console.log("found on filter");
            mediaBoxFilterClass[i].childNodes[3].childNodes[0].childNodes[1].value=mediaEpisodes;
            mediaBoxFilterClass[i].childNodes[3].childNodes[1].childNodes[1].value=mediaScore;
            mediaBoxFilterClass[i].setAttribute('data-myprogress', mediaEpisodes);
            mediaBoxFilterClass[i].setAttribute('data-myscore', mediaScore);
            if(isCompleted==true){
                mediaBoxFilterClass[i].setAttribute('data-mystatus', 'COMPLETED');
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddateyear', todayYear.toString());
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddatemonth', todayMonth.toString());
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddateday', todayDay.toString());
            }
        }
    }
}


function updateOthersManga(mediaId,mediaChapters,mediaVolumes,mediaScore,isCompleted){
    let mediaBoxClass = document.getElementsByClassName("mediaBox");
    let mediaBoxFilterClass = document.getElementsByClassName("mediaBoxFilter");
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth()+1;
    let todayDay = today.getDate();
    for(let i=0;i < mediaBoxClass.length; i++){
        if(mediaBoxClass[i].getAttribute("data-mediaId")==mediaId){
            //find path to input value for
            console.log("found on list");
            mediaBoxClass[i].childNodes[3].childNodes[0].childNodes[1].value=mediaChapters;
            mediaBoxClass[i].childNodes[3].childNodes[1].childNodes[1].value=mediaVolumes;
            mediaBoxClass[i].childNodes[3].childNodes[2].childNodes[1].value=mediaScore;
            mediaBoxClass[i].setAttribute('data-myprogress', mediaChapters);
            mediaBoxClass[i].setAttribute('data-myprogressvolumes', mediaVolumes);
            mediaBoxClass[i].setAttribute('data-myscore', mediaScore);

            if(isCompleted==true){
                mediaBoxClass[i].setAttribute('data-mystatus', 'COMPLETED');
                mediaBoxClass[i].setAttribute('data-mycompleteddateyear', todayYear.toString());
                mediaBoxClass[i].setAttribute('data-mycompleteddatemonth', todayMonth.toString());
                mediaBoxClass[i].setAttribute('data-mycompleteddateday', todayDay.toString());
            }
        }
    }

    for(let i=0;i < mediaBoxFilterClass.length; i++){
        if(mediaBoxFilterClass[i].getAttribute("data-mediaId")==mediaId){
            //find path to input value for 
            console.log("found on filter");
            mediaBoxFilterClass[i].childNodes[3].childNodes[0].childNodes[1].value=mediaChapters;
            mediaBoxFilterClass[i].childNodes[3].childNodes[1].childNodes[1].value=mediaVolumes;
            mediaBoxFilterClass[i].childNodes[3].childNodes[2].childNodes[1].value=mediaScore;
            mediaBoxFilterClass[i].setAttribute('data-myprogress', mediaChapters);
            mediaBoxFilterClass[i].setAttribute('data-myprogressvolumes', mediaVolumes);
            mediaBoxFilterClass[i].setAttribute('data-myscore', mediaScore);


            if(isCompleted==true){
                mediaBoxFilterClass[i].setAttribute('data-mystatus', 'COMPLETED');
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddateyear', todayYear.toString());
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddatemonth', todayMonth.toString());
                mediaBoxFilterClass[i].setAttribute('data-mycompleteddateday', todayDay.toString());
            }
        }
    }
}

function moveOthers(mediaId, tabname){
    let mediaBoxClass = document.getElementsByClassName("mediaBox");
    let mediaBoxFilterClass = document.getElementsByClassName("mediaBoxFilter");
    for(let i=0;i < mediaBoxClass.length; i++){
        if(mediaBoxClass[i].getAttribute("data-mediaId")==mediaId){
            if(mediaBoxClass[i].parentElement.id.includes("All")==false&&mediaBoxClass[i].parentElement.className.includes("filter")==false){
                let completedMediaBox = mediaBoxClass[i].cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById(tabname);
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                mediaBoxClass[i].remove();
            }
        }
    }
}


function processAdvancedInput(format,mediaId,type,episodes,chapters,volumes,status,startDate,finishDate,notes,repeat,score){
    
    let mediaBoxClass = document.getElementsByClassName("mediaBox");
    let mediaBoxFilterClass = document.getElementsByClassName("mediaBoxFilter");

    for(let i=0;i < mediaBoxClass.length; i++){
        if(mediaBoxClass[i].getAttribute("data-mediaId")==mediaId){
            if (type=="ANIME") {
                mediaBoxClass[i].childNodes[3].childNodes[0].childNodes[1].value=episodes;
                mediaBoxClass[i].childNodes[3].childNodes[1].childNodes[1].value=score;
                mediaBoxClass[i].setAttribute('data-myprogress', episodes);
                mediaBoxClass[i].setAttribute('data-myscore', score);
                switch(status){
                    case "Watching":
                        mediaBoxClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;
                    case "Completed":
                        mediaBoxClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "On hold":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "Dropped":
                        mediaBoxClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Plan to watch":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                }

                mediaBoxClass[i].setAttribute('data-mynotes', notes);
                mediaBoxClass[i].setAttribute('data-repeat', repeat);

                console.log(startDate);

                
                if(startDate===""){
                    
                }
                else{
                    const [yearStart,monthStart,dayStart] = startDate.split('-');

                    mediaBoxClass[i].setAttribute('data-mystartdateyear', yearStart);
                    mediaBoxClass[i].setAttribute('data-mystartdatemonth', parseInt(monthStart).toString());
                    mediaBoxClass[i].setAttribute('data-mystartdateday', parseInt(dayStart).toString());
                }



                console.log(finishDate);
                if(finishDate===""){
                    
                }
                else{
                    const [yearFinish,monthFinish,dayFinish] = finishDate.split('-');

                    mediaBoxClass[i].setAttribute('data-mycompleteddateyear', yearFinish);
                    mediaBoxClass[i].setAttribute('data-mycompleteddatemonth', parseInt(monthFinish).toString());
                    mediaBoxClass[i].setAttribute('data-mycompleteddateday', parseInt(dayFinish).toString());
                }

                let myClone = mediaBoxClass[i].cloneNode(true);
                let moveTab = document.getElementById(status);
                //then move mediaBox to the location specified
                if(mediaBoxClass[i].parentElement.className.includes("filter")==false&&mediaBoxClass[i].parentElement.id.includes("All")==false){
                    mediaBoxClass[i].remove();
                    moveTab.insertBefore(myClone, moveTab.firstChild);
                    reSortMyListAnime();
                }

            }

            if (type=="MANGA") {

                mediaBoxClass[i].childNodes[3].childNodes[0].childNodes[1].value=chapters;
                mediaBoxClass[i].childNodes[3].childNodes[1].childNodes[1].value=volumes;
                mediaBoxClass[i].childNodes[3].childNodes[2].childNodes[1].value=score;
                mediaBoxClass[i].setAttribute('data-myprogress', chapters);
                mediaBoxClass[i].setAttribute('data-myprogressvolumes', volumes);
                mediaBoxClass[i].setAttribute('data-myscore', score);
                switch(status){
                    case "Reading":
                        mediaBoxClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;
                    case "Reading2":
                        mediaBoxClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;    
                    case "Completed2":
                        mediaBoxClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "Completed3":
                        mediaBoxClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "On hold2":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "On hold3":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "Dropped2":
                        mediaBoxClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Dropped3":
                        mediaBoxClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Plan to read":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                    case "Plan to read2":
                        mediaBoxClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                }

                mediaBoxClass[i].setAttribute('data-mynotes', notes);
                mediaBoxClass[i].setAttribute('data-repeat', repeat);

                console.log(startDate);

                
                if(startDate===""){
                    
                }
                else{
                    const [yearStart,monthStart,dayStart] = startDate.split('-');

                    mediaBoxClass[i].setAttribute('data-mystartdateyear', yearStart);
                    mediaBoxClass[i].setAttribute('data-mystartdatemonth', parseInt(monthStart).toString());
                    mediaBoxClass[i].setAttribute('data-mystartdateday', parseInt(dayStart).toString());
                }



                console.log(finishDate);
                if(finishDate===""){
                    
                }
                else{
                    const [yearFinish,monthFinish,dayFinish] = finishDate.split('-');

                    mediaBoxClass[i].setAttribute('data-mycompleteddateyear', yearFinish);
                    mediaBoxClass[i].setAttribute('data-mycompleteddatemonth', parseInt(monthFinish).toString());
                    mediaBoxClass[i].setAttribute('data-mycompleteddateday', parseInt(dayFinish).toString());
                }

                let myClone = mediaBoxClass[i].cloneNode(true);
                let moveTab = document.getElementById(status);
                //then move mediaBox to the location specified
                if(mediaBoxClass[i].parentElement.className.includes("filter")==false&&mediaBoxClass[i].parentElement.id.includes("All")==false){
                    mediaBoxClass[i].remove();
                    moveTab.insertBefore(myClone, moveTab.firstChild);
                    reSortMyListManga();
                    reSortMyListLN();
                }

            }
            
        }
    }

    for(let i=0;i < mediaBoxFilterClass.length; i++){
        if(mediaBoxFilterClass[i].getAttribute("data-mediaId")==mediaId){
            if (type=="ANIME") {
                console.log("in filter");
                mediaBoxFilterClass[i].childNodes[3].childNodes[0].childNodes[1].value=episodes;
                mediaBoxFilterClass[i].childNodes[3].childNodes[1].childNodes[1].value=score;
                mediaBoxFilterClass[i].setAttribute('data-myprogress', episodes);
                mediaBoxFilterClass[i].setAttribute('data-myscore', score);
                switch(status){
                    case "Watching":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;
                    case "Completed":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "On hold":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "Dropped":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Plan to watch":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                }

                mediaBoxFilterClass[i].setAttribute('data-mynotes', notes);
                mediaBoxFilterClass[i].setAttribute('data-repeat', repeat);

                console.log(startDate);

                
                if(startDate===""){
                    
                }
                else{
                    const [yearStart,monthStart,dayStart] = startDate.split('-');

                    mediaBoxFilterClass[i].setAttribute('data-mystartdateyear', yearStart);
                    mediaBoxFilterClass[i].setAttribute('data-mystartdatemonth', parseInt(monthStart).toString());
                    mediaBoxFilterClass[i].setAttribute('data-mystartdateday', parseInt(dayStart).toString());
                }



                console.log(finishDate);
                if(finishDate===""){
                    
                }
                else{
                    const [yearFinish,monthFinish,dayFinish] = finishDate.split('-');

                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddateyear', yearFinish);
                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddatemonth', parseInt(monthFinish).toString());
                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddateday', parseInt(dayFinish).toString());
                }

                let myClone = mediaBoxFilterClass[i].cloneNode(true);
                let moveTab = document.getElementById(status);
                //then move mediaBox to the location specified
                if(mediaBoxFilterClass[i].parentElement.className.includes("filter")==false&&mediaBoxFilterClass[i].parentElement.id.includes("All")==false){
                    mediaBoxFilterClass[i].remove();
                    moveTab.insertBefore(myClone, moveTab.firstChild);
                    reSortMyListAnime();
                }

            }

            if (type=="MANGA") {

                mediaBoxFilterClass[i].childNodes[3].childNodes[0].childNodes[1].value=chapters;
                mediaBoxFilterClass[i].childNodes[3].childNodes[1].childNodes[1].value=volumes;
                mediaBoxFilterClass[i].childNodes[3].childNodes[2].childNodes[1].value=score;
                mediaBoxFilterClass[i].setAttribute('data-myprogress', chapters);
                mediaBoxFilterClass[i].setAttribute('data-myprogressvolumes', volumes);
                mediaBoxFilterClass[i].setAttribute('data-myscore', score);
                switch(status){
                    case "Reading":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;
                    case "Reading2":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "CURRENT");
                        break;    
                    case "Completed2":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "Completed3":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "COMPLETED");
                        break;
                    case "On hold2":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "On hold3":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PAUSED");
                        break;
                    case "Dropped2":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Dropped3":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "DROPPED");
                        break;
                    case "Plan to read":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                    case "Plan to read2":
                        mediaBoxFilterClass[i].setAttribute('data-mystatus', "PLANNING");
                        break;
                }

                mediaBoxFilterClass[i].setAttribute('data-mynotes', notes);
                mediaBoxFilterClass[i].setAttribute('data-repeat', repeat);

                console.log(startDate);

                
                if(startDate===""){
                    
                }
                else{
                    const [yearStart,monthStart,dayStart] = startDate.split('-');

                    mediaBoxFilterClass[i].setAttribute('data-mystartdateyear', yearStart);
                    mediaBoxFilterClass[i].setAttribute('data-mystartdatemonth', parseInt(monthStart).toString());
                    mediaBoxFilterClass[i].setAttribute('data-mystartdateday', parseInt(dayStart).toString());
                }



                console.log(finishDate);
                if(finishDate===""){
                    
                }
                else{
                    const [yearFinish,monthFinish,dayFinish] = finishDate.split('-');

                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddateyear', yearFinish);
                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddatemonth', parseInt(monthFinish).toString());
                    mediaBoxFilterClass[i].setAttribute('data-mycompleteddateday', parseInt(dayFinish).toString());
                }

                let myClone = mediaBoxFilterClass[i].cloneNode(true);
                let moveTab = document.getElementById(status);
                //then move mediaBox to the location specified
                if(mediaBoxFilterClass[i].parentElement.className.includes("filter")==false&&mediaBoxFilterClass[i].parentElement.id.includes("All")==false){
                    mediaBoxFilterClass[i].remove();
                    moveTab.insertBefore(myClone, moveTab.firstChild);
                    reSortMyListManga();
                    reSortMyListLN();
                }

            }
            
        }
    }

}


/* status: CURRENT, PLANNING, COMPLETED, DROPPED, PAUSED, REPEATING

*/



//tabcontent
$(".tabcontent").on("click", async function(event){
    console.log(event.target);
    let myTarget = event.target;
    if(event.target.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement; 
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        console.log("remove Button0");
        console.log(myMediaBoxId);
        myMediaBox.remove();
        removeOthers(myMediaBoxId);
        //lookup the medialist listentryid with the use of the user id and the media id
        //wait for it and then use the listentryid to delete the anime. this was done in handledatasinglelookup
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.parentElement.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        myMediaBox.remove();
        console.log("remove Button1");
        console.log(myMediaBoxId);
        removeOthers(myMediaBoxId);
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.parentElement.parentElement.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        myMediaBox.remove();
        console.log("remove Button2");
        console.log(myMediaBoxId);
        removeOthers(myMediaBoxId);
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.className=="updateButton"){
        console.log("update button");
        let myMediaBox = myTarget.parentElement.parentElement.parentElement; 
        let myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        let myMediaInfo= myTarget.parentElement.parentElement;
        let myMediaEpisodeInputList = myMediaInfo.childNodes[0];
        let myMediaEpisodeInput = myMediaEpisodeInputList.childNodes[1].value;
        let myMediaEpisodeTotal = myMediaBox.getAttribute("data-episodes"); 
        let myMediaEpisodeInputNumber = parseInt(myMediaEpisodeInputList.childNodes[1].value);
        let myMediaEpisodeTotalNumber = parseInt(myMediaBox.getAttribute("data-episodes")); 
        let myMediaEpisodeTotalNull = false;
        let myMediaChapterTotalNull = false;
        let myMediaVolumeTotalNull = false;
        let myMediaCompletedTag = false;
        if(myMediaBox.getAttribute('data-type')=='ANIME'){
            //check for decimal
            if(myMediaEpisodeInput.includes(".")){
                myMediaEpisodeInput = Math.round(myMediaEpisodeInput).toString();
                myMediaEpisodeInputNumber = parseInt(myMediaEpisodeInput);
            }
            //check for ? total
            if(myMediaEpisodeTotal=="null"){
                myMediaEpisodeTotalNull=true;
            }
            //if total is not ? then check for greater than or equal to
            if(myMediaEpisodeTotalNull==false){
                if(myMediaEpisodeInputNumber>=myMediaEpisodeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaEpisodeInputList.childNodes[1].value = myMediaEpisodeTotalNumber; //gotta select
                    myMediaEpisodeInput=myMediaEpisodeTotal;
                    console.log(myMediaEpisodeInput);
                    myMediaCompletedTag=true;
                    console.log(myMediaBox.setAttribute("data-mystatus", "COMPLETED"));
                }
            }
            console.log(myMediaEpisodeInput);

            let myMediaScoreInputList = myMediaInfo.childNodes[1];
            let myMediaScoreInput = myMediaScoreInputList.childNodes[1].value;
            let myMediaScoreInputNumber = parseInt(myMediaScoreInputList.childNodes[1].value);
            let myMediaScore = myMediaBox.getAttribute("data-myscore");

            //check for decimal
            if(myMediaScoreInput.includes(".")){
                myMediaScoreInput = Math.round(myMediaScoreInputNumber).toString();
                myMediaScoreInputList.childNodes[1].value = myMediaScoreInput;
            }

            if(myMediaScoreInputNumber>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput=total.toString();
                console.log(myMediaEpisodeInput);
            }


            console.log(myMediaScoreInput);

            //UPDATE OTHERS
            updateOthersAnime(myMediaBoxId, myMediaEpisodeInput, myMediaScoreInput, myMediaCompletedTag);
            

            //update to API
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                //copy and then remove and then put it into watching tab to resort
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeCompleteDate(myMediaBoxId,"COMPLETED",myMediaEpisodeInput,myMediaScoreInput,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                reSortMyListAnime();
            }
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnimeCompleteDate(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeCompleteDate(myMediaBoxId,"COMPLETED",myMediaEpisodeInput,myMediaScoreInput,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed');
            }
            else{
                console.log(myMediaBox.getAttribute('data-mystatus'));
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnime(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
        else if(myMediaBox.getAttribute('data-type')=='MANGA'&&myMediaBox.getAttribute('data-format')!='NOVEL'){ //if manga
            console.log('manga');
            let myMediaChapterInputList = myMediaInfo.childNodes[0];
            let myMediaChapterInput = myMediaChapterInputList.childNodes[1].value;
            let myMediaChapterTotal = myMediaBox.getAttribute("data-chapters");
            let myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            let myMediaChapterTotalNumber = parseInt(myMediaChapterTotal); 
            let myMediaVolumeInputList = myMediaInfo.childNodes[1];
            let myMediaVolumeInput = myMediaVolumeInputList.childNodes[1].value;
            let myMediaVolumeTotal = myMediaBox.getAttribute("data-volumes");
            let myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            let myMediaVolumeTotalNumber = parseInt(myMediaVolumeTotal);
            let myMediaScoreInputList2 = myMediaInfo.childNodes[2];
            let myMediaScoreInput2 = myMediaScoreInputList2.childNodes[1].value;
            let myMediaScoreInputNumber2 = parseInt(myMediaScoreInputList2.childNodes[1].value);

            //check for decimal
            if(myMediaChapterInput.includes(".")){
                myMediaChapterInput = Math.round(myMediaChapterInput).toString();
                myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            }

            //check for ? total
            if(myMediaChapterTotal=="null"){
                myMediaChapterTotalNull=true;
            }

            //check for decimal
            if(myMediaVolumeInput.includes(".")){
                myMediaVolumeInput = Math.round(myMediaVolumeInput).toString();
                myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            }

            //check for ? total
            if(myMediaVolumeTotal=="null"){
                myMediaVolumeTotalNull=true;
            }

            if(myMediaChapterTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber){
                    myMediaChapterInput = myMediaChapterTotal;
                }
            }
            if(myMediaVolumeTotalNull==false){
                if(myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ 
                    myMediaVolumeInput= myMediaVolumeTotal;
                }
            }
            //if total is not ? then check for greater than or equal to
            if(myMediaChapterTotalNull==false && myMediaVolumeTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber && myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaCompletedTag=true;
                }
            }

            //check for decimal
            if(myMediaScoreInput2.includes(".")){
                myMediaScoreInput2 = Math.round(myMediaScoreInputNumber2).toString();
                myMediaScoreInputList2.childNodes[1].value = myMediaScoreInput2;
            }

            if(myMediaScoreInputNumber2>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList2.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput2=total.toString();
                console.log(myMediaScoreInput2);
            }

            updateOthersManga(myMediaBoxId, myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2, myMediaCompletedTag);

            //update to API
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                //copy and then remove and then put it into watching tab to resort
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed2');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                reSortMyListManga();
            }
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed2');
            }
            else{
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryManga(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2);
                document.getElementById("updatingNotification").style.display="none";
            }

        }
        else{ //if novel
            console.log('novel');
            let myMediaChapterInputList = myMediaInfo.childNodes[0];
            let myMediaChapterInput = myMediaChapterInputList.childNodes[1].value;
            let myMediaChapterTotal = myMediaBox.getAttribute("data-chapters");
            let myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            let myMediaChapterTotalNumber = parseInt(myMediaChapterTotal); 
            let myMediaVolumeInputList = myMediaInfo.childNodes[1];
            let myMediaVolumeInput = myMediaVolumeInputList.childNodes[1].value;
            let myMediaVolumeTotal = myMediaBox.getAttribute("data-volumes");
            let myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            let myMediaVolumeTotalNumber = parseInt(myMediaVolumeTotal);
            let myMediaScoreInputList2 = myMediaInfo.childNodes[2];
            let myMediaScoreInput2 = myMediaScoreInputList2.childNodes[1].value;
            let myMediaScoreInputNumber2 = parseInt(myMediaScoreInputList2.childNodes[1].value);

            //check for decimal
            if(myMediaChapterInput.includes(".")){
                myMediaChapterInput = Math.round(myMediaChapterInput).toString();
                myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            }

            //check for ? total
            if(myMediaChapterTotal=="null"){
                myMediaChapterTotalNull=true;
            }

            //check for decimal
            if(myMediaVolumeInput.includes(".")){
                myMediaVolumeInput = Math.round(myMediaVolumeInput).toString();
                myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            }

            //check for ? total
            if(myMediaVolumeTotal=="null"){
                myMediaVolumeTotalNull=true;
            }

            //if total is not ? then check for greater than or equal to
            if(myMediaChapterTotalNull==false && myMediaVolumeTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber && myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaCompletedTag=true;
                }
            }

            //check for decimal
            if(myMediaScoreInput2.includes(".")){
                myMediaScoreInput2 = Math.round(myMediaScoreInputNumber2).toString();
                myMediaScoreInputList2.childNodes[1].value = myMediaScoreInput2;
            }

            if(myMediaScoreInputNumber2>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList2.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput2=total.toString();
                console.log(myMediaScoreInput2);
            }

            updateOthersManga(myMediaBoxId, myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2, myMediaCompletedTag);

            //update to API and date
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                //copy and then remove and then put it into watching tab to resort
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed3');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                reSortMyListLN();
            }
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed3');
            }
            else{
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryManga(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
    }

    if(event.target.className=="mediaImage"){
        console.log("image");
        let myMediaBox = myTarget.parentElement; 

        let myMediaBoxTitleRomaji = myMediaBox.getAttribute("data-titleromaji");
        let myMediaBoxTitleEnglish = myMediaBox.getAttribute("data-titleenglish");
        let myMediaBoxTitleNative = myMediaBox.getAttribute("data-titlenative");
        console.log(myMediaBox);
        //send to main and then open new window 
        let myArray = new Array();
        //unshift adds to beginning of array and then popping gets it out from the end
        if(titlePreference=="Romaji"){
            myArray.unshift(myMediaBoxTitleRomaji);
        }
        if(titlePreference=="English"){
            myArray.unshift(myMediaBoxTitleEnglish);
        }
        if(titlePreference=="Native"){
            myArray.unshift(myMediaBoxTitleNative);
        }


        let myMediaImageSource = myMediaBox.getAttribute('data-coverimagelarge');
        //add in picture address
        myArray.unshift(myMediaImageSource);        

        //add in site url
        let myMediaSiteUrl = myMediaBox.getAttribute('data-siteurl');
        myArray.unshift(myMediaSiteUrl);

        //add in format, episodes, duration, status, average score, season, genres
        myArray.unshift(myMediaBox.getAttribute('data-format'));
        myArray.unshift(myMediaBox.getAttribute('data-episodes'));
        myArray.unshift(myMediaBox.getAttribute('data-chapters'));
        myArray.unshift(myMediaBox.getAttribute('data-volumes'));
        myArray.unshift(myMediaBox.getAttribute('data-status'));
        myArray.unshift(myMediaBox.getAttribute('data-averagescore'));
        myArray.unshift(myMediaBox.getAttribute('data-season'));
        myArray.unshift(myMediaBox.getAttribute('data-seasonyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateday'));
        myArray.unshift(myMediaBox.getAttribute('data-genres'));
        
        myArray.unshift(myMediaBox.getAttribute('data-description'));
        myArray.unshift(myMediaBox.getAttribute('data-duration'));
        myArray.unshift(myMediaBox.getAttribute('data-mynotes'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdateday'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddateday'));
        myArray.unshift(myMediaBox.getAttribute('data-listentryid'));
        myArray.unshift(myMediaBox.getAttribute('data-myscore'));
        myArray.unshift(myMediaBox.getAttribute('data-myprogress'));
        myArray.unshift(myMediaBox.getAttribute('data-myprogressvolumes'));
        myArray.unshift(myMediaBox.getAttribute('data-mediaid'));
        myArray.unshift(myMediaBox.getAttribute('data-id'));
        myArray.unshift(myMediaBox.getAttribute('data-mystatus'));
        myArray.unshift(myMediaBox.getAttribute('data-type'));
        myArray.unshift(myMediaBox.getAttribute('data-repeat'));

        //userid, mediaid, episodeprogress, myscore, season
        ipcRenderer.send("msg", "info");
        ipcRenderer.send("msg", myArray);
    }
});






//filterTabs
$(".filterTabs").on("click", async function(event){
    console.log(event.target);
    let myTarget = event.target;
    if(event.target.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement; 
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        console.log("remove Button0");
        console.log(myMediaBoxId);
        myMediaBox.remove();
        removeOthers(myMediaBoxId);
        //lookup the medialist listentryid with the use of the user id and the media id
        //wait for it and then use the listentryid to delete the anime. this was done in handledatasinglelookup
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.parentElement.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        myMediaBox.remove();
        console.log("remove Button1");
        console.log(myMediaBoxId);
        removeOthers(myMediaBoxId);
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.parentElement.parentElement.className=="removeButton"){
        let myMediaBox = myTarget.parentElement.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        myMediaBox.remove();
        console.log("remove Button2");
        console.log(myMediaBoxId);
        removeOthers(myMediaBoxId);
        LookUpMyEntryRemove(globalUserId, myMediaBoxId);
    }
    if(event.target.className=="updateButton"){
        console.log("update button");
        let myMediaBox = myTarget.parentElement.parentElement.parentElement; 
        let myMediaBoxId = myMediaBox.getAttribute("data-mediaId");
        let myMediaInfo= myTarget.parentElement.parentElement;
        let myMediaEpisodeInputList = myMediaInfo.childNodes[0];
        let myMediaEpisodeInput = myMediaEpisodeInputList.childNodes[1].value;
        let myMediaEpisodeTotal = myMediaBox.getAttribute("data-episodes"); 
        let myMediaEpisodeInputNumber = parseInt(myMediaEpisodeInputList.childNodes[1].value);
        let myMediaEpisodeTotalNumber = parseInt(myMediaBox.getAttribute("data-episodes")); 
        let myMediaEpisodeTotalNull = false;
        let myMediaChapterTotalNull = false;
        let myMediaVolumeTotalNull = false;
        let myMediaCompletedTag = false;

        if(myMediaBox.getAttribute('data-type')=='ANIME'){
            //check for decimal
            if(myMediaEpisodeInput.includes(".")){
                myMediaEpisodeInput = Math.round(myMediaEpisodeInput).toString();
                myMediaEpisodeInputNumber = parseInt(myMediaEpisodeInput);
            }
            //check for ? total
            if(myMediaEpisodeTotal=="null"){
                myMediaEpisodeTotalNull=true;
            }
            //if total is not ? then check for greater than or equal to
            if(myMediaEpisodeTotalNull==false){
                if(myMediaEpisodeInputNumber>=myMediaEpisodeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaEpisodeInputList.childNodes[1].value = myMediaEpisodeTotalNumber; //gotta select
                    myMediaEpisodeInput=myMediaEpisodeTotal;
                    console.log(myMediaEpisodeInput);
                    myMediaCompletedTag=true;
                    console.log(myMediaBox.setAttribute("data-mystatus", "COMPLETED"));
                }
            }
            console.log(myMediaEpisodeInput);

            let myMediaScoreInputList = myMediaInfo.childNodes[1];
            let myMediaScoreInput = myMediaScoreInputList.childNodes[1].value;
            let myMediaScoreInputNumber = parseInt(myMediaScoreInputList.childNodes[1].value);
            let myMediaScore = myMediaBox.getAttribute("data-myscore");

            //check for decimal
            if(myMediaScoreInput.includes(".")){
                myMediaScoreInput = Math.round(myMediaScoreInputNumber).toString();
                myMediaScoreInputList.childNodes[1].value = myMediaScoreInput;
            }

            if(myMediaScoreInputNumber>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput=total.toString();
                console.log(myMediaEpisodeInput);
            }


            console.log(myMediaScoreInput);

            //UPDATE OTHERS
            updateOthersAnime(myMediaBoxId, myMediaEpisodeInput, myMediaScoreInput, myMediaCompletedTag);
            

            //update to API
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                //copy and then remove and then put it into watching tab to resort
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeCompleteDate(myMediaBoxId,"COMPLETED",myMediaEpisodeInput,myMediaScoreInput,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                reSortMyListAnime();
            }
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnimeCompleteDate(myMediaBoxId,"COMPLETED",myMediaEpisodeInput,myMediaScoreInput,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed');
            }
            else{
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryAnime(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
        else if(myMediaBox.getAttribute('data-type')=='MANGA'&&myMediaBox.getAttribute('data-format')!='NOVEL'){ //if manga
            console.log('manga');
            let myMediaChapterInputList = myMediaInfo.childNodes[0];
            let myMediaChapterInput = myMediaChapterInputList.childNodes[1].value;
            let myMediaChapterTotal = myMediaBox.getAttribute("data-chapters");
            let myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            let myMediaChapterTotalNumber = parseInt(myMediaChapterTotal); 
            let myMediaVolumeInputList = myMediaInfo.childNodes[1];
            let myMediaVolumeInput = myMediaVolumeInputList.childNodes[1].value;
            let myMediaVolumeTotal = myMediaBox.getAttribute("data-volumes");
            let myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            let myMediaVolumeTotalNumber = parseInt(myMediaVolumeTotal);
            let myMediaScoreInputList2 = myMediaInfo.childNodes[2];
            let myMediaScoreInput2 = myMediaScoreInputList2.childNodes[1].value;
            let myMediaScoreInputNumber2 = parseInt(myMediaScoreInputList2.childNodes[1].value);

            //check for decimal
            if(myMediaChapterInput.includes(".")){
                myMediaChapterInput = Math.round(myMediaChapterInput).toString();
                myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            }

            //check for ? total
            if(myMediaChapterTotal=="null"){
                myMediaChapterTotalNull=true;
            }

            //check for decimal
            if(myMediaVolumeInput.includes(".")){
                myMediaVolumeInput = Math.round(myMediaVolumeInput).toString();
                myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            }

            //check for ? total
            if(myMediaVolumeTotal=="null"){
                myMediaVolumeTotalNull=true;
            }

            if(myMediaChapterTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber){
                    myMediaChapterInput = myMediaChapterTotal;
                }
            }
            if(myMediaVolumeTotalNull==false){
                if(myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ 
                    myMediaVolumeInput= myMediaVolumeTotal;
                }
            }

            //if total is not ? then check for greater than or equal to
            if(myMediaChapterTotalNull==false && myMediaVolumeTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber && myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaCompletedTag=true;
                }
            }

            //check for decimal
            if(myMediaScoreInput2.includes(".")){
                myMediaScoreInput2 = Math.round(myMediaScoreInputNumber2).toString();
                myMediaScoreInputList2.childNodes[1].value = myMediaScoreInput2;
            }

            if(myMediaScoreInputNumber2>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList2.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput2=total.toString();
                console.log(myMediaScoreInput2);
            }

            updateOthersManga(myMediaBoxId, myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2, myMediaCompletedTag);

            //update to API
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                //copy and then remove and then put it into watching tab to resort
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed2');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                reSortMyListManga();
            }
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed2');
            }
            else{
                console.log(myMediaBox.getAttribute('data-mystatus'));
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryManga(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
        else{ //if novel
            console.log('novel');
            let myMediaChapterInputList = myMediaInfo.childNodes[0];
            let myMediaChapterInput = myMediaChapterInputList.childNodes[1].value;
            let myMediaChapterTotal = myMediaBox.getAttribute("data-chapters");
            let myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            let myMediaChapterTotalNumber = parseInt(myMediaChapterTotal); 
            let myMediaVolumeInputList = myMediaInfo.childNodes[1];
            let myMediaVolumeInput = myMediaVolumeInputList.childNodes[1].value;
            let myMediaVolumeTotal = myMediaBox.getAttribute("data-volumes");
            let myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            let myMediaVolumeTotalNumber = parseInt(myMediaVolumeTotal);
            let myMediaScoreInputList2 = myMediaInfo.childNodes[2];
            let myMediaScoreInput2 = myMediaScoreInputList2.childNodes[1].value;
            let myMediaScoreInputNumber2 = parseInt(myMediaScoreInputList2.childNodes[1].value);


            //check for decimal
            if(myMediaChapterInput.includes(".")){
                myMediaChapterInput = Math.round(myMediaChapterInput).toString();
                myMediaChapterInputNumber = parseInt(myMediaChapterInput);
            }

            //check for ? total
            if(myMediaChapterTotal=="null"){
                myMediaChapterTotalNull=true;
            }

            //check for decimal
            if(myMediaVolumeInput.includes(".")){
                myMediaVolumeInput = Math.round(myMediaVolumeInput).toString();
                myMediaVolumeInputNumber = parseInt(myMediaVolumeInput);
            }

            //check for ? total
            if(myMediaVolumeTotal=="null"){
                myMediaVolumeTotalNull=true;
            }

            if(myMediaChapterTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber){
                    myMediaChapterInput = myMediaChapterTotal;
                }
            }
            if(myMediaVolumeTotalNull==false){
                if(myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ 
                    myMediaVolumeInput= myMediaVolumeTotal;
                }
            }

            //if total is not ? then check for greater than or equal to
            if(myMediaChapterTotalNull==false && myMediaVolumeTotalNull==false){
                if(myMediaChapterInputNumber>=myMediaChapterTotalNumber && myMediaVolumeInputNumber>=myMediaVolumeTotalNumber){ //if episode input number is greater than or equal to total, set input to total
                    myMediaCompletedTag=true;
                }
            }

            //check for decimal
            if(myMediaScoreInput2.includes(".")){
                myMediaScoreInput2 = Math.round(myMediaScoreInputNumber2).toString();
                myMediaScoreInputList2.childNodes[1].value = myMediaScoreInput2;
            }

            if(myMediaScoreInputNumber2>=10){ //if episode input number is greater than or equal to total, set input to total
                let total = 10;
                myMediaScoreInputList2.childNodes[1].value = total.toString(); //gotta select
                myMediaScoreInput2=total.toString();
                console.log(myMediaScoreInput2);
            }

            updateOthersManga(myMediaBoxId, myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2, myMediaCompletedTag);

            //update to API and date
            if(myMediaCompletedTag==true&&myMediaBox.parentElement.id.includes("All")==false&&myMediaBox.parentElement.className.includes("filter")==false){
                //saveMyEntryAnime(myMediaBoxId,"COMPLETED",myMediaEpisodeInput, myMediaScoreInput);
                //copy and then remove and then put it into watching tab to resort
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                let completedMediaBox = myMediaBox.cloneNode(true);
                //move, remove and re-sort
                //check which one is active to move to the right completed
                let completedTab = document.getElementById('Completed3');
                completedTab.insertBefore(completedMediaBox, completedTab.firstChild);
                myMediaBox.remove();
                reSortMyListLN();
            }
            
            else if(myMediaCompletedTag==true&&(myMediaBox.parentElement.id.includes("All")==true||myMediaBox.parentElement.className.includes("filter")==true)){ 
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput, today.getFullYear(), today.getMonth()+1, today.getDate());
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryMangaCompleteDate(myMediaBoxId,"COMPLETED",myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2,today.getFullYear(),today.getMonth()+1,today.getDate());
                document.getElementById("updatingNotification").style.display="none";
                moveOthers(myMediaBoxId, 'Completed3');
            }
            else{
                //saveMyEntryAnime(myMediaBoxId,"CURRENT",myMediaEpisodeInput, myMediaScoreInput);
                document.getElementById("updatingNotification").style.display="block";
                await saveMyEntryManga(myMediaBoxId,myMediaBox.getAttribute('data-mystatus'),myMediaChapterInput, myMediaVolumeInput, myMediaScoreInput2);
                document.getElementById("updatingNotification").style.display="none";
            }
        }
    }

    if(event.target.className=="mediaImage"){
        console.log("image");
        let myMediaBox = myTarget.parentElement; 

        let myMediaBoxTitleRomaji = myMediaBox.getAttribute("data-titleromaji");
        let myMediaBoxTitleEnglish = myMediaBox.getAttribute("data-titleenglish");
        let myMediaBoxTitleNative = myMediaBox.getAttribute("data-titlenative");
        console.log(myMediaBox);
        //send to main and then open new window 
        let myArray = new Array();
        //unshift adds to beginning of array and then popping gets it out from the end
        if(titlePreference=="Romaji"){
            myArray.unshift(myMediaBoxTitleRomaji);
        }
        if(titlePreference=="English"){
            myArray.unshift(myMediaBoxTitleEnglish);
        }
        if(titlePreference=="Native"){
            myArray.unshift(myMediaBoxTitleNative);
        }


        let myMediaImageSource = myMediaBox.getAttribute('data-coverimagelarge');
        //add in picture address
        myArray.unshift(myMediaImageSource);        

        //add in site url
        let myMediaSiteUrl = myMediaBox.getAttribute('data-siteurl');
        myArray.unshift(myMediaSiteUrl);

        //add in format, episodes, duration, status, average score, season, genres
        myArray.unshift(myMediaBox.getAttribute('data-format'));
        myArray.unshift(myMediaBox.getAttribute('data-episodes'));
        myArray.unshift(myMediaBox.getAttribute('data-chapters'));
        myArray.unshift(myMediaBox.getAttribute('data-volumes'));
        myArray.unshift(myMediaBox.getAttribute('data-status'));
        myArray.unshift(myMediaBox.getAttribute('data-averagescore'));
        myArray.unshift(myMediaBox.getAttribute('data-season'));
        myArray.unshift(myMediaBox.getAttribute('data-seasonyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateday'));
        myArray.unshift(myMediaBox.getAttribute('data-genres'));
        
        myArray.unshift(myMediaBox.getAttribute('data-description'));
        myArray.unshift(myMediaBox.getAttribute('data-duration'));
        myArray.unshift(myMediaBox.getAttribute('data-mynotes'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-mystartdateday'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-mycompleteddateday'));
        myArray.unshift(myMediaBox.getAttribute('data-listentryid'));
        myArray.unshift(myMediaBox.getAttribute('data-myscore'));
        myArray.unshift(myMediaBox.getAttribute('data-myprogress'));
        myArray.unshift(myMediaBox.getAttribute('data-myprogressvolumes'));
        myArray.unshift(myMediaBox.getAttribute('data-mediaid'));
        myArray.unshift(myMediaBox.getAttribute('data-id'));
        myArray.unshift(myMediaBox.getAttribute('data-mystatus'));
        myArray.unshift(myMediaBox.getAttribute('data-type'));
        myArray.unshift(myMediaBox.getAttribute('data-repeat'));

        //userid, mediaid, episodeprogress, myscore, season
        ipcRenderer.send("msg", "info");
        ipcRenderer.send("msg", myArray);
    }
});





//searchTab
$(".searchTab").on("click", async function(event){
    console.log(event.target);
    let myTarget = event.target;
    let myFlag = false;
    if(event.target.className=="addButton"){
        let myMediaBox = event.target.parentElement.parentElement; 
        myMediaBoxId = myMediaBox.getAttribute("data-id");
        console.log(event.target.parentElement.parentElement);
        console.log('removing' + event.target.firstChild.firstChild);
        event.target.firstChild.firstChild.remove();
        console.log(1);


        event.target.className="removeButton";
        event.target.title="Remove from list";
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d','M2,12 H2,18');
        path.setAttribute('stroke','white');
        path.setAttribute('stroke-width','5');
        path.setAttribute('fill','white');
        event.target.firstChild.appendChild(path);
        myFlag=true;
        console.log(myMediaBoxId);
        await addMyEntry(myMediaBoxId, "CURRENT");
        await refreshList();
    }
    if(event.target.parentElement.className=="addButton" && event.target.nodeName=='svg'){
        let myMediaBox = event.target.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-id");
        console.log(event.target.parentElement.parentElement.parentElement);
        console.log('removing' + event.target.firstChild);
        event.target.firstChild.remove();
        console.log(2);


        event.target.parentElement.className="removeButton";
        event.target.parentElement.title="Remove from list";
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d','M2,12 H2,18');
        path.setAttribute('stroke','white');
        path.setAttribute('stroke-width','5');
        path.setAttribute('fill','white');
        event.target.appendChild(path);
        myFlag=true;
        console.log(myMediaBoxId);
        await addMyEntry(myMediaBoxId, "CURRENT");
        await refreshList();
    }
    if(event.target.parentElement.parentElement.className=="addButton" && event.target.nodeName=='path'){
        let myMediaBox = event.target.parentElement.parentElement.parentElement.parentElement;
        myMediaBoxId = myMediaBox.getAttribute("data-id");
        console.log(event.target.parentElement.parentElement.parentElement.parentElement);
        console.log('removing' + event.target);

        let myTargetParent = event.target.parentElement;
        event.target.parentElement.parentElement.className="removeButton";
        event.target.parentElement.parentElement.title="Remove from list";
        event.target.remove();
        console.log(3);


        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d','M2,12 H2,18');
        path.setAttribute('stroke','white');
        path.setAttribute('stroke-width','5');
        path.setAttribute('fill','white');
        myTargetParent.appendChild(path);
        myFlag=true;
        console.log(myMediaBoxId);
        await addMyEntry(myMediaBoxId, "CURRENT");
        await refreshList();
    }

    
    if(event.target!=null&&myFlag==false){
        if(event.target.className=="removeButton"){
            let myMediaBox = event.target.parentElement.parentElement; 
            myMediaBoxId = myMediaBox.getAttribute("data-id");
            console.log(myMediaBoxId);
            console.log(event.target.parentElement);

            event.target.firstChild.firstChild.remove();
            console.log(4);
    
            event.target.className="addButton";
            event.target.title="Add to list";
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d','M2,11 H2,18 M10,2 V2,19');
            path.setAttribute('stroke','white');
            path.setAttribute('stroke-width','5');
            path.setAttribute('fill','white');
            event.target.firstChild.appendChild(path);
            myFlag = false;
            await LookUpMyEntryRemove(globalUserId,myMediaBoxId);
            await refreshList();
        }

        if(event.target.parentElement!=null&&myFlag==false){
            if(event.target.parentElement.className=="removeButton"){
                let myMediaBox = event.target.parentElement.parentElement.parentElement;
                myMediaBoxId = myMediaBox.getAttribute("data-id");
                console.log(myMediaBoxId);
                console.log(event.target.parentElement);
                event.target.firstChild.remove();
                
                console.log(5);
                event.target.parentElement.className="addButton";
                event.target.parentElement.title="Add to list";
                let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d','M2,11 H2,18 M10,2 V2,19');
                path.setAttribute('stroke','white');
                path.setAttribute('stroke-width','5');
                path.setAttribute('fill','white');
                event.target.appendChild(path);            
                myFlag = false;
                await LookUpMyEntryRemove(globalUserId,myMediaBoxId);
                await refreshList();
            }
            
            if(event.target.parentElement.parentElement!=null&&myFlag==false){
                if(event.target.parentElement.parentElement.className=="removeButton"){
                    let myMediaBox = event.target.parentElement.parentElement.parentElement.parentElement;
                    myMediaBoxId = myMediaBox.getAttribute("data-id");
                    console.log(myMediaBoxId);
                    console.log(event.target);
            
                    console.log(6);
                    let myTargetParent = event.target.parentElement;
                    event.target.parentElement.parentElement.className="addButton";
                    event.target.parentElement.parentElement.title="Add to list";
                    event.target.remove();
            
                    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d','M2,11 H2,18 M10,2 V2,19');
                    path.setAttribute('stroke','white');
                    path.setAttribute('stroke-width','5');
                    path.setAttribute('fill','white');
                    myTargetParent.appendChild(path);
                    myFlag = false;
                    await LookUpMyEntryRemove(globalUserId,myMediaBoxId);
                    await refreshList();
                }
            }
        }

    }




    if(event.target.className=="mediaImage"){
        console.log("image");
        let myMediaBox = myTarget.parentElement; 

        let myMediaBoxTitleRomaji = myMediaBox.getAttribute("data-titleromaji");
        let myMediaBoxTitleEnglish = myMediaBox.getAttribute("data-titleenglish");
        let myMediaBoxTitleNative = myMediaBox.getAttribute("data-titlenative");
        console.log(myMediaBox);
        //send to main and then open new window 
        let myArray = new Array();
        //unshift adds to beginning of array and then popping gets it out from the end
        if(titlePreference=="Romaji"){
            myArray.unshift(myMediaBoxTitleRomaji);
        }
        if(titlePreference=="English"){
            myArray.unshift(myMediaBoxTitleEnglish);
        }
        if(titlePreference=="Native"){
            myArray.unshift(myMediaBoxTitleNative);
        }


        let myMediaImageSource = myMediaBox.getAttribute('data-coverimagelarge');
        //add in picture address
        myArray.unshift(myMediaImageSource);        

        //add in site url
        let myMediaSiteUrl = myMediaBox.getAttribute('data-siteurl');
        myArray.unshift(myMediaSiteUrl);

        myArray.unshift(myMediaBox.getAttribute('data-format'));
        myArray.unshift(myMediaBox.getAttribute('data-episodes'));
        myArray.unshift(myMediaBox.getAttribute('data-chapters'));
        myArray.unshift(myMediaBox.getAttribute('data-volumes'));
        myArray.unshift(myMediaBox.getAttribute('data-status'));
        myArray.unshift(myMediaBox.getAttribute('data-averagescore'));
        myArray.unshift(myMediaBox.getAttribute('data-season'));
        myArray.unshift(myMediaBox.getAttribute('data-seasonyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateyear'));
        myArray.unshift(myMediaBox.getAttribute('data-startdatemonth'));
        myArray.unshift(myMediaBox.getAttribute('data-startdateday'));
        myArray.unshift(myMediaBox.getAttribute('data-genres'));
        myArray.unshift(myMediaBox.getAttribute('data-description'));
        myArray.unshift(myMediaBox.getAttribute('data-listentryid'));
        myArray.unshift(myMediaBox.getAttribute('data-mediaid'));
        myArray.unshift(myMediaBox.getAttribute('data-id'));
        myArray.unshift(myMediaBox.getAttribute('data-type'));

        console.log(myArray);
        //userid, mediaid, episodeprogress, myscore, season
        ipcRenderer.send("msg", "info2");
        ipcRenderer.send("msg", myArray);
    }
});






//VNDB API




//API stuff for MyAnimeList
//For anime
//For manga
//For light novels
