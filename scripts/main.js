const consoleArea = document.querySelector(".console");
const consoleAreaQ = $(".console");
const infoBtn = document.querySelector(".infoBtn");
const infoBtnQ = $(".infoBtn");
const infoArea = document.querySelector(".info");
const infoAreaQ = $(".info");
infoAreaQ.hide();
closeInfoPanel();

infoBtn.addEventListener("click", toggleInfo);

let infoPanelOpen = false;
function toggleInfo() {
    if (infoPanelOpen){
        closeInfoPanel();
        infoPanelOpen = false;
    } else {
        openInfoPanel();
        infoPanelOpen = true;
    }
}

function openInfoPanel() {
    infoAreaQ.show();
    consoleAreaQ.animate({width: '60%'},  {
        easing: 'swing',
        duration: 'slow'
    });
    infoAreaQ.animate({width: '40%', color: 'white', borderColor: 'white'}, {
        easing: 'swing',
        duration: 'slow'
    });
}
function closeInfoPanel() {
    consoleAreaQ.animate({width: '100%'},  {
        easing: 'swing',
        duration: 'slow'
    });
    infoAreaQ.animate({width: '1%', color: 'black', borderColor: 'black'}, {
        easing: 'swing',
        duration: 'slow',
        complete: function() {
            infoAreaQ.hide();
        }
    });
}