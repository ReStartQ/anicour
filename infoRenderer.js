const {ipcRenderer, shell, contextBridge} = require('electron');

var today = new Date();
var globalMyMediaId, globalMyMediaFormat, globalMyMediaType;
var globalEpisodes, globalChapters, globalVolumes


ipcRenderer.on('asynchronous-message', function (evt, message) {
    if(Array.isArray(message)){
        let myMediaTitle = message.pop();
        let myMediaImageSource = message.pop();
        let myMediaImage = document.createElement('img');
        myMediaImage.src = myMediaImageSource;

        document.title = myMediaTitle;
        myMediaImage.className="mediaImage";
        myMediaImage.title="Go to AniList";
        myMediaImage.id="myMediaImage";
        let myMediaSiteUrl = message.pop();

        
        document.getElementById("imageWrapper").appendChild(myMediaImage);

        document.getElementById("myMediaImage").addEventListener("click",(e)=>{
            openToAnotherWindow(myMediaSiteUrl);
        });


        let myMediaFormat = message.pop();
        console.log(myMediaFormat);
        globalMyMediaFormat = myMediaFormat;

        let myMediaEpisodes = message.pop();
        console.log(myMediaEpisodes);
        globalEpisodes = myMediaEpisodes;

        let myMediaChapters = message.pop();
        console.log(myMediaChapters);
        globalChapters = myMediaChapters;

        let myMediaVolumes = message.pop();
        console.log(myMediaVolumes);
        globalVolumes = myMediaVolumes;

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

        let myMediaDuration = message.pop();
        console.log(myMediaDuration);

        let myMediaNotes = message.pop();
        console.log(myMediaNotes);

        let myMediaMyStartDateYear = message.pop();
        console.log(myMediaMyStartDateYear);

        let myMediaMyStartDateMonth = message.pop();
        console.log(myMediaMyStartDateMonth);

        let myMediaMyStartDateDay = message.pop();
        console.log(myMediaMyStartDateDay);

        let myMediaMyCompletedDateYear = message.pop();
        console.log(myMediaMyCompletedDateYear);

        let myMediaMyCompletedDateMonth = message.pop();
        console.log(myMediaMyCompletedDateMonth);

        let myMediaMyCompletedDateDay = message.pop();
        console.log(myMediaMyCompletedDateDay);

        let myMediaListEntryId = message.pop();
        console.log(myMediaListEntryId);

        let myMediaMyScore = message.pop();
        console.log(myMediaMyScore);

        let myMediaMyProgress = message.pop();
        console.log(myMediaMyProgress);

        let myMediaMyProgressVolumes = message.pop();
        console.log(myMediaMyProgressVolumes);

        let myMediaId = message.pop();
        console.log(myMediaId);
        globalMyMediaId = myMediaId;

        let myId = message.pop();
        console.log(myId);

        let myMediaMyStatus = message.pop();
        console.log(myMediaMyStatus);

        let myDataType = message.pop();
        console.log(myDataType);
        globalMyMediaType = myDataType;

        let myRepeat = message.pop();
        console.log(myRepeat);

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
        myExtraInfoSeason.innerHTML  = "<b style='color:skyblue'>Season</b>"  + ":  " + myMediaSeason + " " + myMediaSeasonYear;
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


        let mediaOptions = document.getElementById('mediaOptions');

        if(myDataType=="ANIME"){
            //episodes
            let episodeItem = document.createElement('div');
            episodeItem.className = "episodeProgress";
            let myEpisodeInput = document.createElement('input');
            myEpisodeInput.type="number";
            myEpisodeInput.min = 0;
            myEpisodeInput.max = myMediaEpisodes;
            myEpisodeInput.id = 'episodeInput';
            let episodeText = document.createTextNode("/" + myMediaEpisodes);
            let episodeTextLabel = document.createElement('span');
            episodeTextLabel.className="episodeLabel";
            episodeTextLabel.textContent="Episodes: ";
            myEpisodeInput.value = myMediaMyProgress;
            if(myMediaEpisodes=="null"){
                myEpisodeInput.max = 99999;
                episodeText = document.createTextNode("/?");
            }
            else{
                myEpisodeInput.max = myMediaEpisodes;
            }
            episodeItem.appendChild(episodeTextLabel);
            episodeItem.appendChild(myEpisodeInput);
            episodeItem.appendChild(episodeText);
            mediaOptions.appendChild(episodeItem);


            let scoreItem = document.createElement('div');
            scoreItem.className = "mediaScore";
            let myScoreInput = document.createElement('input');
            myScoreInput.type="number";
            myScoreInput.min = 0;
            myScoreInput.max = 10;
            myScoreInput.value = myMediaMyScore;
            myScoreInput.className="scoreInput";
            let scoreText = document.createTextNode("/10");
            let scoreTextLabel = document.createElement('span');
            scoreTextLabel.textContent="Score: ";
            scoreTextLabel.className="scoreLabel";
            scoreItem.appendChild(scoreTextLabel);
            scoreItem.appendChild(myScoreInput);
            scoreItem.appendChild(scoreText);
            mediaOptions.appendChild(scoreItem);


            //status
            let statusItem = document.createElement('div');
            statusItem.className = "statusItem";
            let selectItem = document.createElement('select');
            selectItem.className = "mySelect";
            let option1 = document.createElement('option');
            option1.value = "Watching";
            option1.textContent = "Watching";
            selectItem.appendChild(option1);
            let option2 = document.createElement('option');
            option2.value = "Completed";
            option2.textContent = "Completed";
            selectItem.appendChild(option2);
            let option3 = document.createElement('option');
            option3.value = "On hold";
            option3.textContent = "On hold";
            selectItem.appendChild(option3);
            let option4 = document.createElement('option');
            option4.value = "Dropped";
            option4.textContent = "Dropped";
            selectItem.appendChild(option4);
            let option5 = document.createElement('option');
            option5.value = "Plan to watch";
            option5.textContent = "Plan to watch";
            selectItem.appendChild(option5);
            switch(myMediaMyStatus){
                case "CURRENT":
                    selectItem.value="Watching";
                    break;
                case "COMPLETED":
                    selectItem.value="Completed";
                    break;
                case "PAUSED":
                    selectItem.value="On hold";
                    break;
                case "DROPPED":
                    selectItem.value="Dropped";
                    break;
                case "PLANNING":
                    selectItem.value="Plan to watch";
                    break;
            }

            let myLabelMoveItem = document.createElement('span');
            myLabelMoveItem.textContent = 'Status: ';
            myLabelMoveItem.className="statusLabel";
            statusItem.appendChild(myLabelMoveItem);
            statusItem.appendChild(selectItem);
            mediaOptions.appendChild(statusItem);


            //notes
            let myNotesItem = document.createElement('div');
            myNotesItem.className="myNotesItem";
            let myNotesInput = document.createElement('input');
            if(myMediaNotes=="null"){
                myNotesInput.value = "";
            }
            else{
                myNotesInput.value = myMediaNotes;
            }
            myNotesInput.className = "myNotes";
            let myNotesLabel = document.createElement('span');
            myNotesLabel.className="notesLabel";
            myNotesLabel.textContent='Notes:';

            myNotesItem.appendChild(myNotesLabel);
            myNotesItem.appendChild(myNotesInput);
            mediaOptions.appendChild(myNotesItem);

            //Start Date
            let myStartDateItem = document.createElement('div');
            myStartDateItem.className="startDateItem";
            let myStartDateInput = document.createElement('input');
            myStartDateInput.type = "date";
            myStartDateInput.className="dateInput";
            if(parseInt(myMediaMyStartDateDay)<10){
                myMediaMyStartDateDay = "0" + myMediaMyStartDateDay;
            }
            if(parseInt(myMediaMyStartDateMonth)<10){
                myMediaMyStartDateMonth = "0" + myMediaMyStartDateMonth;
            }
            myStartDateInput.value = myMediaMyStartDateYear + "-"+ myMediaMyStartDateMonth + "-" + myMediaMyStartDateDay;
            let myStartDateLabel = document.createElement('span');
            myStartDateLabel.textContent="Start Date:"
            myStartDateLabel.className="startDateLabel";


            myStartDateItem.appendChild(myStartDateLabel);
            myStartDateItem.appendChild(myStartDateInput);
            mediaOptions.appendChild(myStartDateItem);

            //Finish Date
            let myCompleteDateItem = document.createElement('div');
            myCompleteDateItem.className="completeDateItem";
            let myCompleteDateInput = document.createElement('input');
            myCompleteDateInput.type = "date";
            myCompleteDateInput.className="dateInput";
            if(parseInt(myMediaMyCompletedDateDay)<10){
                myMediaMyCompletedDateDay = "0" +myMediaMyCompletedDateDay;
            }
            if(parseInt(myMediaMyCompletedDateMonth)<10){
                myMediaMyCompletedDateMonth = "0" + myMediaMyCompletedDateMonth;
            }
            myCompleteDateInput.value = myMediaMyCompletedDateYear + "-"+ myMediaMyCompletedDateMonth + "-" + myMediaMyCompletedDateDay;
            let myCompleteDateLabel = document.createElement('span');
            myCompleteDateLabel.textContent="Finish Date:";
            myCompleteDateLabel.className="finishDateLabel";


            myCompleteDateItem.appendChild(myCompleteDateLabel);
            myCompleteDateItem.appendChild(myCompleteDateInput);
            mediaOptions.appendChild(myCompleteDateItem);

            //ReWatch
            let myRepeatItem = document.createElement('div');
            myRepeatItem.className="repeatItem";
            let myRepeatLabel = document.createElement('span');
            myRepeatLabel.textContent="Total Rewatches: ";
            myRepeatLabel.className="repeatLabel";
            let myRepeatInput = document.createElement('input');
            myRepeatInput.type="number";
            myRepeatInput.min=0;
            myRepeatInput.className="repeatInput";
            myRepeatInput.value=myRepeat;
            myRepeatItem.appendChild(myRepeatLabel);
            myRepeatItem.appendChild(myRepeatInput);
            mediaOptions.appendChild(myRepeatItem);
        }
        else{
            let chapterItem = document.createElement('div');
            chapterItem.className = "episodeProgress";
            let myChapterInput = document.createElement('input');
            myChapterInput.type="number";
            myChapterInput.min = 0;
            myChapterInput.max = myMediaChapters;
            myChapterInput.value = myMediaMyProgress;
            myChapterInput.id = "chapterInput";
            let chapterText = document.createTextNode("/" + myMediaChapters);
            let chapterTextLabel = document.createElement('span');
            chapterTextLabel.className="chapterLabel";
            chapterTextLabel.textContent="Chapters: ";
            if(myMediaChapters=="null"){
                myChapterInput.max = 99999;
                chapterText = document.createTextNode("/?");
            }
            else{
                myChapterInput.max = myMediaChapters;
            }

            chapterItem.appendChild(chapterTextLabel);
            chapterItem.appendChild(myChapterInput);
            chapterItem.appendChild(chapterText);
            mediaOptions.appendChild(chapterItem);

            let volumeItem = document.createElement('div');
            volumeItem.className = "volumeProgress";
            let myVolumeInput = document.createElement('input');
            myVolumeInput.type="number";
            myVolumeInput.min = 0;
            myVolumeInput.id="volumeInput";
            let volumeText = document.createTextNode("/" + myMediaVolumes);
            let volumeTextLabel = document.createElement('span');
            volumeTextLabel.textContent="Volumes: ";
            volumeTextLabel.className="volumeLabel";
            if(myMediaVolumes=="null"){
                myVolumeInput.max = 99999;
                volumeText = document.createTextNode("/?");
            }
            else{
                volumeText = document.createTextNode("/" + myMediaVolumes);
                myVolumeInput.max = myMediaVolumes;
            }
            myVolumeInput.value = myMediaMyProgressVolumes;
            volumeItem.appendChild(volumeTextLabel);
            volumeItem.appendChild(myVolumeInput);
            volumeItem.appendChild(volumeText);
            mediaOptions.appendChild(volumeItem);
            

            let scoreItem = document.createElement('div');
            scoreItem.className = "mediaScore";
            let myScoreInput = document.createElement('input');
            myScoreInput.type="number";
            myScoreInput.min = 0;
            myScoreInput.max = 10;
            myScoreInput.value = myMediaMyScore;
            myScoreInput.className="scoreInput";
            let scoreText = document.createTextNode("/10");
            let scoreTextLabel = document.createElement('span');
            scoreTextLabel.textContent="Score: ";
            scoreTextLabel.className="scoreLabel";

            scoreItem.appendChild(scoreTextLabel);
            scoreItem.appendChild(myScoreInput);
            scoreItem.appendChild(scoreText);
            mediaOptions.appendChild(scoreItem);


            //ReRead
            let myRepeatItem = document.createElement('div');
            myRepeatItem.className="repeatItem";
            let myRepeatLabel = document.createElement('span');
            myRepeatLabel.textContent="Total Rereads: ";
            myRepeatLabel.className="repeatLabel";
            let myRepeatInput = document.createElement('input');
            myRepeatInput.type="number";
            myRepeatInput.min=0;
            myRepeatInput.className="repeatInput";
            myRepeatInput.value=myRepeat;
            myRepeatItem.appendChild(myRepeatLabel);
            myRepeatItem.appendChild(myRepeatInput);
            mediaOptions.appendChild(myRepeatItem);

            //notes
            let myNotesItem = document.createElement('div');
            myNotesItem.className="myNotesItem";
            let myNotesInput = document.createElement('input');
            if(myMediaNotes=="null"){
                myNotesInput.value = "";
            }
            else{
                myNotesInput.value = myMediaNotes;
            }
            myNotesInput.className = "myNotes";
            let myNotesLabel = document.createElement('span');
            myNotesLabel.className="notesLabel";
            myNotesLabel.textContent='Notes:';

            myNotesItem.appendChild(myNotesLabel);
            myNotesItem.appendChild(myNotesInput);
            mediaOptions.appendChild(myNotesItem);

            //Start Date
            let myStartDateItem = document.createElement('div');
            myStartDateItem.className="startDateItem";
            let myStartDateInput = document.createElement('input');
            myStartDateInput.type = "date";
            myStartDateInput.className="dateInput";
            if(parseInt(myMediaMyStartDateDay)<10){
                myMediaMyStartDateDay = "0" + myMediaMyStartDateDay;
            }
            if(parseInt(myMediaMyStartDateMonth)<10){
                myMediaMyStartDateMonth = "0" + myMediaMyStartDateMonth;
            }
            myStartDateInput.value = myMediaMyStartDateYear + "-"+ myMediaMyStartDateMonth + "-" + myMediaMyStartDateDay;
            let myStartDateLabel = document.createElement('span');
            myStartDateLabel.textContent="Start Date:"
            myStartDateLabel.className="startDateLabel";


            myStartDateItem.appendChild(myStartDateLabel);
            myStartDateItem.appendChild(myStartDateInput);
            mediaOptions.appendChild(myStartDateItem);

            //Finish Date
            let myCompleteDateItem = document.createElement('div');
            myCompleteDateItem.className="completeDateItem";
            let myCompleteDateInput = document.createElement('input');
            myCompleteDateInput.type = "date";
            myCompleteDateInput.className="dateInput";
            if(parseInt(myMediaMyCompletedDateDay)<10){
                myMediaMyCompletedDateDay = "0" +myMediaMyCompletedDateDay;
            }
            if(parseInt(myMediaMyCompletedDateMonth)<10){
                myMediaMyCompletedDateMonth = "0" + myMediaMyCompletedDateMonth;
            }
            myCompleteDateInput.value = myMediaMyCompletedDateYear + "-"+ myMediaMyCompletedDateMonth + "-" + myMediaMyCompletedDateDay;
            let myCompleteDateLabel = document.createElement('span');
            myCompleteDateLabel.textContent="Finish Date:";
            myCompleteDateLabel.className="finishDateLabel";

            myCompleteDateItem.appendChild(myCompleteDateLabel);
            myCompleteDateItem.appendChild(myCompleteDateInput);
            mediaOptions.appendChild(myCompleteDateItem);


            if(myMediaFormat=="NOVEL"){
                //status
                let statusItem = document.createElement('div');
                statusItem.className = "statusItem";
                let selectItem = document.createElement('select');
                selectItem.className = "mySelect";
                let option1 = document.createElement('option');
                option1.value = "Reading2";
                option1.textContent = "Reading";
                selectItem.appendChild(option1);
                let option2 = document.createElement('option');
                option2.value = "Completed3";
                option2.textContent = "Completed";
                selectItem.appendChild(option2);
                let option3 = document.createElement('option');
                option3.value = "On hold3";
                option3.textContent = "On hold";
                selectItem.appendChild(option3);
                let option4 = document.createElement('option');
                option4.value = "Dropped3";
                option4.textContent = "Dropped";
                selectItem.appendChild(option4);
                let option5 = document.createElement('option');
                option5.value = "Plan to read2";
                option5.textContent = "Plan to read";
                selectItem.appendChild(option5);
                switch(myMediaMyStatus){
                    case "CURRENT":
                        selectItem.value="Reading2";
                        break;
                    case "COMPLETED":
                        selectItem.value="Completed3";
                        break;
                    case "PAUSED":
                        selectItem.value="On hold3";
                        break;
                    case "DROPPED":
                        selectItem.value="Dropped3";
                        break;
                    case "PLANNING":
                        selectItem.value="Plan to read2";
                        break;
                }

                let myLabelMoveItem = document.createElement('span');
                myLabelMoveItem.textContent = 'Status: ';
                myLabelMoveItem.className="statusLabel";
                statusItem.appendChild(myLabelMoveItem);
                statusItem.appendChild(selectItem);
                mediaOptions.appendChild(statusItem);
            }
            else{
                //status
                let statusItem = document.createElement('div');
                statusItem.className = "statusItem";
                let selectItem = document.createElement('select');
                selectItem.className = "mySelect";
                let option1 = document.createElement('option');
                option1.value = "Reading";
                option1.textContent = "Reading";
                selectItem.appendChild(option1);
                let option2 = document.createElement('option');
                option2.value = "Completed2";
                option2.textContent = "Completed";
                selectItem.appendChild(option2);
                let option3 = document.createElement('option');
                option3.value = "On hold2";
                option3.textContent = "On hold";
                selectItem.appendChild(option3);
                let option4 = document.createElement('option');
                option4.value = "Dropped2";
                option4.textContent = "Dropped";
                selectItem.appendChild(option4);
                let option5 = document.createElement('option');
                option5.value = "Plan to read";
                option5.textContent = "Plan to read";
                selectItem.appendChild(option5);
                switch(myMediaMyStatus){
                    case "CURRENT":
                        selectItem.value="Reading";
                        break;
                    case "COMPLETED":
                        selectItem.value="Completed2";
                        break;
                    case "PAUSED":
                        selectItem.value="On hold2";
                        break;
                    case "DROPPED":
                        selectItem.value="Dropped2";
                        break;
                    case "PLANNING":
                        selectItem.value="Plan to read";
                        break;
                }

                let myLabelMoveItem = document.createElement('span');
                myLabelMoveItem.textContent = 'Status: ';
                myLabelMoveItem.className="statusLabel";
                statusItem.appendChild(myLabelMoveItem);
                statusItem.appendChild(selectItem);
                mediaOptions.appendChild(statusItem);
            }

        }

        let myActionButtonsItem = document.createElement('div');
        myActionButtonsItem.className="actionButtons";
        let mySubmitButton = document.createElement('button');
        mySubmitButton.className="submitButton";
        mySubmitButton.textContent="Update";
        mySubmitButton.title="Update media";
        let myCancelButton = document.createElement('button');
        myCancelButton.className="cancelButton";
        myCancelButton.textContent="Cancel";
        myActionButtonsItem.appendChild(mySubmitButton);
        mediaOptions.appendChild(myActionButtonsItem);
    }
});


$("#mediaOptions").on("click",(event)=>{
    let myTarget = event.target;
    console.log(myTarget);
    if(myTarget.className=="submitButton"){
        let myArray = new Array();
        console.log(globalMyMediaFormat);
        console.log(globalMyMediaId);
        console.log(globalMyMediaType);
        myArray.unshift(globalMyMediaFormat);
        myArray.unshift(globalMyMediaId);
        myArray.unshift(globalMyMediaType);

        if(document.getElementById('episodeInput')!=null){        
            let episodeFlag = false;
            let episodeInput = document.getElementById('episodeInput').value;
            let episodeNumber = parseInt(document.getElementById('episodeInput').value);

            //check for decimal
            if(episodeInput.includes(".")){
                document.getElementById('episodeInput').value = Math.round(episodeInput).toString();
                episodeNumber = parseInt(document.getElementById('episodeInput').value);
            }
            //check for ? total
            if(globalEpisodes=="null"){
                episodeFlag=true;
            }
            //if total is not ? then check for greater than or equal to
            if(episodeFlag==false){
                if(episodeNumber>=parseInt(globalEpisodes)){ //if episode input number is greater than or equal to total, set input to total
                    document.getElementById('episodeInput').value=globalEpisodes;
                }
            }
            console.log(document.getElementById('episodeInput').value);//episode
            myArray.unshift(document.getElementById('episodeInput').value);
        }
        if(document.getElementById('chapterInput')!=null){
            let chapterFlag = false;
            let chapterInput = document.getElementById('chapterInput').value;
            let chapterNumber = parseInt(document.getElementById('chapterInput').value);

            //check for decimal
            if(chapterInput.includes(".")){
                document.getElementById('chapterInput').value = Math.round(chapterInput).toString();
                chapterNumber = parseInt(document.getElementById('chapterInput').value);
            }
            //check for ? total
            if(globalChapters=="null"){
                chapterFlag=true;
            }
            //if total is not ? then check for greater than or equal to
            if(chapterFlag==false){
                if(chapterNumber>=parseInt(globalChapters)){ //if episode input number is greater than or equal to total, set input to total
                    document.getElementById('chapterInput').value=globalChapters;
                }
            }
            console.log(document.getElementById('chapterInput').value);//chapter
            myArray.unshift(document.getElementById('chapterInput').value);
        }
        if(document.getElementById('volumeInput')!=null){
            let volumeFlag = false;
            let volumeInput = document.getElementById('volumeInput').value;
            let volumeNumber = parseInt(document.getElementById('volumeInput').value);

            //check for decimal
            if(volumeInput.includes(".")){
                document.getElementById('volumeInput').value = Math.round(volumeInput).toString();
                volumeNumber = parseInt(document.getElementById('volumeInput').value);
            }
            //check for ? total
            if(globalVolumes=="null"){
                volumeFlag=true;
            }
            //if total is not ? then check for greater than or equal to
            if(volumeFlag==false){
                if(volumeNumber>=parseInt(globalVolumes)){ //if episode input number is greater than or equal to total, set input to total
                    document.getElementById('volumeInput').value=globalVolumes;
                }
            }
            console.log(document.getElementById('volumeInput').value);//volume
            myArray.unshift(document.getElementById('volumeInput').value);
        }
        console.log(document.getElementsByClassName("mySelect")[0].value);//status
        myArray.unshift(document.getElementsByClassName("mySelect")[0].value);
        console.log(document.getElementsByClassName('dateInput')[0].value);//start date
        myArray.unshift(document.getElementsByClassName('dateInput')[0].value);
        console.log(document.getElementsByClassName('dateInput')[1].value);//finish date
        myArray.unshift(document.getElementsByClassName('dateInput')[1].value);
        console.log(document.getElementsByClassName('myNotes')[0].value);//notes
        myArray.unshift(document.getElementsByClassName('myNotes')[0].value);
        let thisRepeatInput = document.getElementsByClassName('repeatInput')[0].value;
        if(thisRepeatInput.includes(".")){
            document.getElementsByClassName('repeatInput')[0].value = Math.round(thisRepeatInput).toString();
        }
        console.log(document.getElementsByClassName('repeatInput')[0].value);//repeat
        myArray.unshift(document.getElementsByClassName('repeatInput')[0].value);
        let scoreInput = document.getElementsByClassName('scoreInput')[0].value;
        let scoreNumber = parseInt(document.getElementsByClassName('scoreInput')[0].value);

        //check for decimal
        if(scoreInput.includes(".")){
            document.getElementsByClassName('scoreInput')[0].value = Math.round(scoreInput).toString();
            scoreNumber = parseInt(document.getElementsByClassName('scoreInput')[0].value);
        }

        //if total is not ? then check for greater than or equal to
        if(scoreNumber>=10){ //if episode input number is greater than or equal to total, set input to total
            document.getElementsByClassName('scoreInput')[0].value="10";
        }

        console.log(document.getElementsByClassName('scoreInput')[0].value);//score
        myArray.unshift(document.getElementsByClassName('scoreInput')[0].value);
        


        //array size is 10 or 11
        ipcRenderer.send("msg", myArray);
    }
});



function openToAnotherWindow(myUrl){
    shell.openExternal(myUrl);
}