let maxHeal = 6;
let attackValPlayer = 9;
let attackValMonster = 10;
let strongAttackValPlayer = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_STRONG_PLAYER_ATTACK = 'STRONG_PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

const enteredVal = prompt('Chosen maximum life: ', '100');

let chosenMaxLife = parseInt(enteredVal);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function log(event, value, monsterHealth, playerHealth) {
    let logEntry;

    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_STRONG_PLAYER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
        };
    }

    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function deathCheck() {
    const initalPlayerHealth = currentPlayerHealth;

    const damagePlayer = dealPlayerDamage(attackValMonster);
    currentPlayerHealth -= damagePlayer

    log(LOG_EVENT_MONSTER_ATTACK, damagePlayer, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();

        //Resets health to before monster hit
        currentPlayerHealth = initalPlayerHealth;
        setPlayerHealth(initalPlayerHealth);

        alert('You were saved by your bonus life!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won');
        log(LOG_EVENT_GAME_OVER, 'PLAYER_WON', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost');
        log(LOG_EVENT_GAME_OVER, 'MONSTER_WON', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth && currentMonsterHealth <= 0) {
        alert('Its a draw');
        log(LOG_EVENT_GAME_OVER, 'DRAW', currentMonsterHealth, currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset(chosenMaxLife);
    }
}

function attackMonster(attackMode) {
    const maxDamage = attackMode === MODE_ATTACK ? attackValPlayer : strongAttackValPlayer;
    const logEvent = attackMode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_STRONG_PLAYER_ATTACK;

    /*if (attackMode === MODE_ATTACK) {
        maxDamage = attackValPlayer;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (attackMode === MODE_STRONG_ATTACK) {
        maxDamage = strongAttackValPlayer;
        logEvent = LOG_EVENT_STRONG_PLAYER_ATTACK;
    }*/

    const damageMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageMonster;

    log(logEvent, damageMonster, currentMonsterHealth, currentPlayerHealth);

    deathCheck();
}

function onAttack() {
    attackMonster(MODE_ATTACK);
}

function onStrongAttack() {
    attackMonster(MODE_STRONG_ATTACK);
}

function onHeal() {
    let healVal;

    if (currentPlayerHealth >= chosenMaxLife - maxHeal) {
        alert('You cannot heal above your max initial health');
        healVal = chosenMaxLife - currentPlayerHealth;
    } else {
        healVal = maxHeal;
    }

    increasePlayerHealth(maxHeal);
    currentPlayerHealth += maxHeal;
    log(LOG_EVENT_PLAYER_HEAL, healVal, currentMonsterHealth, currentPlayerHealth);
    deathCheck();
}

function onPrint() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);
logBtn.addEventListener('click', onPrint);