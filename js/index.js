window.onload = function(){
    //localStorage.clear();
    console.log("js loaded");
    var playButton = document.getElementById('playButton');
    var editButton = document.getElementById('editButton');
    var submitButton = document.getElementById('searchSubmit');
    editButton.addEventListener('click',function(){
        window.location="edit.html"; 
    });

    //plays playlist
    playButton.addEventListener('click',function(){
        let playlistURL = "http://www.youtube.com/watch_videos?video_ids=";
        for (let i = 0; i < localStorage.length; i++){
            if (localStorage.key(i).indexOf(keyPrefix) !== -1){
                let vidId = localStorage.key(i).replace(keyPrefix,"");
                console.log(vidId);
                playlistURL = playlistURL.concat(vidId+",");
            }
        };
        playlistURL = playlistURL.slice(0,-1); //removes last comma
        console.log(playlistURL);
		//chrome.tabs.create({url:playlistURL});	//create new tab for video
        window.open(playlistURL); 
        /*
        let xhttpP = new XMLHttpRequest();
        xhttpP.onreadystatechange=function(){
            if (xhttpP.readyState==4 && xhttpP.status==200){
                let res = JSON.parse(xhttpP.responseText);
                return true;
            }
        };
        xhttpP.open("GET", playlistURL,true);
        xhttpP.send();
        console.log("req setn123");
        */
    });
    submitButton.addEventListener("click",searchVideo);
};


