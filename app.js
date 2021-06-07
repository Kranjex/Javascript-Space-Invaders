// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const GUNSHIP = document.querySelector('.ship');
const alienRow = document.querySelectorAll('.alienRow');
// Game screen size
const GAME_WIDTH = 1500;
const GAME_HEIGHT = 900;

// Alien spawn function
function alienSpawn() {
  for (let j = 0; j < 30; j++) {
    const alienPlaceholder = document.createElement('div');
    alienPlaceholder.classList.add('invader');
    gameScreen.appendChild(alienPlaceholder);
  }
}

function moveAliens() {}

window.onload = () => {
  // init functions
  alienSpawn();
  // setInterval(moveAliens, 500);

  // Ship movement system
  window.addEventListener('keydown', (e) => {
    const { style } = GUNSHIP;
    switch (e.key) {
      // Moving in left direction
      case 'ArrowLeft':
        if (parseInt(GUNSHIP.style.left) % GAME_WIDTH !== 0) {
          style.left = `${parseInt(style.left) - 20}px`;
          //style.rotateY = 'rotateX(-45deg)';
        } else if (parseInt(GUNSHIP.style.left) === 0) {
          style.left = `${parseInt(style.left) + 20}px`;
        }
        //style.rotateY = 'rotateX(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(GUNSHIP.style.left) % GAME_WIDTH !== 0) {
          //style.rotateY = 'rotateX(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (parseInt(GUNSHIP.style.left) === 1500) {
          style.left = `${parseInt(style.left) - 20}px`;
        }
        //style.transform = 'rotateX(0deg)';
        break;
      // Rockets controlls
      case 'Space':
        break;
    }
  });
};
