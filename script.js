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
        "alphaAlpha",
        "alphaAlphaAlpha",
        "alphaAlphaAlphaAlpha"
    ],
    INFUSIONS: [
        "alphaBeta",
        "alphaGamma",
        "betaGamma",
    ],
    TIMES: [20, 60, 200, 20000, 3000000, 100000000],
    infusionsSpent: [0, 0, 0],
    POWERS: [2, 1, 10, 10],
    percentage: [0, 0, 0, 0, 0, 0],
    sacsDone: [0, 0, 0],
    UNLOCKED: [false, false, false, false, false],
    infusionUnlocked: [false, false, false],
    upgrades: {},
    update: 0.05,
    stopTime: false,
    favourability: { 'alpha': 0, 'beta': 0, 'gamma': 0 },
    choices: {},
    boostButtonCurrent: false,
};

// save
let player = {};

class generalUpgrade {
    constructor(id, cost, favourability, amountBought, amountCanBuy, functionality, text, tab, upgradesToUnlock) {
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
        this.unlocked = false;
        this.firstTimeBought = false;
        this.tab = tab;
        this.upgradesToUnlock = upgradesToUnlock;
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
            if (this.firstTimeBought == false) { 
                this.firstTimeBought = true;
                if (this.upgradesToUnlock.length !== 0) this.unlockUpgrades();
            }
            this.updatePercentage();
            this.updateFavourability();
            return true;
        } else {
            return false
        }
    }
    unlock() {
        this.unlocked = true;
        showID(this.id);
    }
    lock() {
        this.unlocked = false;
        hideID(this.id);
    }
    unlockUpgrades() {
        for (i in this.upgradesToUnlock) {
            let toUnlock = this.upgradesToUnlock[i];
            if (toUnlock) upgrades[i].unlock();
            else upgrades[i].lock();
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
            let togBut = document.querySelector(`#${res}SacToggle`)
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
    constructor(name, timesSpent, sacsDone, unlocked) {
        this.name = name;
        this.isdone = document.querySelector(`#${name}IsDone`);
        this.bar = document.querySelector(`#${name}Bar`);
        this.timesSpent = timesSpent;
        this.sacsNeeded;
        this.calcSacsNeeded();
        this.sacsDone = sacsDone;
        if (unlocked) {
            this.unlock();
            this.showPercentage();
        } else {
            this.hide();
        }
        this.index = player.INFUSIONS.indexOf(this.name);
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
        this.sacsNeededUpgrades = [];
    }
    calculatePercentage(){
        this.percentage = (100 * (this.sacsDone / this.sacsNeeded));
        if (this.percentage >= 100) {
            this.sacsDone = this.sacsNeeded;
            this.percentage = 100;
            this.point = true;
        }
    }
    calcSacsNeeded() {
        this.sacsNeeded = Math.round(30 + 5 * (this.timesSpent + this.timesSpent ** 0.8));
        let toReduce = 0;
        for (i in this.sacsNeededUpgrades) {
            let name = this.sacsNeededUpgrades[i];
            toReduce += upgrades[name].functionality(this.timesSpent);
        }
        this.sacsNeeded -= toReduce;
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
        this.calculatePercentage();
        this.bar.style.width = `${this.percentage}%`
        player.sacsDone[this.index] = this.sacsDone;
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
            this.sacsDone += pwr;
            this.showPercentage();
        }
    }
    spend() {
        if (this.point) {
            this.reset();
            this.timesSpent++;
            player.infusionsSpent[this.index] = this.timesSpent;
            this.calcSacsNeeded();
            return true;
        } else {
            return false;
        }
    }
    reset() {
        this.point = false;
        this.sacsDone = 0;
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
            // acc i decided against it as waiting times arent that long
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
            if (!obj.unspent) {
                timeUpgradeFactor *= obj.factor;
            } else if (this.checkUnspent(obj.unspent)) {
                unspentUpgradeFactor *= obj.factor;
            }
        }
        return this.time / (timeUpgradeFactor * unspentUpgradeFactor);
    }
    powerSpend() {
        if (!this.spend()) return false;

        let powerUpgradeFactor = this.power;
        let unspentUpgradeFactor = 1;
        
        for (item in this.powerUpgrades) {
            let obj = this.powerUpgrades[item];
            if (!obj.unspent) {
                powerUpgradeFactor *= obj.factor;
            } else if (this.checkUnspent(obj.unspent)) {
                unspentUpgradeFactor *= obj.factor;
            }
        }
        return powerUpgradeFactor * unspentUpgradeFactor;
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
    checkUnspent(resToCheck) {
        if (player.NAMES.includes(resToCheck)) return resources[resToCheck].point;
        return infusions[resToCheck].point;
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
            player.infusionsSpent[i],
            player.sacsDone[i],
            player.infusionUnlocked[i]
        )
        infusions[player.INFUSIONS[i]].showPercentage();
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
            oldInfo.text,
            oldInfo.tab,
            oldInfo.upgradesToUnlock
        );
        if (info !== undefined) {
            upgrades[id].amountBought = info[0];
            upgrades[id].amountCanBuy = info[1];
            upgrades[id].unlocked = info[2];
            upgrades[id].firstTimeBought = info[3];
        }
        if (!upgrades[id].unlocked) hideID(id);
    });
    upgrades["alphaUnlock"].unlock();
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
    player.TIMES = [0.1, 0.1, 0.1, 200, 1, 1, 1];
}

function fromStart() {
    player = ogPlayer;
    upgrades = OGUPGRADES;
}

function saving() {
    for (item in upgrades) {
        player.upgrades[item] = [upgrades[item].amountBought, upgrades[item].amountCanBuy, upgrades[item].unlocked, upgrades[item].firstTimeBought]
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

function untoggleButton(id) {
    let button = document.querySelector(`#${id}`);
    button.classList.remove("toggle")
}

function toggleButton(id) {
    let button = document.querySelector(`#${id}`);
    button.classList.add("toggle")
}

function untoggleButtons(CL) {
    let buttonList = document.querySelectorAll(`.${CL}`);
    buttonList.forEach((button) => {
        untoggleButton(button.id);
    });
}

function toggleSac(id) {
    for (i in player.NAMES) {
        let res = player.NAMES[i];
        if (id.includes(res)) {
            for (j in SACBUTTONS[res]) {
                untoggleButton(SACBUTTONS[res][j]);
            }
        }
    }
}

function alphaAlphaSac() {
    if (resources["alphaAlpha"].point && (!infusions["alphaBeta"].point || !infusions["alphaGamma"].point)) {
        infusions["alphaBeta"].updatePercentage("alphaAlpha");
        resources["alphaAlpha"].point = true;
        infusions["alphaGamma"].updatePercentage("alphaAlpha");
    }
}

let BOOSTBUTTON = {"positiveTimeFactor": 1.0, "negativeTimeFactor": 1.0, "positivePowerFactor": 1.0, "negativePowerFactor": 1.0};
let BOOSTUPGRADES = {"positiveTimeFactor":{"base":1.2},"negativeTimeFactor":{"base":0.2},"positivePowerFactor":{"base":1.2},"negativePowerFactor":{"base":0.2}};

function calculateBoostFactors() {
    for (let factor in BOOSTBUTTON) {
        let num = 1;
        for (let upg in BOOSTUPGRADES[factor]) {
            num *= BOOSTUPGRADES[factor][upg];
        }
        BOOSTBUTTON[factor] = num;
    }
}

// same is whether we need to update boost amounts without changing which resource is boosted
function toggleBoost(id, same = false) {
    // IMPORTANT - if nothing is boosted then don't boost!
    if (same && !player.boostButtonCurrent) return;
    let toSwitch;
    let old = player.boostButtonCurrent;
    switch (id[0]) { // could use regex to slice up to first capital letter...
        case "a":
            toSwitch = "alpha";
            break;
        case "b":
            toSwitch = "beta";
            break;
        case "g":
            toSwitch = "gamma";
            break;
    }
    let toBoost = (toSwitch != old) || same;
    if (!same) toBoost ? player.boostButtonCurrent = toSwitch : player.boostButtonCurrent = false;
    calculateBoostFactors();
    for (let i = 0; i < 3; i++) {
        let reso = player.NAMES[i];
        let [timeF, powerF] = [1,1];
        if (toBoost) {
            if (reso == toSwitch) {
                timeF = BOOSTBUTTON["positiveTimeFactor"];
                powerF = BOOSTBUTTON["positivePowerFactor"];
            } else {
                timeF = BOOSTBUTTON["negativeTimeFactor"];
                powerF = BOOSTBUTTON["negativePowerFactor"];
            }
        }
        resources[reso].timeUpgrades[reso + "TimeBoost"] = {"factor": timeF, "unspent": false};
        resources[reso].powerUpgrades[reso + "PowerBoost"] = {"factor": powerF, "unspent": false};
    }
    if (toBoost || same) {
        toggleButton(toSwitch + "BoostButton");
        toggleButton(toSwitch + "BoostButtonExtra");
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
        if (id.includes('Sac')) {
            untoggleButton(id);
            toggleSac(id);
        } else if (id.includes("Boost")) {
            untoggleButtons("boost");
            toggleBoost(id);
        }
    } else if (id == "alphaAlphaSacButton") {
        alphaAlphaSac();
    } else {
        upgrades[id].buyOnce();
    };
}

function showTab(id) {
    hideClass("page");
    showID("tab" + id.slice(6))
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

function createCostDescription(costList) {
    if (costList[0] == "none") return "free..."
    let costDescription = []
    let conversion = { alpha: "&alpha;", beta: "&beta;", gamma: "&gamma;", alphaBeta: "&alpha;&beta;", alphaGamma: "&alpha;&gamma;", betaGamma: "&beta;&gamma;", alphaAlpha: "&alpha;&alpha;", alphaAlphaAlpha: "&alpha;&alpha;&alpha;" ,alphaAlphaAlphaAlpha:"&alpha;&alpha;&alpha;&alpha;"}
    for (let i in costList) { // i is a string
        costDescription.push(conversion[costList[i]])
    }
    let costSentence = "restart ";
    for (let i = 0; i < costDescription.length; i++) {
        costSentence += costDescription[i];
        if ((i + 1) != costList.length) {
            costSentence += ", "
        }
    }
    return costSentence;
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
        cost.innerHTML = createCostDescription(upgrades[id].cost);
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
    for (item in upgrades) {
        if (upgrades[item].unlocked) upgrades[item].unlock();
        // all 'upgrade upgrades' need to be skipped
        let toSkip = (item.toLowerCase().includes("upgradeupgrade"))
        if (upgrades[item].firstTimeBought) {
            if (!toSkip) upgrades[item].functionality();
            upgrades[item].showPercentage();
        }
    }
    if (upgrades["alpha4Unlock"].firstTimeBought) upgrades["alpha4Unlock"].functionality(); // go to ending alpha
    if (upgrades["boostButtonSkill"].firstTimeBought && player.boostButtonCurrent != false) toggleBoost(player.boostButtonCurrent, true);
}

function resetUpgrade(id) {
    upgrades[id].amountBought = 0;
    upgrades[id].functionality();
    upgrades[id].percentage = 0;
    addButtonClick(id);
}

function resetUpgradeList(ids, increaseAmount = false) {
    for (i in ids) {
        let upgID = ids[i];
        if (increaseAmount) upgrades[upgID].amountCanBuy++;
        resetUpgrade(upgID);
    }
}

function increaseUpgradeAmount(ids, increaseAmount = 1) {
    for (i in ids) {
        let upgID = ids[i];
        upgrades[upgID].amountCanBuy += increaseAmount;
    }
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