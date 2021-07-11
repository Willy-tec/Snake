const WIDTH = 800, HEIGHT = 800, POMME_W = 20, POMME_H= 20,ROTTEN_POMME_COLOR= "brown", POMME_COLOR = "red", SNAKE_HEAD_COLOR= "#60C63F", SNAKE_TAIL_COLOR= "#8CC63F", SNAKE_WIDTH = 20

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
            ctx.drawImage(pomme.img, el.x*this.stepX, el.y*this.stepY, this.stepX, this.stepY)
        })

    }
    drawRottenPomme(coord){
        let ctx = this.ctx
        ctx.fillStyle = ROTTEN_POMME_COLOR
        coord.forEach(el => {
            ctx.fillRect(el.x * this.stepX, el.y * this.stepY, this.stepX, this.stepY)
        })

    }

    drawSnake(arr, dir, snake){
        let ctx = this.ctx;
        let x = (this.stepX / 4).toFixed(2);
        let padX = (x / 2).toFixed(2);
        ctx.fillStyle = SNAKE_HEAD_COLOR
        ctx.strokeStyle = SNAKE_TAIL_COLOR

        ctx.lineCap = "round"
        ctx.lineWidth = Math.floor(this.stepX/2)
        ctx.beginPath();
        ctx.moveTo(arr[0].x*this.stepX+this.stepX/2, arr[0].y*this.stepY+this.stepY/2)
        arr.forEach((element, index) => {
            ctx.lineTo(element.x*this.stepX+this.stepX/2, element.y*this.stepY+this.stepY/2)
        });
        ctx.stroke();
        ctx.fillRect(((arr[0].x * this.stepX) + (+padX)), ((arr[0].y * this.stepY) + (+padX)), this.stepX - x, this.stepY - x)
        ctx.closePath()
    }
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
    getMax(){
        return {maxX : this.nbCaseX-1, maxY: this.nbCaseY-1 }
    }
    drawEnd(score)
    {
        let ctx = this.ctx;
        ctx.font = "58px Roboto"
        let str = `Score : ${ score }`
        ctx.fillText(str, this.width / 2 - 150, this.height / 2)
        ctx.fillText("Press enter for reboot",this.width/2 - 250, this.height/2+58)
    }

}

export {OwnCanvas}