/*
©Hunter Ahlquist, 2020

sprite.js
Sprite object part of the graphics library.
*/

var colorData;
var image;
var alphaKey;
var h;
var w;

var spriteStack = [];
var loadSpriteStack = [];

function sprite(img, alpha) {

    let canvas = document.createElement('canvas');
    canvas.height = img.height;
    canvas.width = img.width;
    this.h = img.height;
    this.w = img.width;
    let pen = canvas.getContext("2d");
       
    this.alphaKey = alpha;

    let imgColor = [[], []];
    imgColor.length = this.h;
    pen.drawImage(img, 0, 0, img.width, img.height);
    //read pixels
    for (y=0;y<this.h;y++){
        imgColor[y] = [];
        imgColor[y].length = this.w;
        for (x=0;x<img.width;x++){
            let color = pen.getImageData(x, y, 1, 1).data;
            let r = color[0];
            let g = color[1];
            let b = color[2];
            let a = color[3];
            imgColor[y][x] = new pixel(getRgba(r, g, b, a));
        }
    }
    this.colorData = imgColor;
    this.image = img;
}

function loadNewSprite(imgURL, a) {
    img = document.createElement('img');
    img.src = imgURL;
    loadSpriteStack.push(img);
    let afterLoad = function(){
        let spr = loadSpriteStack.pop();
        spriteStack.push(new sprite(spr, a));
    };
    img.addEventListener("load", afterLoad);
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
            if (getColor(col)[3] == 0)
                continue;
                
            rasterizeData[curY][curX].color = col;
        }
    }
}