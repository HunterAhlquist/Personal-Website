var app;
function acid() {
    //console.log("start");

    function update() {
        coolBGShader();
        for (i=0;i<spriteStack.length;i++){
            drawSprite(spriteStack[i], 25, 25);
        }
        drawPixels();
    }

    function coolBGShader() {
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                let r = 0;
                if (Math.pow(2, x) > Math.pow(y, 7)) {
                    r = 255 - (Math.pow(2, x) * Math.pow(y, 9 * Math.cos(runtimeLength / 20))) * Math.random();
                } else {
                    r = Math.floor(Math.random() * 255);
                }
                let g = 255 - (Math.pow(2, y) * Math.pow(x, 9 * Math.cos(runtimeLength / 20))) * Math.random();
                g *= Math.random();
                    
                let b = 255 - (Math.pow(2, x) * Math.pow(y, 9 * Math.cos(runtimeLength / 20))) * Math.random();
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

    function end() {
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'acid' mircroapp");
        consoleHistory.push("terminated");
    }

    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    return app;
}





