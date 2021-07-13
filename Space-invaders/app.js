// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
const restartButton = document.getElementById('restartButton');
let DIRECTION = 1; // Positive number means moving in right direction, negative value means in other (left) direction

// Variable for media check
var media = window.matchMedia('(max-width: 1920px)');
// Game screen measurements
var GAME = {
  WIDTH: parseInt(
    window.getComputedStyle(gameScreen, null).getPropertyValue('width')
    // or media.matches ? 770 : 1540,
  ),
  HEIGHT: parseInt(
    window.getComputedStyle(gameScreen, null).getPropertyValue('height')
    // or media.matches ? 450 : 900,
  ),
  CHECKPOINT: media.matches ? 710 : 1420,
  DISTANCE: media.matches ? 50 : 100,
  LOSECONDITION: media.matches ? 345 : 690,
};

var SPACESHIP = {
  WIDTH: parseInt(
    window.getComputedStyle(spaceship, null).getPropertyValue('width')
    // or media.matches ?
  ),
  HEIGHT: parseInt(
    window.getComputedStyle(spaceship, null).getPropertyValue('height')
    // or media.matches ?
  ),
};
// Invader measurements
var INVADER = {
  WIDTH: media.matches ? 47 : 94,
  HEIGHT: media.matches ? 33.5 : 67,
  MARGIN: media.matches ? 5 : 10,
};
// Missle measurements
var MISSILE = {
  WIDTH: media.matches ? 32 : 64,
  HEIGHT: media.matches ? 32 : 64,
};

window.onload = () => {
  console.log(GAME, INVADER, SPACESHIP);
  console.log(GAME.HEIGHT - INVADER.HEIGHT);
  // init functions
  // Invader spawn system
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
  // Makes an array of invaders for movement system.
  const invaders = Array.from(document.querySelectorAll('.invader'));

  // Invaders movement system
  const moveInvaders = setInterval(function () {
    moveLateral();
    for (let m = 0; m < invaders.length; m++) {
      if (parseInt(invaders[m].style.left) === 0) {
        moveDown();
        DIRECTION = 1;
        break;
      } else if (parseInt(invaders[m].style.left) > GAME.CHECKPOINT) {
        moveDown();
        DIRECTION = -1;
        break;
      }
      // Spremenljivka LOSECONDITION ne deluje???
      if (parseInt(invaders[m].style.top) === 690) {
        clearInterval(moveInvaders);
        alert('GAME OVER');
        break;
      }
    }
  }, 1000);

  // Movement functions
  function moveLateral() {
    for (let n = 0; n < invaders.length; n++) {
      invaders[n].style.left = `${
        parseInt(invaders[n].style.left) + GAME.DISTANCE * DIRECTION
      }px`;
    }
  }
  function moveDown() {
    setTimeout(function () {
      for (let n = 0; n < invaders.length; n++) {
        invaders[n].style.top = `${
          parseInt(invaders[n].style.top) + INVADER.HEIGHT
        }px`;
      }
    }, 500);
  }

  // Ship movement system
  window.addEventListener('keydown', (e) => {
    const { style } = spaceship;
    switch (e.key) {
      // Moving in left direction
      case 'ArrowLeft':
        if (parseInt(spaceship.style.left) / GAME.WIDTH > 0) {
          spaceship.style.transform = 'rotate(-45deg)';
          style.left = `${parseInt(style.left) - 20}px`;
        } else if (parseInt(spaceship.style.left) < 0) {
          style.left = `${parseInt(style.left) + 20}px`;
        }
        spaceship.style.transform = 'rotate(0deg)';
        break;
      // Moving in right direction
      case 'ArrowRight':
        if (parseInt(spaceship.style.left) < GAME.WIDTH - SPACESHIP.WIDTH) {
          spaceship.style.transform = 'rotate(45deg)';
          style.left = `${parseInt(style.left) + 20}px`;
        } else if (
          parseInt(spaceship.style.left) >
          GAME.WIDTH - SPACESHIP.WIDTH
        ) {
          style.left = `${parseInt(style.left) - 20}px`;
        }
        spaceship.style.transform = 'rotate(0deg)';
        break;
    }
  });

  const spaceshipBottom = parseInt(
    window.getComputedStyle(spaceship, null).getPropertyValue('bottom')
  );

  const missileArray = [];

  // Spaceship's shooting system
  // Dodaj array zaradi preverjanja posamezne rakete => setInterval( for missile[n] { if missile[n] === GAME.HEIGHT ali se dotika INVADER potem izbriši })
  window.addEventListener('keydown', (e) => {
    const { style } = spaceship;
    switch (e.key) {
      case ' ':
        console.log('Bang Bang');
        missileSpawn();
        const missile = document.querySelector('.missile');
        console.log(parseInt(missile.style.bottom), GAME.HEIGHT);
        // Missile movement system
        var missileMove = setInterval(() => {
          if (parseInt(missile.style.bottom) < GAME.HEIGHT) {
            missile.style.bottom = `${
              parseInt(missile.style.bottom) + GAME.DISTANCE * 5
            }px`;
          } else {
            console.log('neka ne dela');
            clearInterval(missileMove);
            document.removeChild(missile);
            missileArray.shift();
          }
        }, 200);
        break;
    }
  });

  // Missile spawn function
  function missileSpawn() {
    // console.log('missile spawned!');
    // console.log(parseInt(spaceship.style.left));
    // console.log(spaceshipBottom);
    const missile = document.createElement('div');
    missile.classList.add('missile');
    missile.style.left = `${
      parseInt(spaceship.style.left) + (SPACESHIP.WIDTH - MISSILE.WIDTH) / 2
    }px`;
    missile.style.bottom = `${spaceshipBottom + SPACESHIP.HEIGHT}px`;
    gameScreen.appendChild(missile);
    missileArray.push(missile);
  }
};

// Restart button which reloads the page (reloads game)
restartButton.addEventListener('click', () => {
  location.reload();
});
