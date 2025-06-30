/*
some notes:
time upgrades - object {factor: formula, unspent: true/false}
basically - is it an unspent upgrade
*/

/* generic upgrade:
id: {id:"id",
    cost:"cost",
    amountBought: 0,
    amountCanBuy: 1,
    functionality: function() {
        // do something
    },
    text:{
    title:"",
    effect:"",
    costDesc:"",
    lore:""
    },
    tab:"",
},
*/

const OGUPGRADES = {
    alphaUnlock: {id:"alphaUnlock",
        cost: "none",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showClass("alpha");
            player.UNLOCKED[0] = true;
            resources['alpha'].unlocked = true;
            player.favourability['alpha']++;
        },
        text:{
            title:"unlock &alpha;",
            effect:"unlock the generators tab and the &alpha; generator, unlock more buttons in the tree",
            costDesc:"free ;)",
            lore:"start the game..."
        },
        tab:"tree",
    },
    betaUnlock: {id:"betaUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showClass("beta")
            player.UNLOCKED[1] = true;
            resources['beta'].unlocked = true;
            player.favourability['beta']++;
            player.choices['buy beta first'] = Boolean(upgrades['upgradesUnlock'].amountBought == 0);
        },
        text:{
            title:"unlock &beta;",
            effect:"unlock the &beta; generator, and more buttons in the tree",
            costDesc:"restart &alpha;",
            lore:"meet the betas. funny, short little fellows. always seem to be behind you. misjudged, sometimes misguided."
        },
        tab:"tree",
    },
    gammaUnlock: {id:"gammaUnlock",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showClass("gamma")
            player.UNLOCKED[2] = true;
            resources['gamma'].unlocked = true;
            player.favourability['gamma']++;
            player.choices['buy gamma first'] = Boolean(upgrades['skillsUnlock'].amountBought == 0);
        },
        text:{
            title:"unlock &gamma;",
            effect:"unlock the &gamma; generator, unlock a button in the tree",
            costDesc:"restart &beta;",
            lore:"supposedly the last we are going to meet."
        },
        tab:"tree",
    },
    isDoneUnlock: {id:"isDoneUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showID("isDone");
            let isDone = document.querySelector(`#isDone`);
            isDone.style.display = "flex";
        },
        text:{
            title:"is done?",
            effect:"unlock a bar below the tab buttons that show if any generators are full",
            costDesc:"restart &alpha;",
            lore:"makes it easier to know when the generators are done. hopefully the quality of life will improve the further we go on."
        },
        tab:"tree",
    },
    upgradesUnlock: {id:"upgradesUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showID("buttonUpgrades");
            player.favourability['alpha']++;
            player.choices['buy upgrades first'] = Boolean(resources['beta'].unlocked == false); 
        },
        text:{
            title:"upgrade tab",
            effect:"unlock the upgrade tab, and various upgrades depending on how many generators are unlocked",
            costDesc:"restart &alpha;",
            lore:"we can discuss with the alphas on their turf. upgrades are powerful and reliable."
        },
        tab:"tree",
    },
    skillsUnlock: {id:"skillsUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showID("buttonSkills");
            player.favourability['beta']++;
            player.choices['buy skills first'] = Boolean(resources['gamma'].unlocked == false);
        },
        text:{
            title:"skills tab",
            effect:"unlock the skills tab, and various skills depending on how many generators are unlocked",
            costDesc:"restart &beta;",
            lore:"we can talk to the betas there. skills are weak but expansive."
        },
        tab:"tree",
    },
    groupUnlock: {id:"groupUnlock",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showID("buttonGroup");
            player.favourability['gamma']++;
        },
        text:{
            title:"&gamma;-group tab",
            effect:"unlock the &gamma;-group tab",
            costDesc:"restart &gamma;",
            lore:"we can have a meeting with the gammas here. the &gamma;-group offer insanely strong boosts for a price."
        },
        tab:"tree",
    },
    alphaTimeUpgrade: {id:"alphaTimeUpgrade",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            player.favourability['alpha']++;
            let factor = this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = {'factor': factor, 'unspent': false};
        },
        text:{
            title:"&alpha; time upgrade",
            effect:"reduce the time it takes for the &alpha; generator to fill",
            costDesc:"restart &alpha;",
            lore:"it is simple, but effective. much like the alphas."
        },
        tab:"upgrade",
    },
    betaTimeUpgrade: {id:"betaTimeUpgrade",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            showID("betaTime2Upgrade");
            player.favourability['alpha']++;
            player.favourability['beta']++;
            let factor = 3 * this.amountBought;
            resources['beta'].timeUpgrades[this.id] = {'factor': factor, 'unspent': false};
        },
        text:{
            title:"&beta; time upgrade",
            effect:"greatly reduce the time it takes for the &beta; generator to fill",
            costDesc:"restart &beta;",
            lore:"spend itselfs to boost itself, a good deal."
        },
        tab:"upgrade",
    },
    gammaTimeUpgrade: {id:"gammaTimeUpgrade",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            player.favourability['alpha']++;
            player.favourability['gamma']++;
            let factor = 0.5 * this.amountBought + 1;
            resources['gamma'].timeUpgrades[this.id] = {'factor': factor, 'unspent': false};
        },
        text:{
            title:"&gamma; time upgrade",
            effect:"slightly reduce the time it takes for the &gamma; generator to fill",
            costDesc:"restart &gamma;",
            lore:"a deal almost too good to be true, the gamma stay sceptical."
        },
        tab:"upgrade",
    },
    betaTime2Upgrade: {id:"betaTime2Upgrade",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function() {
            player.favourability['alpha']++;
            player.favourability['beta']++;
            let factor = this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = {'factor': factor, 'unspent': false};
        },
        text:{
            title:"&beta; time (time) upgrade",
            effect:"reduce the time it takes for the &beta; generator to fill (again)",
            costDesc:"restart &beta;",
            lore:"did we just do this? i am sure. the beta are sure also."
        },
        tab:"upgrade",
    },
    alphaPowerUpgrade: {id:"alphaPowerUpgrade",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function() {
            player.favourability['alpha']++;
            let factor = this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = {'factor': factor, 'unspent': false};
        },
        text:{
            title:"&alpha; power upgrade",
            effect:"increase the power of &alpha; sacrifice",
            costDesc:"restart &alpha;",
            lore:"a deal almost too good to be true, the gamma stay sceptical"
        },
        tab:"upgrade",
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
    TIMES: [20, 60, 300, 30, 30, 30],
    POWERS: [2, 1, 5, 1, 1, 1],
    percentage: [0, 0, 0, 0, 0, 0],
    UNLOCKED: [false, false, false, false, false, false],
    upgrades: {},
    update: 0.05,
    stopTime: false,
    favourability: {'alpha':0, 'beta':0, 'gamma':0},
    choices: {}
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
        }
        this.bar.style.width = `${this.percentage}%`;
        this.bar.style.display = 'flex';
    }
    buyOnce() {
        if (this.cost == "none") {
            this.percentage += 100 / this.amountCanBuy;
            this.amountBought += 1;
            this.showPercentage();
            this.functionality();
            return true;
        } else {
            if (resources[this.cost].spend()) {
            this.percentage += 100 / this.amountCanBuy;
            this.amountBought += 1;
            this.showPercentage();
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
        this.timeUpgrades = {};
        this.powerUpgrades = {};
        this.index = player.NAMES.indexOf(this.name);
        if (unlocked) {
            this.unlock();
            this.showPercentage();
        } else {
            this.hide();
        }
        this.prev;
        switch (name) {
            case "alpha":
                this.prev = "gamma"
                break
            case "beta":
                this.prev = "alpha"
                break
            case "gamma":
                this.prev = "beta"
                break
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
        let tempTime = this.checkTime();
        if (this.percentage < 100) {
            this.percentage =
                this.percentage + (updateTime * 100) / tempTime;
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
    checkTime() {
        // basically checks for each type of time upgrade - time and unspent
        let timeUpgradeFactor = 1;
        let unspentUpgradeFactor = 1;
        for (item in this.timeUpgrades) {
            let obj = this.timeUpgrades[item];
            if (obj.unspent) {
                unspentUpgradeFactor *= obj.factor;
            } else {
                timeUpgradeFactor *= obj.factor;
            }
        }
        if (this.checkPrevUnspent()) {
            unspentUpgradeFactor = 1;
        }
        return this.time / (timeUpgradeFactor * unspentUpgradeFactor);
    }
    powerSpend() {
        if (this.spend()) {
            let powerUpgradeFactor = 1;
            let unspentUpgradeFactor = 1;
            for (item in this.powerUpgrades) {
                let obj = this.timeUpgrades[item];
                if (obj.unspent) {
                    unspentUpgradeFactor *= obj.factor;
                } else {
                    powerUpgradeFactor *= obj.factor;
                }
            }
            if (this.checkPrevUnspent()) {
                unspentUpgradeFactor = 1;
            }
            return powerUpgradeFactor * unspentUpgradeFactor;
        } else {
            return false
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
    checkPrevUnspent() {
        return resources[this.prev].point;
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
        case "Unreality":
            showID("tabUnreality");
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
    //cheating();
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
    let div = document.querySelector("#descText");
    let title = document.createElement("h2");
    div.innerHTML = "";
    let progBarDiv = document.querySelector(`#descProgressBar`);
    if (!tabs.includes(id)) {
        let effect = document.createElement("p");
        let cost = document.createElement("p");
        let lore = document.createElement("h4");
        if (!tabs.includes(id)) {
            let txt = upgrades[id].text;
            title.innerHTML = txt.title
            effect.innerHTML = txt.effect;
            cost.innerHTML = txt.costDesc;
            lore.innerHTML = txt.lore;
        }
        div.appendChild(title);
        div.appendChild(effect);
        div.appendChild(cost);
        div.appendChild(lore);
        if (upgrades[id].amountCanBuy >= 2) {
            if (progBarDiv.classList.contains("hidden")) {
                progBarDiv.classList.remove("hidden")
                upgrades[id].showPercentage()
            }
        } else {
            if (!progBarDiv.classList.contains("hidden")) {
                progBarDiv.classList.add("hidden")
            }
        }
    } else {
        if (!progBarDiv.classList.contains("hidden")) {
            progBarDiv.classList.add("hidden")
        }
    }
}

function loadBought() {
    for (item in player.upgrades) {
        if (item.amountBought >= 1) item.functionality();
    }
}