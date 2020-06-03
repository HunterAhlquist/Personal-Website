let transform;
let components;
function gameobject() {
    transform = {
        x:0,
        y:0
    }
    components;
    let updateGameobject = function () {
        for (c of components){
            c.update();
        }
    }
}


