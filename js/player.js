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
        this.isOnPlatform = false;
        this.canMoveRight = true;
        this.canMoveUp = true;
        this.score = 0;
        this.getPoint = true;
        this.jump = false;
        this.hp_bar = new Image();
        this.hp_bar.src= "./img/hp_bar.png"
        this.gas = new Image();
        this.gas.src = "./img/gas-can.png";
        this.coin = new Image();
        this.coin.src= "./img/coin.png";
        this.head = new Image();
        this.head.src = "./img/head_white_helmet.png";
        this.playerName = name;
        this.PlayerObj = JSON.parse(window.localStorage.getItem(this.playerName))
        console.log(this.PlayerObj)
        this.damage = 10;
        this.health = 100 ;
        console.log(this.PlayerObj)
        this.fuel = {
            value:100 ,
            color: "rgb(0, 255, 0)"
        }

        this.hlevel = 1;
        this.jlevel= 1;
        this.glevel = 1;
        this.hcost = 25;
        this.jcost = 25;
        this.gcost = 25;
        this.coins = 0;

        this.jetpack = document.createElement('audio')
        this.jetpack.src = "./sound/jetpack.mp3"
        this.jetpack.volume = 0.03
    
        this.coinSound = document.createElement('audio')
        this.coinSound.src = "./sound/coin.mp3"
        this.coinSound.volume = 0.1
        this.hit = document.createElement('audio')
        this.hit.src = "./sound/player_hit.mp3"
        this.hit.volume = 0.05
      
    }

    sprite() {
            
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
        //this.sound.pause()

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
            this.bulletController.shoot(bulletX, bulletY +20, speed, damage, delay);
            if( this.frame>=5)
            {
                this.frame = 0;
            }
          }
    }

    notMove()
    {
        this.jetpack.pause();
        this.choose = 2;
        this.frame++;
        if( this.frame>13)
        {
            this.frame = 0;
        }
    }


 
    moveLeft() {
     

        if(this.isOnPlatform)
        {
            this.choose = 0;
            this.x -= this.xSpeed + myGameArea.gamespeed;
            this.frame--;
            if( this.frame<=0)
            {
                this.frame = 13;
            }

         
        }
        else {
            if(this.fuel.value >0)
            { 
            this.jetpack.play();
            this.x -= this.xSpeed + myGameArea.gamespeed;
            this.choose = 1;
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
            this.fuel.value =  this.fuel.value -0.3;
        }
        else {
            this.jetpack.pause();
            this.choose = 0;
            this.x -= this.xSpeed + myGameArea.gamespeed;
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
          }
        }



        if(!this.isOnPlatform && this.ySpeed < -20){
        pipesDown.forEach(platform => {
           if (this.checkCollision(platform)) {
                if (this.x -10 < platform.x + platform.w ) {
                    //this.x = platform.x - platform.w - myGameArea.gamespeed
                   // this.x = platform.x + this.w -10 -myGameArea.gamespeed 
                     this.x = platform.x -this.w


                }
            }
            
        })
    }
          
    }

    
    
    moveRight() {

        if(this.isOnPlatform)
        {
            this.choose = 0;
            this.x += this.xSpeed +1
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
        }
        else {
            if(this.fuel.value >0)
            { 
            this.jetpack.play();
            this.x += this.xSpeed +1
            this.choose = 1;
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
            this.fuel.value =  this.fuel.value  -0.3;
          }
          else {
            this.jetpack.pause();
            this.choose = 0;
            this.x += this.xSpeed +1
            this.frame++;
            if( this.frame>13)
            {
                this.frame = 0;
            }
          }

        }

        
            if(!this.isOnPlatform ){
            pipesDown.forEach(platform => {
                if (this.checkCollision(platform) && this.ySpeed < -20) {
                    if (this.x > platform.x - this.w -10) {
                               this.x = platform.x - this.w 

                    }
  
                   }

            })
        }


        
    }

    moveUp() {
        if(this.fuel.value >0)
        {   this.jetpack.play();

      
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