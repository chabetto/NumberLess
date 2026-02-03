/*
some notes:
time upgrades - object {factor: formula, unspent: true/false}
basically - is it an unspent upgrade
*/

const ogPlayer = {
    NAMES: [
        "alpha",
        "beta",
        "gamma",
    ],
    INFUSIONS: [
        "alphaBeta",
        "alphaGamma",
        "betaGamma",
    ],
    TIMES: [20, 60, 200],
    sacsNeeded: [50, 150, 150],
    POWERS: [2, 1, 10],
    percentage: [0, 0, 0],
    infusionPercentage: [0, 0, 0],
    UNLOCKED: [false, false, false],
    infusionUnlocked: [false, false, false],
    upgrades: {},
    update: 0.05,
    stopTime: false,
    favourability: { 'alpha': 0, 'beta': 0, 'gamma': 0 },
    choices: {}
};

// save
let player = {};

class generalUpgrade {
    constructor(id, cost, favourability, amountBought, amountCanBuy, functionality, text) {
        this.id = id;
        this.button = document.querySelector(`#${id}`);
        this.bar = document.querySelector(`#descBar`);
        this.cost = cost;
        this.percentage = (amountBought / amountCanBuy) * 100;
        this.amountBought = amountBought;
        this.amountCanBuy = amountCanBuy;
        this.functionality = functionality;
        this.text = text;
        this.favourability = favourability;
    }
    showPercentage() {
        this.percentage = (this.amountBought / this.amountCanBuy) * 100;
        if (Math.round(this.percentage) >= 100) {
            this.percentage = 100;
            removeButtonClick(this.id)
        }
        this.bar.style.width = `${this.percentage}%`;
        this.bar.style.display = 'flex';
    }
    updateFavourability() {
        for (i in this.favourability) {
            player.favourability[i] += this.favourability[i];
        }
    }
    buyOnce() {
        let toUpdate = true;
        let i = 0;
        while (toUpdate && i < this.cost.length) {
            let item = this.cost[i];
            if (player.NAMES.includes(item)) {
                toUpdate = resources[item].point;
            } else if (player.INFUSIONS.includes(item)) {
                toUpdate = infusions[item].point;
            }
            i++;
        }
        if (toUpdate) {
            for (i in this.cost) {
                item = this.cost[i];
                if (player.NAMES.includes(item)) {
                    resources[item].spend();
                } else if (player.INFUSIONS.includes(item)) {
                    infusions[item].spend();
                }
            }
            this.updatePercentage();
            this.updateFavourability();
            return true;
        } else {
            return false
        }
    }
    updatePercentage() {
        this.percentage += 100 / this.amountCanBuy;
        this.amountBought += 1;
        this.showPercentage();
        this.functionality();
    }
}

let infusions = {};
const SACBUTTONS = {
    "alpha": ["alphaSacAlphaBeta", "alphaSacAlphaGamma"],
    "beta": ["betaSacAlphaBeta", "betaSacBetaGamma"],
    "gamma": ["gammaSacBetaGamma", "gammaSacAlphaGamma"],
}

function switchOnSac(id) {
    for ((res) in SACBUTTONS) {
        if (SACBUTTONS[res].includes(id)) {
            let isOn = false; // is there a current toggle button on for this resource
            for (num in SACBUTTONS[res]) {
                let button = document.querySelector(`#${SACBUTTONS[res][num]}`);
                if ((id == SACBUTTONS[res][num]) && (!button.classList.contains("toggle"))) {
                    button.classList.add('toggle');
                    isOn = true;
                } else {
                    button.classList.remove("toggle");
                }
            }
            let togBut = document.querySelector(`#${res}Toggle`)
            isOn ? togBut.classList.add("toggle") : togBut.classList.remove("toggle");
        }
    }
}

function switchOffAllSac() {
    for (item in SACBUTTONS) {
        for (num in SACBUTTONS[item][num]) {
            let button = document.querySelector(`#${temp}`);
            button.classList.remove("toggle");
        }
    }
}

class infusion {
    constructor(name, time, percentage, unlocked) {
        this.name = name;
        this.isdone = document.querySelector(`#${name}IsDone`);
        this.bar = document.querySelector(`#${name}Bar`);
        this.point = Boolean(percentage === 100);
        this.sacsNeeded = time;
        this.percentage = percentage;
        if (unlocked) {
            this.unlock();
            this.showPercentage();
        } else {
            this.hide();
        }
        this.index = player.NAMES.indexOf(this.name);
        this.resUsed;
        this.buttonsToCheck;
        switch (name) {
            case "alphaBeta":
                this.resUsed = ["alpha", "beta"];
                this.buttonsToCheck = ["alphaSacAlphaBeta", "betaSacAlphaBeta"];
                break
            case "alphaGamma":
                this.resUsed = ["alpha", "gamma"];
                this.buttonsToCheck = ["alphaSacAlphaGamma", "gammaSacAlphaGamma"];
                break
            case "betaGamma":
                this.resUsed = ["beta", "gamma"];
                this.buttonsToCheck = ["betaSacBetaGamma", "gammaSacBetaGamma"];
                break
        }
        this.showPercentage();
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
    updateBar() {
        for (i in this.buttonsToCheck) {
            let button = document.querySelector(`#${this.buttonsToCheck[i]}`)
            if (button.classList.contains("toggle") && this.percentage !== 100) {
                this.updatePercentage(this.resUsed[i]);
            }
        }
        /* idk if i like the fact it does this below: maybe i can add a setting that does this
        
        if (this.percentage === 100) {
            for (i in this.buttonsToCheck) {
                let button = document.querySelector(`#${this.buttonsToCheck[i]}`);
                if (button.classList.contains('toggle')) {
                    button.classList.remove('toggle');
                }
            }
        }*/
    }
    updatePercentage(res) {
        let pwr = resources[res].powerSpend();
        if (pwr !== false) {
            this.percentage += (100 * (pwr / this.sacsNeeded));
            if (this.percentage >= 100) {
                this.percentage = 100;
                this.point = true;
            }
            this.showPercentage();
        }
    }
    spend() {
        if (this.point) {
            this.reset();
            this.sacsNeeded += 10;
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
        if (!this.checkPrevUnspent()) {
            unspentUpgradeFactor = 1;
        }
        return this.time / (timeUpgradeFactor * unspentUpgradeFactor);
    }
    powerSpend() {
        if (this.spend()) {
            let powerUpgradeFactor = this.power;
            let unspentUpgradeFactor = 1;
            for (item in this.powerUpgrades) {
                let obj = this.powerUpgrades[item];
                if (obj.unspent) {
                    unspentUpgradeFactor *= obj.factor;
                } else {
                    powerUpgradeFactor *= obj.factor;
                }
            }
            if (!this.checkPrevUnspent()) {
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
    for (i in player.INFUSIONS) {
        infusions[player.INFUSIONS[i]] = new infusion(
            player.INFUSIONS[i],
            player.sacsNeeded[i],
            player.infusionPercentage[i],
            player.infusionUnlocked[i]
        )
    }
}

let upgrades = {};

function createUpgrade() {
    upgrades = {};
    let buttons = document.querySelectorAll(".upgradable")
    buttons.forEach((button) => {
        let id = button.id;
        let info = player.upgrades[id];
        let oldInfo = OGUPGRADES[id];
        //console.log(id);
        upgrades[id] = new generalUpgrade(
            oldInfo.id,
            oldInfo.cost,
            oldInfo.favourability,
            oldInfo.amountBought,
            oldInfo.amountCanBuy,
            oldInfo.functionality,
            oldInfo.text
        );
        if (info !== undefined) {
            upgrades[id].amountBought = info[0];
            upgrades[id].amountCanBuy = info[1];
        }
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
    div.classList.remove("toggle");
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

function addButtonClick(id) {
    let button = document.querySelector(`#${id}`);
    button.addEventListener("click", buttonFunction);
    button.classList.remove("bought");
}

function addButtonHover() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("mouseover", showDescription);
    });
}

function cheating() {
    player.TIMES = [0.1, 0.1, 0.1, 1, 1, 1];
}

function fromStart() {
    player = ogPlayer;
    upgrades = OGUPGRADES;
}

function saving() {
    for (item in upgrades) {
        player.upgrades[item] = [upgrades[item].amountBought, upgrades[item].amountCanBuy]
    }
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
    if (localStorage.getItem("player") !== null) {
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
    for (item in infusions) {
        infusions[item].updateBar();
    }
}

function untoggleButtons(id) {
    let button = document.querySelector(`#${id}`);
    button.classList.remove("toggle")
    for (i in player.NAMES) {
        let res = player.NAMES[i];
        if (id.includes(res)) {
            for (j in SACBUTTONS[res]) {
                button = document.querySelector(`#${SACBUTTONS[res][j]}`);
                button.classList.remove("toggle")
            }
        }
    }
}

function buttonFunction(e) {
    let id = e.target.id;
    let classes = e.target.classList;
    if (classes.contains("tabButton")) {
        showTab(id)
    } else if (classes.contains("sac")) {
        switchOnSac(id);
    } else if (classes.contains("togBut")) {
        untoggleButtons(id);
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

function addButtonListeners() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        try {
            if (upgrades[button.id].amountBought != upgrades[button.id].amountCanBuy) {
                button.addEventListener("click", buttonFunction);
                button.classList.remove("bought");
            }
        } catch {
            button.addEventListener("click", buttonFunction);
            button.classList.remove("bought");
        }
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
    let cL = e.target.classList;
    // const tabs = ["buttonTree", "buttonGenerators", "buttonUpgrades", "buttonSkills", "buttonGroup", "buttonUnreality", "alphaSacAlphaBeta", "betaSacAlphaBeta", "alphaSacAlphaGamma", "gammaSacAlphaGamma", "betaSacBetaGamma", "gammaSacBetaGamma", "alphaToggle", "betaToggle", "gammaToggle", "allToggle"]
    let div = document.querySelector("#descText");
    let title = document.createElement("h2");
    div.innerHTML = "";
    let progBarDiv = document.querySelector(`#descProgressBar`);
    if (cL.contains("upgradable")) {
        let effect = document.createElement("p");
        let cost = document.createElement("p");
        let lore = document.createElement("h4");
        //if (!tabs.includes(id)) {
        let txt = upgrades[id].text;
        title.innerHTML = txt.title
        effect.innerHTML = txt.effect;
        cost.innerHTML = txt.costDesc;
        lore.innerHTML = txt.lore;
        //}
        div.appendChild(title);
        div.appendChild(effect);
        div.appendChild(cost);
        div.appendChild(lore);
        if (upgrades[id].amountCanBuy >= 2) {
            if (progBarDiv.classList.contains("hidden")) {
                progBarDiv.classList.remove("hidden")
            }
            upgrades[id].showPercentage()
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
    let toSkip = ["upgradeUpgrade", "alphaBetaUpgradeUpgrade"]
    for (item in upgrades) {
        if (upgrades[item].amountBought >= 1) {
            if (!toSkip.includes(upgrades[item].id)) upgrades[item].functionality();
            upgrades[item].showPercentage();
        }
    }
}

function resetUpgrade(id) {
    upgrades[id].amountBought = 0;
    upgrades[id].functionality();
    upgrades[id].percentage = 0;
    addButtonClick(id);
}

window.onload = function () {
    fromStart();
    loadPlayer();
    //cheating();
    createResources();
    createUpgrade();
    addButtonListeners();
    addButtonHover();
    startTime();
    startSaves();
    player.UNLOCKED[0] == true ? showTab("buttonGenerators") : showTab("buttonTree");
    loadBought();
};

function completeReset() {
    localStorage.clear();
    location.reload();
}