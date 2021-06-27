// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
const restartButton = document.getElementById('restartButton');
let DIRECTION = 1;
// MEDIA QUERY
var media = window.matchMedia('(max-width: 1920px)');
if (media.matches) {
  // Game screen measurements
  var GAME = {
    WIDTH: 750,
    HEIGHT: 450,
  };
  // Invader measurements
  var INVADER = {
    WIDTH: 47,
    HEIGHT: 33.5,
    MARGIN: 5,
  };
} else {
  // Game screen measurements
  var GAME = {
    WIDTH: 1500,
    HEIGHT: 900,
  };
  // Invader measurements
  var INVADER = {
    WIDTH: 94,
    HEIGHT: 67,
    MARGIN: 10,
  };
}

window.onload = () => {
  console.log(GAME, INVADER);

  // init functions
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 10; j++) {
      const invaderPlaceholder = document.createElement('div');
      invaderPlaceholder.classList.add('invader');
      invaderPlaceholder.style.left = `${
        j * (INVADER.WIDTH + INVADER.MARGIN)
      }px`;
      invaderPlaceholder.style.top = `${
        i * (INVADER.HEIGHT + INVADER.MARGIN)
      }px`;
      gameScreen.appendChild(invaderPlaceholder);
    }
  }
  const invaders = Array.from(document.querySelectorAll('.invader'));

  // Invaders movement system
  const moveInvaders = setInterval(function () {
    moveLateral();
    if (parseInt(invaders[0].style.left) === 0) {
      moveDown();
      DIRECTION = 1;
    } else if (parseInt(invaders[0].style.left) === 250) {
      moveDown();
      DIRECTION = -1;
    }
    if (parseInt(invaders[20].style.top) > GAME.HEIGHT - INVADER.HEIGHT) {
      clearInterval(moveInvaders);
      alert('GAME OVER');
    }
  }, 1000);

  function moveLateral() {
    for (let n = 0; n < 30; n++) {
      invaders[n].style.left = `${
        parseInt(invaders[n].style.left) + 50 * DIRECTION
      }px`;
      console.log('invaders are comming!');
    }
  }
  function moveDown() {
    setTimeout(function () {
      for (let n = 0; n < 30; n++) {
        invaders[n].style.top = `${
          parseInt(invaders[n].style.top) + INVADER.HEIGHT
        }px`;
      }
    }, 500);
  }

  // Ship movement system
  let spaceshipLeft = window
    .getComputedStyle(spaceship, null)
    .getPropertyValue('left');
  console.log(spaceshipLeft);

  window.addEventListener('keydown', (e) => {
    const { style } = spaceship;
    switch (e.key) {
      // Moving in left direction
      case 'ArrowLeft':
        if (parseInt(spaceship.style.left) % GAME.WIDTH !== 0) {
          // console.log('Moving left');
          style.left = `${parseInt(style.left) - 20}px`;
          // style.transform = 'rotateX(-45deg)';
        } else if (parseInt(spaceship.style.left) === 0) {
          console.log('You hit left border');
          style.left = `${parseInt(style.left) + 20}px`;
        }
        // style.transform = 'rotateX(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(spaceship.style.left) % GAME.WIDTH !== 0) {
          // style.transform = 'rotateX(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (parseInt(spaceship.style.left) === GAME.WIDTH) {
          style.left = `${parseInt(style.left) - 20}px`;
        }
        // style.transform = 'rotateX(0deg)';
        break;
    }
  });

  // restartButton.addEventListener('click', clearInterval(moving));
};

// // Rockets controlls
// case 'Space':
//   break;
