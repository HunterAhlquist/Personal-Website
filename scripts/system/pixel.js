/*
©Hunter Ahlquist, 2020

pixel.js
Pixel object part of the graphics library.
*/
const screen = document.getElementById("screen");
const rasterizer = screen.getContext("2d");

var color;
var rasterizeData = [[], []]; //2d array for the xy of the screen
rasterizeData.length = screen.height / 10;
for (y=0;y<60;y++){
    rasterizeData[y] = [];
    rasterizeData[y].length = screen.width / 10;
    for (x=0;x<60;x++) {
        rasterizeData[y][x] = new pixel();
    }
}

document.addEventListener("keydown", fscreenEvent);
function fscreenEvent(e) {
    if (e.key == "F11")  {
        fullscreen();
    }
}

function fullscreen() {
    let all = document.body.getElementsByTagName("*");
    let noscripts = [];
    for (el of all){
        //console.log(el.tagName);
        if (el.tagName == "SCRIPT")
            continue;
        noscripts.push(el);
    }
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (screen.requestFullscreen) {
            screen.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            screen.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            screen.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            screen.msRequestFullscreen();
        }
        for (el of noscripts){
            el.className = "fullscreen";
        }
        isInFullScreen = true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        for (el of noscripts){
            el.className = "";
        }
        isInFullScreen = false;
    }
}

function pixel(color) {
    if (color != undefined)
        this.color = color;
    else 
        this.color = setColor(10, 5, 255);
}

function setColor(r, g, b) {
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}

function getColor(rgba) {
    let cut = rgba.slice(rgba.indexOf('(') + 1, rgba.indexOf(')'));
    cut = cut.split(", ");
    return cut;

}
function getRgba(r, g, b) {
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}

function drawPixels() {
    //console.log("test");
    rasterizer.clearRect(0, 0, screen.width, screen.height);
 for (y=0;y<60;y++) {
    for (x=0;x<60;x++){
        drawPixel(x, y);
    }
 }
}

function drawPixel(x, y) {
    rasterizer.fillStyle = rasterizeData[y][x].color;
    rasterizer.fillRect(x * 10, y * 10, 10, 10);
}