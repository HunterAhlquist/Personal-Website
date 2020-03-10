var app;
function pong() {
    app = { update : function(){update();}, end : function(){end();}, mem : [], input : new Object() }; //register the update method and include an array for memory
    loadNewSprite("scripts/microapp/pong/paddle1.png", getRgba(0, 211, 56));
    loadNewSprite("scripts/microapp/pong/ball.png", getRgba(0, 211, 56));
    loadNewSprite("scripts/microapp/pong/paddle1.png", getRgba(0, 211, 56));
    app.mem.push(
        {
            spr : 0,
            locX : 10,
            locY : 25
        }
    );
    app.mem.push(
        {
            spr : 1,
            locX : 20,
            locY : 10
        }
    );
    app.mem.push(
        {
            spr : 2,
            locX : 30,
            locY : 10
        }
    );

    function update() {
        if (app.input != undefined){
            movePaddle(app.input.key, app.mem[0]);
            app.input = undefined;
        }
            

        coolBGShader();
        drawSprite(spriteStack[app.mem[0].spr], app.mem[0].locX, app.mem[0].locY);
        drawSprite(spriteStack[app.mem[1].spr], app.mem[1].locX, app.mem[1].locY);
        drawSprite(spriteStack[app.mem[2].spr], app.mem[2].locX, app.mem[2].locY);
        drawPixels();
    }

    function end() {
        //clear sprite stack
        spriteStack = [];
        
        consoleHistory.push("'pong' mircroapp");
        consoleHistory.push("terminated");
    }

    function movePaddle(keypress, sprite) {
        switch (keypress){
            case "ArrowUp":
                sprite.locY -= 2;
            break;
            case "ArrowDown":
                sprite.locY += 2;
            break;
        }
    }

    function coolBGShader() {
        for (y=0;y<60;y++) {
            for (x=0;x<60;x++){
                //let rand = Math.random() * 0.15;
                let r = 0 + (255 * Math.cos(y * 0.05) + x);
                let g = 0;
                let b = 0 + (255 * Math.sin(y * 0.05) + x);
                
                rasterizeData[y][x] = new pixel(getRgba(r, g, b));
            }
         }
    }

    return app;
}