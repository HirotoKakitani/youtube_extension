var numResponses = "10";

customElements.define('video-preview', VideoPreview);
window.onload = function(){
    console.log("js loaded");
};

function searchVideo(){
    console.log("searching");
    var textVal = document.getElementById("searchBar").value;
    if (textVal==""){
        alert("please enter valid value");
        return false;
    }
    else{
        var xhttp = new XMLHttpRequest();
        //runs every time readystate changes
        xhttp.onreadystatechange=function(){
            //checks if response is ready
            if (xhttp.readyState==4 && xhttp.status==200){
                //response ready. list videos
                var jsonResponse = JSON.parse(xhttp.responseText); 
                var index = 0;
                for (index=0;index<numResponses;index++){
                    //console.log(jsonResponse.items[index].snippet.title);
                    //console.log(jsonResponse.items[index].snippet.thumbnails.default.url);
                    var newElement = document.createElement('video-preview');
                    newElement.setAttribute('title', jsonResponse.items[index].snippet.title);
                    newElement.setAttribute('img', jsonResponse.items[index].snippet.thumbnails.default.url);

                    document.getElementById('resultsContainer').appendChild(newElement);
                };
                return true;
            };
        };
        var searchTerm = document.getElementById("searchBar").value;
        //set query parameters
        var url = new URL(YOUTUBEURL);
        var query_string = url.search;
        var search_params = new URLSearchParams(query_string);
        search_params.append('part', 'snippet');
        search_params.append('maxResults', numResponses);
        search_params.append('key', APIKEY);
        search_params.append('q', searchTerm);
        url.search = search_params.toString();
        var new_url = url.toString();
        console.log(new_url);

        xhttp.open("GET", new_url, true);
        xhttp.send();
        console.log("Request sent");
    };




}; 
