class RottenPomme{
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
        while (sArr.filter(el => el.x == x && el.y == y).length > 0
            || sArr[0].x + 1 == x && sArr[0].y == y
            || sArr[0].x - 1 == x && sArr[0].y == y
            || sArr[0].x  == x && sArr[0].y + 1 == y
            || sArr[0].x  == x && sArr[0].y - 1 == y
        )
        this._arr.push({ x, y })
       // if(this._arr.length>tailleMax)this._arr.shift()
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