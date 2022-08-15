function drawAsteroids() {
  for (let asteroid of asteroids) {
    con.translate(asteroid.x, asteroid.y);
    con.rotate(asteroid.angle);
    con.drawImage(
      asteroid.img,
      -asteroid.width * 0.5,
      -asteroid.height * 0.5,
      asteroid.width,
      asteroid.height
    );
    con.rotate(-asteroid.angle);
    con.translate(-asteroid.x, -asteroid.y);
  }
}

function updateAsteroids(timeChange) {
  for (let asteroid of asteroids) {
    asteroid.angle += asteroid.velA * timeChange;
    asteroid.x += asteroid.velX * timeChange;
    asteroid.y += asteroid.velY * timeChange;
    if (asteroid.x > can.width + asteroid.width * 0.5) {
      asteroid.x -= can.width + asteroid.width;
    } else if (asteroid.x < -asteroid.width * 0.5) {
      asteroid.x += can.width + asteroid.width;
    }
    if (asteroid.y > can.height + asteroid.height * 0.5) {
      asteroid.y -= can.height + asteroid.height;
    } else if (asteroid.y < -asteroid.height * 0.5) {
      asteroid.y += can.height + asteroid.height;
    }
  }
}

