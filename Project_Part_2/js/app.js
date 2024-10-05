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



//ALL ref=========end====


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
    rgb_input_box.value=`rgb(${rgbColor})`
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
  

    
})
// change color event ===end=====
//copy button function // color code copy=======start====
copyButton.addEventListener('click', () => {
    const checkHex = document.getElementById('check_hex_code').checked;
    const checkRgb = document.getElementById('check_rgb_code').checked;

    const hexValue = hex_input_box.value; 
    const rgbValue = rgb_input_box.value;  
    if (checkHex && checkRgb) {
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