const SHIP_SPEED = 0.1;



function drawPlayer() {
  con.translate(ship.x, ship.y);
  con.rotate(ship.angle);
  con.drawImage(
    ship.img,
    -ship.width * 0.5,
    -ship.height * 0.5,
    ship.width,
    ship.height
  );
  con.rotate(-ship.angle);
  con.translate(-ship.x, -ship.y);
}

function updatePlayer(timeChange) {
  if (ship.controls.Space && ship.controls.canShoot) {
    lasers.push(makeLaser());
    ship.controls.canShoot = false;
    laserfire.currentTime = 0;
    laserfire.play();
    setTimeout(() => {
      ship.controls.canShoot = true;
    }, 300);
  }
  let horizontal = 0;
  if (ship.controls.ArrowLeft) {
    --horizontal;
  }
  if (ship.controls.ArrowRight) {
    ++horizontal;
  }
  ship.angle += ship.spin * horizontal * timeChange;
  if (ship.controls.ArrowUp) {
    ship.velX = SHIP_SPEED * timeChange * Math.cos(ship.angle);
    ship.velY = SHIP_SPEED * timeChange * Math.sin(ship.angle);
  } else {
    ship.velX = ship.velY = 0;
  }
  ship.x += ship.velX;
  ship.y += ship.velY;
}
