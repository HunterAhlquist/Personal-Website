/*
©Hunter Ahlquist, 2020

TEMPLATE MICROAPP
Desc
*/

var app;
function ss() {
    loadNewSprite("scripts/microapp/SS/sam.png", getRgba(106, 190, 48));

    function update() {
        coolBGShader();
        for (i=0;i<spriteStack.length;i++){
            drawSprite(spriteStack[i], 0, 0);
        }
        drawPixels();
        drawString("Surveillance State", 'red', 10, 49);
        drawString("A cyberpunk themed stealth game", 'white', 5, 52, '16px');
        drawString("Made for a 48hr Gamejam", 'white', 10, 54, '16px');
        drawString("hunterahlquist.itch.io/surveillance-state", 'blue', 1, 58, '14px');
    }

    function end() {
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'Surv.St.' mircroapp");
        consoleHistory.push("terminated");
    }
    

    function coolBGShader() {
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                let r = 0;
                let g = 0;
                let b = 0;
                let rand = Math.random();
                r = 255 * rand;
                g = 255 * rand;
                b = 255 * rand;
                
                rasterizeData[y][x] = new pixel(getRgba(r, g, b));
            }
         }
    }

    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    return app;
}







