document.addEventListener("keydown", typeKey);
const screen = document.getElementById("screen");
const rasterizer = screen.getContext("2d");

function preventBackspaceHandler(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 8) {
        return false;
    }
}

document.onkeydown = preventBackspaceHandler;

var runtimeLength = 0;
var rasterizeData = [[], []]; //2d array for the xy of the screen
var spriteStack = [];
rasterizeData.length = 60;
for (y=0;y<60;y++){
    rasterizeData[y] = new Array();
    for (x=0;x<60;x++) {
        rasterizeData[y][x] = new pixel();
    }
}

var consoleCurLine = "";
var consoleHistory = [];

var activeApp;

function typeKey(e) {
    
    if (activeApp == null || activeApp == undefined) {
        if (e.key.length == 1) {
            consoleCurLine += e.key;
        } else {
            switch (e.key) {
                case "Backspace":
                    consoleCurLine = consoleCurLine.substr(0, consoleCurLine.length - 1);
                break;
                case "Enter":
                    consoleHistory.push("$" + consoleCurLine);
                    parse(consoleCurLine);
                    consoleCurLine = "";
                break;
            }
        }
    } else {
        if (e.key == "Escape"){
            activeApp.end();
            activeApp = null;
            return;
        }

        activeApp.input = e.key;
    }
    e.preventDefault();
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

//pixel shaders
function randomColorsShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            let r = Math.floor(Math.random() * 255) * 0.25;
            let g = Math.floor(Math.random() * 255) * 0.25;
            let b = Math.floor(Math.random() * 255) * 0.15;
            rasterizeData[y][x] = new pixel(getRgba(r, g, b));
        }
     }
}
function lightBlueBorderShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            if (x > 2 && x < 57 && y > 2 && y < 57) 
                continue;
            rasterizeData[y][x] = new pixel(getRgba(5 * Math.floor(Math.random() * 15), 100, 200 + Math.floor(75 * Math.sin(runtimeLength / 10))));
        }
     }
}

function mysteryColorShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            if (Math.cos(runtimeLength + x) * Math.sin(runtimeLength + y) > Math.cos(runtimeLength + Math.floor(Math.random() * 5))) 
                continue;
            rasterizeData[y][x] = new pixel(getRgba(50, 40, 30));
            if (Math.sin(runtimeLength + x) < 0.3)
            rasterizeData[y][x] = new pixel(getRgba(50, 30, 90));
        }
     }
}

function consoleBGShaderStack() {
    randomColorsShader();
    mysteryColorShader();
    lightBlueBorderShader();
    
}

function drawSprite(sprite, orginX, orginY) {
    if (sprite == undefined)
        return;

    for (y=orginY;y<orginY + sprite.h;y++) {
        let curY = y;
        if (curY > 59 || curY < 0)
                continue;
        for (x=orginX;x<orginX + sprite.w;x++){
            let curX = x;
            if (curX > 59 || curX < 0)
                continue;

            let col = sprite.colorData[y - orginY][x - orginX].color;
            if (col == sprite.alphaKey)
                continue;
            rasterizeData[curY][curX].color = col;
        }
    }
}

function loadNewSprite(imgURL, a) {
    img = document.createElement('img');
    img.src = imgURL;
    document.querySelector('canvas').appendChild(img);
    img.addEventListener("load", function(){
        //console.log("sprite loaded");
        spriteStack.push(new sprite(img, a));
    })
    
}

function update() {
    runtimeLength++;
    appRefresh();
}

function consoleUpdate() {
    consoleBGShaderStack();
    for (i=0;i<spriteStack.length;i++){
        drawSprite(spriteStack[i], 1, 1);
    }
    drawPixels();
    drawText();

}

function appRefresh() {
    if (activeApp == null || activeApp == undefined){
        consoleUpdate();
    } else {
        activeApp.update();
    }

}

function drawText() {
    rasterizer.font = "10px c64";
    rasterizer.fillStyle = getRgba(5 * Math.floor(Math.random() * 15), 255, 200 - Math.floor(75 * Math.sin(runtimeLength / 10)));
    rasterizer.fillText("hunterx@" + navigator.userAgent.split(';')[0].replace("(", ""), 1 * 10, 2 * 10);
    rasterizer.font = "20px c64";
    rasterizer.fillStyle = "yellow";
    //console input line
    rasterizer.fillText("~$" + consoleCurLine + cursorTick(), 4 * 10, 56 * 10);

    if (consoleHistory.length > 7 * 2){
        consoleHistory.shift();
        consoleHistory.shift();
    }
        
    for (i=0;i<consoleHistory.length;i++){
        let txt = consoleHistory[i];
        if (consoleHistory[i].charAt(0) == '$'){
            rasterizer.fillStyle = "gray";
            txt = txt.replace("$", "");

        } else if (consoleHistory[i].charAt(0) == '#') {
            rasterizer.fillStyle = "red";
            txt = txt.replace("#", "");
        } else if (consoleHistory[i].charAt(0) == '!') {
            rasterizer.fillStyle = "lightblue";
            txt = txt.replace("!", "");
        } else {
            rasterizer.fillStyle = "yellowgreen";
        }

        rasterizer.fillText(txt, 4 * 10, 6 * 10 + (3 * 10 * i));
    }
}

function cursorTick() {
    if (Math.abs(Math.sin(runtimeLength / 7)) > 0.7)
        return "_";
    else
        return "";
}



const runtime = setInterval(update, 50);
//const sdsdads = setInterval(drawSprite(spriteStack[0], 20, 20), 500);