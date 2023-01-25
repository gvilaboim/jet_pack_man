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

        if( this.PlayerObj) {

        if(this.PlayerObj.glevel>1)
        {
            this.damage = 10 + 5 * this.PlayerObj.glevel;
        }
        if(this.PlayerObj.hlevel>1)
        {
            this.health = 100 + 25 * this.PlayerObj.hlevel ;
        }
        if(this.PlayerObj.coins >0)
        {
            this.coins = this.PlayerObj.coins ;
        }
        if(this.PlayerObj.jlevel>0)
        {
            this.fuel.value += 10 * this.PlayerObj.jlevel;
        }
    }
    else {
        this.hlevel = 1;
        this.jlevel= 1;
        this.glevel = 1;
        this.hcost = 25;
        this.jcost = 25;
        this.gcost = 25;
        this.coins = 0;

    }
       

      
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
        this.choose = 2;
        this.frame++;
        if( this.frame>13)
        {
            this.frame = 0;
        }
    }


 
    moveLeft() {
        this.choose = 0;
        this.x -= this.xSpeed + myGameArea.gamespeed;
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