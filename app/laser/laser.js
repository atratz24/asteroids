function drawLasers() {
  for (let laser of lasers) {
    con.translate(laser.x, laser.y);
    con.rotate(laser.angle);
    con.drawImage(
      laserImg,
      -laser.width * 0.5,
      -laser.height * 0.5,
      laser.width,
      laser.height
    );
    con.rotate(-laser.angle);
    con.translate(-laser.x, -laser.y);
  }
}

function updateLasers(timeChange) {
  let laserKeepers = [];

  for (let laser of lasers) {
    laser.x += laser.velX * timeChange;
    laser.y += laser.velY * timeChange;
    let isKeeper = true;
    if (laser.x > can.width + laser.width * 0.5) {
      isKeeper = false;
    } else if (laser.x < -laser.width * 0.5) {
      isKeeper = false;
    }
    if (laser.y > can.height + laser.height * 0.5) {
      isKeeper = false;
    } else if (laser.y < -laser.height * 0.5) {
      isKeeper = false;
    }
    laserKeepers.push(laser);
  }
  lasers = laserKeepers;
}
