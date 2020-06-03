
let spriteStackIndex;
let gameObject;
function spriterenderer(gameObject) {
    this.spriteStackIndex = -1;
    this.gameObject = gameObject;
    let update = function () {
        if (spriteStackIndex < 0 || spriteStackIndex > spriteStack.length)
            return;
        drawSprite(spriteStack[spriteStackIndex], gameObject.transform.x, gameObject.transform.y)
    }
}