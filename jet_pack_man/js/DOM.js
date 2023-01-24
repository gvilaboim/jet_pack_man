let i = 0;
let isStarted = false;
let isPaused = false;
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    mainMenu();
});

function mainMenu()

{  let s = document.getElementById("shop")
    document.body.style.backgroundImage = ``;
    s.style.display="block"
    s.style.zIndex = "1";
    const ctx = myGameArea.context;
    ctx.canvas.hidden = false;
    console.log(ctx);
    backgroundImg = new Image();
    backgroundImg.src = "./img/game_background_1.png";
    backgroundImg.onload = () => {
    ctx.drawImage( backgroundImg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
    ctx.fillStyle = "gray";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Jet Pack Man!", myGameArea.canvas.width / 2 , myGameArea.canvas.height / 2 - 100);
    ctx.fillStyle = 'rgba(175,238,238,0.2)';
    ctx.fillRect(myGameArea.canvas.width / 2 -250, myGameArea.canvas.height / 2 -250,500,500);
    ctx.fillStyle = "white";
    ctx.font = "italic 13pt Courier";
    ctx.fillText('Press "Enter" to Start! ', myGameArea.canvas.width / 2, myGameArea.canvas.height / 2  -70);
    ctx.fillText("Arrow Left -> Move Left " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 -20);
    ctx.fillText("Arrow Right -> Move Right " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 +20);
    ctx.fillText("Arrow Up -> Jump/Fly " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 60 );
    ctx.fillText('Space Bar  -> Shoot ' , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 100 );
    ctx.fillText("Esc -> Game Pause/Resume " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 140 );
    
}

}
function start() {
    // Create the Background
    let username = prompt("Choose a name to Play Jet Pack Man!: ")
    const bulletController = new BulletController(myGameArea.context);

    // Create the Player
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
            if(!isStarted)
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
               // myGameArea.ctx.remove();
               const ctx = myGameArea.context;
               ctx.canvas.hidden = true;
               let s = document.getElementById("shop")
               document.body.style.backgroundImage = `url('/img/game_background_1.png')`
               console.log(player.playerName);
               var key = localStorage.key(player.playerName);
               console.log(key);
               var value = window.localStorage.getItem(key);
               let obj = JSON.parse(value);
               console.log(obj)
               document.getElementById("coins").innerText = "Coins: "+ obj.coins +"$" ;
               s.style.display="block"
               s.style.zIndex = "1";
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