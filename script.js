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
    alphaUnlock: {
        id: "alphaUnlock",
        cost: "none",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("alpha");
            player.UNLOCKED[0] = true;
            resources['alpha'].unlocked = true;
            player.favourability['alpha']++;
        },
        text: {
            title: "unlock &alpha;",
            effect: "unlock the generators tab and the &alpha; generator, unlock more buttons in the tree",
            costDesc: "free ;)",
            lore: "start the game..."
        },
        tab: "tree",
    },
    betaUnlock: {
        id: "betaUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("beta")
            player.UNLOCKED[1] = true;
            resources['beta'].unlocked = true;
            player.favourability['beta']++;
            player.choices['buy beta first'] = Boolean(upgrades['upgradesUnlock'].amountBought == 0);
        },
        text: {
            title: "unlock &beta;",
            effect: "unlock the &beta; generator, and more buttons in the tree",
            costDesc: "restart &alpha;",
            lore: "meet the betas. funny, short little fellows. always seem to be behind you. misjudged, sometimes misguided."
        },
        tab: "tree",
    },
    gammaUnlock: {
        id: "gammaUnlock",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("gamma")
            player.UNLOCKED[2] = true;
            resources['gamma'].unlocked = true;
            player.favourability['gamma']++;
            player.choices['buy gamma first'] = Boolean(upgrades['skillsUnlock'].amountBought == 0);
        },
        text: {
            title: "unlock &gamma;",
            effect: "unlock the &gamma; generator, unlock a button in the tree",
            costDesc: "restart &beta;",
            lore: "supposedly the last we are going to meet."
        },
        tab: "tree",
    },
    isDoneUnlock: {
        id: "isDoneUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("isDone");
            let isDone = document.querySelector(`#isDone`);
            isDone.style.display = "flex";
        },
        text: {
            title: "is done?",
            effect: "unlock a bar below the tab buttons that show if any generators are full",
            costDesc: "restart &alpha;",
            lore: "makes it easier to know when the generators are done. hopefully the quality of life will improve the further we go on."
        },
        tab: "tree",
    },
    upgradesUnlock: {
        id: "upgradesUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonUpgrades");
            player.favourability['alpha']++;
            player.choices['buy upgrades first'] = Boolean(resources['beta'].unlocked == false);
        },
        text: {
            title: "upgrade tab",
            effect: "unlock the upgrade tab, and various upgrades depending on how many generators are unlocked",
            costDesc: "restart &alpha;",
            lore: "we can discuss with the alphas on their turf. upgrades are powerful and reliable."
        },
        tab: "tree",
    },
    skillsUnlock: {
        id: "skillsUnlock",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonSkills");
            player.favourability['beta']++;
            player.choices['buy skills first'] = Boolean(resources['gamma'].unlocked == false);
        },
        text: {
            title: "skills tab",
            effect: "unlock the skills tab, and various skills depending on how many generators are unlocked",
            costDesc: "restart &beta;",
            lore: "we can talk to the betas there. skills are weak but expansive."
        },
        tab: "tree",
    },
    groupUnlock: {
        id: "groupUnlock",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonGroup");
            player.favourability['gamma']++;
        },
        text: {
            title: "&gamma;-group tab",
            effect: "unlock the &gamma;-group tab",
            costDesc: "restart &beta;",
            lore: "we can have a meeting with the gammas here. the &gamma;-group offer insanely strong boosts for a price."
        },
        tab: "tree",
    },
    unrealityUnlock: {
        id: "unrealityUnlock",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonUnreality");
            showClass("power");
            showID("helpfulTree")
            player.favourability['alpha']++;
            player.favourability['beta']++;
            player.favourability['gamma']++;
        },
        text: {
            title: "unreality tab",
            effect: "unlock the unreality tab and many upgrades",
            costDesc: "restart &gamma;",
            lore: "unlock the ability to combine different generators. this opens up more of reality i guess."
        },
        tab: "tree",
    },
    untoggleUnlock: {
        id: "untoggleUnlock",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("togBut");
            player.favourability['alpha']++;
            player.favourability['beta']++;
            player.favourability['gamma']++;
        },
        text: {
            title: "untoggle buttons",
            effect: "unlock a couple of buttons to untoggle sacrificing in unreality",
            costDesc: "restart &alpha;",
            lore: "if you want something in reality, unreality has to stop."
        },
        tab: "tree",
    },
    alphaTimeUpgrade: {
        id: "alphaTimeUpgrade",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function (ps = false) {
            if (!ps) {
                player.favourability['alpha']++;
            }
            let factor = this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&alpha; time upgrade",
            effect: "reduce the time it takes for the &alpha; generator to fill",
            costDesc: "restart &alpha;",
            lore: "it is simple, but effective. much like the alphas."
        },
        tab: "upgrade",
    },
    betaTimeUpgrade: {
        id: "betaTimeUpgrade",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function (ps = false) {
            showID("betaTime2Upgrade");
            if (!ps) {
                player.favourability['alpha']++;
                player.favourability['beta']++;
            }
            let factor = 3 * this.amountBought;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&beta; time upgrade",
            effect: "greatly reduce the time it takes for the &beta; generator to fill",
            costDesc: "restart &beta;",
            lore: "spend itselfs to boost itself, a good deal."
        },
        tab: "upgrade",
    },
    gammaTimeUpgrade: {
        id: "gammaTimeUpgrade",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function (ps = false) {
            if (!ps) {
                player.favourability['alpha']++;
                player.favourability['gamma']++;
            }
            let factor = 0.5 * this.amountBought + 1;
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&gamma; time upgrade",
            effect: "slightly reduce the time it takes for the &gamma; generator to fill",
            costDesc: "restart &gamma;",
            lore: "a deal almost too good to be true, the gamma stay sceptical."
        },
        tab: "upgrade",
    },
    betaTime2Upgrade: {
        id: "betaTime2Upgrade",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function (ps = false) {
            if (!ps) {
                player.favourability['alpha']++;
                player.favourability['beta']++;
                player.favourability['gamma']++;
            }
            let factor = this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&beta; time (time) upgrade",
            effect: "reduce the time it takes for the &beta; generator to fill (again)",
            costDesc: "restart &gamma;",
            lore: "did we just do this? i am sure. the beta are sure also."
        },
        tab: "upgrade",
    },
    alphaPowerUpgrade: {
        id: "alphaPowerUpgrade",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function (ps = false) {
            if (!ps) {
                player.favourability['alpha']++;
            }
            let factor = this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&alpha; power upgrade",
            effect: "increase the power of &alpha; sacrifice",
            costDesc: "restart &alpha;",
            lore: "and it starts, the alphas will ascend. strength in numbers(?)."
        },
        tab: "upgrade",
    },
    upgradeUpgrade: {
        id: "upgradeUpgrade",
        cost: "alphaGamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']++;
            player.favourability['gamma']++;
            let upgToReset = ["alphaPowerUpgrade", "betaTime2Upgrade", "gammaTimeUpgrade", "betaTimeUpgrade", "alphaTimeUpgrade"];
            for (i in upgToReset) {
                upgID = upgToReset[i];
                upgrades[upgID].amountBought = 0;
                upgrades[upgID].functionality(true);
                upgrades[upgID].amountCanBuy++;
                upgrades[upgID].percentage = 0;
                addButtonClick(upgID);
            }
        },
        text: {
            title: "upgrade upgrade",
            effect: "you can buy another level of every upgrade above",
            costDesc: "restart &alpha;&gamma; and every upgrade above",
            lore: "with some gamma backing we can expand the upgrades, but the gammas never give anything for free"
        },
        tab: "upgrade",
    },
    alphaBetaSkillsUpgrade: {
        id: "alphaBetaSkillsUpgrade",
        cost: "alphaBeta",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']++;
            player.favourability['beta']++;
            showID("alphaBetaSkills");
        },
        text: {
            title: "&alpha;&beta; skills upgrade",
            effect: "expand the skills tree",
            costDesc: "restart &alpha;&beta;",
            lore: "the beta slide the alphas a deal. work with us, expand, and make yourself stronger. enough said."
        },
        tab: "upgrade",
    },
    alphaUnspentSkill: {
        id: "alphaUnspentSkill",
        cost: "alpha",
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            player.favourability['alpha'] += 0.2;
            player.favourability['beta'] += 0.2;
            let factor = 0.15 * this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': true };
        },
        text: {
            title: "&alpha; unspent skill",
            effect: "decrease the time of &beta; if &alpha; is unspent",
            costDesc: "restart &alpha;",
            lore: "the alphas help the betas. respect."
        },
        tab: "skills",
    },
    betaUnspentTimeSkill: {
        id: "betaUnspentTimeSkill",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            player.favourability['beta'] += 0.2;
            player.favourability['gamma'] += 0.2;
            let factor = 0.1 * this.amountBought + 1;
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': true };
        },
        text: {
            title: "&beta; unspent time skill",
            effect: "if &beta; is unspent, decrease the time needed to fill &gamma;",
            costDesc: "restart &beta;",
            lore: "this is surely a start of a blossoming relation between the betas and the &gamma;-group."
        },
        tab: "skills",
    },
    betaUnspentPowerSkill: {
        id: "betaUnspentPowerSkill",
        cost: "beta",
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            player.favourability['beta'] += 0.2;
            player.favourability['gamma'] += 0.2;
            let factor = 0.05 * this.amountBought + 1;
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': true };
        },
        text: {
            title: "&beta; unspent power skill",
            effect: "if &beta; is unspent, increase the power of &gamma; sacrifice",
            costDesc: "restart &beta;",
            lore: "makes sense, the betas can feed the gammas. more nutritious."
        },
        tab: "skills",
    },
    gammaUnspentSkill: {
        id: "gammaUnspentSkill",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 4,
        functionality: function () {
            player.favourability['beta'] += 0.5;
            player.favourability['gamma'] += 0.5;
            let factor = 0.5 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': true };
        },
        text: {
            title: "&gamma; unspent power skill",
            effect: "&alpha; sacrifice is more powerful if &gamma; is done",
            costDesc: "restart &gamma;",
            lore: "the gammas can back the alphas. this is just a small taste of their power."
        },
        tab: "skills",
    },
    alphaBetaTimeSkill: {
        id: "alphaBetaTimeSkill",
        cost: "alphaBeta",
        amountBought: 0,
        amountCanBuy: 8,
        functionality: function () {
            player.favourability['alpha'] += 0.25;
            player.favourability['beta'] += 0.5;
            let factor1 = 0.05 * this.amountBought + 1;
            let factor2 = 0.25 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
        },
        text: {
            title: "&alpha;&beta; time skill",
            effect: "&alpha; and &beta; fill up quicker",
            costDesc: "restart &alpha;&beta;",
            lore: "they can work together, alphas pushing the betas to work faster, whilst the betas stand behind the alphas, protected."
        },
        tab: "skills",
    },
    alphaBetaPowerSkill: {
        id: "alphaBetaPowerSkill",
        cost: "alphaBeta",
        amountBought: 0,
        amountCanBuy: 8,
        functionality: function () {
            player.favourability['alpha'] += 0.25;
            player.favourability['beta'] += 0.5;
            let factor1 = 0.25 * this.amountBought + 1;
            let factor2 = 0.05 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
        },
        text: {
            title: "&alpha;&beta; power skill",
            effect: "&alpha; and &beta; fill up their infusions quicker",
            costDesc: "restart &alpha;&beta;",
            lore: "the alphas can understand how the betas work together to become stronger. the betas can use the alphas to become stronger."
        },
        tab: "skills",
    },
    alphaUnspent2Skill: {
        id: "alphaUnspent2Skill",
        cost: "alphaBeta",
        amountBought: 0,
        amountCanBuy: 5,
        functionality: function () {
            player.favourability['alpha'] += 0.2;
            player.favourability['beta'] += 0.6;
            let factor = 0.2 * this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': true };
        },
        text: {
            title: "&alpha;&beta; unspent+ skill",
            effect: "increase the effectiveness of the &alpha; unspent skill",
            costDesc: "restart &alpha;&beta;",
            lore: "back the betas, alphas, and see where they will lead you."
        },
        tab: "skills",
    },
};

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
    sacsNeeded: [100, 100, 100],
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
        let toUpdate = false;
        if (this.cost == "none") {
            toUpdate = true;
        } else {
            if (player.NAMES.includes(this.cost)) {
                if (resources[this.cost].spend()) {
                    toUpdate = true;
                }
            } else if (player.INFUSIONS.includes(this.cost)) {
                if (infusions[this.cost].spend()) {
                    toUpdate = true;
                }
            }
        }
        if (toUpdate) {
            this.updatePercentage();
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
    const tabs = ["buttonTree", "buttonGenerators", "buttonUpgrades", "buttonSkills", "buttonGroup", "buttonUnreality", "alphaSacAlphaBeta", "betaSacAlphaBeta", "alphaSacAlphaGamma", "gammaSacAlphaGamma", "betaSacBetaGamma", "gammaSacBetaGamma", "alphaToggle", "betaToggle", "gammaToggle", "allToggle"]
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
    for (item in player.upgrades) {
        if (item.amountBought >= 1) item.functionality();
    }
}

window.onload = function () {
    //loadPlayer();
    fromStart();
    cheating();
    createResources();
    createUpgrade();
    addButtonListeners();
    addButtonHover();
    startTime();
    startSaves();
    player.UNLOCKED[0] == true ? showTab("buttonGenerators") : showTab("buttonTree");
    //loadBought();
};