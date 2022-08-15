"use strict";
const MIN_VEL = -0.1;
const MAX_VEL = 0.1;
const WIDTH = 100;
const HEIGHT = 100;
const NUM_ASTEROIDS = 10;
const MIN_SPIN = -0.001;
const MAX_SPIN = 0.001;
const SHIP_SPIN = 0.002;
const LASER_WIDTH = 40;
const LASER_HEIGHT = 8;
const LASER_SPEED = 1;
//
let ship = {
  x: 0,
  y: 0,
  width: WIDTH * 0.5,
  height: HEIGHT * 0.5,
  velX: 0,
  velY: 0,
  angle: 0,
  img: undefined,
  spin: SHIP_SPIN,
  controls: {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    canShoot: true,
  },
};
let laserfire, ignition, turbine, blast, music;
let can, con;
let asteroids = [];
let asteroid_imgs = [];
let timePrior = 0;

let laserImg;
let lasers = [];
window.onload = init;

function animate(timeNow) {
  let timeChange = timeNow - timePrior;
  update(timeChange);
  draw();
  timePrior = timeNow;
  requestAnimationFrame(animate);
}

function draw() {
  con.clearRect(0, 0, can.width, can.height);
  drawLasers();
  drawPlayer();
  drawAsteroids();
}

function getRandom(min, max) {
  let rnd = Math.random();
  let range = max - min;
  let result = min + range * rnd;
  return result;
}

function getRandomInt(min, max) {
  return Math.floor(getRandom(min, max));
}

function handleKD(e) {
  e.preventDefault();
  ship.controls.horizontal = 0;
  switch (e.key) {
    case "ArrowUp":
      ship.controls.ArrowUp = true;
      break;
    case "ArrowLeft":
      ship.controls.ArrowLeft = true;
      break;
    case "ArrowRight":
      ship.controls.ArrowRight = true;
      break;
    case " ":
      ship.controls.Space = true;
      break;
  }
}

function handleKU(e) {
  e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
      ship.controls.ArrowUp = false;
      break;
    case "ArrowLeft":
      ship.controls.ArrowLeft = false;
      break;
    case "ArrowRight":
      ship.controls.ArrowRight = false;
      break;
    case " ":
      ship.controls.Space = false;
      break;
  }
}

function init() {
  can = document.getElementById("can");
  con = can.getContext("2d");
  asteroid_imgs.push(document.getElementById("asteroid_1"));
  asteroid_imgs.push(document.getElementById("asteroid_2"));
  asteroid_imgs.push(document.getElementById("asteroid_3"));
  asteroid_imgs.push(document.getElementById("asteroid_4"));
  asteroid_imgs.push(document.getElementById("asteroid_5"));
  window.addEventListener("keydown", handleKD);
  window.addEventListener("keyup", handleKU);
  window.onresize = resize;
  resize();
  for (let i = 0; i < NUM_ASTEROIDS; i++) {
    asteroids.push(makeAsteroid());
  }
  ship.x = can.width * 0.5;
  ship.y = can.height * 0.5;
  ship.img = document.getElementById("spaceship");
  laserImg = document.getElementById("laser");
  let start = document.getElementById("start");
  start.addEventListener("click", loadSound);
}

function loadSound() {
  document.getElementById("start").style.display = "none";
  turbine = document.getElementById("turbine");
  blast = document.getElementById("blast");
  ignition = document.getElementById("ignition");
  laserfire = document.getElementById("laserfire");
  music = document.getElementById("music");
  music.volume = 0.1;
  music.play();
  requestAnimationFrame(animate);
}

function makeAsteroid() {
  let side = getRandomInt(0, 4);
  let x;
  let y;
  switch (side) {
    case 0:
      //left
      x = 0;
      y = getRandom(0, can.height);
      break;
    case 1:
      //right
      x = can.width;
      y = getRandom(0, can.height);
      break;
    case 2:
      //top
      y = 0;
      x = getRandom(0, can.width);
      break;
    case 3:
      //bottom
      y = can.height;
      x = getRandom(0, can.width);
      break;
  }
  return {
    x: x,
    y: y,
    width: WIDTH,
    height: HEIGHT,
    velX: getRandom(MIN_VEL, MAX_VEL),
    velY: getRandom(MIN_VEL, MAX_VEL),
    velA: getRandom(MIN_SPIN, MAX_SPIN),
    angle: getRandom(0, 2 * Math.PI),
    img: asteroid_imgs[getRandomInt(0, asteroid_imgs.length)],
  };
}

function makeLaser() {
  console.log(ship.angle);
  return {
    x: ship.x,
    y: ship.y,
    width: LASER_WIDTH,
    height: LASER_HEIGHT,
    velX: LASER_SPEED * Math.cos(ship.angle),
    velY: LASER_SPEED * Math.sin(ship.angle),
    angle: ship.angle
  };
}

function resize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
}

function update(timeChange) {
  updatePlayer(timeChange);
  updateAsteroids(timeChange);
  updateLasers(timeChange)
}
