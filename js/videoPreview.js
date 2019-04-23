/*
 *  Defines a custom element video-preview to represent a video that will show up in 
 *  search results.
 *  Call 'customElements.define('video-preview', VideoPreview);' to use
 *  Attributes: 
 *      img: video thumbnail URL
 *      title: video title
 *      vidId: video ID
 */
class VideoPreview extends HTMLElement{
    constructor(){
        super();
        
        //creates shadow root
        var shadow = this.attachShadow({mode:'open'});
        var wrapper = document.createElement('div');
        wrapper.setAttribute('class','prevWrapper');        

        //default value for img
        var imgUrl = '../images/get_started128.png';
        if (this.hasAttribute('img')){
            imgUrl = this.getAttribute('img');
        }
       
        //set video thumbnail image 
        this.thumbDisplay = document.createElement('img');
        this.thumbDisplay.src = imgUrl;
        

        //set video title display
        var vidTitleText = "No Title";
        if (this.hasAttribute('title')){
            vidTitleText = this.getAttribute('title');
        }

        this.titleDisplay = document.createElement('p');
        this.titleDisplay.innerHTML = vidTitleText;        
 
        //default value for vidId
        var vidIdValue = "No ID";
        if (this.hasAttribute('vidId')){
            vidIdValue = this.getAttribute('vidId');
        }

        //button functionality
        this.funcButton = document.createElement('input');
        this.funcButton.setAttribute('type','button');

        wrapper.appendChild(this.titleDisplay);
        wrapper.appendChild(this.thumbDisplay);
        wrapper.appendChild(this.funcButton);
        shadow.appendChild(wrapper);


    };

    //all attributes need to be added to this list
    static get observedAttributes(){
        return ['title','img','vidId','type'];
    };

    attributeChangedCallback(name, oldVal, newVal){
        //console.log(`changing ${name} from ${oldVal} to ${newVal}`);
        switch(name){
            case 'title':
                this.titleDisplay.innerHTML = newVal;
                break;
            case 'img':
                this.thumbDisplay.src = newVal;
                break;
            case 'vidId':
                break;
            case 'type':
                if (newVal == 'add'){
                    this.funcButton.setAttribute('value', 'Add');
                    //this.funcButton.setAttribute('onclick', 'addToList()');
                    this.funcButton.addEventListener('click',addToList);   
                }
                else if (newVal == 'delete'){
                    this.funcButton.setAttribute('value', 'Delete');
                    this.funcButton.addEventListener('click',deleteFromList);   
                }
                break;
        }
    };
};

