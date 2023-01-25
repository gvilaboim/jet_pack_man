
class Monster extends Component {
         
    constructor(x,y,w, h ,bulletController) {
        super(x, y, w , h)
        this.run = [];
        this.atack = [];
        this.dead = [];
        this.img = [ this.run ,  this.atack,   this.dead ];
        this.size = 0;
        this.type="";
        this.frame = 0;
        this.choose = 0;
        this.isAlive = true;
        this.health = 100;
        this.spawnPoint = this.x;
        this.xSpeed = 1
        this.walks= 0;
        this.bulletController = bulletController;
        this.target = false;
        this.damage =25;
        this.giveHealth =10;
        this.coins = Math.floor(Math.random() * 10);
        this.bulletSpeed = 5;

    }

    sprite() {

        for(let a = 0 ;  a  < this.img.length ; a ++)
        {   let folder = "";
            
            if(a == 0)
            {
              folder = "robot/walking";
              this.size = 33;
              this.type="walking";

            }
            if(a == 1)
            {
                folder = "robot/attack";
                this.size = 26;
                this.type="attack";

            }
            if(a == 2)
            {
                folder = "robot/death";
                this.size = 38;
                this.type="death";
            }

    for(let i = 0 ; i < this.size ; i++){

        this.img[a][i] = new Image();
        if(i<10)
        {
            this.img[a][i].src = `img/${folder}/Armature_${this.type}_0`+ i.toString() +'.png';
        }
        else {
            this.img[a][i].src = `img/${folder}/Armature_${this.type}_`+ i.toString() +'.png';

        }
    }
    }

    }

    render() {
    
          if(this.isAlive) {    
        const ctx = myGameArea.context
        if(this.frame > 32)
        {
            this.frame = 0;
        }
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(this.x, this.y -20, 100,4);
        ctx.fillStyle = 'rgba(0,255,0,0.9)';
        ctx.fillRect(this.x, this.y -20, this.health,4);
        ctx.drawImage(this.img[this.choose][this.frame], this.x, this.y, this.w, this.h)
        this.frame++;
        if(this.target)
        {
            this.shooting();

        }

    }
    if(this.choose == 2 && this.frame > 32)    {
        this.isAlive = false;    
    } 
   
}

    moveRight()
{
      this.x += this.xSpeed;
      this.walks++;
}

moveLeft()
{
      this.x -= this.xSpeed ;
      this.walks++;
}

shooting()
{       const speed  = this.bulletSpeed ;
        const delay = 200;
        const damage = this.damage;
        const bulletX = this.x + this.w / 2;
        const bulletY = this.y;
        this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
}

}
