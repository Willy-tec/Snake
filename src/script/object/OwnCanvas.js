const WIDTH = 800, HEIGHT = 800, POMME_W = 20, POMME_H= 20, POMME_COLOR = "red", SNAKE_COLOR= "#8CC63F", SNAKE_WIDTH = 20

class OwnCanvas{

    constructor({div, width = WIDTH, height = HEIGHT, nbCaseX = POMME_W, nbCaseY = POMME_H}){
        this.root = div;
        let canvaDiv = document.createElement("canvas");
        canvaDiv.width = width;
        canvaDiv.height = height;
        this.root.appendChild(canvaDiv);
        this.ctx = canvaDiv.getContext("2d")
        this.stepX = width/nbCaseX;
        this.stepY = height/nbCaseY;
        this.width = width
        this.height = height
        this.nbCaseX = nbCaseX
        this.nbCaseY = nbCaseY
    }

    drawPomme(coord, pomme){
        let ctx = this.ctx
        ctx.fillStyle = POMME_COLOR
        coord.forEach(el => {
            /* ctx.fillRect(el.x*this.stepX, el.y*this.stepY, this.stepX, this.stepY ) */
            ctx.drawImage(pomme.img, el.x*this.stepX, el.y*this.stepY, this.stepX, this.stepY)
        })

    }

    drawSnake(arr, dir, snake){
        let ctx = this.ctx;
        let x = (this.stepX/4).toFixed(2)
        let padX = (x/2).toFixed(2)
        console.log(padX)
        ctx.fillStyle = SNAKE_COLOR
        arr.forEach((element, index) => {
            if(index === 0){ ctx.fillRect(element.x*this.stepX, element.y*this.stepY, this.stepX, this.stepY )}
            else ctx.fillRect(((element.x*this.stepX)+(+padX)), ((element.y*this.stepY)+(+padX)), this.stepX-x, this.stepY-x )
        });
    }
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
    getMax(){
        return {maxX : this.nbCaseX-1, maxY: this.nbCaseY-1 }
    }

}

export {OwnCanvas}