class Component {
    constructor(x, y, w, h, color) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        if (color) this.color = color
    }

    render() {

        const ctx = myGameArea.context

        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        }
        else if (this.color) {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }
        
    }

    checkCollision(otherComponent) {
        if (
            this.x +10< otherComponent.x + otherComponent.w &&
            this.x + this.w > otherComponent.x &&
            this.y +20 < otherComponent.y + otherComponent.h &&
            this.y + this.h > otherComponent.y
        ) {

            if ( this.x +10< otherComponent.x + otherComponent.w && this.x + this.w > otherComponent.x)
                {
                    console.log("Esquerda |direita")
                }
            if( this.y +20 < otherComponent.y + otherComponent.h &&
                this.y + this.h > otherComponent.y)
                {
                    console.log("cima |baixo")

                }
       
            return true
        }
        else {
            return false
        }
    }

}


