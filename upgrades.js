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
            showID("gammaTimeGroup")
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
            player.favourability['gamma']--;
            showID("alphaBetaSkills");
            hideID("gammaPowerUpgrade");
        },
        text: {
            title: "&alpha;&beta; skills upgrade",
            effect: "expand the skills tree",
            costDesc: "restart &alpha;&beta;",
            lore: "the beta slide the alphas a deal. work with us, expand, and make yourself stronger. enough said. though the gamma will not be happy."
        },
        tab: "upgrade",
    },
    gammaPowerUpgrade: {
        id: "gammaPowerUpgrade",
        cost: "alphaGamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']++;
            player.favourability['gamma']++;
            let factor = 1.5 * this.amountBought + 1;
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': false };
            hideID("alphaBetaSkillsUpgrade");
            showID("gammaUpgradeGroup");
            showID("gammaUpgradesUpgradeGroup");
        },
        text: {
            title: "&gamma; power upgrade",
            effect: "increase the power of &gamma; sacrifice, unlock a gamma group upgrade",
            costDesc: "restart &alpha;&gamma;",
            lore: "we welcome gamma to alpha lands, we shake hands. alphas believe in strength in numbers, the gammas believe in strength. this is the start of a mutually beneficial relationship."
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
    betaGammaTimeGroup: {
        id: "betaGammaTimeGroup",
        cost: "betaGamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']--;
            player.favourability['beta']++;
            player.favourability['gamma']++;
            let factor1 = 1 - 0.75 * this.amountBought;
            let factor2 = this.amountBought + 1;
            let factor3 = 0.5 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
            hideID("alphaGammaTimeGroup")
        },
        text: {
            title: "&beta;&gamma; time group",
            effect: "reduce the amount of time for &beta; and &gamma; to fill, increase it for &alpha;",
            costDesc: "restart &beta;&gamma;",
            lore: "by starting the beta gamma time division, the alpha division will have to be 'cut', as they say. this may lead to some small delays. the gamma group apologises. not profusely, but slightly."
        },
        tab: "group",
    },
    alphaGammaTimeGroup: {
        id: "alphaGammaTimeGroup",
        cost: "alphaGamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']++;
            player.favourability['beta']--;
            player.favourability['gamma']++;
            let factor1 = 0.5 * this.amountBought + 1;
            let factor2 = 1 - 0.5 * this.amountBought;
            let factor3 = 0.3 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
            hideID("betaGammaTimeGroup")
        },
        text: {
            title: "&alpha;&gamma; time group",
            effect: "&alpha; and &gamma; generators fill faster, but &beta; fills slower",
            costDesc: "restart &alpha;&gamma;",
            lore: "the alpha gamma time division focus on logging, mining, and crowd control situations. the beta division will be streamlined."
        },
        tab: "group",
    },
    betaTimeUnspentGroup: {
        id: "betaTimeUnspentGroup",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']--;
            player.favourability['beta']--;
            player.favourability['gamma']++;
            let factor1 = 1 - 0.8 * this.amountBought;
            let factor2 = 0.3 * this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': true };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': true };
        },
        text: {
            title: "unspent &beta; time group",
            effect: "when &alpha;/&beta; is full, increase/reduce the time it takes for &beta;/&gamma; to fill",
            costDesc: "restart &gamma;",
            lore: "if the alphas and betas have finished their work, we can send them on their way. the gammas work more efficiently anyways."
        },
        tab: "group",
    },
    gammaTimeGroup: {
        id: "gammaTimeGroup",
        cost: "gamma",
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            player.favourability['alpha']--;
            player.favourability['beta']--;
            player.favourability['gamma']++;
            let factor1 = 1 - 0.8 * this.amountBought;
            let factor2 = 1 - 0.7 * this.amountBought;
            let factor3 = 0.7 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
        },
        text: {
            title: "&gamma; time group",
            effect: "decrease/decrease/increase the rate at which &alpha;/&beta;/&gamma; fills",
            costDesc: "restart &alpha;&gamma;",
            lore: "the alpha gamma time division focus on logging, mining, and crowd control situations. the beta division will be streamlined."
        },
        tab: "group",
    },
};