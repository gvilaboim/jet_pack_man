let background;
let player;

let pipesUp = []
let pipesDown = []

let updateTimer

let restart = () => {
    pipesUp = []
    pipesDown = []
    myGameArea.monsters = [];
    myGameArea.gamespeed = 1;
    player.OnPlataform = false;
    player.x = myGameArea.canvas.width/2
    player.y = 0
    player.ySpeed = 0
    player.frame= 0;
    player.choose= 0;
    player.score = 0;
    player.health = 100;
    myGameArea.speedgame = 100
    player.fuel = {
        value:100,
        color: "rgb(0, 255, 0)"
    }

    // Generate Pipes
    for (let i = 0; i < 4; i++) {
        pipesDown.push(new Pipe(Pipe.distance * i , i * Pipe.height))
        myGameArea.gallons.push(new Gallon((Pipe.distance * i + Gallon.distance) , (i * Pipe.height ) +500))
    }

}

