const myGameArea = {
    canvas: document.createElement('canvas'),
    components: [],
    isGamePaused: false,
    isGameOver: false,
    OnPlataform:false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed : false,
    speedgame : 100,
    growspeed : 100,
    isSpaceKeyPressed : false,
    generateCanvas: function () {
        this.canvas.width = 860;
        this.canvas.height = 540;
        this.canvas.className = "cc";
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    update: function () {
            
        if (myGameArea.isGamePaused) return



        const ctx = myGameArea.context

        // render the background
        ctx.drawImage(background.img, background.x, background.y, myGameArea.canvas.width, myGameArea.canvas.height)
        ctx.drawImage(background.img, background.x + background.w, background.y, myGameArea.canvas.width, myGameArea.canvas.height)

        //render score
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + player.score, 50 , 30);
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
       ctx.fillRect(7, 40, 100, 10)
       ctx.fillStyle = player.fuel.color;
       ctx.fillRect(7, 40, player.fuel.value, 10)
     // ctx.fillText("Score: " + player.score, 50 , 30);

            background.x--
            player.bulletController.draw(ctx);

        if (background.x < -background.w) background.x = 0

        // game logic
        for (let i = 0; i < pipesDown.length; i++) {

            let pipe = pipesDown[i]
            if (pipe.x < 0 - pipe.w) {
                let newX = pipesDown[pipesDown.length - 1].x + Pipe.distance;
                console.log(`PLAYER H : ${player.h}`)
                pipesDown.push(new Pipe(newX,player.h))
                pipesDown.shift()

            }
        }

        // it's not GameOver - render the game
        if (!myGameArea.isGameOver) {
            player.points();

              //Games OVER
              if(player.y > ctx.canvas.height || player.x < 0 )
              {
                myGameArea.isGameOver = true;
               return;
              }


            myGameArea.components.forEach(component => {
                component.render()
            })
            player.isOnPlatform = false;

            // Render the Up Pipes, check for collisions and check for out of bounds
            // Render the Down Pipes
            pipesDown.forEach(pipe => {
                if (pipe.checkCollision(player)) {
                    if (player.ySpeed <= 0) {
                        console.log("Plataforma cima")
                        player.y = pipe.y - player.h
                        player.x --;
                        player.xSpeed = 2
                        player.ySpeed = 0
                        player.isOnPlatform = true
                        player.jump = true;
                    }
                    else if (player.ySpeed > 0 && player.y + player.h > pipe.y + pipe.h ) {
                        player.y = pipe.y + pipe.h
                        console.log("Plataforma baixo")
                        player.isOnPlatform = true

                        player.ySpeed = 0
                    }
                
                   //fazer com que o jogador se teleporte para o local onde está a colidir  
                   //tirar a velocidade do x ou do y 
                }

                pipe.x -= 1
                pipe.render()
            })



  // update the player's vertical speed
  if(player.OnPlataform) {
    //   player.ySpeed = player.ySpeed + player.gravity
       player.y = player.ySpeed

   }{
       player.ySpeed = player.ySpeed - player.gravity
       player.y -= player.ySpeed
   }
   

   

   // update the player's horizontal speed
   if (myGameArea.isLeftKeyPressed) {
       player.moveLeft();
   }
   else if (myGameArea.isRightKeyPressed) {
       player.moveRight();
   }
   else if (myGameArea.isSpaceKeyPressed)
   {
       this.shootPressed = true;
   }
   else {
       if(!myGameArea.isUpKeyPressed)
       {
           player.notMove()

       }
   }


                if(player.score > myGameArea.growspeed) {
                   myGameArea.speedgame--;
                   myGameArea.growspeed +=100;
                   console.log("Grow: " + myGameArea.growspeed + "SpeedGame:" +  myGameArea.speedgame)
                }

            

        }
        else {
             
            console.log("Game Over!")
           // ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
            // ctx.drawImage(background.img, background.x, background.y, myGameArea.canvas.width, myGameArea.canvas.height)
                
                ctx.drawImage(background.img, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
                ctx.fillStyle = "red";
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Game Over!", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
                ctx.font = "20px Arial";
                ctx.fillStyle = "white";
                ctx.fillText("Your Final Score: " + player.score, myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 30);
        
        }
    },
   
}

myGameArea.generateCanvas()