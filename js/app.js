var numResponses = "10";
var resultList = {};    //dict to store results of search
customElements.define('video-preview', VideoPreview);
/*
window.onload = function(){
    //localStorage.clear();
    console.log("js loaded");
    var playButton = document.getElementById('playButton');
    var editButton = document.getElementById('editButton');
    editButton.addEventListener('click',function(){
        window.location="edit.html"; 
    });
};*/

function searchVideo(){
    console.log("searching");
    var textVal = document.getElementById("searchBar").value;
    if (textVal==""){
        alert("please enter valid value");
        return false;
    }
    else{
        var xhttp = new XMLHttpRequest();
        // populates list with results. Runs every time readystate changes
        xhttp.onreadystatechange=function(){
            //checks if response is ready
            if (xhttp.readyState==4 && xhttp.status==200){
                //clear existing list
                document.getElementById("resultsContainer").innerHTML="";
                //response ready. list videos
                let jsonResponse = JSON.parse(xhttp.responseText); 
                let index = 0;
                console.log("-------0");
                for (index=0;index<numResponses;index++){
                    //console.log(jsonResponse.items[index].snippet.title);
                    //console.log(jsonResponse.items[index].snippet.thumbnails.default.url);
                    let vidTitle = jsonResponse.items[index].snippet.title;
                    let vidImgURL = jsonResponse.items[index].snippet.thumbnails.default.url;
                    let vidId = jsonResponse.items[index].id.videoId;
                    let newElement = document.createElement('video-preview');
                    newElement.setAttribute('title', vidTitle);
                    newElement.setAttribute('img', vidImgURL);
                    newElement.setAttribute('vidId', vidId);
                    newElement.setAttribute('type', 'add');
                    document.getElementById('resultsContainer').appendChild(newElement);
                    //store title, imgURL. use videoID as key
                    let storedObj = {'vidTitle': vidTitle, 'vidImgURL': vidImgURL};
                    resultList[vidId]=storedObj;

                };
                return true;
            };
        };

        //search for videos
        let searchTerm = document.getElementById("searchBar").value;
        //set query parameters
        let url = new URL(YOUTUBEURL);
        let query_string = url.search;
        let search_params = new URLSearchParams(query_string);
        search_params.append('part', 'snippet');
        search_params.append('type', 'video');
        search_params.append('maxResults', numResponses);
        search_params.append('key', APIKEY);
        search_params.append('q', searchTerm);
        url.search = search_params.toString();
        let new_url = url.toString();
        console.log(new_url);

        xhttp.open("GET", new_url, true);
        xhttp.send();
        console.log("Request sent");
    };
};


function addToList(evt){
    let vidId = evt.target.getRootNode().host.getAttribute('vidId');
    let vidInfo = resultList[vidId];
    console.log(`Adding ${vidId}`); //gets the video-preview element
    //save values to storage
    localStorage.setItem(keyPrefix+vidId,JSON.stringify(vidInfo));
    removeVideoPreviewById(vidId);    
}

function deleteFromList(evt){
    let vidId = evt.target.getRootNode().host.getAttribute('vidId');
    console.log(`Deleting ${vidId}`); //gets the video-preview element
    localStorage.removeItem(keyPrefix+vidId);
    removeVideoPreviewById(vidId);    
} 


function removeVideoPreviewById(id){
    //gets correct video-preview element and removes it
    let removeElement = document.querySelectorAll(`video-preview[vidId='${id}']`)[0];
    console.log(removeElement);
    removeElement.parentNode.removeChild(removeElement);
}
