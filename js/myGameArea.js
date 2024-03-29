const myGameArea = {
    canvas: document.createElement('canvas'),
    components: [],
    isGamePaused: false,
    isGameOver: false,
    OnPlataform:false,
    isLeftKeyPressed: false,
    isRightKeyPressed: false,
    isUpKeyPressed : false,
     shop : document.getElementById("shop"),
    speedgame : 100,
    gamespeed : 1,
    gallons : [],
    monsters : [],
    isSpaceKeyPressed : false,
    generateCanvas: function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height =  window.innerHeight;
        this.canvas.className = "cc";
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    update: function () {
        document.getElementById("main-menu").style.display = "none";
        document.getElementById("main-menu").style.visibility = 'hidden';
        if (myGameArea.isGamePaused) return

        const ctx = myGameArea.context

        // render the background
        ctx.drawImage(background.img, background.x, background.y, myGameArea.canvas.width, myGameArea.canvas.height)
        ctx.drawImage(background.img, background.x + background.w, background.y, myGameArea.canvas.width, myGameArea.canvas.height)

        //render score

        //player health 
        /*
        console.log("###################");
        console.log("Player Health: " + player.health);
        console.log("Player Hlevel :" + player.hlevel);
        console.log("Player jlevel :" + player.jlevel);
        console.log("Player glevel :" + player.glevel);
        console.log("Player  gcost: " +player.gcost); 
        console.log("Player hcost: " +player.hcost);
        console.log("Player jcost: " +player.jcost);
        console.log("Player damage: " +player.damage);
        console.log("###################");  */
        if(player.health < 100 && player.hlevel >1)
        {
            player.health += player.hlevel/100
        }
        if(player.glevel >1)
        {
            player.damage = 10 * player.glevel;
        }
        
      /*  if(player.jlevel >1)
        {
            player.fuel.value = 100 + 25 * player.jlevel;
        } */

        //Name Player
        ctx.drawImage(player.head, 7, 10, 25,25)
        ctx.font = " bold italic 15pt Courier";
        ctx.fillStyle = "white";
        ctx.fillText(player.playerName, 79,30);

       ctx.drawImage(player.hp_bar, 7, 40, 100,20)
       ctx.fillStyle = "black";
       ctx.fillRect(105, 43, player.health - 100,12)

        //player gas
        ctx.fillStyle = "black";
        ctx.fillRect(10, 75, 75 + (25 * player.jlevel), 12)
        ctx.fillStyle = player.fuel.color;
        ctx.fillRect(10, 75, player.fuel.value, 12)
        ctx.drawImage(player.gas, 5,65, 25,25)

       //player coins
       ctx.drawImage(player.coin, 5, 100, 20,20)
       ctx.font = "20px Arial";
       ctx.fillStyle = "Yellow";
       ctx.fillText(player.coins + "$", 45 ,118);

        //player Score

        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + player.score, 60, myGameArea.canvas.height -10);

       //player disparar
        player.bulletController.draw(ctx);


        if (background.x < -background.w) background.x = 0

        // game logic
        for (let i = 0; i < pipesDown.length; i++) {
            let pipe = pipesDown[i]
            if (pipe.x < 0 - pipe.w) {
                let newX = pipesDown[pipesDown.length - 1].x + Pipe.distance;
                let newy = pipesDown[pipesDown.length - 1].y + Pipe.height;
                console.log(`PLAYER H : ${player.h}`)
                pipesDown.push(new Pipe(newX,newy))
                pipesDown.shift()
            }
        }

        //galons
        for(let i = 0; i <myGameArea.gallons.length ; i++)
        {
            let g = myGameArea.gallons[i];
            if(g.x < 0 - g.w)
            {
                let newX = myGameArea.gallons[myGameArea.gallons.length - 1].x + Gallon.distance;
                let newy = myGameArea.gallons[myGameArea.gallons.length - 1].y + Gallon.height;
             //   console.log(`Gallon X : ${newX} |Y:${newy}`)

                myGameArea.gallons.push(new Gallon(newX,newy))
                myGameArea.gallons.shift()
            }
        }
        //enemys 
        
        



        // it's not GameOver - render the game
        if (!myGameArea.isGameOver) {
            shop.style.zIndex = "0";

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
            myGameArea.gallons.forEach(gallon => {
                gallon.render()
            })

            player.isOnPlatform = false;

            // Render the Up Pipes, check for collisions and check for out of bounds
            // Render the Down Pipes
            pipesDown.forEach(pipe => {

                if(myGameArea.monsters.length > 0)
                {

              
                if(myGameArea.monsters[0].bulletController.collideWith(pipe))
                {
                    myGameArea.monsters[0].bulletController.bullets.pop();
                }
            }
                if(player.bulletController.collideWith(pipe) ) 
                {

                    player.bulletController.bullets.pop();
                }

                if (pipe.checkCollision(player)) {
                    //player.ySpeed <= 0
                    //player.isOnPlatform = true
                    if ( player.ySpeed <= 0 && player.y < pipe.y ) {
                      //  console.log("Plataforma cima")
                        player.y = pipe.y - player.h +20
                        player.x -= myGameArea.gamespeed;
                        player.xSpeed = 2
                        player.ySpeed = 0
                        player.isOnPlatform = true
                       // player.OnPlatform = true

                        player.jump = true;
                    }
                    else if (player.ySpeed > 0 && player.y + player.h > pipe.y + pipe.h ) {
                        player.y = pipe.y + pipe.h
                      //  console.log("Plataforma baixo")
                        player.isOnPlatform = true
                        player.ySpeed = 0
                    }
                
                   //fazer com que o jogador se teleporte para o local onde está a colidir  
                   //tirar a velocidade do x ou do y 
                }

                pipe.x -=myGameArea.gamespeed;
                if (pipe.checkCollision(player)){
                    player.x -=myGameArea.gamespeed;
                }
                pipe.render()
            })




            myGameArea.gallons.forEach((gallon , index )=> {

                if (player.checkCollision(gallon) &&  gallon.pickUp) {

                    gallon.sound.play();
                  //  console.log(`Index Fuel -> ${index}`);

                  //40

                    player.fuel.value += 50;
                    if( player.fuel.value >= 75 + (25* player.jlevel))
                    {
                       player.fuel.value =  75 + (25* player.jlevel);
                    }
                    player.fuel.color= "rgb(0, 255, 0)";
                    gallon.img.src = "";
                    gallon.pickUp = false;
                }

                gallon.x -= myGameArea.gamespeed;
                gallon.render()
               
            })




            //monsters         

            if(myGameArea.monsters.length <= 0)
            {    const bulletController = new BulletController(ctx);
                console.log("Monster Cordenadas : "+ pipesDown[3].x + "" + pipesDown[3].y  )
                myGameArea.monsters.push(new Monster(pipesDown[3].x  ,pipesDown[3].y -80,100,80 ,bulletController ));
                console.log("SPAWN MONSTERRR");
                console.log(  myGameArea.monsters[0]);
                myGameArea.monsters[0].sprite();
            }
            myGameArea.monsters[0].render();
            myGameArea.monsters[0].x -= myGameArea.gamespeed;
            myGameArea.monsters[0].spawnPoint -= myGameArea.gamespeed;
            myGameArea.monsters[0].spawnPoint -= myGameArea.gamespeed;

          //  myGameArea.monsters[0].bulletSpeed  myGameArea.gamespeed;

            if( player.y + player.w >= myGameArea.monsters[0].y  &&  player.y  <= myGameArea.monsters[0].y + 70)
            {
                myGameArea.monsters[0].target = true;
            }
            else if (player.y  + player.w  <= myGameArea.monsters[0].y  &&  player.y + player.w  >= myGameArea.monsters[0].y -70)
            {
                myGameArea.monsters[0].target = true;

            }
            else {
                myGameArea.monsters[0].target = false;

            }
       

            myGameArea.monsters[0].bulletController.drawMonster(ctx);




           console.log(myGameArea.monsters[0].walks && myGameArea.monsters[0].isAlive)
            if( myGameArea.monsters[0].walks <100)
            {
                myGameArea.monsters[0].moveRight();
                
            }
            else if(myGameArea.monsters[0].walks >=100 && myGameArea.monsters[0].walks <200 && myGameArea.monsters[0].isAlive){

                
                myGameArea.monsters[0].moveLeft();
            }
            else {
                myGameArea.monsters[0].walks = 0;
            }
            



            if(myGameArea.monsters[0].x <= 0)
            {
                myGameArea.monsters.pop();
            }

            if(myGameArea.monsters[0].bulletController.collideWith(player))
            {
                player.hit.play();
                player.health -= myGameArea.monsters[0].damage;
                if(player.health <=0)
                {
                    myGameArea.isGameOver = true;
                }
            }

            if(player.bulletController.collideWithM(myGameArea.monsters[0]) && myGameArea.monsters[0].isAlive)
            {
                myGameArea.monsters[0].hit.play();

                if(myGameArea.monsters[0].health > 0)
                {
                    myGameArea.monsters[0].health -= player.damage;

                }
                if(myGameArea.monsters[0].health <= 0 && myGameArea.monsters[0].isAlive)
                {   
                    console.warn("MONSTRO DEAD");
                    myGameArea.monsters[0].choose = 2;
                    Math.floor(Math.random * 51)

                    setTimeout(() => {
                        player.coins +=  myGameArea.monsters[0].coins;
                        player.health +=  myGameArea.monsters[0].giveHealth;
                        player.coinSound.play();

                        if( player.health >100)
                        {
                            player.health=100;
                        }
                        myGameArea.monsters[0].bulletController.bullets = [];
                        myGameArea.monsters.pop();
                    }, "500")
                }
              
            }


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
             background.x -= myGameArea.gamespeed;
           //  player.xSpeed += myGameArea.gamespeed;

                if(player.score >  myGameArea.speedgame) {
                   
                    
                        myGameArea.monsters[0].bulletSpeed += 0.1;
                    
                        
                   myGameArea.speedgame += 200;
                   myGameArea.growspeed += 1;
                   myGameArea.gamespeed =  myGameArea.gamespeed + 0.1;
                  
                //   myGameArea.monsters[0].xSpeed += myGameArea.gamespeed;
 
                  // console.log("Grow: " + myGameArea.growspeed + "SpeedGame:" +  myGameArea.gamespeed)
                }

            

        }
        else {
            let obj = {
                'name' : player.playerName,
                'coins' : player.coins,
                'score' : player.score,
                'jetpack': player.jlevel,
                'healt':player.hlevel,
                'gun':player.glevel
            }
            localStorage.setItem(player.playerName, JSON.stringify(obj));

            console.log("Game Over!")
           // ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
            // ctx.drawImage(background.img, background.x, background.y, myGameArea.canvas.width, myGameArea.canvas.height)
                ctx.drawImage(background.img, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height)
                ctx.fillStyle = 'rgb(48, 46, 46,0.5)';
                ctx.fillRect(myGameArea.canvas.width / 2 -250, myGameArea.canvas.height / 2 -250,500,500);
                ctx.textAlign = "center";
                ctx.font = "80px VT323";
                ctx.textAlign = "center";
                ctx.fillStyle = "red";
                ctx.fillText("Game Over!", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 -160);
                ctx.font = "40px  VT323";
                ctx.fillStyle = "white";
                ctx.fillText("Your Final Score: " + player.score, myGameArea.canvas.width / 2,myGameArea.canvas.height / 2 - 120);
                ctx.font = "40px  VT323";
                ctx.fillStyle = "Yellow";
                ctx.fillText(player.coins + "$",  myGameArea.canvas.width / 2,myGameArea.canvas.height / 2 - 80);
                ctx.fillStyle = 'rgba(200,200,200,0.2)';
            //  ctx.fillRect(myGameArea.canvas.width / 2 -175, myGameArea.canvas.height / 2 -100 ,350,250);
                ctx.font = "italic 40px  VT323";
                ctx.fillStyle = "white";
                ctx.fillText("High Score Board", myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2 -30 );
                ctx.fillStyle = "white";
                ctx.strokeRect(myGameArea.canvas.width / 2 -200 , myGameArea.canvas.height / 2 -20 , 400, 1);

                ctx.fillStyle = "white";
                ctx.font = "bold italic 20pt VT323";
                ctx.fillText('Press "S" to Enter Shop Menu! ', myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2+ 200  );

        
                let top =  [];
                // iterate localStorage
for (var i = 0; i < localStorage.length; i++) {
    // set iteration key name
    var key = localStorage.key(i);
    // use key name to retrieve the corresponding value
    var value = localStorage.getItem(key);
    top.push(JSON.parse(value));
  }
  //top.sort((a, b) => (a.score > b.score) ? 1: -1);
  top.sort((a, b) => (b.score - a.score));
  ctx.fillStyle = "white";
   ctx.font = "bold italic 13pt Courier";
   let n = 3;
   if(localStorage.length>3)
   {
    n = 3;
   }
   else {
    n = localStorage.length;
   }
    for(let i = 0;  i <n ; i ++)
    {
        ctx.fillText('Player: '+top[i].name +' Score: ' +top[i ].score , myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2 + 10+ (60 * i) );
    }

  //   localStorage.clear();
        }
    },
   
}

myGameArea.generateCanvas()
