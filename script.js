let order = [];
let clickedOrder = [];
let score = 0;

/**
 * 0 - Green
 * 1 - Red
 * 2 - Yellow
 * 3 - Blue
 */

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

const lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add('selected');
  }, number);

  setTimeout(() => {
    element.classList.remove('selected');
  });
}

const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if(clickedOrder.length == order.length) {
    gameAlert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`, nextLevel);
  }
}

const click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250)
}

const createColorElement = (color) => {
  if(color == 0) {
    return green;
  } else if(color == 1) {
    return red;
  } else if(color == 2) {
    return yellow;
  } else if(color == 3) {
    return blue;
  }
}

const nextLevel = () => {
  score++;
  shuffleOrder();
}

const gameOver = () => {
  gameAlert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo.`, playGame);
}

const elementAlert = document.querySelector('.alert');
const alertButton = elementAlert.querySelector('.alert__button');


const gameAlert = (message, callback = null) => {
  elementAlert.querySelector('.alert__message').textContent = message;
  elementAlert.style.visibility = 'visible';
  
  alertButton.onclick = () => {
    if (elementAlert.style.visibility === 'visible') {
      elementAlert.style.visibility = 'hidden';
      if (callback) callback();
    }
  }

}

const playGame = () => {
  order = [];
  clickedOrder = [];
  score = 0;
  gameAlert(`Bem-vindo ao Gênesis! Iniciando novo jogo.`, nextLevel);
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();