﻿var style = ["Super Mario Bros", "Super Mario Bros 3", "Super Mario World", "New Super Mario Bros U"];
var environents = ["Overworld", "Underground", "Water", "Ghost House", "Airship", "Castle"];

var objects = ["Blocks", "P Switches", "Mushrooms", "Coins", "Springboards", "Goombas", "Koopas", "Piranha Plants", "Lakitus", "Clouds", "Spinys", "Moving platforms",
               "Fireflowers", "Stars", "Bullet Bills", "Bill Blasters", "Bloopers", "Cheep-cheep", "Hammer Bros", "Buzzy Beetles", "Thwomps", "Podoboos", "Bowser", "Bowser Jr.",
               "Noteblocks", "Musicblocks", "Skull platforms", "Firebars", "Rocky Wrenches", "Monty Moles", "Bob-ombs", "Donut Blocks", "POW-Blocks", "Firethrowers", "Cannons", "Spike Tops", "Boos", "Dry Bones",
               "Kameks", "Hidden blocks", "Munchers", "Wigglers", "Clowncars", "Chain Chomps", "Spiny helmet", "Beetle helmet"];
var nsmbuOnlyObjects = ["Propeller Mushrooms"];
var smwOnlyObjects = ["Feathers"];
var smb3OnlyObjects = ["Tanookis"];
var smbOnlyObjects = [];
var game = "SMM1";
var mechanics = ["Pipes", "Platforms", "Vines", "Doors", "Spikes", "Rails", "Conveyor belts", "Sawblades", "Ice blocks",
                "Oneway blocks"];
var nsmbuOnlyMechanics = ["Wall-jumping", "Ground-pounding", "Spin-jumping", "Yoshis"];
var smwOnlyMechanics = ["Spin-jumping", "Yoshis"];
var smb3OnlyMechanics = ["Kuribo's Shoe"];
var smbOnlyMechanics = ["Costumes", "Kuribo's Shoe"];

var additionalMechanics = ["Scrolling", "Fast scrolling", "Slow scrolling", "Short time", "Sound effects", "Mazes", "Puzzles"];

var smm2OnlyStyles = ["Super Mario 3D World"];
var smm2OnlyEnvironments = ["Desert", "Snow", "Forest", "Sky"]
var smm2OnlyObjects = ["10-Coins", "30-Coins", "50-Coins", "Dry Bones Shells", "Boom Booms", "Banzai Bills", "Icicles", "Twisters", "Angry Sun"]
var smm2OnlyMechanics = ["ON-OFF Switches", "Snake Blocks", "Fast Snake Blocks"]
var sm3wObjects = ["Blocks", "Bullet Bills", "Fireflowers", "Stars", "Super Bells", "Super Hammer", "Mushrooms", "Coins", "Springboards", "Goombas", "Koopas", "Ant Troopers", "Horned Ant Troopers", "Spinys", "Bloopers", "Cheep Cheeps",
"Skipsqueaks", "Spiny Skipsqueak", "Stingby", "Piranha Plants", "Fire Piranha Plants", "Piranha Creepers", "Thwomps", "Hammer Bros", "Fire Bros", "Hop Chops", "Boos",
"Peepas", "Podoboos", "Bob-ombs", "Dry Bones", "Fish Bones", "Kameks", "Meowser", "Boom Booms", "Pom Poms", "Charvaarghs", "Bullys", "Porcupffers", "Koopa Car", "Bill Blasters", "Banzai Bills", "Icicle", "Twisters",
"POW-Blocks", "P Switches", "Cloud Lifts", "! Blocks"];
var sm3wMechanics = ["ON-OFF Switches", "Snake Blocks", "Fast Snake Blocks", "Pipes", "Clear Pipes", "Spike Blocks", "Doors", "Trees", "Conveyors Belts", "Track Blocks", "Blinking Blocks", "Mushroom Trampolines", "Warp Boxes"];
var smm2smbOnlyObjects = ["Superball Flowers"];
var allStyles = style;
var allEnvironments = environents;
function toggleStyle() {
    var styleElement = document.getElementById("ideaStyle").parentElement;
    var input = document.getElementById("checkboxStyle");
    if (input.checked === true) {
        styleElement.className = "idea";
    } else {
        styleElement.className = "ideaDis";
    }
}

function toggleGame() {
    var input=document.getElementById("gameSelector");
    game = input.options[input.selectedIndex].value;
    generate();
}

function toggleType() {
    var typeElement = document.getElementById("ideaType").parentElement;
    var input = document.getElementById("checkboxType");
    if (input.checked === true) {
        typeElement.className = "idea";
    } else {
        typeElement.className = "ideaDis";
    }
}

function generate() {
    if (game === "SMM2") {
        allStyles = style.concat(smm2OnlyStyles);
        allEnvironments = environents.concat(smm2OnlyEnvironments);
    } else {
        allStyles = style;
        allEnvironments = environents;
    }
    var outputStyleElement = document.getElementById("ideaStyle");
    var styleId = getRandom(0, allStyles.length - 1);
    if (document.getElementById("checkboxStyle").checked === true) {
        outputStyleElement.innerHTML = getStyle(styleId);
    } else {
        outputStyleElement.parentElement.className = "ideaDis";
    }

    var outputTypeElement = document.getElementById("ideaType");
    if (document.getElementById("checkboxType").checked === true) {
        outputTypeElement.innerHTML = getEnvironment(styleId);
    } else {
        outputTypeElement.parentElement.className = "ideaDis";
    }

    var outputContentElement = document.getElementById("ideaContent");
    var outputText = "";

    var objectCount = getRandom(1, 3);
    var objectIds = [];
    objectIds.length = objectCount;

    for (var i = 0; i < objectCount; i++) {

        var newObject = "";
        do {
            if (getRandom(1, 2) === 1) {
                newObject = getObject(styleId);
            } else {
                newObject = getMechanic(styleId);
            }
        } while (contains(objectIds, newObject) === true);

        objectIds.push(newObject);
        outputText = outputText.concat(newObject);

        if (i === objectCount - 2) {
            outputText = outputText.concat(" and ");
        }
        else if (i < objectCount - 1) {
            outputText = outputText.concat(", ");
        }
    }

    if (getRandom(1, 2) === 1) {
        outputText = outputText.concat(" and ");
        outputText = outputText.concat(getAdditionalMechanic());
    }

    outputContentElement.innerHTML = outputText;
}

function getStyle(styleId) {
    var output = "";
    output = output.concat(allStyles[styleId]);
    output = output.concat(" style");
    return output;
}

function getEnvironment(styleId) {
    var output = "";
    if ((game === "SMM2") && (styleId !== 4)){
        if (getRandom(1, 2) === 1) {
            output = output.concat("Day ");
        } else {
            output = output.concat("Night ");
        }
    }
    output = output.concat(allEnvironments[getRandom(0, allEnvironments.length - 1)]);
    output = output.concat(" level");
    return output;
}

function getObject(styleId) {
    var output = "";
    var allObjects;
    if (game === "SMM2") {
        allObjects = objects.concat(smm2OnlyObjects);
        if (styleId === 0) {
            allObjects = objects.concat(smbOnlyObjects).concat(smm2smbOnlyObjects);
        }
        else if (styleId === 1) {
            allObjects = objects.concat(smb3OnlyObjects);
        }
        else if (styleId === 2) {
            allObjects = objects.concat(smwOnlyObjects);
        }
        else if (styleId === 3) {
            allObjects = objects.concat(nsmbuOnlyObjects);
        } 
        else if (styleId === 4) {
            allObjects = sm3wObjects;
        }
    } else {
        if (styleId === 0) {
            allObjects = objects.concat(smbOnlyObjects);
        }
        else if (styleId === 1) {
            allObjects = objects.concat(smb3OnlyObjects);
        }
        else if (styleId === 2) {
            allObjects = objects.concat(smwOnlyObjects);
        }
        else if (styleId === 3) {
            allObjects = objects.concat(nsmbuOnlyObjects);
        }
    }
    output = output.concat(allObjects[getRandom(0, allObjects.length - 1)]);

    if (getRandom(1, 2) === 1) {
        if ((styleId !== 4) && (getRandom(1, 3) === 1)) {
            output = output.concat(" on rails ");
        } else {
            output = " flying ".concat(output);
        }
    }

    return output;
}

function getMechanic(styleId) {
    var output = "";
    var allMechanics;

    if (game === "SMM2") {
        allMechanics = mechanics.concat(smm2OnlyMechanics);
        if (styleId === 0) {
            allMechanics = mechanics.concat(smbOnlyMechanics);
        }
        else if (styleId === 1) {
            allMechanics = mechanics.concat(smb3OnlyMechanics);
        }
        else if (styleId === 2) {
            allMechanics = mechanics.concat(smwOnlyMechanics);
        }
        else if (styleId === 3) {
            allMechanics = mechanics.concat(nsmbuOnlyMechanics);
        }
        else if (styleId === 4) {
            allMechanics = sm3wMechanics;
        }
        else {
            allMechanics = mechanics;
        }
    } else {
        if (styleId === 0) {
            allMechanics = mechanics.concat(smbOnlyMechanics);
        }
        else if (styleId === 1) {
            allMechanics = mechanics.concat(smb3OnlyMechanics);
        }
        else if (styleId === 2) {
            allMechanics = mechanics.concat(smwOnlyMechanics);
        }
        else if (styleId === 3) {
            allMechanics = mechanics.concat(nsmbuOnlyMechanics);
        }
        else {
            allMechanics = mechanics;
        }
    }
    output = allMechanics[getRandom(0, allMechanics.length - 1)];
    return output;
}

function getAdditionalMechanic() {
    var output = "";
    output = additionalMechanics[getRandom(0, additionalMechanics.length - 1)];
    return output;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}