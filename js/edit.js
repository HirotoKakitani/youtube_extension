//customElements.define('video-preview', VideoPreview);
       
window.onload = function(){
    let editCont = document.getElementById('editContainer');

    //iterates through all of localStorage
    for (let i = 0; i < localStorage.length; i++){
         
        //only print if the keyPrefix is in the key
        if (localStorage.key(i).indexOf(keyPrefix) !== -1){
            let vidIdRaw = localStorage.key(i);     //vidId including the prefix
            let vidId = localStorage.key(i).replace(keyPrefix,"");  //vidId with prefix removed
            //console.log(localStorage.key(i));
            //console.log(vidId);
            let vidTitle = JSON.parse(localStorage.getItem(vidIdRaw)).vidTitle;
            let vidImgURL = JSON.parse(localStorage.getItem(vidIdRaw)).vidImgURL;
            //console.log(vidTitle);
            //console.log(vidImgURL);
            //add video-preview of type edit for delete value 
            let newElement = document.createElement('video-preview');
            newElement.setAttribute('title', vidTitle); 
            newElement.setAttribute('img', vidImgURL);
            newElement.setAttribute('vidId', vidId);
            newElement.setAttribute('type', 'delete');
            editCont.appendChild(newElement); 
        }

        //if not, the value is not video info
        else{
            console.log("wrong vale");
        }
    }    
};
