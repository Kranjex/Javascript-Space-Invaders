// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');

// Game characters
const ship = {
  //img: slika gunshipa
};

const invader = {
  //img: slika aliena
};

// Invader generation on window onload
window.onload = () => {
  for (let i = 0; i <= 10; i++) {
    console.log(`This is ${i} invader.`);
    gameScreen.appendChild(invader);
  }
  gameScreen.appendChild(ship);
};
