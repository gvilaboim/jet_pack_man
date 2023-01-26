let i = 0;
let isStarted = false;
let isPaused = false;
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    mainMenu();
});

function mainMenu()
{
       
     new Monster(0,0,0, 0,0);
     new Pipe(0,0);
     new Bullet(0,0,0,0);
     new Gallon(0,0);
    let s = document.getElementById("shop")
    document.body.style.backgroundImage = ``;
    s.style.display="block"
    s.style.zIndex = "1";
    const ctx = myGameArea.context;
    ctx.canvas.hidden = false;
    console.log(ctx);
  
    ctx.fillStyle = 'rgb(48, 46, 46,0.5)';
    ctx.fillRect(myGameArea.canvas.width / 2 -250, myGameArea.canvas.height / 2 -250,500,500);
    ctx.font = "80px VT323";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("Jet Pack Man!", myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2 - 160);
    ctx.font = "30px VT323";
    ctx.fillText("Made by Gonçalo Vilaboim", myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2 - 120);

    ctx.fillStyle = "white";
    ctx.font = "italic 13pt Courier";
    ctx.fillText('Press "Enter" to Start! ', myGameArea.canvas.width / 2, myGameArea.canvas.height / 2  -70);
    ctx.fillText("Arrow Left -> Move Left " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 -20);
    ctx.fillText("Arrow Right -> Move Right " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 +20);
    ctx.fillText("Arrow Up -> Jump/Fly " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 60 );
    ctx.fillText('Space Bar  -> Shoot ' , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 100 );
    ctx.fillText("Esc -> Game Pause/Resume " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 140 );
    document.getElementById("pname").style.zIndex = "2";
    document.getElementById("main-menu").style.display ="inline";
    document.getElementById("main-menu").style.visibility = 'visible';

}
function start() {
    // Create the Background
    document.getElementById("pname").style.zIndex = "-1";
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("main-menu").style.visibility = 'hidden';
    document.getElementById("shop").style.display = "none";

   // let username = prompt("Choose a name to Play Jet Pack Man!: ")
    let username = document.getElementById("pname").value
    const bulletController = new BulletController(myGameArea.context);
    player = new Player( myGameArea.canvas.width/2,0,120,90,bulletController,username)
    player.sprite();
    myGameArea.components.push(player)

    background = new Component(0, 0, myGameArea.canvas.width, myGameArea.canvas.height, "white")
    background.img = new Image();
    background.img.src ="./img/game_background_1.png";

    // Generate Pipes & Gallons
    for (let i = 0; i < 4; i++) {
        pipesDown.push(new Pipe(Pipe.distance * i , i * Pipe.height))
        myGameArea.gallons.push(new Gallon((Pipe.distance * i + Gallon.distance) , (i * Pipe.height ) +500))
    }

    updateTimer = setInterval(myGameArea.update, 1000 / 100)
    isStarted = true;
    

}

function upgradeJetPack()
{   

    if(player.coins >= player.jcost )
    {
        player.coinSound.play();
        player.coins -= player.jcost
        player.jlevel +=1;
        document.getElementById("jlevel").innerText = player.jlevel ;
        player.jcost = 25 * player.jlevel ;
        document.getElementById("upCostJet").innerText = `Upgrade ${player.jcost}$`;
        document.getElementById("coins").innerText = "Coins: "+ player.coins +"$" ;
        let obj = {
            'name' : player.playerName,
            'coins' : player.coins,
            'score' : player.score,
            'jetpack': player.jlevel,
            'healt':player.hlevel,
            'gun':player.glevel
        }
        localStorage.setItem(player.playerName, JSON.stringify(obj));
    }
   

}
function upgradeHealth()
{
   
    console.log("Health Cost " + player.hcost)
    console.log("money" + player.coins)
    if(player.coins >= player.hcost )
    {
        player.coinSound.play();

        player.coins -= player.hcost
    player.hlevel +=1;
    document.getElementById("hlevel").innerText = player.hlevel ;
    player.hcost = 25 * player.hlevel ;
    document.getElementById("upCostHealth").innerText = `Upgrade ${player.hcost}$`;
    document.getElementById("coins").innerText = "Coins: "+ player.coins +"$" ;
    let obj = {
        'name' : player.playerName,
        'coins' : player.coins,
        'score' : player.score,
        'jetpack': player.jlevel,
        'healt':player.hlevel,
        'gun':player.glevel
    }
    localStorage.setItem(player.playerName, JSON.stringify(obj));
    

    }
}
function upgradeGun()
{
    if(player.coins >= player.gcost )
    {
        player.coinSound.play();
        player.coinSound.play();

        player.coins -=player.gcost
        player.glevel +=1;

    document.getElementById("glevel").innerText = player.glevel ;
    player.gcost = 25 * player.glevel ;

    document.getElementById("upCostGun").innerText = `Upgrade ${ player.gcost}$`;
    document.getElementById("coins").innerText = "Coins: "+ player.coins +"$" ;
    let obj = {
        'name' : player.playerName,
        'coins' : player.coins,
        'score' : player.score,
        'jetpack': player.jlevel,
        'healt':player.hlevel,
        'gun': player.glevel
    }
    localStorage.setItem(player.playerName, JSON.stringify(obj));


    }
}


document.addEventListener('keydown', ({ key }) => {

    if (myGameArea.isGamePaused) 
    {
        switch (key) {
            case "Escape":
                resumeGame()
                console.log("Click")     
            break; 
         default: break;
        }
        return
    }
  
    switch (key) {
        case "Escape":
             console.log("Click2")
             if(isStarted){
                pauseGame()
             }
        break;
        case "c":
          localStorage.clear();
        break;
        case "Enter":
            let username = document.getElementById("pname").value
            const ctx = myGameArea.context;

            ctx.fillText("Please Enter a name to start playing " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 175 );

            if(username == "")
            {

            }
            if(!isStarted && username !="")
            {
                start();
            }
            else if (isStarted &&  myGameArea.isGameOver)
            {
                restart()
                myGameArea.isGameOver = false
            }


        break;
        case "s":
            if(myGameArea.isGameOver)
            {
                document.getElementById("main-menu").style.display = "none";
                document.getElementById("main-menu").style.visibility = 'hidden';
               // myGameArea.ctx.remove();
               const ctx = myGameArea.context;
               ctx.canvas.hidden = true;
               let s = document.getElementById("shop")
               document.body.style.backgroundImage = `url('./img/game_background_1.png')`
               //console.log(player.playerName);
               var value = window.localStorage.getItem(player.playerName);
               let obj = JSON.parse(value);
               console.log(obj);
               document.getElementById("coins").innerText = "Coins: "+ obj.coins +"$" ;
               document.getElementById("jlevel").innerText = obj.jetpack ;
               document.getElementById("hlevel").innerText = obj.healt ;
               document.getElementById("glevel").innerText = obj.gun;
               document.getElementById("upCostGun").innerText = `Upgrade ${player.gcost}$`;
               document.getElementById("upCostHealth").innerText = `Upgrade ${player.hcost}$`;
               document.getElementById("upCostJet").innerText = `Upgrade ${player.hcost}$`;
               s.style.display="block"
               s.style.zIndex = "1";
             /*  let obj2 = {
                'name' : player.playerName,
                'coins' : player.coins,
                'score' : player.score,
                'jetpack': player.jlevel,
                'healt':player.hlevel,
                'gun':player.glevel
            }
            localStorage.setItem(player.playerName, JSON.stringify(obj2)); */
            }
        
            break;

        case "Spacebar": case "32" : case " ":
            myGameArea.isSpaceKeyPressed = true;
            player.shootPressed = true;

        break;
       
        case "Up": case "ArrowUp":
            myGameArea.isUpKeyPressed = true;
            player.moveUp()
            break;
        case "Left": case "ArrowLeft":
            myGameArea.isLeftKeyPressed = true
            break;
        case "Right": case "ArrowRight":
            myGameArea.isRightKeyPressed = true
            break;

        default: 
        console.log(key)
            return; // Quit when this doesn't handle the key event.
    }
})

document.addEventListener('keyup', ({ key }) => {

    if (myGameArea.isGamePaused) return

    switch (key) {
        case "Escape":
            console.log("Click 3")
            break;
        case "Space" : case "32" : case "s": case " ":
            myGameArea.isSpaceKeyPressed = false;
            player.shootPressed = false;
        break;
        case "Up": case "ArrowUp":
            myGameArea.isUpKeyPressed = false;
            break;
        case "Left": case "ArrowLeft":
            myGameArea.isLeftKeyPressed = false
            break;
        case "Right": case "ArrowRight":
            myGameArea.isRightKeyPressed = false
            break;
        default:
            console.log(key);
            return; // Quit when this doesn't handle the key event.
    }
})

//windows loaded to the canvas