/*
©Hunter Ahlquist, 2020

acid.js
Microapp: displays a trippy colored animation using 100% maths.
*/
var app;
function acid() {
    function update() { //updates every frame and runs automatically through smilesystem.js
        coolBGShader();
        for (i=0;i<spriteStack.length;i++){
            drawSprite(spriteStack[i], 25, 25);
        }
        drawBox(0, 0, Math.floor(60 * Math.abs(Math.sin(runtimeLength / 20))), Math.floor(60 * Math.abs(Math.sin(runtimeLength / 20))), getRgba(255, 128, 0), false);
        drawPixels();
    }

    function coolBGShader() { //trippy looking animated shader
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                let r = 0;
                r = 255 - (Math.pow(2, x) * Math.pow(y, 9 * Math.cos(runtimeLength / 20))) * Math.random();
                r *= Math.random();

                let g = 255 - (Math.pow(2, y) * Math.pow(x, 9 * Math.cos(runtimeLength / 20))) * Math.random();
                g *= Math.random();
                    
                let b = 255 - (255 * Math.sin(y * (runtimeLength / 20)) + x);
                b *= Math.random();
                if (y == 0 || x == 0){
                    r = 0;
                    g = 0;
                    b = 0;
                }
                
                rasterizeData[y][x] = new pixel(getRgba(r, g, b));
            }
         }
    }

    function end() { //fires when the microapp closes via the 'home' key on the keyboard.
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'acid' mircroapp");
        consoleHistory.push("terminated");
    }

    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    return app;
}





