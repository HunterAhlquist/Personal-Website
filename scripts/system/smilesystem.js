/*
©Hunter Ahlquist, 2020

smilesystem.js
Main logic for the Smile64 console.
*/

//prevent the backspace key from going to the prev page in the browser's history
function preventBackspaceHandler(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 8) {
        return false;
    }
}
document.onkeydown = preventBackspaceHandler;

//system uptime
var runtimeLength = 0;

//console variables
var consoleCurLine = "";
var prevCommands = [];
var prevCmdIndex = 0;
var consoleHistory = [];

//the currently running app
var activeApp;

//input handeling
document.addEventListener("keydown", typeKey);
function typeKey(e) {
    if (activeApp == null || activeApp == undefined) { //console
        if (e.key.length == 1) {
            consoleCurLine += e.key;
        } else {
            switch (e.key) {
                case "Backspace":
                    consoleCurLine = consoleCurLine.substr(0, consoleCurLine.length - 1);
                break;
                case "Enter":
                    if (consoleCurLine == "")
                        return;
                    consoleHistory.push("$" + consoleCurLine);
                    prevCommands.push(consoleCurLine);
                    prevCmdIndex = prevCommands.length;
                    parse(consoleCurLine);
                    consoleCurLine = "";
                break;
                case "ArrowUp": 
                    prevCmdIndex--;
                    if (prevCommands.length < 0)
                        return;
                    if (prevCmdIndex < 0)
                        return
                    
                    consoleCurLine = prevCommands[prevCmdIndex];
                break;
                case "ArrowDown":
                    if (prevCommands.length < 0)
                        return;
                    prevCmdIndex = prevCommands.length;
                    consoleCurLine = "";
                break;
            }
        }
    } else { //microapp
        if (e.key == "Home"){ //terminates microapp
            activeApp.end();
            activeApp = null;
            return;
        }

        activeApp.input = e; //passes input to the active microapp
    }
    e.preventDefault(); //cancels input if all else fails...
}



//pixel shaders
//generates colored pixel noise
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

//adds a blue c64 like console border to the screen
function lightBlueBorderShader() {
    for (y=0;y<60;y++) {
        for (x=0;x<60;x++){
            if (x > 2 && x < 57 && y > 2 && y < 57) 
                continue;
            rasterizeData[y][x] = new pixel(getRgba(5 * Math.floor(Math.random() * 15), 100, 200 + Math.floor(75 * Math.sin(runtimeLength / 10))));
        }
     }
}

//simulates and rasterizes colored rotating static 
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

//background for the console
function consoleBGShaderStack() {
    randomColorsShader();
    mysteryColorShader();
    lightBlueBorderShader();
    
}
//runs every 50ms
let cycleA = new Date();
let avgCycle = [];
let newAvg;
function update() {
    cycleA = new Date();
    if (runtimeLength == Number.MAX_SAFE_INTEGER)
        runtimeLength = 0;
    else
        runtimeLength++;
    appRefresh();
    cycleB = new Date();
    dif = cycleB - cycleA;
    avgCycle.unshift(dif);
    if (avgCycle.length > 100)
        avgCycle.pop();
    
    newAvg = 0;
    for (i of avgCycle){
        newAvg += i;
    }
    newAvg /= avgCycle.length;
    //console.log(Math.round(newAvg));
}

//refreshes the console view
function consoleUpdate() {
    consoleBGShaderStack();
    for (i=0;i<spriteStack.length;i++){
        drawSprite(spriteStack[i], 1, 1);
    }
    drawPixels();
    drawText();

}

//refreshes the active microapp
function appRefresh() {
    if (activeApp == null || activeApp == undefined){
        consoleUpdate();
    } else {
        activeApp.update();
    }

}

//updates console text
function drawText() {
    rasterizer.font = "10px c64";
    rasterizer.fillStyle = getRgba(5 * Math.floor(Math.random() * 15), 255, 200 - Math.floor(75 * Math.sin(runtimeLength / 10)));
    rasterizer.fillText("hunterx@" + "Hunter-Smile64", 1 * 10, 2 * 10);
    rasterizer.font = "20px c64";
    rasterizer.fillStyle = "yellow";
    //console input line
    rasterizer.fillText("~$ " + consoleCurLine + cursorTick(), 4 * 10, 56 * 10);

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

//returns the where the blinking is in time
function cursorTick() {
    if (Math.abs(Math.sin(runtimeLength / 7)) > 0.7)
        return "_";
    else
        return "";
}

//begin the update loop
const runtime = setInterval(update, 50);