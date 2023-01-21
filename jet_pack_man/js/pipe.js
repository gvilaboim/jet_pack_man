
class Pipe extends Component {

    static distance = 500
    static width = 200
    static height = 100


    constructor(x,h) {
        

        let offset = Math.floor(Math.random() * 10) ;
        console.log(`OFFSET : ${offset}`)
        if(offset >5)
        {
             offset = myGameArea.canvas.height/2 - h  + Math.random() * h;
        }
        else {
             offset = myGameArea.canvas.height/2 + h - + Math.random() * h;
        }
        let y = offset;
        x = x + Pipe.distance;
        super(x, y, Pipe.width, Pipe.height)
        
       this.img = new Image();
       this.img.src = "./img/platform_ph.png";

        console.log(`Pipe -> X: ${x}  Y: ${y} W: ${Pipe.width} H: ${Pipe.height}`);


    }
    
   
}
