import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    fighterElement.appendChild(createFighterImage(fighter));
    fighterElement.appendChild(createFighterInfo(fighter));
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };

  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}

export function createFighterInfo(fighter) {
  const { name, health, attack, defense } = fighter;
  const infoElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___info'
  });

  infoElement.innerHTML = `
    <div class="fighter-name">${name}</div>    
    <p>Health: ${health}</p>
    <p>Attack: ${attack}</p>
    <p>Defense: ${defense}</p>
  `;

  return infoElement;
}
