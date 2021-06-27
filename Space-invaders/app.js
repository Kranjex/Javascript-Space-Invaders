// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
const restartButton = document.getElementById('restartButton');
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
  // Alien spawn function

  // invader spawn function = (x,) =>
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
  const invaderLeft = window
    .getComputedStyle(invaders[0], null)
    .getPropertyValue('left');
  console.log(invaderLeft);
  console.log(invaders);

  // Invaders movement system
  const moving = setInterval(function () {
    for (let n = 0; n < 30; n++) {
      // invader.style.left = `${parseInt(invader.style.left) + 50}px`;
      invaders[n].style.left = `${parseInt(invaders[n].style.left) + 50}px`;
      console.log('invaders are comming!');
    }
  }, 1000);

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
          //style.rotateY = 'rotateX(-45deg)';
        } else if (parseInt(spaceship.style.left) === 0) {
          console.log('You hit left border');
          style.left = `${parseInt(style.left) + 20}px`;
        }
        //style.rotateY = 'rotateX(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(spaceship.style.left) % GAME.WIDTH !== 0) {
          //style.rotateY = 'rotateX(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (parseInt(spaceship.style.left) === GAME.WIDTH) {
          style.left = `${parseInt(style.left) - 20}px`;
        }
        //style.transform = 'rotateX(0deg)';
        break;
    }
  });

  // restartButton.addEventListener('click', clearInterval(moving));
};

// // Rockets controlls
// case 'Space':
//   break;
