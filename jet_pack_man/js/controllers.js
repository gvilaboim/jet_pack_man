let background;
let player;

let pipesUp = []
let pipesDown = []

let updateTimer

let restart = () => {

    pipesUp = []
    pipesDown = []
    player.OnPlataform = false;
    player.x = 50
    player.y = 0
    player.ySpeed = 0
    player.frame= 0;
    player.choose= 0;
    player.score = 0;
    player.fuel.value = 100;
    player.fuel.color = "rgb(000,255,000)";
    // Generate Pipes
    for (let i = 0; i <= 10; i++) {
        pipesDown.push(new Pipe(10 + i * 50, "down"))
    }

}

let pauseGame = () => {
    myGameArea.isGamePaused = true
    document.getElementById("pause-game").style.display = "flex"
}

let resumeGame = () => {
    myGameArea.isGamePaused = false
    document.getElementById("pause-game").style.display = "none"
}