class Player extends Component {
    static height = 0;

    constructor(x, y, w, h ,bulletController,name) {
        super(x, y, w, h)
        this.fly = [];
        this.run = [];
        this.stopped = [];
        this.shoot = [];
        this.bullet = new Image();
        this.img = [ this.run , this.fly ,  this.stopped , this.shoot];
        this.damage = 20;
        this.bullets = 0;
        this.bspeed = 3;
        this.bulletController = bulletController;
        this.shootPressed = false;
        this.t = 14;
        this.choose = 0;
        this.frame = 0;
        this.gravity = 0.1
        this.ySpeed = 0
        this.xSpeed = 1
        this.OnPlataform = false;
        this.canMoveRight = true;
        this.canMoveUp = true;
        this.score = 0;
        this.getPoint = true;
        this.jump = false;
        this.hp_bar = new Image();
        this.hp_bar.src= "img/hp_bar.png"
        this.gas = new Image();
        this.gas.src = "./img/gas-can.png";
        this.coin = new Image();
        this.coin.src= "./img/coin.png";
        this.playerName = name;
        this.health = 100;
        this.coins = 0;
        this.fuel = {
            value:100,
            color: "rgb(0, 255, 0)"
        }
    }

    sprite() {
        /*  //Stoped == 0
              this.img[0] = new Image();
              this.img[0].src = "img/jet_pack_sprite/stopped.png"
              // Running ==1
              this.img[1] = new Image();
              this.img[1].src = "img/jet_pack_sprite/standing_run.png"
             // Flying  == 2
             this.img[2] = new Image();
             this.img[2].src = "img/jet_pack_sprite/flying.png"
             // Flying Shooting == 3
             this.img[3] = new Image();
             this.img[3].src = "img/jet_pack_sprite/flying_shoot.png"
             // Flying Shooting == 4
             this.img[4] = new Image();
             this.img[4].src = "img/jet_pack_sprite/stopped_shoot.png"
  */
       
        for(let a  = 0 ;  a  < this.img.length ; a ++)
        {   let folder
            
            if(a == 0)
            {
              folder = "jet_running";
              this.t = 14;
            }
            if(a == 1)
            {
                folder = "jet_fly";
                this.t = 14;
            }
            if(a == 2)
            {
                folder = "jet_stopped";
                this.t = 14;
            }
            if(a == 3)
            {
                folder = "jet_shooting";
                this.t = 5;
                console.log("Loading shooting")
            }
        

    for(let i = 0 ; i < this.t ; i++){

        console.log("Loading shooting ->" + i);
        this.img[a][i] = new Image();
        if(i>=10)
        {
            this.img[a][i].src = `img/${folder}/tile0`+ i.toString() +'.png';

        }
        else {
            this.img[a][i].src = `img/${folder}/tile00`+ i.toString() +'.png';

        }
    }
    }

    
}


    // This render() is ONLY FOR THE PLAYER
    render() {
        const ctx = myGameArea.context
        ctx.drawImage(this.img[this.choose][this.frame], this.x, this.y, this.w, this.h)
        this.shooting(ctx);
    }
    shooting(ctx)
    {
        if (this.shootPressed) {
            this.choose = 3;
            this.frame++;
            const speed = 5;
            const delay = 7;
            const damage = this.damage;
            const bulletX = this.x + this.w / 2;
            const bulletY = this.y;
         //   console.log( this.bulletController);
            this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
            
            if( this.frame>=5)
            {
                this.frame = 0;
            }
          }
    }

    notMove()
    {
        this.choose = 2;
        this.frame++;
        if( this.frame>13)
        {
            this.frame = 0;
        }
    }


 
    moveLeft() {
        this.choose = 0;
        this.x -= this.xSpeed ;
        this.frame--;
        if( this.frame<=0)
        {
            this.frame = 13;
        }
        if(!this.isOnPlatform){
        pipesDown.forEach(platform => {
            if (this.checkCollision(platform)) {
                if (this.x < platform.x + platform.w) {
                    this.x = platform.w + platform.x - myGameArea.gamespeed

                }
            }
        })
    }
          
    }

    
    
    moveRight() {
            this.choose = 0;
            this.x += this.xSpeed +1
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
            if(!this.isOnPlatform){
            pipesDown.forEach(platform => {
                if (this.checkCollision(platform)) {
                    if (this.x > platform.x - this.w) {
                            this.x = platform.x - this.w - myGameArea.gamespeed
                            
                    }   }

            })
        }


        
    }

    moveUp() {
            if( this.fuel.value >=70)
            {
                this.choose = 1;
                this.frame++;
                if( this.frame>13)
                {
                    this.frame = 0;
                }

                this.fuel.color ="rgb(0, 255, 0)";
                this.fuel.value =  this.fuel.value  -2;
            }
            else if (this.fuel.value >= 50 && this.fuel.value <= 70) {
                this.choose = 1;
                this.frame++;
                if( this.frame>13)
                {
                    this.frame = 0;
                }
                
            this.fuel.color = "rgb(100, 255, 0)";
            this.fuel.value =  this.fuel.value  -2;
        }
            else if(this.fuel.value > 0 && this.fuel.value <= 50)
            {
                this.choose = 1;
                this.frame++;
                if( this.frame>13)
                {
                    this.frame = 0;
                }
                
                this.fuel.color = "rgb(255, 0, 0)";
                this.fuel.value =  this.fuel.value  -2;
            }
            if(this.fuel.value<=0)
         {     
            if(this.jump) {
                this.choose = 0;
                this.frame++;
                if( this.frame>13)
                {
                    this.frame = 0;
                }
                
                this.ySpeed = 3
                this.jump = false;
            }
            else {
                this.ySpeed = -3;
            }
            
         }
         else {
            this.ySpeed = 3
         } 
        
          
    }
    points() {
        if( this.getPoint)
        {
            this.score++;
        }
      
    }

    

}