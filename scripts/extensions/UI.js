/*
©Hunter Ahlquist, 2020

UI.js
Contains user interface drawing functions for making microapps easier to develop.
*/
windowStack

//object functions

//draw functions
function drawBox(locX, locY, w, h, color, fill){
    for (y=locY;y<rasterizeData.length;y++){
        for (x=locX;x<rasterizeData[y].length;x++){
            if (!fill){
                if (x <= locX + w && y == locY || x <= locX + w && y == locY + h ||
                    y <= locY + h && x == locX || y <= locY + h && x == locX + w){
                    rasterizeData[y][x].color = color;
                }
            } else {
                if (x >= locX && x <= locX + w){
                    if (y >= locY && y <= locY + h){
                        rasterizeData[y][x].color = color;
                    }
                }
            }
        }
    }
}

function newTabWindow(x, y, tL, tR, tC) {
    //tabs take up a maximum of 10px height and the width is divided between how many tabs there are
    var newTabWin = {
        locX : x,
        locY : y,
        tabLeftKey : tL,
        tabRightKey : tR,
        tabCount: tC
    }
    
    return newTabWin;
}