class Pomme{
    constructor(max){
        this && Object.assign(this, max)
        this._arr = []
        this.img = new Image()
        this.img.src = "src/img/pomme.png"
        this.img.onload = ()=>this.isOk = true
    }
    add(sArr)
    {
        let x, y;

    x = Math.floor(Math.random()*this.maxX)
    y = Math.floor(Math.random()*this.maxY)

        console.log(sArr.includes({ x, y }))
        this._arr.push({x , y})
    }
    getArr(){
        return this._arr
    }
    del({x, y}){
        this._arr.forEach(el =>{
            if(el.x === x && el.y === y) this._arr.shift(el)
        })
    }
}

export {Pomme}