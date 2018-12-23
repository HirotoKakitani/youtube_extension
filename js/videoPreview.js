/*
 *  Defines a custom element video-preview to represent a video that will show up in 
 *  search results.
 *  Call 'customElements.define('video-preview', VideoPreview);' to use
 *  Attributes: 
 *      img: video thumbnail URL
 *      title: video title
 */
class VideoPreview extends HTMLElement{
    constructor(){
        super();
        
        //creates shadow root
        var shadow = this.attachShadow({mode:'open'});
        var wrapper = document.createElement('div');
        wrapper.setAttribute('class','prevWrapper');        

        var imgUrl;
        if (this.hasAttribute('img')){
            imgUrl = this.getAttribute('img');
        }

        //default value for img
        else{
            imgUrl = '../images/get_started128.png';
        }
       
        //set video thumbnail image 
        this.thumbDisplay = document.createElement('img');
        this.thumbDisplay.src = imgUrl;
        

        //set video title display
        var vidTitleText;
        if (this.hasAttribute('title')){
            vidTitleText = this.getAttribute('title');
        }
        //default value for title
        else{
            vidTitleText = "No Title";
        }
        this.titleDisplay = document.createElement('p');
        this.titleDisplay.innerHTML = vidTitleText;        
 
        //button functionality
        this.funcButton = document.createElement('input');
        this.funcButton.setAttribute('type','button');
        //this.funcButton.setAttribute('value','Edit');
        

        wrapper.appendChild(this.titleDisplay);
        wrapper.appendChild(this.thumbDisplay);
        wrapper.appendChild(this.funcButton);
        shadow.appendChild(wrapper);


    };

    //all attributes need to be added to this list
    static get observedAttributes(){
        return ['title','img','type'];
    };

    //TODO need to properly change attribute value 
    attributeChangedCallback(name, oldVal, newVal){
        switch(name){
            case 'title':
                //console.log(`changing ${name} from ${oldVal} to ${newVal}`);
                //console.log(`the title attribute is: ${this.getAttribute('title')}`);
                this.titleDisplay.innerHTML = newVal;
                break;
            case 'img':
                //console.log(`changing ${name} from ${oldVal} to ${newVal}`);
                //console.log(`the img url is: ${this.getAttribute('img')}`);
                this.thumbDisplay.src = newVal;
                break;
            case 'type':
                if (newVal == 'add'){
                    this.funcButton.setAttribute('value', 'Add');
                    this.funcButton.setAttribute('onclick', 'addToList()');   
                }
                else if (newVal == 'delete'){
                    this.funcButton.setAttribute('value', 'Delete');
                    this.funcButton.setAttribute('onclick', 'deleteFromList()');   
                }
                break;
        }
    };
};

