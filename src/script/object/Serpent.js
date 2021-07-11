import { Coord } from "./Coord.mjs";


class Serpent {
    constructor({maxX, maxY}) {
        console.log("serpent construit")
        this._coordArr = [{x:1, y:1}]
        this.maxX = maxX
        this.maxY = maxY
        this.fin = false
        this.img = new Image();
        this.img.src= "src/img/Snake.png"
    }
    addCoord(coord){
        this._coordArr.push(coord)
    }

    getCoordArr(){return this._coordArr}
    getSize(){return this._coordArr.length}

    haut(){
        let {x, y} = this._coordArr[0]
        if(y == 0) this.fin= true//y = this.maxY
        else y--
        this.checkCollision({x, y})
    }

    bas(){
        let {x, y} = this._coordArr[0]
        if(y == this.maxY) this.fin= true//y = 0
        else y++
        this.checkCollision({x, y})
    }

    gauche(){
        let {x, y} = this._coordArr[0]
        if(x == 0) this.fin= true//x = this.maxX
        else x--
        this.checkCollision({x, y})
    }

    droite(){
        let {x, y} = this._coordArr[0]
        if(x == this.maxX) this.fin= true//x = 0
        else x++
        this.checkCollision({x, y})
    }

    checkCollision({x, y}){
        this._coordArr.forEach(el => {
            if(el.x === x && el.y === y){
                console.log("Collision detecté : ", x, y)
                this.fin = true
            } 
        })
        if(this.fin == false){
            this._coordArr.unshift({x, y})
            this._coordArr.pop()
        }
    }
}

export { Serpent }