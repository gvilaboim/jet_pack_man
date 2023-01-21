let i = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    mainMenu();
});

function mainMenu()
{
    const ctx = myGameArea.context;
    console.log(ctx);
    backgroundImg = new Image();
    backgroundImg.src = "./img/game_background_1.png";
  
    backgroundImg.onload = () => {
      ctx.drawImage( backgroundImg, 0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
      ctx.fillStyle = "gray";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Jet Pack Man!", myGameArea.canvas.width / 2, myGameArea.canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Press Play to Start! " , myGameArea.canvas.width / 2, myGameArea.canvas.height / 2 + 30);
    };
    
}


document.getElementById("play").addEventListener('click', (event) => {
    
    // Create the Background
    const bulletController = new BulletController(myGameArea.context);

    // Create the Player
    player = new Player( myGameArea.canvas.width/2,0,120,90,bulletController)
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

    document.getElementById("main-menu").style.display = "none"
    document.getElementById("restart").disabled = false
    document.getElementById("pause").disabled = false
})

document.getElementById("restart").addEventListener('click', (event) => {

    restart()
    myGameArea.isGameOver = false
    document.getElementById("game-over").style.display = "none"

})

document.getElementById("restart-game-over").addEventListener('click', (event) => {

    restart()
    myGameArea.isGameOver = false
    document.getElementById("game-over").style.display = "none"

})

// Create a Pause / Unpause function (you can also create your HTML for it)
document.getElementById("pause").addEventListener('click', (event) => {

    pauseGame()

})


// Create a Pause / Unpause function (you can also create your HTML for it)
document.getElementById("resume").addEventListener('click', (event) => {

    resumeGame()

})

document.addEventListener('keydown', ({ key }) => {

    if (myGameArea.isGamePaused) return

    switch (key) {
        case "Spacebar": case "32": case "s" : case " ":
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
            return; // Quit when this doesn't handle the key event.
    }
})

document.addEventListener('keyup', ({ key }) => {

    if (myGameArea.isGamePaused) return

    switch (key) {
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

            return; // Quit when this doesn't handle the key event.
    }
})

//windows loaded to the canvas
