function parse(command){
    let cmd = command.split(' ');
    switch (cmd[0]){
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
            consoleHistory.push("whoami, ping, about");
            break;
        case "whoami":
            consoleHistory.push("Hunter Ahlquist");
            consoleHistory.push("=-=-=-=-=-=-=-=-=-=-=-=-=-");
            consoleHistory.push("!Game designer;");
            consoleHistory.push("!Programmer - C#, JS, Java;");
            consoleHistory.push("!Fiction writer;");
            consoleHistory.push("!Artist;");
            break;
        case "about":
            consoleHistory.push("Smile64 - v0.1");
            consoleHistory.push("RAM: 16kb, VRAM:10.8kb");
            consoleHistory.push("CPU: Happy1 (20 Hz)");
            break;
            case "games":

                if (cmd[1] != undefined)
                    gamesInfo(cmd[1]);
                else {
                    consoleHistory.push("Fractured Mind, ID:00");
                    consoleHistory.push("Surveillance State, ID:01");
                    consoleHistory.push("");
                    consoleHistory.push("#Type 'games' followed");
                    consoleHistory.push("#by its game ID to");
                    consoleHistory.push("#get more information.");
                }
                
            break;
        default:
            consoleHistory.push("#Unknown command :(");
            break;
    }
}

function gamesInfo(parse){
    switch (parse) {

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