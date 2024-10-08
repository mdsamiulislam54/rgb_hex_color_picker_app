//ALL ref=========star====
let change_color_btn = document.getElementById('change_color')
let display_color = document.getElementById('display_color')
let hex_input_box = document.getElementById('hex_input_box')
let rgb_input_box = document.getElementById('rgb_input_box')
let copyButton = document.getElementById('copyButton')
let redRange = document.getElementById('redRange')
let greenRange = document.getElementById('greenRange')
let blueRange = document.getElementById('blueRange')
let customRange_1 = document.getElementById('customRange_1');
let customRange_2 = document.getElementById('customRange_2');
let customRange_3 = document.getElementById('customRange_3');
let parent_preset_box= document.getElementById('parent_preset_box')
let parent_custom_color= document.getElementById('parent_custom_color')
let saveButton= document.getElementById('saveButton')
const deleteButton = document.getElementById('deleteButton');
const preview_background = document.getElementById('preview_background');
const file_pop = document.getElementById('file_pop');
const upload_button = document.getElementById('upload_button');
const background_img_delete_button = document.getElementById('delete_button');
const body_section = document.getElementById('body_section');
const background_control = document.getElementById('background_control');





//ALL ref=========end====

window.onload= function(){
   
    let red = 255;
    let green = 215;
    let blue = 0;

    let rgbolor_defult = `rgb(${red},${green},${blue})`
    display_color.style.backgroundColor=rgbolor_defult
    //defaul hex_input_box color code update
    hex_input_box.value= hexColorGenerateFunc({red,green,blue}).substring(1)
    rgb_input_box.value=rgbolor_defult
    redRange.innerText=red
    greenRange.innerText=green
    blueRange.innerText=blue


    presetBoxGenerate(parent_preset_box,hexColors)

    //localstroage function call
 
  

}
/**
 * all audio
 */
const  copySound = new Audio('/audio/click.wav')
const  errorSound = new Audio('/audio/cow.wav')
const  clickSound = new Audio('/audio/click.wav')

//ALL funtion =================start=========================

//main rgb color generate function========start===
function colorGenerateFunc(){
    const red = Math.floor(Math.random()*255)
    const green = Math.floor(Math.random()*255)
    const blue = Math.floor(Math.random()*255)
    return {red,green,blue}
}
//main rgb color generate function======== end====

//HEX code generate function===start====

function hexColorGenerateFunc({ red, green, blue }) {
    let checkValidHex = function(color) {
        let hex = color.toString(16);
     
        return hex.length === 1 ? `0${hex}` : hex;
    };
    
    return `#${checkValidHex(red)}${checkValidHex(green)}${checkValidHex(blue)}`.toUpperCase();
}

//HEX code generate function===end====
function rbgColorGenerate({red,green,blue}){
    return `rgb(${red},${green},${blue})`
}
//HEX TO RGB Convart function===start===

function hexTOrgb(hex){


   if(hex && isValid(hex)){
    const red = parseInt(hex.slice(0,2), 16);
    const green = parseInt(hex.slice(2,4), 16);
    const blue = parseInt(hex.slice(4), 16);
    return `${red},${green},${blue}`
   }
    
    
}
//HEX TO RGB Convart function===end===


// range update background color 

function updateBackgroundColor(){
    let red =customRange_1.value;
    let green = customRange_2.value;
    let blue = customRange_3.value;
    
    const rgbColor =`rgb(${red},${green},${blue})`
    display_color.style.backgroundColor=rgbColor;
    hex_input_box.value = hexColorGenerateFunc({ red: parseInt(red), green: parseInt(green), blue: parseInt(blue) }).substring(1);
    rgb_input_box.value = rgbColor;
    //range lebel value update
    redRange.innerText = red;
    greenRange.innerText = green;
    blueRange.innerText = blue;

}


//ALL funtion ==================end=============================

//change color event==start===

change_color_btn.addEventListener('click',()=>{
    let color = colorGenerateFunc()
    let hexColor = hexColorGenerateFunc(color)
    let rgbColor = rbgColorGenerate(color)  
    
    display_color.style.backgroundColor=`rgb(${color.red},${color.green},${color.blue})`
    hex_input_box.value=hexColor.substring(1)
    rgb_input_box.value=rgbColor
    //lebel range value update===
    redRange.innerText=color.red
    greenRange.innerText=color.green
    blueRange.innerText=color.blue
    //lebel text color change =====
    redRange.style.color =rgbColor
    greenRange.style.color =rgbColor
    blueRange.style.color =rgbColor
    //rang color change
    customRange_1.value=color.red
    customRange_2.value=color.green
    customRange_3.value=color.blue

    //sound 
    clickSound.currentTime=0
    
    clickSound.volume=0.5
    clickSound.play()
  

    
})
// change color event ===end=====
//copy button function // color code copy=======start====
copyButton.addEventListener('click', () => {
    const checkHex = document.getElementById('check_hex_code').checked;
    const checkRgb = document.getElementById('check_rgb_code').checked;

    const hexValue = hex_input_box.value; 
    const rgbValue = rgb_input_box.value;  
    if (checkHex && checkRgb) {
        errorSound.currentTime=0
        errorSound.volume=0.3
        errorSound.play()
        alert('Please select either HEX or RGB, not both.');
      
        return; // Exit the function to prevent further execution
    }

    // If HEX checkbox is checked, validate and copy the HEX value
    if (checkHex) {
        if (isValid(hexValue)) {
            navigator.clipboard.writeText(`#${hexValue}`);
            toastMessage(hexValue); 
        } else {
            alert('Invalid HEX color format.');
        }
    }

    if (checkRgb) {
        navigator.clipboard.writeText(rgbValue);
        toastMessage(rgbValue); 
    }

    // If neither checkbox is selected, show an alert message
    if (!checkHex && !checkRgb) {
        alert('Please select a checkbox.');
       
    }

    copySound.currentTime=0
    copySound.volume=0.5
    copySound.play()
});

//copy button function // color code copy=======end====

//keyup event change the hex code update rgb color input box=====satrt===
hex_input_box.addEventListener('keyup',(e)=>{
    const value = e.target.value
    if(value && isValid(value)){
        display_color.style.backgroundColor=`#${value}`
        rgb_input_box.value= `rgb(${hexTOrgb(value)})`
        redRange.innerText=parseInt(value.substring(0,2),16)
        greenRange.innerText=parseInt(value.substring(2,4),16)
        blueRange.innerText=parseInt(value.substring(4),16)
    
       
    }
 
   
})



// toast meassage show ========start====
function toastMessage(message){
    let div = document.createElement('div')
    div.innerText=`${`#${message}`} copyed`
    div.classList.add('toast_message')
    div.classList.add('toast_message_slide_in')
    document.getElementById('conatiner').appendChild(div)
    existingToast=div
    setTimeout(() => {
        div.classList.add('toast_message_slide_out');
        div.addEventListener('animationend', () => {
            div.remove();
            existingToast=null
        });
    }, 1000);
}
// toast meassage show ========end====

// Input event listeners for RGB range sliders
customRange_1.addEventListener('input', updateBackgroundColor);
customRange_2.addEventListener('input', updateBackgroundColor);
customRange_3.addEventListener('input', updateBackgroundColor);



//hex color check function===start======

function isValid (color){
    if(color.length !==6) return false
    return /^[0-9A-Fa-f]{6}$/.test(color);
}
//hex color check function===end======

// preset color array
const hexColors = [
    '#FF5733', // Bright Orange
    '#33FF57', // Lime Green
    '#3357FF', // Bright Blue
    '#FF33A6', // Hot Pink
    '#FFD700', // Gold
    '#FF8C00', // Dark Orange
    '#800080', // Purple
    '#00FF00', // Green
    '#FF4500', // Orange Red
    '#8B4513', // Saddle Brown
    '#00CED1', // Dark Turquoise
    '#4682B4', // Steel Blue
    '#4B0082', // Indigo
    '#FFFF00', // Yellow
    '#708090', // Slate Gray
    '#FFB6C1', // Light Pink
    '#20B2AA', // Light Sea Green
    '#A52A2A'  // Brown
];
function presetColorBoxGenerate(color){
    const div = document.createElement('div')
    div.className='preset_color_box'
    // div.setAttribute('data-color', color)
    div.style.backgroundColor=color
    div.setAttribute('data-color', color)
    div.addEventListener('click',()=>{
        presetColorCodeCopy(color)
        toastMessage(color.slice(2))
        display_color.style.backgroundColor=color
      
       
        copySound.currentTime=0
        copySound.volume=0.5
        copySound.play()
     
      
    })
    return div
}

/**
 * preset color box generate
 * @param {HTMLElement} parent 
 * @param {Array} color 
 */
function presetBoxGenerate(parent,colors){
    colors.forEach(color => {
        const colorbox= presetColorBoxGenerate(color)
        parent.appendChild(colorbox)
    });

  
}


/**
 * preset color box color code copy event
 */
function presetColorCodeCopy(color){
    navigator.clipboard.writeText(color)
    
    
}

const customColors =[];

saveButton.addEventListener('click',function(){
    let newColor=(`#${hex_input_box.value}`)
    let maxColor = 18;
   
    if(!customColors.includes(newColor)){
        if(customColors.length < maxColor){
            customColors.unshift(newColor)
            localStorage.setItem('customColor', JSON.stringify(customColors));
            while (parent_custom_color.firstChild) {
                parent_custom_color.removeChild(parent_custom_color.lastChild);
              }
            presetBoxGenerate(parent_custom_color,customColors)
        }else{
            alert('Maximum of 18 colors can be added.');
        }
       
       
    }else{
        alert('This color is already added.');
    };
    copySound.currentTime=0
    copySound.volume=0.5
    copySound.play()
    
})

// Delete button event listener
deleteButton.addEventListener('click', function() {

    if (customColors.length > 0) {
        customColors.shift(); // Remove the last color from the array
        localStorage.setItem('customColor', JSON.stringify(customColors));
        // Clear existing elements before regenerating
        while (parent_custom_color.firstChild) {
            parent_custom_color.removeChild(parent_custom_color.firstChild);
        }
        presetBoxGenerate(parent_custom_color, customColors); // Update the display
    } else {
        alert('No colors to delete.');
    }
    copySound.currentTime=0
    copySound.volume=0.5
    copySound.play()
});

//custom color stroage 
const customColorsStroage = localStorage.getItem('customColor')
const customColorarry = JSON.parse(customColorsStroage)
 presetBoxGenerate(document.getElementById('parent_custom_color'), customColorarry)


 /**
  * background imge preview function
  */

 upload_button.addEventListener('click',()=>{
    file_pop.click()
    copySound.currentTime=0
    copySound.volume=0.5
    copySound.play()
 })

 file_pop.addEventListener('change',function(event){
    const file= event.target.files[0];
   if(file){
    const imageUrl = URL.createObjectURL(file)
    preview_background.style.background=`url(${imageUrl})`
    body_section.style.backgroundImage=`url(${imageUrl})`
    background_img_delete_button.style.display='block'
    background_control.style.display='block'

    
    //background image delete=================
    background_img_delete_button.addEventListener('click',()=>{
        preview_background.style.background=''
        body_section.style.background=''
         background_img_delete_button.style.display='none'
         background_control.style.display='none'
         copySound.currentTime=0
    copySound.volume=0.5
    copySound.play()
        
    })
   }
    
 })

 //background image controler function==============
 function backgroundImageControl(){
    body_section.style.backgroundSize = document.getElementById('bg_size').value;
    body_section.style.backgroundPosition = document.getElementById('bg_position').value;
    body_section.style.backgroundRepeat = document.getElementById('bg_repeat').value;
    body_section.style.backgroundAttachment = document.getElementById('bg_attachment').value;
    preview_background.style.backgroundSize = document.getElementById('bg_size').value;
    preview_background.style.backgroundPosition = document.getElementById('bg_position').value;
    preview_background.style.backgroundRepeat = document.getElementById('bg_repeat').value;
   
 }
 document.getElementById('bg_size').addEventListener('change', backgroundImageControl)
document.getElementById('bg_position').addEventListener('change', backgroundImageControl)
document.getElementById('bg_repeat').addEventListener('change', backgroundImageControl)
document.getElementById('bg_attachment').addEventListener('change', backgroundImageControl)







