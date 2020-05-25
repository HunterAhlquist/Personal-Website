/*
©Hunter Ahlquist, 2020

bin.js
Contains all the basic features for Smile64.
*/

function parse(command){
    let cmd = command.split(' ');
    switch (cmd[0]){
        case "ext":
            consoleHistory.push("Active System Extensions");
            consoleHistory.push("=-=-=-=-=-=-=-=-=-=-=-=-=-");
            consoleHistory.push("'Sprites'");
            consoleHistory.push("!  >Image decoding and");
            consoleHistory.push("!   rasterization.");
            consoleHistory.push("#  (c)Smile Systems, Inc.");
            consoleHistory.push("'Audio'");
            consoleHistory.push("!  >Sound wave processing.");
            consoleHistory.push("#  (c)Smile Systems, Inc.");
            consoleHistory.push("'UI'");
            consoleHistory.push("!  >User interface library.");
            consoleHistory.push("#  (c)Smile Systems, Inc.");
            break;
        case "clear":
            consoleHistory = [];
            break;
        case "exec":
            exec(cmd[1]);
            break;
        case "contact":
            consoleHistory.push("Email:");
            consoleHistory.push("!contact@hunterahlquist.com");
            consoleHistory.push("Twitter:");
            consoleHistory.push("!@hunter_ahlquist");
            break;
        case "ping":
            consoleHistory.push("pong!");
            break;
        case "help":
            consoleHistory.push("exec, contact, games,");
            consoleHistory.push("whoami, ping, about,");
            consoleHistory.push("clear");
            break;
        case "whoami":
            consoleHistory.push("Hunter Ahlquist");
            consoleHistory.push("=-=-=-=-=-=-=-=-=-=-=-=-=-");
            consoleHistory.push("!Game designer;");
            consoleHistory.push("!Programmer - C#, JS, Java;");
            consoleHistory.push("!Fiction writer;");
            consoleHistory.push("!Artist;");
            break;
        case "edu":
            consoleHistory.push("Green River");
            consoleHistory.push("Community College");
            consoleHistory.push("=-=-=-=-=-=-=-=-=-=-=-=-=-");
            consoleHistory.push("!Associate in ");
            consoleHistory.push("!Applied Science:");
            consoleHistory.push("!Information Technology");
            consoleHistory.push("!Systems and Security");
            consoleHistory.push("!=-=-=-=-=-=-=-=-=-=-=-=-=-");
            break;
        case "about":
            consoleHistory.push("SmileOS - v0.85b");
            consoleHistory.push("RAM: 32kb, VRAM: 12kb");
            consoleHistory.push("CPU: H001 @ 0.875 MHz");
            consoleHistory.push("");
            consoleHistory.push("#(c) Smile Systems, Inc.");
            consoleHistory.push("#1983.");
            break;
            case "games":

                if (cmd[1] != undefined)
                    gamesInfo(cmd[1]);
                else {
                    consoleHistory.push("Fractured Mind, ID:00");
                    consoleHistory.push("Surveillance State, ID:01");
                    consoleHistory.push("");
                    consoleHistory.push("!Type 'games' followed");
                    consoleHistory.push("!by its game ID to");
                    consoleHistory.push("!get more information.");
                }
                
            break;
        default:
            consoleHistory.push("#Unknown command :(");
            break;
    }
}

function gamesInfo(parse){
    switch (parse) {
        case "00":
            activeApp = new fm();
            break;
        case "01":
            activeApp = new ss();
            break;
    }
}

function exec(parse) {
    if (parse == undefined){
        consoleHistory.push("#This command requires");
        consoleHistory.push("#a second argument...");
        consoleHistory.push("#Use 'exec ls' to");
        consoleHistory.push("#see available microapps.");
    } else if (parse == "ls") {
        consoleHistory.push("test, acid");
    } else {
        switch (parse) {
            case "test":
                activeApp = new test();
                break;
            case "acid":
                activeApp = new acid();
                break;
        }
    }
    
}