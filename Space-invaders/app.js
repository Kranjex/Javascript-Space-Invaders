// Constants
const gameScreen = document.getElementById('gameScreen');
const restartBtn = document.getElementById('restartButton');
const spaceship = document.querySelector('.ship');
const restartButton = document.getElementById('restartButton');
const stopwatch = document.getElementById('stopwatch');
const scoreboard = document.getElementById('scoreboard');
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
  LOSECONDITION: media.matches ? 335 : 690,
  SPEED: media.matches ? 30 : 60,
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
  // Stopwatch system
  let seconds = 1;
  let tenSeconds = 0;
  let minutes = 0;
  let tenMinutes = 0;
  const time = setInterval(() => {
    stopwatch.innerText = `${tenMinutes}${minutes}:${tenSeconds}${seconds}`;
    seconds++;
    if (seconds > 9) {
      tenSeconds++;
      seconds = 0;
    }
    if (tenSeconds > 5) {
      minutes++;
      tenSeconds = 0;
    }
    if (minutes > 9) {
      tenMinutes++;
      minutes = 0;
    }
  }, 1000);

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
  // Initial scoreboard score
  scoreboard.innerText = invaders.length;

  // Invaders movement system
  // Popravi spremenljivko once
  let once = true;
  console.log(once);
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
      if (parseInt(invaders[m].style.top) >= GAME.LOSECONDITION) {
        clearInterval(moveInvaders);
        alert('GAME OVER\nYou have lost.');
        break;
      }
    }
    if (invaders.length === 0) {
      alert('GAME OVER\nYou have won.');
      var once = false;
      clearInterval(time);
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
  // Izboljšaj sistem, da bo vsaka raketa letela z enako hitrostjo => setInterval za vsako rakteo posebej
  window.addEventListener('keydown', (e) => {
    const { style } = spaceship;
    switch (e.key) {
      case ' ':
        missileSpawn();
        const missile = document.querySelector('.missile');
        // Missile movement system
        var missileMove = setInterval(() => {
          for (let n = 0; n < missileArray.length; n++) {
            if (parseInt(missileArray[n].style.bottom) >= GAME.HEIGHT) {
              clearInterval(missileMove);
              missileArray.shift();
              missile.remove();
              // gameScreen.removeChild(gameScreen);
            } else if (parseInt(missileArray[n].style.bottom) < GAME.HEIGHT) {
              // console.log(collisionCheck(missileArray[n], invaders));
              collisionCheck(missileArray[n], invaders, missileMove);
              missileArray[n].style.bottom = `${
                parseInt(missileArray[n].style.bottom) + GAME.SPEED
              }px`;
            }
          }
        }, 50);
        break;
    }
  });

  // Missile spawn function
  function missileSpawn() {
    const missile = document.createElement('div');
    missile.classList.add('missile');
    missile.style.left = `${
      parseInt(spaceship.style.left) + (SPACESHIP.WIDTH - MISSILE.WIDTH) / 2
    }px`;
    missile.style.bottom = `${spaceshipBottom + SPACESHIP.HEIGHT}px`;
    gameScreen.appendChild(missile);
    missileArray.push(missile);
  }

  // Rocket collision system
  function collisionCheck(missileObject, invadersArray, interval) {
    const missileCheck = missileObject.getBoundingClientRect();
    // for (let i = invaders.length - 1; i >= 0; i--) {
    for (let i = 0; i < invaders.length; i++) {
      var invaderCheck = invadersArray[i].getBoundingClientRect();
      const collision = !(
        missileCheck.right <= invaderCheck.left ||
        missileCheck.left >= invaderCheck.right ||
        missileCheck.bottom <= invaderCheck.top ||
        missileCheck.top >= invaderCheck.bottom
      );
      if (collision === true) {
        missileArray[0].style.display = 'none';
        missileArray.shift();
        missileObject.remove();
        invaders[i].style.backgroundImage = 'url("img/boom.png")';
        setTimeout(() => {
          invaders[i].style.display = 'none';
          gameScreen.removeChild(invaders[i]);
          invaders.splice(i, 1);
          scoreboard.innerText = invaders.length;
          clearInterval(interval);
        }, 200);
        // missile.remove();
      }
    }
  }
};

// Restart button which reloads the page (reloads game)
restartButton.addEventListener('click', () => {
  location.reload();
});
