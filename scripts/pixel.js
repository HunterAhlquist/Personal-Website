var color;

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