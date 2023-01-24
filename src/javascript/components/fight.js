import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    firstFighter.currentHealth = firstFighter.health;
    secondFighter.currentHealth = secondFighter.health;

    firstFighter.critical = true;
    secondFighter.critical = true;

    const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
    const secondFighterHealthBar = document.getElementById('right-fighter-indicator');

    const criticalKeySet = new Set();

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case controls.PlayerOneBlock:
          firstFighter.block = true;
          break;
        case controls.PlayerTwoBlock:
          secondFighter.block = true;
          break;
        case controls.PlayerOneAttack:
          console.log('PlayerOneAttack');
          attackEnemy(firstFighter, secondFighter, getDamage, secondFighterHealthBar);
          break;
        case controls.PlayerTwoAttack:
          console.log('PlayerTwoAttack');
          attackEnemy(secondFighter, firstFighter, getDamage, firstFighterHealthBar);
      }

      criticalKeySet.add(e.code);

      if (
        Array.from(criticalKeySet).sort().join(',') === controls.PlayerOneCriticalHitCombination.sort().join(',') &&
        firstFighter.critical
      ) {
        attackEnemyCritical(firstFighter, secondFighter, criticalHit, secondFighterHealthBar);
        firstFighter.critical = false;
        setTimeout(() => (firstFighter.critical = true), 10000);
      }

      if (
        Array.from(criticalKeySet).sort().join(',') === controls.PlayerTwoCriticalHitCombination.sort().join(',') &&
        secondFighter.critical
      ) {
        attackEnemyCritical(secondFighter, firstFighter, criticalHit, firstFighterHealthBar);
        secondFighter.critical = false;
        setTimeout(() => (secondFighter.critical = true), 10000);
      }

      if (firstFighter.currentHealth <= 0) {
        resolve(secondFighter);
      }

      if (secondFighter.currentHealth <= 0) {
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case controls.PlayerOneBlock:
          firstFighter.block = false;
          break;
        case controls.PlayerTwoBlock:
          secondFighter.block = false;
          break;
      }

      criticalKeySet.delete(e.code);
    });
  });
}

export function attackEnemy(attacker, defender, damage, hpBar) {
  if (attacker.block || defender.block) {
    return 0;
  } else {
    defender.currentHealth -= damage(attacker, defender);
    hpBar.style.width = `${(defender.currentHealth / defender.health) * 100}%`;
  }
}

export function attackEnemyCritical(attacker, defender, damage, hpBar) {
  defender.currentHealth -= damage(attacker, defender);
  hpBar.style.width = `${(defender.currentHealth / defender.health) * 100}%`;
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage >= 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() < 0.5 ? 2 : 1;
  console.log("attack damage ->" + fighter.attack * criticalHitChance);
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() < 0.5 ? 2 : 1;
  console.log("defence ->" + fighter.defense * dodgeChance);
  return fighter.defense * dodgeChance;
}

export function criticalHit(fighter) {
  return fighter.attack * 2;
}
