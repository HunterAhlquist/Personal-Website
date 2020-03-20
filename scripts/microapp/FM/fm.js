/*
©Hunter Ahlquist, 2020

TEMPLATE MICROAPP
Desc
*/

var app;
function fm() {
    loadNewSprite("scripts/microapp/FM/brain.png", getRgba(106, 190, 48));

    function update() {
        coolBGShader();
        for (i=0;i<spriteStack.length;i++){
            drawSprite(spriteStack[i], 0, 0);
        }
        drawPixels();
        drawString("Fractured Mind", 'white', 1.8, 47.2);
        drawString("Fractured Mind", 'red', 2, 47);
        drawString("A first person", 'darkgray', 2, 49);
        drawString("exploration game", 'darkgray', 2, 51);
        
        drawString("Coming whenever", 'gray', 1, 54);
        drawString("it's done.", 'gray', 1, 56);
    }

    function end() {
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'F.M.' mircroapp");
        consoleHistory.push("terminated");
    }
    

    function coolBGShader() {
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                let r = 0;
                let g = 0;
                let b = 0;
                r = 255 * (Math.sin(x) * Math.cos((runtimeLength+1) / x) * 2);
                g = 255 * (Math.cos(y) * Math.sin((runtimeLength+1) / x) * 4);
                b = 255 * (Math.sin(Math.cos(x-y)) * Math.cos((runtimeLength+1) / y) * 8);
                r *= 0.15;
                g *= 0.15;
                b *= 0.15;
                
                rasterizeData[y][x] = new pixel(getRgba(r, g, b));
            }
         }
    }

    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    return app;
}







