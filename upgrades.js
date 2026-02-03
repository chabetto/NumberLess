const OGUPGRADES = {
    alphaUnlock: {
        id: "alphaUnlock",
        cost: ["none"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("alpha");
            player.UNLOCKED[0] = true;
            resources['alpha'].unlocked = true;
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
        cost: ["alpha"],
        favourability: { 'beta': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("beta")
            player.UNLOCKED[1] = true;
            resources['beta'].unlocked = true;
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
        cost: ["beta"],
        favourability: { 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("gamma")
            player.UNLOCKED[2] = true;
            resources['gamma'].unlocked = true;
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
        cost: ["alpha"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
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
        cost: ["alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonUpgrades");
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
        cost: ["beta"],
        favourability: { 'beta': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonSkills");
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
        cost: ["beta"],
        favourability: { 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonGroup");
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
        cost: ["gamma"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonUnreality");
            showClass("power");
            showID("helpfulTree")
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
        cost: ["alpha"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("togBut");
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
        cost: ["alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
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
        cost: ["beta"],
        favourability: { 'alpha': 1, 'beta': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 2 * this.amountBought + 1;
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
        cost: ["gamma"],
        favourability: { 'alpha': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
            showID("gammaTimeGroup");
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
        cost: ["gamma"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
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
        cost: ["alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
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
        cost: ["alphaGamma"],
        favourability: { 'alpha': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToReset = ["alphaPowerUpgrade", "betaTime2Upgrade", "gammaTimeUpgrade", "betaTimeUpgrade", "alphaTimeUpgrade"];
            for (i in upgToReset) {
                upgID = upgToReset[i];
                upgrades[upgID].amountCanBuy++;
                resetUpgrade(upgID);
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
    alphaBetaExpansionUpgrade: {
        id: "alphaBetaExpansionUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("alphaBetaSkills");
            showID("alphaBetaUpgrades")
            hideID("gammaPowerUpgrade");
        },
        text: {
            title: "&alpha;&beta; expansion upgrade",
            effect: "expand upgrades and skills",
            costDesc: "restart &alpha;&beta;",
            lore: "the beta slide the alphas a deal. work with us, expand, and make yourself stronger. enough said. though the gamma will not be happy."
        },
        tab: "upgrade",
    },
    gammaPowerUpgrade: {
        id: "gammaPowerUpgrade",
        cost: ["alphaGamma"],
        favourability: { 'alpha': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
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
    alphaBetaMutualUpgrade: {
        id: "alphaBetaMutualUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1 / 3, 'beta': 1 / 3, 'gamma': -1 / 3 },
        amountBought: 0,
        amountCanBuy: 3,
        functionality: function () {
            if (this.amountBought == this.amountCanBuy) {
                resources.alpha.prev = "beta";
            }
        },
        text: {
            title: "&alpha;-&beta; mutual upgrade",
            effect: "if &beta; is unspent, boost &alpha; sacrifice power",
            costDesc: "restart &alpha;&beta; (needs a couple restarts)",
            lore: "the gammas have officially closed down the alpha wing, a huge sigh of relief. now the alphas can use the betas help for their own mining operation. obviously after they finish whatever business they have."
        },
        tab: "upgrade",
    },
    gammaDespansionUpgrade: {
        id: "gammaDespansionUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            hideID("betaGamma");
            showID("alphaBetaMutualUpgrade");
            showID("alphaBetaUpgradeUpgrade");
            hideID("betaSacBetaGamma");
            hideID("gammaSacBetaGamma");
            let factorA = 0.5 * this.amountBought + 1;
            let factorB = this.amountBought + 1;
            let factorC = 1 - 0.2 * this.amountBought;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factorA, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factorB, 'unspent': false };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factorC, 'unspent': false };
        },
        text: {
            title: "&gamma; despansion upgrade",
            effect: "boost &alpha; power and reduce &beta; time slightly<br>increase &gamma; time and remove the &beta;&gamma; sac buttons",
            costDesc: "restart &alpha;&beta;",
            lore: "a floor of the gamma building has completely closed. the alphas may have mined too close meaning they need to scale down operation. motivation for alphas and betas increase. gammas give up their relations with the alphas."
        },
        tab: "upgrade",
    },
    alphaBetaUpgradeUpgrade: {
        id: "alphaBetaUpgradeUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1 / 2, 'beta': -1 / 2, 'gamma': -1 / 2 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
            if (this.amountBought == this.amountCanBuy) {
                let toReset = ["betaTimeUpgrade", "betaTime2Upgrade"]
                for (i in toReset) {
                    upgID = toReset[i];
                    resetUpgrade(upgID);
                };
                let toInc = ["gammaDespansionUpgrade", "alphaPowerUpgrade", "alphaTimeUpgrade"]
                for (i in toInc) {
                    upgID = toInc[i];
                    upgrades[upgID].amountCanBuy++;
                    resetUpgrade(upgID);
                };
            }
        },
        text: {
            title: "&alpha;&beta; upgrade upgrade",
            effect: "restart certain upgrades<br>increase the number you can buy of certain upgrades",
            costDesc: "restart &alpha;&beta;",
            lore: "i think the alphas are serious about mining to the centre of the earth, the beta are concerned. theyre going right under the gamma building... this might not be good."
        },
        tab: "upgrade",
    },
    alphaUnspentSkill: {
        id: "alphaUnspentSkill",
        cost: ["alpha"],
        favourability: { 'alpha': 0.2, 'beta': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.2 * this.amountBought + 1;
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
        cost: ["beta"],
        favourability: { 'beta': 0.2, 'gamma': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.15 * this.amountBought + 1;
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
        cost: ["beta"],
        favourability: { 'beta': 0.2, 'gamma': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.1 * this.amountBought + 1;
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
        cost: ["gamma"],
        favourability: { 'beta': 0.5, 'gamma': 0.5 },
        amountBought: 0,
        amountCanBuy: 4,
        functionality: function () {
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
        cost: ["alphaBeta"],
        favourability: { 'alpha': 0.25, 'beta': 0.5 },
        amountBought: 0,
        amountCanBuy: 8,
        functionality: function () {
            let factor1 = 0.1 * this.amountBought + 1;
            let factor2 = 0.3 * this.amountBought + 1;
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
        cost: ["alphaBeta"],
        favourability: { 'alpha': 0.25, 'beta': 0.5 },
        amountBought: 0,
        amountCanBuy: 8,
        functionality: function () {
            let factor1 = 0.3 * this.amountBought + 1;
            let factor2 = 0.1 * this.amountBought + 1;
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
        cost: ["alphaBeta"],
        favourability: { 'alpha': 0.2, 'beta': 0.6 },
        amountBought: 0,
        amountCanBuy: 5,
        functionality: function () {
            let factor = 0.25 * this.amountBought + 1;
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
        cost: ["betaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.25 * this.amountBought;
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
            lore: "by starting the beta gamma time division, the alpha division can be 'cut', as they say (this is done by the newly formed division). this may lead to some small delays. the gamma group apologises. not profusely, but slightly."
        },
        tab: "group",
    },
    alphaGammaTimeGroup: {
        id: "alphaGammaTimeGroup",
        cost: ["alphaGamma"],
        favourability: { 'alpha': 1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
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
        cost: ["beta"],
        favourability: { 'alpha': -1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.2 * this.amountBought;
            let factor2 = 0.3 * this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': true };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': true };
        },
        text: {
            title: "unspent &beta; time group",
            effect: "when &alpha; is full, increase the time it takes for &beta; to fill<br>when &beta; is full, decrease the time for &gamma;",
            costDesc: "restart &beta;",
            lore: "if the alphas and betas have finished their work, we can send them on their way. the gammas work more efficiently anyways."
        },
        tab: "group",
    },
    gammaTimeGroup: {
        id: "gammaTimeGroup",
        cost: ["gamma"],
        favourability: { 'alpha': -1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.2 * this.amountBought;
            let factor2 = 1 - 0.3 * this.amountBought;
            let factor3 = 0.7 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
        },
        text: {
            title: "&gamma; time group",
            effect: "decrease the rate at which &alpha; and &beta; fills<br>increase it for &gamma;",
            costDesc: "restart &gamma;",
            lore: "the &gamma;-group has hired consultants to tell them what they already want them to do: cut the fat off the alpha and beta division."
        },
        tab: "group",
    },
    betaGammaPowerGroup: {
        id: "betaGammaPowerGroup",
        cost: ["betaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.3 * this.amountBought;
            let factor2 = 0.5 * this.amountBought + 1;
            let factor3 = this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
            hideID("alphaGammaPowerGroup")
        },
        text: {
            title: "&beta;&gamma; power group",
            effect: "increase the sacrificial power of &beta; and &gamma;, reduce it for &alpha;",
            costDesc: "restart &beta;&gamma;",
            lore: "the &gamma;-group are scaling back the alpha protocol, seems like logging operations will move abroad. the betas will work on acquiring fresh talent, preferably the free kind."
        },
        tab: "group",
    },
    alphaGammaPowerGroup: {
        id: "alphaGammaPowerGroup",
        cost: ["alphaGamma"],
        favourability: { 'alpha': 1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = this.amountBought + 1;
            let factor2 = 1 - 0.3 * this.amountBought;
            let factor3 = 0.5 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
            hideID("betaGammaPowerGroup")
        },
        text: {
            title: "&alpha;&gamma; power group",
            effect: "&alpha; and &gamma; fill infusions quicker, but &beta; fills them less",
            costDesc: "restart &alpha;&gamma;",
            lore: "as the &gamma;-group employ more alphas, they expand into diplomacy, mostly by strongarming. note: the &gamma;-group does not endorse violence."
        },
        tab: "group",
    },
    betaPowerUnspentGroup: {
        id: "betaPowerUnspentGroup",
        cost: ["beta"],
        favourability: { 'alpha': -1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.2 * this.amountBought;
            let factor2 = 0.5 * this.amountBought + 1;
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': true };
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': true };
        },
        text: {
            title: "unspent &beta; power group",
            effect: "when &alpha; is full, &beta; sacrifice becomes less powerful<br>when &beta; is done, &gamma; fills up the infusion bar more",
            costDesc: "restart &beta;",
            lore: "the gamma have researched new blood leaching technologies that only work on consecutive generators. luckily it can be negatively configured."
        },
        tab: "group",
    },
    gammaPowerGroup: {
        id: "gammaPowerGroup",
        cost: ["gamma"],
        favourability: { 'alpha': -1, 'beta': -1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor1 = 1 - 0.3 * this.amountBought;
            let factor2 = 1 - 0.2 * this.amountBought;
            let factor3 = 0.7 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': false };
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': false };
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor3, 'unspent': false };
        },
        text: {
            title: "&gamma; power group",
            effect: "decrease the sacrifice power of &alpha; and &beta;<br>increase the power of &gamma;",
            costDesc: "restart &gamma;",
            lore: "the &gamma;eo says we need to build a new floor. the cheaper alternative is to kick out the alphas and betas on the floor below."
        },
        tab: "group",
    },
};