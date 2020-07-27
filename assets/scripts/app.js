const attackValPlayer = 9; 
const attackValMonster = 10;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function onAttack() {
    // Deal damage (random (val)) - UI updated 
    const damageMonster = dealMonsterDamage(attackValPlayer);
    currentMonsterHealth -= damageMonster;
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

attackBtn.addEventListener('click', onAttack);
