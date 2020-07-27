const maxHeal = 6;
const attackValPlayer = 9;
const attackValMonster = 10;
const strongAttackValPlayer = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function deathCheck() {
    const damagePlayer = dealPlayerDamage(attackValMonster);
    currentPlayerHealth -= damagePlayer

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost');
    } else if (currentPlayerHealth && currentMonsterHealth <= 0) {
        alert('Its a draw');
    }
}

function attackMonster(attackMode) {
    let maxDamage;

    if (attackMode === 'attack') {
        maxDamage = attackValPlayer;
    } else if (attackMode === 'strong-attack') {
        maxDamage = strongAttackValPlayer;
    }

    const damageMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageMonster;

    deathCheck();
}

function onAttack() {
    attackMonster('attack');
}

function onStrongAttack() {
    attackMonster('strong-attack');
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
    deathCheck();
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', onHeal);