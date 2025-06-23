/* generic upgrade:
id: {id:"id",
    cost:"cost",
    amountBought: 0,
    amountCanBuy: 1,
    func: does = () => {
        // do something
    },
    text:{
    title:"",
    effect:"",
    costDesc:"",
    lore:""
    }
},
*/
const OGUPGRADES = {
    alphaUnlock: {id:"alphaUnlock",
        cost: "none",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showClass("alpha");
            player.UNLOCKED[0] = true;
            resources['alpha'].unlocked = true;
        },
        text:{
            title:"Unlock &alpha;",
            effect:"Unlock the generators tab and the &alpha; generator, unlock more buttons in the tree",
            costDesc:"Free ;)",
            lore:"Start the game..."
        }
    },
    betaUnlock: {id:"betaUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showClass("beta")
            player.UNLOCKED[1] = true;
            resources['beta'].unlocked = true;
        },
        text:{
            title:"Unlock &beta;",
            effect:"Unlock the &beta; generator, and more buttons in the tree",
            costDesc:"Restart &alpha;",
            lore:"Meet the betas. Funny, short little fellows. Always seem to be behind you. Misjudged, sometimes misguided."
        }
    },
    gammaUnlock: {id:"gammaUnlock",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showClass("gamma")
            player.UNLOCKED[1] = true;
            resources['gamma'].unlocked = true;
        },
        text:{
            title:"Unlock &gamma;",
            effect:"Unlock the &gamma; generator, unlock a button in the tree",
            costDesc:"Restart &beta;",
            lore:"Supposedly the last we are going to meet."
        }
    },
    isDoneUnlock: {id:"isDoneUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showID("isDone");
            let isDone = document.querySelector(`#isDone`);
            isDone.style.display = "flex";
        }
    },
    upgradesUnlock: {id:"upgradesUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showID("buttonUpgrades");
        }
    },
    skillsUnlock: {id:"skillsUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showID("buttonSkills");
        }
    },
    groupUnlock: {id:"groupUnlock",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: () => {
            showID("buttonGroup");
        }
    },
};

const ogPlayer = {
    NAMES: [
        "alpha",
        "beta",
        "gamma",
        "alphabeta",
        "betagamma",
        "alphagamma",
    ],
    TIMES: [20, 50, 300, 30, 30, 30],
    POWERS: [1, 1, 1, 1, 1, 1],
    percentage: [0, 0, 0, 0, 0, 0],
    UNLOCKED: [false, false, false, false, false, false],
    upgrades: {},
    update: 0.05,
    stopTime: false,
};

// save
let player = {};

class generalUpgrade {
    constructor(id, cost, amountBought, amountCanBuy, functionality, text) {
        this.id = id;
        this.button = document.querySelector(`#${id}`);
        this.bar = document.querySelector(`#descBar`);
        this.cost = cost;
        this.percentage = (amountBought / amountCanBuy) * 100;
        this.amountBought = amountBought;
        this.amountCanBuy = amountCanBuy;
        this.functionality = functionality;
        this.text = text;
    }
    showPercentage() {
        if (Math.round(this.percentage) >= 100) {
            this.percentage = 100;
            removeButtonClick(this.id)
        } if (this.amountCanBuy == 1) {
            this.bar.style.display = 'none';
        } else {
        this.bar.style.width = `${this.percentage}%`;
        this.bar.style.display = 'flex';
        }
    }
    updateAmount() {
        this.amountBought += 1;
        upgrades[this.id].amountBought += 1;
    }
    buyOnce() {
        if (this.cost == "none") {
            this.percentage += 100 / this.amountCanBuy;
            this.showPercentage();
            this.updateAmount();
            this.functionality();
            return true;
        } else {
            if (resources[this.cost].spend()) {
            this.percentage += 100 / this.amountCanBuy;
            this.showPercentage();
            this.updateAmount();
            this.functionality();
            return true;
            } else {
            return false;
            }
        }
    }
}

class resource {
    constructor(name, time, percentage, unlocked, power) {
        this.name = name;
        this.inHTML = `&${name.toLowerCase()};`;
        this.isdone = document.querySelector(`#${name}IsDone`);
        this.bar = document.querySelector(`#${name}Bar`);
        this.point = Boolean(percentage === 100);
        this.time = time;
        this.unlocked = unlocked;
        this.power = power;
        this.percentage = percentage;
        this.index = player.NAMES.indexOf(this.name);
        if (unlocked) {
            this.unlock();
            this.showPercentage();
        } else {
            this.hide();
        }
    }
    unlock() {
        showClass(this.name);
        this.unlocked = true;
    }
    hide() {
        hideClass(this.name);
        this.unlocked = false;
    }
    showPercentage() {
        this.bar.style.width = `${this.percentage}%`
        player.percentage[this.index] = this.percentage;
        this.percentage === 100
            ? this.isdone.classList.remove("hidden")
            : this.isdone.classList.add("hidden");
    }
    updateBar(updateTime) {
        if (this.percentage < 100) {
            this.percentage =
                this.percentage + (updateTime * 100) / this.time;
                // updateTime should reflect if the person has tabbed out or not
            if (this.percentage >= 100) {
                this.percentage = 100;
                this.point = true;
            }
            this.showPercentage();
        } else if (this.percentage === NaN) {
            this.reset();
        }
    }
    spend() {
        if (this.point) {
            this.reset();
            return true;
        } else {
            return false;
        }
    }
    reset() {
        this.point = false;
        this.percentage = 0;
        this.showPercentage();
    }
}

let resources = {};

function createResources() {
    for (i in player.NAMES) {
        resources[player.NAMES[i]] = new resource(
            player.NAMES[i],
            player.TIMES[i],
            player.percentage[i],
            player.UNLOCKED[i],
            player.POWERS[i]
        );
    }
}

let upgrades = {};

function createUpgrade() {
    let buttons = document.querySelectorAll(".upgradable")
    buttons.forEach((button) => {
        let id = button.id;
        let info = player.upgrades[id];
        upgrades[id] = new generalUpgrade(
            info.id,
            info.cost,
            info.amountBought,
            info.amountCanBuy,
            info.functionality,
            info.text
        );
    });
}

// insert class name
function hideClass(classStr) {
    let divs = document.querySelectorAll(`.${classStr}`);
    divs.forEach((div) => {
        div.classList.add("hidden");
    });
}

function showClass(classStr) {
    let divs = document.querySelectorAll(`.${classStr}`);
    divs.forEach((div) => {
        div.classList.remove("hidden");
    });
}

// insert id
function hideID(idstr) {
    let div = document.querySelector(`#${idstr}`);
    div.classList.add("hidden");
}

function showID(idstr) {
    let div = document.querySelector(`#${idstr}`);
    div.classList.remove("hidden");
}


function removeButtonClick(id) {
    let button = document.querySelector(`#${id}`);
    button.removeEventListener("click", buttonFunction);
    button.classList.add("bought");
}

function addButtonHover() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("mouseover", showDescription);
    });
}

function cheating() {
    player.TIMES = [1, 1, 1, 1, 1, 1];
}

function fromStart() {
    player = ogPlayer;
    player.upgrades = OGUPGRADES;
}

function saving() {
    player.upgrades = upgrades;
    player.resources = resources;
    localStorage.setItem("player", JSON.stringify(player));
    console.log("saved");
}

function startSaves() {
    let saveTime = window.setInterval(() => {
        saving();
        if (player.stopTime) clearInterval(saveTime);
    }, 10000);
}

function loadPlayer() {
    if (localStorage.getItem("player") === null) {
        player = ogPlayer;
        upgrades = OGUPGRADES;
    } else {
        player = JSON.parse(localStorage.getItem("player"));
        upgrades = JSON.parse(localStorage.getItem("upgrades"));
    }
}

function incrementBars() {
    for (item in resources) {
        if (resources[item].unlocked) {
            resources[item].updateBar(player.update);
        }
    }
}

function buttonFunction(e) {
    let id = e.target.id;
    let classes = e.target.classList;
    console.log(id, classes);
    if (classes.contains("tabButton")) {
        showTab(id)
    } else {
        upgrades[id].buyOnce();
    };
    // tabbing
    
}

function showTab(id) {
    hideClass("page");
    switch (id.slice(6)) {
        case "Generators":
            showID("tabGenerators");
            break;
        case "Tree":
            showID("tabTree");
            break;
        case "Upgrades":
            showID("tabUpgrades");
            break;
        case "Skills":
            showID("tabSkills");
            break;
        case "Group":
            showID("tabGroup");
            break;
    };
    let buttons = document.querySelectorAll(".tabButton");
    buttons.forEach((button) => {
        button.classList.remove("toggle");
    });
    let button = document.querySelector(`#${id}`);
    button.classList.add("toggle");
}

window.onload = function () {
    //loadPlayer();
    fromStart();
    cheating();
    addButtonListeners();
    addButtonHover();
    createResources();
    startTime();
    createUpgrade();
    startSaves();
    player.UNLOCKED[0] == true ? showTab("buttonGenerators") : showTab("buttonTree");
    //loadBought();
};

function addButtonListeners() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        //if (!player.bought.contains(button.id)) {
            button.addEventListener("click", buttonFunction);
            button.classList.remove("bought");
        //}
    });
}

function startTime() {
    player.stopTime = false;
    let gameTime = window.setInterval(() => {
        incrementBars();
        if (player.stopTime) clearInterval(gameTime);
    }, player.update * 1000);
}

function showDescription(e) {
    let id = e.target.id;
    const tabs = ["buttonTree","buttonGenerators","buttonUpgrades","buttonSkills","buttonGroup"]
    let div = document.querySelector("#desc");
    let title = document.createElement("h2");
    title.innerHTML = tabs.includes(id) ? "" :upgrades[id].text.title;
    let effect = document.createElement("p");
    let cost = document.createElement("p");
    let lore = document.createElement("h4");
    if (!tabs.includes(id)) {
        let txt = upgrades[id].text;
        effect.innerHTML = txt.effect;
        cost.innerHTML = txt.costDesc;
        lore.innerHTML = txt.lore;
    }
    div.innerHTML = "";
    div.appendChild(title);
    div.appendChild(effect);
    div.appendChild(cost);
    div.appendChild(lore);
}

function loadBought() {
    for (item in player.upgrades) {
        if (item.amountBought >= 1) item.functionality();
    }
}