document.addEventListener("keydown", typeKey);
const screen = document.getElementById("screen");
const rasterizer = screen.getContext("2d");

var runtimeLength = 0;
var rasterizeData = [[], []]; //2d array for the xy of the screen
rasterizeData.length = 60;
for (y=0;y<60;y++){
    rasterizeData[y] = new Array();
    for (x=0;x<60;x++) {
        rasterizeData[y][x] = new pixel();
    }
}

function typeKey(e) {
    //if (e.key.length == 1)
        //consoleWrite.textContent += e.key;
    //else if (e.key == "Backspace")
        //consoleWrite.textContent = consoleWrite.textContent.substr(0, consoleWrite.textContent.length - 1);
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
            let r = Math.floor(Math.random() * 255) * 0.50;
            let g = Math.floor(Math.random() * 255) * 0.25;
            let b = Math.floor(Math.random() * 255) * 0.15;
            rasterizeData[y][x] = new pixel(rgbaColor(r, g, b));
        }
     }
}
function lightBlueBorderShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            if (x > 2 && x < 57 && y > 2 && y < 57) 
                continue;
            rasterizeData[y][x] = new pixel(rgbaColor(5, 128, 255));
        }
     }
}

function mysteryColorShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            if (Math.cos(runtimeLength + x) * Math.sin(runtimeLength + y) > Math.cos(runtimeLength + Math.floor(Math.random() * 5))) 
                continue;
            rasterizeData[y][x] = new pixel(rgbaColor(50, 40, 30));
            if (Math.sin(runtimeLength + x) < 0.3)
            rasterizeData[y][x] = new pixel(rgbaColor(50, 30, 90));
        }
     }
}

function screenBrightnessShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){

        }
    }
}

function shaderStack() {
    randomColorsShader();
    mysteryColorShader();
    lightBlueBorderShader();
    
}

function update() {
    runtimeLength++;
    shaderStack();
    drawPixels();
    rasterizer.fillStyle = "yellow";
    rasterizer.font = "20px c64";
    rasterizer.fillText("test", 4 * 10, 56 * 10);
}

function rgbaColor(r, g, b) {
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}
function getRgb(rgbString){
    
}

const runtime = setInterval(update, 50);