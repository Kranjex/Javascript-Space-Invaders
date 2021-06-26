// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
// Game screen size
const GAME_WIDTH = 1500;
const GAME_HEIGHT = 900;
// Invaders measurements
const INVADER_WIDTH = 94;
const INVADER_HEIGHT = 67;
const INVADER_MARGIN = 10;

window.onload = () => {
  // init functions
  // Alien spawn function

  // invader spawn function = (x,) =>
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
      const invaderPlaceholder = document.createElement('div');
      invaderPlaceholder.classList.add('invader');
      invaderPlaceholder.style.left = `${
        j * (INVADER_WIDTH + INVADER_MARGIN)
      }px`;
      invaderPlaceholder.style.top = `${
        i * (INVADER_HEIGHT + INVADER_MARGIN)
      }px`;
      gameScreen.appendChild(invaderPlaceholder);
    }
  }
  const invaders = document.querySelectorAll('.invader');
  const invaderLeft = window
    .getComputedStyle(invaders[0], null)
    .getPropertyValue('left');
  console.log(invaderLeft);

  // Invaders movement system
  function moveInvaders(element) {
    setInterval(() => {
      // invader.style.left = `${parseInt(invader.style.left) + 50}px`;
      element.offsetLeft = `${parseInt(element.offsetLeft) + 50}px`;
      console.log('invaders are comming!');
    }, 500);
  }

  // invaders.forEach(moveInvaders(invaders));

  // const movePedri = setInterval(moveInvaders(invaders), 500);

  // Ship movement system
  window.addEventListener('keydown', (e) => {
    const { style } = spaceship;
    switch (e.key) {
      // Moving in left direction
      case 'ArrowLeft':
        if (parseInt(spaceship.style.left) % GAME_WIDTH !== 0) {
          style.left = `${parseInt(style.left) - 20}px`;
          //style.rotateY = 'rotateX(-45deg)';
        } else if (parseInt(spaceship.style.left) === 0) {
          style.left = `${parseInt(style.left) + 20}px`;
        }
        //style.rotateY = 'rotateX(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(spaceship.style.left) % GAME_WIDTH !== 0) {
          //style.rotateY = 'rotateX(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (parseInt(spaceship.style.left) === 1500) {
          style.left = `${parseInt(style.left) - 20}px`;
        }
        //style.transform = 'rotateX(0deg)';
        break;
    }
  });
};

// // Rockets controlls
// case 'Space':
//   break;
