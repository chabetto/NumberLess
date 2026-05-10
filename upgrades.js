/*
UPGRADEID: {
        id: "UPGRADEID",
        cost: [],
        favourability: { 'alpha': 0,'beta': 0,'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            // add functionality
        },
        text: {
            title: "to add",
            effect: "to add",
            lore: "to add"
        },
        tab: "to add",
        upgradesToUnlock: {  },
},

NOTES:
cost involves list of resources/infusions to consume for upgrade
upgrades to unlock is dictionary of upgradeid to unlock as key + true/false (true = unlock, flase = lock)
*/

const OGUPGRADES = {
    // THE TREE
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
            showTab("buttonGenerators");
            let div = document.querySelector("#descText");
            div.innerHTML = "";
        },
        text: {
            title: "unlock &alpha;",
            effect: "unlock the generators tab and the &alpha; generator, unlock more buttons in the tree",
            lore: "start the game..."
        },
        tab: "tree",
        upgradesToUnlock: { "isDoneUnlock": true, "betaUnlock": true, "upgradesUnlock": true },
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
            lore: "meet the betas. funny, short little fellows. always seem to be behind you. misjudged, sometimes misguided."
        },
        tab: "tree",
        upgradesToUnlock: { "gammaUnlock": true, "skillsUnlock": true, "betaTimeUpgrade": true },
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
            lore: "supposedly the last we are going to meet."
        },
        tab: "tree",
        upgradesToUnlock: { "groupUnlock": true, "unrealityUnlock": true, "gammaTimeUpgrade": true, "betaUnspentTimeSkill": true, "betaTime2Upgrade":true},
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
            lore: "makes it easier to know when the generators are done. hopefully the quality of life will improve the further we go on."
        },
        tab: "tree",
        upgradesToUnlock: [],
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
            lore: "we can discuss with the alphas on their turf. upgrades are powerful and reliable."
        },
        tab: "tree",
        upgradesToUnlock: { "alphaTimeUpgrade": true },
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
            lore: "we can talk to the betas there. skills are weak but expansive."
        },
        tab: "tree",
        upgradesToUnlock: { "alphaUnspentSkill": true },
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
            lore: "we can have a meeting with the gammas here. the &gamma;-group offer insanely strong boosts for a price."
        },
        tab: "tree",
        upgradesToUnlock: {"betaTimeUnspentGroup":true},
    },
    unrealityUnlock: {
        id: "unrealityUnlock",
        cost: ["gamma"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("buttonUnreality");
        },
        text: {
            title: "unreality tab",
            effect: "unlock the unreality tab and many upgrades",
            lore: "unlock the ability to combine different generators. this opens up more of reality i guess."
        },
        tab: "tree",
        upgradesToUnlock: {"untoggleUnlock": true, "alphaPowerUpgrade":true,"gammaUnspentSkill":true,"betaUnspentPowerSkill":true,"upgradeUpgrade":true,"gammaPowerUpgrade":true,"betaGammaTimeGroup":true,"alphaGammaTimeGroup":true,"betaPowerUnspentGroup": true,"gammaPowerGroup":true},
    },
    untoggleUnlock: {
        id: "untoggleUnlock",
        cost: ["alpha"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("sacTog");
        },
        text: {
            title: "sacrifice untoggle buttons",
            effect: "unlock a couple of buttons to untoggle sacrificing in unreality",
            lore: "if you want something in reality, unreality has to stop."
        },
        tab: "tree",
        upgradesToUnlock: {},
    },
    boostToggleUnlock: {
        id: "boostToggleUnlock",
        cost: ["beta"],
        favourability: { 'alpha': 0,'beta': 1,'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("boostTog");
        },
        text: {
            title: "boost toggle buttons",
            effect: "adds MOAR buttons to boost resources",
            lore: "now with no added need to switch to the generators tab"
        },
        tab: "tree",
        upgradesToUnlock: {  },
    },
    alphaAlphaUnlock: {
        id: "alphaAlphaUnlock",
        cost: ["alpha", "beta", "gamma"],
        favourability: { 'alpha': 2 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("alphaAlpha");
            showClass("alphaAlphaSac");
            if (upgrades["boostButtonSkill"].firstTimeBought) upgrades["alphaAlphaBoostUpgrade"].unlock();
            player.UNLOCKED[3] = true;
            resources['alphaAlpha'].unlocked = true;
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alpha' }
        },
        text: {
            title: "unlock &alpha;&alpha;",
            effect: "unlock a new generator",
            lore: "how peculiar - it only grows when &alpha; is full. it also can infuse both &alpha; infusions in unreality. how cool."
        },
        tab: "tree",
        upgradesToUnlock: {"alphaAlphaPowerUpgrade":true,"alphaAlphaSelflessUpgrade":true,"alphaAlphaTimeUpgrade":true},
    },
    alpha3Unlock: {
        id: "alpha3Unlock",
        cost: ["alpha", "alphaAlpha"],
        favourability: { 'alpha': 3 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("alphaAlphaAlpha");
            showID("alphaAlphaAlphaUpgrades");
            player.UNLOCKED[4] = true;
            resources['alphaAlphaAlpha'].unlocked = true;
            resources['alphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alpha' }
            resources['alphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alphaAlpha' }
        },
        text: {
            title: "unlock &alpha;&alpha;&alpha;",
            effect: "unlock another new and original generator",
            lore: "how peculiar - it only grows when &alpha; and &alpha;&alpha; is full. how cool."
        },
        tab: "tree",
        upgradesToUnlock: {alphaAlphaAlphaTimeUpgrade:true},
    },
    alpha4Unlock: {
        id: "alpha4Unlock",
        cost: ["alpha", "alphaAlpha", "alphaAlphaAlpha"],
        favourability: { 'alpha': 4 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("alphaAlphaAlphaAlpha");
            showID("buttonFakeUpgrades")
            player.UNLOCKED[5] = true;
            resources['alphaAlphaAlphaAlpha'].unlocked = true;
            resources['alphaAlphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alpha' }
            resources['alphaAlphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alphaAlpha' }
            resources['alphaAlphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': 100, 'unspent': 'alphaAlphaAlpha' }
            // TODO change the whole game - mostly hiding the correct things now ;)
            for (i in upgrades) {
                let toSkip = ["alphaUnlock","isDoneUnlock","upgradesUnlock","alphaAlphaUnlock","alpha2Unlock","alpha3Unlock","alpha4Unlock"];
                if ((upgrades[i].firstTimeBought && (!upgrades[i].tab == "upgradeFake")) && (!toSkip.includes(i))) {
                    upgrades[i].lock();
                    resetUpgrade(i);
                }
            }
            resources['beta'].unlocked = false;
            resources['gamma'].unlocked = false;
            for (i in resources) {
                resources[i].reset();
            }
            for (i in infusions) {
                infusions[i].reset();
            }
            if (player.boostButtonCurrent) toggleBoost(player.boostButtonCurrent);
            hideID("alphaAlphaSacButton");
            hideID("sacText")
            hideID("boostText")
            hideClass("togBut");
            hideClass("beta");
            hideClass("gamma");
            hideClass("alphaHide")
            hideID("buttonUnreality");
            hideID("buttonUpgrades");
            hideID("buttonSkills");
            hideID("buttonGroup");
        },
        text: {
            title: "unlock &alpha;&alpha;&alpha;&alpha;",
            effect: "unlock another new and original generator",
            lore: "how peculiar - it only grows when &alpha; and &alpha;&alpha; and &alpha;&alpha;&alpha; is full. it also is causing a major reality change. how cool."
        },
        tab: "tree",
        upgradesToUnlock: {"alphaTimeUpgradeFake":true, "alpha2TimeUpgradeFake":true, "alpha3TimeUpgradeFake":true, "alpha4TimeUpgradeFake":true},
    },
    // UPGRADES
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
            lore: "it is simple, but effective. much like the alphas."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
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
            lore: "spend itselfs to boost itself, a good deal."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
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
        },
        text: {
            title: "&gamma; time upgrade",
            effect: "slightly reduce the time it takes for the &gamma; generator to fill",
            lore: "a deal almost too good to be true, the gamma stay sceptical."
        },
        tab: "upgrade",
        upgradesToUnlock: { "gammaTimeGroup": true },
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
            lore: "did we just do this? i am sure. you should also go to the skills tab and unlock a brand new skill"
        },
        tab: "upgrade",
        upgradesToUnlock:{"boostButtonSkill": true},
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
            lore: "and it starts, the alphas will ascend. strength in numbers(?)."
        },
        tab: "upgrade",
        upgradesToUnlock:{},
    },
    upgradeUpgrade: {
        id: "upgradeUpgrade",
        cost: ["alpha","betaGamma"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToReset = ["alphaPowerUpgrade", "betaTime2Upgrade", "gammaTimeUpgrade", "betaTimeUpgrade", "alphaTimeUpgrade"];
            resetUpgradeList(upgToReset, true);
        },
        text: {
            title: "upgrade upgrade",
            effect: "you can buy another level of every upgrade above but restart every upgrade above",
            lore: "with some gamma backing we can expand the upgrades, but the gammas never give anything for free"
        },
        tab: "upgrade",
        upgradesToUnlock:{"alphaAlphaUnlock":true},
    },
    alphaBetaExtraUpgrade: {
        id: "alphaBetaExtraUpgrade",
        cost: ["alpha","beta","alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            // TODO add alpha beta skills unlocks
            let factor = 0.2 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': false };
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': false };
        },
        text: {
            title: "&alpha;&beta; extra upgrade",
            effect: "boost beta and alpha power a touch",
            lore: "the beta slide the alphas a deal. work with us, expand, and make yourself stronger. enough said. though the gamma will not be happy."
        },
        tab: "upgrade",
        upgradesToUnlock:{"gammaPowerUpgrade":false,"alphaBetaMutualUpgrade":true,"alphaBetaUpgradeUpgrade":true},
    },
    gammaPowerUpgrade: {
        id: "gammaPowerUpgrade",
        cost: ["alpha","gamma","alphaGamma"],
        favourability: { 'alpha': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 1.5 * this.amountBought + 1;
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': false };
            // TODO add alpha gamma group
        },
        text: {
            title: "&gamma; power upgrade",
            effect: "increase the power of &gamma; sacrifice, unlock a gamma group upgrade",
            lore: "we welcome gamma to alpha lands, we shake hands. alphas believe in strength in numbers, the gammas believe in strength. this is the start of a mutually beneficial relationship."
        },
        tab: "upgrade",
        upgradesToUnlock:{"alphaBetaExtraUpgrade":false,"alphaGammaUpgradeUpgrade":true,"gammaExclusiveUpgrade":true,"alphaGammaPowerUpgrade":true,"alphaGammaMutualUpgrade":true},
    }, // TODO change what unlocks gamma power upgrade...
    // ALPHA ALPHA (AND SO ON)
    alphaAlphaPowerUpgrade: {
        id: "alphaAlphaPowerUpgrade",
        cost: ["alphaAlpha", "alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factorP = this.amountBought + 1;
            let factorT = 1 - 0.1 * this.amountBought;
            resources['alphaAlpha'].powerUpgrades[this.id] = { 'factor': factorP, 'unspent': false };
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': factorT, 'unspent': false };
            if (upgrades['alphaAlphaSelflessUpgrade'].amountBought == 0) upgrades["alphaAlphaUpgradeUpgrade"].unlock();
        },
        text: {
            title: "&alpha;&alpha; power upgrade",
            effect: "increase &alpha;&alpha; MEGASAC power by a lot <br> increase the time for &alpha;&alpha; to fill",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{ },
    },
    alphaAlphaSelflessUpgrade: {
        id: "alphaAlphaSelflessUpgrade",
        cost: ["alphaAlpha", "betaGamma", "alpha"],
        favourability: { 'alpha': -2, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factorA = 1 - 0.25 * this.amountBought;
            resources['alphaAlpha'].powerUpgrades[this.id] = { 'factor': factorA, 'unspent': false };
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': factorA, 'unspent': "alpha" };
            let factorT = this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factorT, 'unspent': "alphaAlpha" };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factorT, 'unspent': "alphaAlpha" };
        },
        text: {
            title: "&alpha;&alpha; selfless upgrade",
            effect: "reduce &alpha;, &alpha;&alpha; power and fill speed <br> reduce time for &beta; and &gamma; when &alpha;&alpha; is full",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{ "alphaAlphaUpgradeUpgrade":false },
    },
    alphaAlphaTimeUpgrade: {
        id: "alphaAlphaTimeUpgrade",
        cost: ["alphaAlpha", "alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.2 * this.amountBought + 1;
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': "alpha" };
        },
        text: {
            title: "&alpha;&alpha; time upgrade",
            effect: "decrease &alpha;&alpha; time to fill a bit",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{},
    },
    alphaAlphaUpgradeUpgrade: {
        id: "alphaAlphaUpgradeUpgrade",
        cost: ["alphaAlpha", "alpha"],
        favourability: { 'alpha': 2, 'beta': -1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToReset = ["betaTimeUpgrade", "gammaTimeUpgrade", "betaTime2Upgrade"];
            let upgToInc = ["alphaTimeUpgrade", "alphaPowerUpgrade", "upgradeUpgrade", "alphaAlphaTimeUpgrade", "alphaAlphaPowerUpgrade"];
            resetUpgradeList(upgToReset);
            resetUpgradeList(upgToInc, true);
            if (upgrades['gammaPowerUpgrade'].amountBought == 1) resetUpgrade('gammaPowerUpgrade');
            if (upgrades['alphaBetaExtraUpgrade'].amountBought == 1) resetUpgrade('alphaBetaExtraUpgrade');
        },
        text: {
            title: "&alpha;&alpha; upgrade upgrade",
            effect: "restart every upgrade above BUT increase cap of all &alpha;, &alpha;&alpha; ones",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{"alphaAlphaSelflessUpgrade":false,"alpha3Unlock":true},
    },
    alphaAlphaAlphaTimeUpgrade: {
        id: "alphaAlphaAlphaTimeUpgrade",
        cost: ["alphaAlphaAlpha", "alphaAlpha", "alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            resources['alphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': "alphaAlpha" };
        },
        text: {
            title: "&alpha;&alpha;&alpha; time upgrade",
            effect: "decrease &alpha;&alpha;&alpha; time to fill",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{"alphaAlphaAlphaUpgradeUpgrade":true},
    },
    alphaAlphaAlphaUpgradeUpgrade: {
        id: "alphaAlphaAlphaUpgradeUpgrade",
        cost: ["alphaAlphaAlpha", "alphaAlpha", "alpha"],
        favourability: { 'alpha': 2, 'beta': -1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToReset = ["betaTimeUpgrade", "gammaTimeUpgrade", "betaTime2Upgrade"];
            let upgToInc = ["alphaTimeUpgrade", "alphaPowerUpgrade", "upgradeUpgrade", "alphaAlphaTimeUpgrade", "alphaAlphaPowerUpgrade", "alphaAlphaUpgradeUpgrade"];
            resetUpgradeList(upgToReset);
            resetUpgradeList(upgToInc, true);
            if (upgrades['gammaPowerUpgrade'].amountBought == 1) resetUpgrade('gammaPowerUpgrade');
            if (upgrades['alphaBetaExtraUpgrade'].amountBought == 1) resetUpgrade('alphaBetaExtraUpgrade');
        },
        text: {
            title: "&alpha;&alpha;&alpha; upgrade upgrade",
            effect: "restart every upgrade above BUT increase cap of all &alpha;, &alpha;&alpha; ones",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock:{"alpha4Unlock":true},
    },
    // ALPHA BETA
    alphaBetaMutualUpgrade: {
        id: "alphaBetaMutualUpgrade",
        cost: ["alpha","beta","alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
            let factor = 0.3 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': 'beta' };
        },
        text: {
            title: "&alpha;-&beta; mutual upgrade",
            effect: "if &beta; is unspent, boost &alpha; sacrifice power",
            lore: "to give is to get back, or: the alpha would like to get back"
        },
        tab: "upgrade",
        upgradesToUnlock: {"alphaBetaUpgradeUpgrade": false},
    },
    boostTimeUpgrade: {
        id: "boostTimeUpgrade",
        cost: ["alpha","beta","alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            BOOSTUPGRADES.negativeTimeFactor[this.id] = 1 + 0.5 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost button time upgrade",
            effect: "reduce the boost button's negative effect of fill speed",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    alphaBetaUpgradeUpgrade: {
        id: "alphaBetaUpgradeUpgrade",
        cost: ["alpha","beta","alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            // add beta coin upgrades to reset
            let upgToReset = ["alphaTimeUpgrade", "gammaTimeUpgrade", "alphaPowerUpgrade"];
            let upgToInc = ["betaTimeUpgrade", "betaTime2Upgrade", "alphaBetaExtraUpgrade"];
            resetUpgradeList(upgToReset);
            resetUpgradeList(upgToInc, true);
            if (upgrades["boostButtonSkill"].firstTimeBought) upgToInc2 = ["boostTimeUpgrade", "boostPowerUpgrade",]
            resetUpgradeList(upgToInc2,true);
        },
        text: {
            title: "&alpha;&beta; upgrade upgrade",
            effect: "restart certain upgrades above<br>increase the number you can buy of beta upgrades",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock: {"alphaBetaMutualUpgrade": false},
    },
    boostPowerUpgrade: {
        id: "boostPowerUpgrade",
        cost: ["alpha","beta","alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            BOOSTUPGRADES.negativePowerFactor[this.id] = 1 + 0.5 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost button power upgrade",
            effect: "reduce the boost button's negative effect of sac power",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    alphaAlphaBoostUpgrade: {
        id: "alphaAlphaBoostUpgrade",
        cost: ["alpha","beta","alphaAlpha", "alphaBeta"],
        favourability: { 'alpha': 2, 'beta': 1, 'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("alphaAlphaBoostButton");
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "&alpha;&alpha; boost button upgrade",
            effect: "unlocks the &alpha;&alpha; boost button",
            lore: "to add"
        },
        tab: "upgrade",
        upgradesToUnlock: {"alphaAlphaBoostToggleUpgrade":true},
    },
    alphaAlphaBoostToggleUpgrade: {
        id: "alphaAlphaBoostToggleUpgrade",
        cost: ["alpha"],
        favourability: { 'alpha': 1, 'beta': 0, 'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showID("alphaAlphaBoostButtonExtra");
        },
        text: {
            title: "&alpha;&alpha; boost button toggle",
            effect: "unlocks the &alpha;&alpha; boost button toggle",
            lore: "oooooh that's where it went"
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    // ALPHA GAMMA
    alphaGammaUpgradeUpgrade: {
        id: "alphaGammaUpgradeUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1 / 3, 'beta': 1 / 3, 'gamma': -1 / 3 },
        amountBought: 0,
        amountCanBuy: 3,
        functionality: function () {
            // TODO
        },
        text: {
            title: "&alpha;-&beta; mutual upgrade",
            effect: "if &beta; is unspent, boost &alpha; sacrifice power",
            lore: "the gammas have officially closed down the alpha wing, a huge sigh of relief. now the alphas can use the betas help for their own mining operation. obviously after they finish whatever business they have."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    gammaExclusiveUpgrade: {
        id: "gammaExclusiveUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            // TODO    
        },
        text: {
            title: "&gamma; despansion upgrade",
            effect: "boost &alpha; power and reduce &beta; time slightly<br>increase &gamma; time",
            lore: "a floor of the gamma building has completely closed. the alphas may have mined too close meaning they need to scale down operation. motivation for alphas and betas increase. gammas give up their relations with the alphas."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    alphaGammaPowerUpgrade: {
        id: "alphaGammaPowerUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1 / 2, 'beta': -1 / 2, 'gamma': -1 / 2 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
            // TO DO
        },
        text: {
            title: "&alpha;&beta; upgrade upgrade",
            effect: "restart certain upgrades<br>increase the number you can buy of certain upgrades",
            lore: "i think the alphas are serious about mining to the centre of the earth, the beta are concerned. theyre going right under the gamma building... this might not be good."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    alphaGammaMutualUpgrade: {
        id: "alphaGammaMutualUpgrade",
        cost: ["alphaBeta"],
        favourability: { 'alpha': 1, 'beta': 1, 'gamma': -1 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
            // TODO
        },
        text: {
            title: "&alpha;&beta; upgrade upgrade",
            effect: "restart certain upgrades<br>increase the number you can buy of certain upgrades",
            lore: "i think the alphas are serious about mining to the centre of the earth, the beta are concerned. theyre going right under the gamma building... this might not be good."
        },
        tab: "upgrade",
        upgradesToUnlock: {},
    },
    // SKILLS
    alphaUnspentSkill: {
        id: "alphaUnspentSkill",
        cost: ["alpha"],
        favourability: { 'alpha': 0.2, 'beta': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.2 * this.amountBought + 1;
            resources['beta'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': 'alpha' };
        },
        text: {
            title: "&alpha; unspent skill",
            effect: "decrease the time of &beta; if &alpha; is unspent",
            lore: "the alphas help the betas. respect."
        },
        tab: "skills",
        upgradesToUnlock:{},
    },
    betaUnspentTimeSkill: {
        id: "betaUnspentTimeSkill",
        cost: ["beta"],
        favourability: { 'beta': 0.2, 'gamma': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.15 * this.amountBought + 1;
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': 'beta' };
        },
        text: {
            title: "&beta; unspent time skill",
            effect: "if &beta; is unspent, decrease the time needed to fill &gamma;",
            lore: "this is surely a start of a blossoming relation between the betas and the &gamma;-group."
        },
        tab: "skills",
        upgradesToUnlock:{},
    },
    betaUnspentPowerSkill: {
        id: "betaUnspentPowerSkill",
        cost: ["beta"],
        favourability: { 'beta': 0.2, 'gamma': 0.2 },
        amountBought: 0,
        amountCanBuy: 10,
        functionality: function () {
            let factor = 0.1 * this.amountBought + 1;
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': 'beta' };
        },
        text: {
            title: "&beta; unspent power skill",
            effect: "if &beta; is unspent, increase the power of &gamma; sacrifice",
            lore: "makes sense, the betas can feed the gammas. more nutritious."
        },
        tab: "skills",
        upgradesToUnlock:{},
    },
    gammaUnspentSkill: {
        id: "gammaUnspentSkill",
        cost: ["gamma"],
        favourability: { 'beta': 0.5, 'gamma': 0.5 },
        amountBought: 0,
        amountCanBuy: 4,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            resources['alpha'].powerUpgrades[this.id] = { 'factor': factor, 'unspent': 'gamma' };
        },
        text: {
            title: "&gamma; unspent power skill",
            effect: "&alpha; sacrifice is more powerful if &gamma; is done",
            lore: "the gammas can back the alphas. this is just a small taste of their power."
        },
        tab: "skills",
        upgradesToUnlock:{},
    },
    boostButtonSkill: {
        id: "boostButtonSkill",
        cost: ['beta'],
        favourability: { 'alpha': 1,'beta': 1,'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            showClass("unlockBoost");
            if (upgrades["alphaAlphaUnlock"].firstTimeBought) upgrades["alphaAlphaBoostUpgrade"].unlock();
        },
        text: {
            title: "boost button skill",
            effect: "unlocks buttons that reduces time and increases power of one of &alpha;, &beta;, &gamma;. affects the others adversely.",
            lore: "its pretty brutal at first..."
        },
        tab: "skill",
        upgradesToUnlock: { "boostPowerSkill":true, "boostTimeSkill":true,"boostToggleUnlock":true, "alphaBetaExtraUpgrade":true,"boostTimeUpgrade": true,"boostPowerUpgrade": true},
    },
    boostPowerSkill: {
        id: "boostPowerSkill",
        cost: ['beta','alphaBeta'],
        favourability: { 'alpha': 1,'beta': 1,'gamma': 0 },
        amountBought: 0,
        amountCanBuy: 7,
        functionality: function () {
            BOOSTUPGRADES.positivePowerFactor[this.id] = 1 + 0.2 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost power skill",
            effect: "increase the positive effect of sac for the boost button",
            lore: "to add"
        },
        tab: "skill",
        upgradesToUnlock: { "boostButtonPowerGroup": true },
    },
    boostTimeSkill: {
        id: "boostTimeSkill",
        cost: ['beta','betaGamma'],
        favourability: { 'alpha': 0,'beta': 1,'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 5,
        functionality: function () {
            BOOSTUPGRADES.positiveTimeFactor[this.id] = 1 + 0.15 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost time skill",
            effect: "increase the positive effect of fill speed for the boost button",
            lore: "to add"
        },
        tab: "skill",
        upgradesToUnlock: {"boostButtonTimePlusGroup": true, "boostButtonTimeMinusGroup":true },
    },
    // GROUPS

    // TIME
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
        },
        text: {
            title: "&beta;&gamma; time group",
            effect: "reduce the amount of time for &beta; and &gamma; to fill, increase it for &alpha;",
            lore: "by starting the beta gamma time division, the alpha division can be 'cut', as they say (this is done by the newly formed division). this may lead to some small delays. the gamma group apologises. not profusely, but slightly."
        },
        tab: "group",
        upgradesToUnlock: { "betaGammaPowerGroup": true,"alphaGammaTimeGroup":false },
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
        },
        text: {
            title: "&alpha;&gamma; time group",
            effect: "&alpha; and &gamma; generators fill faster, but &beta; fills slower",
            lore: "the alpha gamma time division focus on logging, mining, and crowd control situations. the beta division will be streamlined."
        },
        tab: "group",
        upgradesToUnlock: { "alphaGammaPowerGroup": true,"betaGammaTimeGroup":false },
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
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor1, 'unspent': 'beta' };
            resources['gamma'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': 'beta' };
        },
        text: {
            title: "unspent &beta; time group",
            effect: "when &beta; is full, increase the time it takes for &alpha; to fill<br>decrease the time for &gamma;",
            lore: "if the alphas and betas have finished their work, we can send them on their way. the gammas work more efficiently anyways."
        },
        tab: "group",
        upgradesToUnlock:{},
        upgradesToUnlock: { },
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
            lore: "the &gamma;-group has hired consultants to tell them what they already want them to do: cut the fat off the alpha and beta division."
        },
        tab: "group",
        upgradesToUnlock:{ },
    },

    // POWER
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
        },
        text: {
            title: "&beta;&gamma; power group",
            effect: "increase the sacrificial power of &beta; and &gamma;, reduce it for &alpha;",
            lore: "the &gamma;-group are scaling back the alpha protocol, seems like logging operations will move abroad. the betas will work on acquiring fresh talent, preferably the free kind."
        },
        tab: "group",
        upgradesToUnlock:{},
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
        },
        text: {
            title: "&alpha;&gamma; power group",
            effect: "&alpha; and &gamma; fill infusions quicker, but &beta; fills them less",
            lore: "as the &gamma;-group employ more alphas, they expand into diplomacy, mostly by strongarming. note: the &gamma;-group does not endorse violence."
        },
        tab: "group",
        upgradesToUnlock:{},
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
            resources['beta'].powerUpgrades[this.id] = { 'factor': factor1, 'unspent': 'alpha' };
            resources['gamma'].powerUpgrades[this.id] = { 'factor': factor2, 'unspent': 'alpha' };
        },
        text: {
            title: "unspent &beta; power group",
            effect: "when &alpha; is full, &beta; sacrifice becomes less powerful<br>but &gamma; fills up the infusion bar more",
            lore: "the gamma have researched new blood leaching technologies that only work on consecutive generators. luckily it can be negatively configured."
        },
        tab: "group",
        upgradesToUnlock:{},
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
            lore: "the &gamma;eo says we need to build a new floor. the cheaper alternative is to kick out the alphas and betas on the floor below."
        },
        tab: "group",
        upgradesToUnlock:{},
    },
    
    // BOOST BUTTON
    boostButtonPowerGroup: {
        id: "boostButtonPowerGroup",
        cost: ["gamma", "alphaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            BOOSTUPGRADES.positivePowerFactor[this.id] = 1 + 0.5 * this.amountBought;
            BOOSTUPGRADES.negativePowerFactor[this.id] = 1 - 0.4 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost button power group",
            effect: "increase the power of boosted sac, decrease it for unboosted",
            lore: "the &gamma;-group understands power is only to be made more powerful. it's basic logic"
        },
        tab: "group",
        upgradesToUnlock:{},
    },
    boostButtonTimePlusGroup: {
        id: "boostButtonTimePlusGroup",
        cost: ["gamma", "betaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            BOOSTUPGRADES.positiveTimeFactor[this.id] = 1 + 0.5 * this.amountBought;
            BOOSTUPGRADES.negativeTimeFactor[this.id] = 1 - 0.3 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost button time+ group",
            effect: "increase the fill speed of boosted sac, decrease it for unboosted",
            lore: "the &gamma;-group understands speed is better when increased. the faster the better"
        },
        tab: "group",
        upgradesToUnlock:{"boostButtonTimeMinusGroup":false, "boostButtonPlusGroup": true},
    },
    boostButtonTimeMinusGroup: {
        id: "boostButtonTimeMinusGroup",
        cost: ["gamma", "betaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            BOOSTUPGRADES.positiveTimeFactor[this.id] = 1 - 0.1 * this.amountBought;
            BOOSTUPGRADES.negativeTimeFactor[this.id] = 1 + 1 * this.amountBought;
            toggleBoost(player.boostButtonCurrent, true);
        },
        text: {
            title: "boost button time- group",
            effect: "decrease the fill speed of boosted sac, increase it for unboosted",
            lore: "when one is scared, they like to make the playing field more even..."
        },
        tab: "group",
        upgradesToUnlock:{"boostButtonTimePlusGroup":false},
    },
    boostButtonPlusGroup: {
        id: "boostButtonPlusGroup",
        cost: ["gamma", "betaGamma"],
        favourability: { 'alpha': -1, 'beta': 1, 'gamma': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToInc = ["boostButtonTimePlusGroup", "boostButtonPowerGroup"]
            increaseUpgradeAmount(upgToInc);
        },
        text: {
            title: "boost button group plus",
            effect: "increase the limits of the adjacent groups",
            lore: "well done for choosing correctly, now give a boost to the boost button, boost button'll boost more"
        },
        tab: "group",
        upgradesToUnlock:{},
    },
    
    
    
    
    
    // FAKE UPGRADES - ENDING ALPHA
    alphaTimeUpgradeFake: {
        id: "alphaTimeUpgradeFake",
        cost: ["alpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            let factor2 = 0.2 * this.amountBought + 1;
            resources['alpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': false };
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': "alpha" };
        },
        text: {
            title: "&alpha; time upgrade",
            effect: "reduce the time it takes for the &alpha; and &alpha;&alpha; generator to fill",
            lore: "oh wow this is a really good and fun upgrade that makes a truly enjoyable game"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {},
    },
    alpha2TimeUpgradeFake: {
        id: "alpha2TimeUpgradeFake",
        cost: ["alpha","alphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            let factor2 = 0.2 * this.amountBought + 1;
            resources['alphaAlpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': "alpha" };
            resources['alphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': "alphaAlpha" };
        },
        text: {
            title: "&alpha;&alpha; time upgrade",
            effect: "reduce the time it takes for the &alpha;&alpha; and &alpha;&alpha;&alpha; generator to fill",
            lore: "oh wow this is a really exceptional upgrade that makes a truly enjoyable game, true branch like structure with a real touch of class"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {"alpha2UpgradeUpgradeFake":true},
    },
    alpha2UpgradeUpgradeFake: {
        id: "alpha2UpgradeUpgradeFake",
        cost: ["alpha","alphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToInc = ["alphaTimeUpgradeFake", "alpha2TimeUpgradeFake"];
            resetUpgradeList(upgToInc, true);
        },
        text: {
            title: "&alpha;&alpha; upgrade upgrade",
            effect: "increase the cap of time upgrades above",
            lore: "i mean this is truly ingenious, adding an upgrade that upgrades upgrades, whatever could be next"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {},
    },
    alpha3TimeUpgradeFake: {
        id: "alpha3TimeUpgradeFake",
        cost: ["alpha","alphaAlpha","alphaAlphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 0.5 * this.amountBought + 1;
            let factor2 = 0.2 * this.amountBought + 1;
            resources['alphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': "alphaAlpha" };
            resources['alphaAlphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': factor2, 'unspent': "alphaAlphaAlpha" };
        },
        text: {
            title: "&alpha;&alpha;&alpha; time upgrade",
            effect: "reduce the time it takes for the &alpha;&alpha;&alpha; and &alpha;&alpha;&alpha;&alpha; generator to fill",
            lore: "surely this is the best upgrade ever devised by man"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {"alpha3UpgradeUpgradeFake":true},
    },
    alpha3UpgradeUpgradeFake: {
        id: "alpha3UpgradeUpgradeFake",
        cost: ["alpha","alphaAlpha","alphaAlphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let upgToInc = ["alphaTimeUpgradeFake", "alpha2TimeUpgradeFake", "alpha3TimeUpgradeFake", "alpha2UpgradeUpgradeFake"];
            resetUpgradeList(upgToInc, true);
        },
        text: {
            title: "&alpha;&alpha;&alpha; upgrade upgrade",
            effect: "increase the cap of time upgrades above and upgrade upgrades above",
            lore: "simply beautiful, this upgrade is bound to make you cry. tears of joy stream from your eyes, and the many many pores across your body"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {},
    },
    alpha4TimeUpgradeFake: {
        id: "alpha4TimeUpgradeFake",
        cost: ["alpha","alphaAlpha","alphaAlphaAlpha","alphaAlphaAlphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 1,
        functionality: function () {
            let factor = 1 * this.amountBought + 1;
            resources['alphaAlphaAlphaAlpha'].timeUpgrades[this.id] = { 'factor': factor, 'unspent': "alphaAlphaAlpha" };
        },
        text: {
            title: "&alpha;&alpha;&alpha;&alpha; time upgrade",
            effect: "reduce the time it takes for the &alpha;&alpha;&alpha;&alpha; generator to fill",
            lore: "god saw this upgrade and wept. joy. pure unadulterated joy"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {"alpha4UpgradeUpgradeFake":true},
    },
    alpha4UpgradeUpgradeFake: {
        id: "alpha4UpgradeUpgradeFake",
        cost: ["alpha","alphaAlpha","alphaAlphaAlpha"],
        favourability: { 'alpha': 1 },
        amountBought: 0,
        amountCanBuy: 2,
        functionality: function () {
            let upgToInc = ["alphaTimeUpgradeFake", "alpha2TimeUpgradeFake", "alpha3TimeUpgradeFake", "alpha4TimeUpgradeFake", "alpha2UpgradeUpgradeFake", "alpha3UpgradeUpgradeFake"];
            resetUpgradeList(upgToInc, true);
        },
        text: {
            title: "&alpha;&alpha;&alpha;&alpha; upgrade upgrade",
            effect: "increase the cap of time upgrades and upgrade upgrades above",
            lore: "noone can believe this exists, you feel as if this is the secret to numbers, to all numbers"
        },
        tab: "upgradeFake",
        upgradesToUnlock: {},
    },
};