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
    myGameArea.monsters = [];
    myGameArea.gallons = [];
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

    if( player.PlayerObj) {
        if(player.PlayerObj.glevel>1)
        {
            player.damage = 10 + 5 * player.PlayerObj.glevel;
        }
        if(player.PlayerObj.hlevel>1)
        {
            player.health = 100 + 25 * player.PlayerObj.hlevel ;
        }
        if(player.PlayerObj.coins >0)
        {
            player.coins = player.PlayerObj.coins ;
        }
        if(player.PlayerObj.jlevel>0)
        {
            player.fuel.value += 10 * player.PlayerObj.jlevel;
        }
    }

    // Generate Pipes
    for (let i = 0; i < 4; i++) {
        pipesDown.push(new Pipe(Pipe.distance * i , i * Pipe.height))
        myGameArea.gallons.push(new Gallon((Pipe.distance * i + Gallon.distance) , (i * Pipe.height ) +500))
    }

}

