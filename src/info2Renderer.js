const {ipcRenderer, shell, contextBridge} = require('electron');

var today = new Date();

ipcRenderer.on('asynchronous-message', function (evt, message) {
    if(Array.isArray(message)){
        let myMediaTitle = message.pop();
        let myMediaImageSource = message.pop();
        let myMediaImage = document.createElement('img');
        myMediaImage.src = myMediaImageSource;

        document.title = myMediaTitle;
        myMediaImage.className="mediaImage";
        myMediaImage.id="myMediaImage";

        let myMediaSiteUrl = message.pop();

        document.getElementById("imageWrapper").appendChild(myMediaImage);

        document.getElementById("myMediaImage").addEventListener("click",(e)=>{
            openToAnotherWindow(myMediaSiteUrl);
        });


        let myMediaFormat = message.pop();
        console.log(myMediaFormat);

        let myMediaEpisodes = message.pop();
        console.log(myMediaEpisodes);

        let myMediaChapters = message.pop();
        console.log(myMediaChapters);

        let myMediaVolumes = message.pop();
        console.log(myMediaVolumes);

        let mediaStatus = message.pop();
        console.log(mediaStatus);

        let myMediaAverageScore = message.pop();
        console.log(myMediaAverageScore);

        let myMediaSeason = message.pop();
        console.log(myMediaSeason);

        let myMediaSeasonYear = message.pop();
        console.log(myMediaSeasonYear);

        let myMediaStartDateYear = message.pop();
        console.log(myMediaStartDateYear);

        let myMediaStartDateMonth = message.pop();
        console.log(myMediaStartDateMonth);

        let myMediaStartDateDay = message.pop();
        console.log(myMediaStartDateDay);

        let myMediaGenres = message.pop();
        console.log(myMediaGenres);

        let myMediaDescription = message.pop();
        console.log(myMediaDescription);

        
        let myMediaListEntryId = message.pop();
        console.log(myMediaListEntryId);

        let myMediaId = message.pop();
        console.log(myMediaId);

        let myId = message.pop();
        console.log(myId);

        let myDataType = message.pop();
        console.log(myDataType);


        let myDescription = document.createElement('p');
        myDescription.className = "mediaDescription";
        myDescription.innerHTML = myMediaDescription;

        document.getElementById("content").appendChild(myDescription);


        let myTitleElement = document.createElement('div');
        myTitleElement.textContent = myMediaTitle;
        myTitleElement.className = "mediaTitle";

        document.getElementById('content').appendChild(myTitleElement);

        let extraInfo = document.getElementById('extraInfo');

        let myExtraInfoFormat = document.createElement('li');
        myExtraInfoFormat.innerHTML = "<b style='color:skyblue'>Type</b>"  + ":   " + myMediaFormat;
        
        let myExtraInfoEpisodes = document.createElement('li');
        myExtraInfoEpisodes.innerHTML = "<b style='color:skyblue'>Episodes</b>"  + ":  " + myMediaEpisodes;
        if(myMediaEpisodes=="null"){
            myExtraInfoEpisodes.innerHTML = "<b style='color:skyblue'>Episodes</b >"  + ":  ?" ;
        }

        let myExtraInfoStatus = document.createElement('li');
        myExtraInfoStatus.innerHTML = "<b style='color:skyblue'>Status</b>"  + ":  " + mediaStatus;

        let myExtraInfoSeason = document.createElement('li');
        myExtraInfoSeason.innerHTML  = "<b style='color:skyblue'>Season</b>"  + ":  " + myMediaSeason + " " + myMediaStartDateYear;
        if(myMediaSeason=="null"||myMediaSeasonYear=="null"){
            myExtraInfoSeason.innerHTML  = "<b style='color:skyblue'>Season</b>"  + ":  ?";
        }

        let myExtraInfoScore = document.createElement('li');
        myExtraInfoScore.innerHTML  = "<b style='color:skyblue'>Average Score</b>"  + ":  " + myMediaAverageScore + "%";

        if(myMediaAverageScore=="null"){
            myExtraInfoScore.innerHTML  = "<b style='color:skyblue'>Average Score</b>"  + ":  ?" ;
        }

        let myExtraInfoGenres = document.createElement('li');
        myExtraInfoGenres.innerHTML = "<b style='color:skyblue'>Genres</b>"  + ":  " + myMediaGenres.replace(/,/g, ', ');



        //for manga/light novels
        let myExtraInfoType = document.createElement('li');
        myExtraInfoType.innerHTML =  "<b style='color:skyblue'>Type</b>"  + ":  " + myMediaFormat;

        let myExtraInfoChapters = document.createElement('li');
        myExtraInfoChapters.innerHTML =  "<b style='color:skyblue'>Chapters</b>"  + ":  " + myMediaChapters;
        if(myMediaChapters=="null"){
            myExtraInfoChapters.innerHTML =  "<b style='color:skyblue'>Chapters</b>"  + ":  ?";
        }

        let myExtraInfoVolumes = document.createElement('li');
        myExtraInfoVolumes.innerHTML =  "<b style='color:skyblue'>Volumes</b>"  + ":  " + myMediaVolumes;
        if(myMediaVolumes=="null"){
            myExtraInfoVolumes.innerHTML =  "<b style='color:skyblue'>Volumes</b>"  + ":  ?";
        }

        let myExtraInfoReleaseDate = document.createElement('li');
        myExtraInfoReleaseDate.innerHTML =  "<b style='color:skyblue'>Released:</b>"  + ":  " + myMediaStartDateMonth + "/" + myMediaStartDateDay + "/" + myMediaStartDateYear;
        if(myMediaStartDateDay=="null"){
            myExtraInfoReleaseDate.innerHTML =  "<b style='color:skyblue'>Released:</b>"  + ":  ?";
        }

        if(myDataType=="ANIME"){
            extraInfo.appendChild(myExtraInfoFormat);
            extraInfo.appendChild(myExtraInfoEpisodes);
            extraInfo.appendChild(myExtraInfoStatus);
            extraInfo.appendChild(myExtraInfoSeason);
            extraInfo.appendChild(myExtraInfoScore);
            extraInfo.appendChild(myExtraInfoGenres);
        }
        else{
            extraInfo.appendChild(myExtraInfoType);
            extraInfo.appendChild(myExtraInfoChapters);
            extraInfo.appendChild(myExtraInfoVolumes);
            extraInfo.appendChild(myExtraInfoStatus);
            extraInfo.appendChild(myExtraInfoReleaseDate);
            extraInfo.appendChild(myExtraInfoScore);
            extraInfo.appendChild(myExtraInfoGenres);
        }
    }
});

function openToAnotherWindow(myUrl){
    shell.openExternal(myUrl);
}