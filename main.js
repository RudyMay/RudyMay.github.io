import { moveLeft, moveRight } from "./controller.js";
import { renderEnemies } from "./enemies.js";
import { pad } from "./timer.js";

//TEXT ELEMENTS-------------------------------------------------------
let level = document.getElementById("level");
let levelNumber = 1;
let advice = document.getElementById("advice");

//BOARD ELEMENTS------------------------------------------------------
const board = document.getElementById("board"); //manipulacion del canvas
const boardWidth = 925;
let enemies = new Array();
let enemies_lvl_1 = renderEnemies("lvl_enemies_1", 4);
let enemies_lvl_2 = renderEnemies("lvl_enemies_2", 3);
let enemies_lvl_3 = renderEnemies("lvl_enemies_3", 1);
let enemies_lvl_4 = renderEnemies("lvl_enemies_4", 4);
enemies = enemies_lvl_1;
let speed = 17;
let spawnRate = 180;
let speedInterval = setInterval(moveCandies, speed);
let spawnInterval = setInterval(spawnCandies, spawnRate);

//JET----------------------------------------------------------------
let jet = document.getElementById("jet");//Manipulacion del diente
const tooth = document.getElementById("tooth");//Manipulacion del diente
let jetMoveDistance = jet.offsetWidth/2;
jet.style.position = 'absolute';
jet.style.left = 0;

//TIME----------------------------------------------------------------
// let minutesLabel = document.getElementById("minutes");
// let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let gameInterval = setInterval(setTime, 1000);

window.addEventListener('keydown', jetController, true);

function jetController(e) {
  let position = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  getJetPosition(e, position);
}

function getJetPosition(e, position) {
  let origin = jet.style.left;
  if(e.key == 'ArrowLeft') {
    jet.style.left = position > 0 ? moveLeft(origin, jetMoveDistance): origin;
  }
  if(e.key == 'ArrowRight') {
    jet.style.left = position <= boardWidth ? moveRight(origin, jetMoveDistance): origin;    
  }
}

function setTime() {
  ++totalSeconds;
  checkLevelTime();
}

function checkLevelTime() {
  switch(totalSeconds) {
    case 1:
      setLevelAdvice("¡Evita comidas azucaradas!");
      break;
    case 10: 
      enemies = enemies_lvl_2;
      increaseLevel();
      setLevelAdvice("¡Evita golosinas duras!");
      changeBackground("imgs/N2.png");
      break;
    case 25:
      enemies = enemies_lvl_3;
      increaseLevel();
      setLevelAdvice("¡Evita mascar hielo!");
      changeBackground("imgs/N3.jpg");
      break;
    case 45: 
    enemies = enemies_lvl_4;
      increaseLevel();
      setLevelAdvice("¡Evita las bebidas azucaradas!");
      changeBackground("imgs/N4.png");
      break;
    case 70: 
      enemies = [...enemies_lvl_1, ...enemies_lvl_2, ...enemies_lvl_3, ...enemies_lvl_4];
      increaseLevel();
      setLevelAdvice("¡Protege tus dientes!");
      changeBackground("imgs/N5.png");
      break;
    case 100: 
      onWinGame();
      break;
  }
}

function increaseLevel() {
  increaseLevelNumber();
  increaseSpeed();
  increaseSpawnRate();
}

function increaseLevelNumber() {
  levelNumber++;
  level.innerHTML = "Nivel " + levelNumber;
}

function increaseSpeed() {
  speed = speed - 3;
}

function increaseSpawnRate() {
  spawnRate = spawnRate*0.75;
}

function setLevelAdvice(adviceText) {  
  advice.innerHTML = adviceText;  
  advice.style.visibility = "visible";
  advice.style.animationPlayState = "running";
  setTimeout(() => restartAdviceAnimation(), 2000);  
}

function restartAdviceAnimation() {  
  advice.style.animation = "none";
  advice.offsetHeight;
  advice.style.animation = null
  setAdviceHidden();
}

function setAdviceHidden() {
  advice.style.visibility = "hidden";
}

function changeBackground(backgroundImage) {
  board.style.backgroundImage = "url" + "(" + backgroundImage + ")";
}

function spawnCandies () {
  let candy = document.createElement("div");
  candy.classList.add("candies");

  //obtenemos la propiedad left para generar los siguientes dulces
  candy.style.left = getRandomPath() + "px";
  board.appendChild(candy);
  clearInterval(spawnInterval);    
  spawnInterval = setInterval(spawnCandies, spawnRate);
};

function getRandomPath() {
  let cells = (boardWidth + 50)/jetMoveDistance;
  return Math.floor(Math.random() * cells) * jetMoveDistance;
}

function moveCandies() {
  let candies = document.getElementsByClassName("candies");

  if (candies != undefined) {
    let candy;
    
    for (let i = 0; i < candies.length; i++) {
      //se incrementa el top de cada dulce para moverlas en el dom
      candy = candies[i]; //obtenemos cada dulce

      let candytop = parseInt(
        window.getComputedStyle(candy).getPropertyValue("top")
      );

      candy.style.top = candytop + 5 + "px";
      if(candytop > 550){
        candy.parentElement.removeChild(candy);
      }

      if(overlaps(candy,jet)){                
        onLoseGame();        
      }

    }
    
    candy.style.background= "url" + "(" + enemies[parseInt(Math.random()*enemies.length)].src + ")";
    candy.style.backgroundSize="25px 25px";
  }
   
  clearInterval(speedInterval);
  speedInterval = setInterval(moveCandies, speed);
};

function overlaps(a, b) {
  let candies = document.getElementsByClassName("candies");
  let candy;
  let jetbound = jet.getBoundingClientRect();
  let overlaping = false;

  for (let i = 0; i < candies.length; i++) {
    candy = candies[i];
    if (candy != undefined) {
      const rect1 = a.getBoundingClientRect();
      const rect2 = b.getBoundingClientRect();
      const isInHoriztonalBounds =
        rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        
      const isInVerticalBounds =
        rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
      overlaping = isInHoriztonalBounds && isInVerticalBounds;
    }
  }
  
  return overlaping;
}

function onWinGame() {
  stopGame();
  stopEnemies();
  showWinGame();
  showRestart();
}

function stopGame() {
  clearInterval(gameInterval);
  window.removeEventListener('keydown', jetController, true);
}

function stopEnemies() {
  clearInterval(speedInterval);
  clearInterval(spawnInterval);
}

function showWinGame() {
  let wingame = document.getElementById("wingame");
  wingame.style.display = "block";
  wingame.style.animationPlayState = "running";
}

function onLoseGame() {
  destroyJet();
  stopGame();
  setAdviceHidden();
  showGameover();
  showDeadTooth();
  showRestart();
}

function destroyJet() {
  tooth.style.animationPlayState = "running";
}

function showGameover() {
  let gameover = document.getElementById("gameover");
  gameover.style.display = "block";
  gameover.style.animationPlayState = "running";
}

function showDeadTooth() {
  let deadTooth = document.getElementById("deadTooth");
  deadTooth.style.display = "block";
  deadTooth.style.animationPlayState = "running";
}

function showRestart() {
  let restart = document.getElementById("restart");
  restart.style.visibility = "visible";
  restart.style.animationPlayState = "running";
}