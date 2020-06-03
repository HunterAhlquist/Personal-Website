/*
©Hunter Ahlquist, 2020

test.js
Tests the sprite library on top a neat background.
*/

var app;
function test() {
    //console.log("start");
    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    loadNewSprite("scripts/microapp/test/testsprite.png", getRgba(0, 211, 56));
    app.mem.push(new gameobject());
    app.mem[0].components.push(new spriterenderer(app.mem[0]));
    app.mem[0].components[0].spriteStackIndex = 0;

    function update() {
        coolBGShader();
        app.mem[0].updateGameobject();
        drawPixels();
    }

    function end() {
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'test' mircroapp");
        consoleHistory.push("terminated");
    }

    function coolBGShader() {
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                let r;
                let g;
                let b;
                if (y % 2 == 0){
                    r = Math.floor(Math.random() * 255 + Math.sin(runtimeLength / 50) * 255) * 0.55;
                    g = Math.floor(Math.random() * 255 + Math.sin(runtimeLength / 50)  * 255) * 0.45;
                    b = Math.floor(Math.random() * 255 + Math.sin(runtimeLength / 50)  * 255) * 0.35;
                } else {
                    r = Math.floor(Math.random() * 255 + Math.cos(runtimeLength / 25) * 255) * 0.50;
                    g = Math.floor(Math.random() * 255 + Math.cos(runtimeLength / 25)  * 255) * 0.55;
                    b = Math.floor(Math.random() * 255 + Math.cos(runtimeLength / 25)  * 255) * 0.30;
                }
                
                rasterizeData[y][x] = new pixel(getRgba(r, g, b));
            }
         }
    }

    
    return app;
}







