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
        do
        {
            x = Math.floor(Math.random()*this.maxX)
            y = Math.floor(Math.random()*this.maxY)
        }
        while(sArr.filter(el => el.x ==x && el.y == y).length>0)

        this._arr.push({x , y})
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

export {Pomme}