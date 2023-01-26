
 class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay) {

    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage));

      this.timerTillNextBullet = delay;
    }

    this.timerTillNextBullet--;
  }

  draw(ctx) {

    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.draw(ctx);
    });
  }

  drawMonster(ctx) {

    this.bullets.forEach((bullet) => {
      if (this.isBulletOffScreen(bullet)) {
        const index = this.bullets.indexOf(bullet);
        this.bullets.splice(index, 1);
      }
      bullet.drawMonster(ctx);
    });
  }


  collideWithM(sprite) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        myGameArea.monsters[0].hit.play();
        return true;
      }
      return false;
    });
  }
  collideWith(sprite) {
    return this.bullets.some((bullet) => {
      if (bullet.collideWith(sprite)) {
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        return true;
      }
      return false;
    });
  }

  isBulletOffScreen(bullet) {
    return bullet.y <= -bullet.height;
  }
  
}
