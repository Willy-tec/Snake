class RottenPomme{
    constructor(max){
        this && Object.assign(this, max)
        this._arr = []
        this.img = new Image()
        this.img.src = "src/img/pomme.png"
        this.img.onload = ()=>this.isOk = true
    }
    add(tailleMax)
    {
        let x, y;

    x = Math.floor(Math.random()*this.maxX)
    y = Math.floor(Math.random()*this.maxY)

        this._arr.push({ x, y })
        if(this._arr.length>tailleMax)this._arr.shift()
    }
    getArr(){
        return this._arr
    }
    del({x, y}){
        this._arr.forEach((el, index) =>{
            if(el.x === x && el.y === y) this._arr.splice(index, 1)
        })
    }
}

export {RottenPomme}