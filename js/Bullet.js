class Bullet {
  //   colors = [
  //     "red",
  //     "blue",
  //     "red",
  //     "green",
  //     "yellow",
  //     "orange",
  //     "purple",
  //     "pink",
  //     "brown",
  //     "grey",
  //   ];

  constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.width = 20;
    this.height = 35;
    this.MonsterWidth = 50;
    this.MonsterHeight = 15;
    this.color = "red";
    this.img = new Image();
    this.img.src = "./img/gun_flash.png";
    this.imgMonster = new Image();
    this.imgMonster.src = "./img/missil.png";
    this.missil = document.createElement('audio')
    this.missil.src = "./sound/Missil.mp3"
    this.missil.volume = 0.01
    this.gun = document.createElement('audio')
    this.gun.src = "./sound/gun_shoot.mp3"
    this.gun.volume = 0.03


  }

  draw(ctx) {
    ctx.fillStyle = this.color;
   // this.y -= this.speed;
    this.x +=this.speed;
    if(player.shootPressed)
    {
      this.gun.play();
    }
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    //ctx.fillRect(this.x, this.y, this.width, this.height);

  }
  drawMonster(ctx) {
    ctx.fillStyle = this.color;
   // this.y -= this.speed;
    this.missil.play();
    this.x -=this.speed + myGameArea.gamespeed;
    ctx.drawImage( this.imgMonster , this.x, this.y+5, this.MonsterWidth, this.MonsterHeight)
    //ctx.fillRect(this.x, this.y, this.MonsterWidth, this.MonsterHeight);

  }


  collideWith(sprite) {
    if (
      this.x < sprite.x + sprite.w &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.h &&
      this.y + this.height > sprite.y
    ) {
     // sprite.takeDamage(this.damage);
      console.log("ATINGIDOOOOOOOOOO")
      return true;
    }
    return false;
  }
}
