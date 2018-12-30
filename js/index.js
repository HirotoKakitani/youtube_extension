window.onload = function(){
    //localStorage.clear();
    console.log("js loaded");
    var playButton = document.getElementById('playButton');
    var editButton = document.getElementById('editButton');
    editButton.addEventListener('click',function(){
        window.location="edit.html"; 
    });
};


