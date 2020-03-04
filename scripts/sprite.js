var colorData;
var image;
var alphaKey;
var h;
var w;

function sprite(img, alpha) {

    let canvas = document.createElement('canvas');
    canvas.height = img.height;
    canvas.width = img.width;
    this.h = img.height;
    this.w = img.width;
    let pen = canvas.getContext("2d");
       
    this.alphaKey = alpha;

    let imgColor = [[], []];
    pen.drawImage(img, 0, 0, img.height, img.width);
    //read pixels
    for (y=0;y<img.height;y++){
        imgColor[y] = [];
        for (x=0;x<img.width;x++){
            let color = pen.getImageData(x, y, 1, 1).data;
            let r = color[0];
            let g = color[1];
            let b = color[2];
            imgColor[y][x] = new pixel(rgbColor(r, g, b));
        }
    }
    this.colorData = imgColor;
    this.image = img;
}

function rgbColor(r, g, b) {
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}