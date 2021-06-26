// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
// MEDIA QUERY
var media = window.matchMedia('(max-width: 1920px)');
if (media.matches) {
  // Game screen measurements
  var GAME_WIDTH = 750;
  var GAME_HEIGHT = 450;
  // Invader measurements
  var INVADER_WIDTH = 47;
  var INVADER_HEIGHT = 33.5;
  var INVADER_MARGIN = 5;
} else {
  // Game screen measurements
  var GAME_WIDTH = 1500;
  var GAME_HEIGHT = 900;
  // Invader measurements
  var INVADER_WIDTH = 94;
  var INVADER_HEIGHT = 67;
  var INVADER_MARGIN = 10;
}

window.onload = () => {
  console.log(
    GAME_WIDTH,
    GAME_HEIGHT,
    INVADER_WIDTH,
    INVADER_HEIGHT,
    INVADER_MARGIN
  );
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
        if (parseInt(style.left) % GAME_WIDTH !== 0) {
          style.left = `${parseInt(style.left) - 20}px`;
          //style.rotateY = 'rotateX(-45deg)';
        } else if (parseInt(style.left) === 0) {
          console.log('You hit left border');
          style.left = `${parseInt(style.left) + 20}px`;
        }
        //style.rotateY = 'rotateX(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(style.left) % GAME_WIDTH !== 0) {
          //style.rotateY = 'rotateX(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (parseInt(style.left) === 1500) {
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
