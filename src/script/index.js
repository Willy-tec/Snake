import { Serpent } from "./object/Serpent.js"
import { OwnCanvas } from "./object/OwnCanvas.js"
import { Pomme } from "./object/Pomme.js"
const FRAME_TIME = 500


let doc = document.querySelector(".app")
let scoreDiv = document.querySelector(".score")
let vitDiv = document.querySelector(".vitesse")

let dessin = new OwnCanvas({div: doc})
let serpent  = new Serpent(dessin.getMax())
let pomme = new Pomme(dessin.getMax())
let dir
let score = 0
pomme.add()

 let game = window.setInterval(()=>
                    {
                        dessin.clear()
                        if(dir){
                            switch(dir){
                                case "ArrowUp" : serpent.haut(); break;
                                case "ArrowDown" : serpent.bas(); break;
                                case "ArrowLeft" : serpent.gauche(); break;
                                case "ArrowRight" : serpent.droite(); break;
                            }
                        }
                        else serpent.droite()
                        if(serpent.fin){
                         clearInterval(game)
                         fin()
                        }    
                        checkSerpentMangePomme(serpent, pomme)
                        dessin.drawSnake(serpent.getCoordArr(), dir, serpent)
                        dessin.drawPomme(pomme.getArr(), pomme)
                        
                    }, 
                    FRAME_TIME); 
window.addEventListener("keydown", (e)=>{
    dir = e.key
})


function fin(){
    console.log("Le jeu est fini")
}

function checkSerpentMangePomme(s, p){
    let {x, y} = s.getCoordArr()[0]
    p.getArr().forEach(el => {
        if(el.x === x && el.y ==y ){
            p.del({x , y})
            s.addCoord({x, y})
            p.add()
            score ++
            printInfo()
        }
    })
}

function printInfo(){
    scoreDiv.innerHTML= serpent.getSize()
    vitDiv.innerHTML = (1000/FRAME_TIME).toFixed(2)
}