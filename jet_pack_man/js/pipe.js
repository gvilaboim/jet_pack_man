
class Pipe extends Component {

    static distance = 500
    static width = 200
    static height = 100


    constructor(x,y) {
        
       super(x, y, Pipe.width, Pipe.height)
  

        let offset = Math.floor(Math.random() * 10) ;
        // console.log(`OFFSET : ${offset}`)
         if(offset >5)
         {
           
              offset = myGameArea.canvas.height/2 - y  + Math.random() * y;
 
         }
         else {
              offset = myGameArea.canvas.height/2 + y - + Math.random() * y;
         }
         console.log(offset);
 
             if(offset > myGameArea.canvas.height - 50)
             {
                 offset = offset - myGameArea.canvas.height/2;
             }else if (offset < 50)
             {
                 offset = offset + myGameArea.canvas.height/2;
             }
         y = offset;

         this.img = new Image();
         this.img.src = "./img/platform_ph.png";

    }
    
   
}
