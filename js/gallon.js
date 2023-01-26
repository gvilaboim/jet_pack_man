
class Gallon extends Component {

    static width = 50
    static height = 50
    static distance = 500


    constructor(x,y) {
        super(x, y, Gallon.width, Gallon.height)
        this.pickUp = true;
      
        console.log("new Gallon")

        let offset = Math.floor(Math.random() * 10) ;
         if(offset >5)
         {
           
              offset = myGameArea.canvas.height/2 - y  + Math.random() * y;
 
         }
         else {
              offset = myGameArea.canvas.height/2 + y - + Math.random() * y;
         }
         console.log(offset);
 
             if(offset > myGameArea.canvas.height - 100)
             {
                 offset = offset - myGameArea.canvas.height/2;
             }else if (offset < 100)
             {
                 offset = offset + myGameArea.canvas.height/2;
             }
         this.y = offset;
         this.x = x;

         this.img = new Image();
         this.img.src = "./img/gas-can.png";

         this.sound = document.createElement('audio')
         this.sound.src = "./sound/fuel.mp3"
         this.sound.volume = 0.03

         console.log("Construtor Y : " + y);


    }
    
   
}
