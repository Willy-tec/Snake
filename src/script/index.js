import { Serpent } from "./object/Serpent.js"
import { OwnCanvas } from "./object/OwnCanvas.js"
import { Pomme } from "./object/Pomme.js"
import { RottenPomme } from "./object/RottenPomme.js"
let FRAME_TIME = 500

if (window.localStorage.getItem("score") === null)
{
    window.localStorage.setItem("score", 0)
}

let scoreRecord = window.localStorage.getItem("score")

let doc = document.querySelector(".app")
let scoreDiv = document.querySelector(".score")
let vitDiv = document.querySelector(".vitesse")
let highscoreDiv = document.querySelector(".highscore")
let pauseDiv = document.querySelector(".pause")
highscoreDiv.innerHTML = scoreRecord

let dessin
    , serpent
    , pomme
    , rottenPomme
    , dir
    , time
    , jeu
    , lastMove
    , count = 0
    , maxRotten = 0
    , pause = false
    , pauseCount = 1
    

function game()
{
    jeu = requestAnimationFrame(game)
    if (Date.now() - time > FRAME_TIME)
    {
        count ++
        dessin.clear()
        if(dir.length>0) lastMove = dir.shift()
        switch(lastMove){
            case "ArrowUp" : serpent.haut(); break;
            case "ArrowDown" : serpent.bas(); break;
            case "ArrowLeft" : serpent.gauche(); break;
            case "ArrowRight" : serpent.droite(); break;
        }
        dessin.drawSnake(serpent.getCoordArr(), dir, serpent)
        checkSerpentMangePomme(serpent, pomme, rottenPomme)
        dessin.drawPomme(pomme.getArr(), pomme)
        dessin.drawRottenPomme(rottenPomme.getArr(), rottenPomme)
        time = Date.now()
        if(serpent.fin){
            clearInterval(game)
            fin()
        }
    }

}

window.addEventListener("keydown", (e) =>
{
    if (e.key == "Enter") newGame()
    else if (e.key === " ")
    {
        if (pause)
        {
            pause = false
            jeu = requestAnimationFrame(game)
        }
        else if(pauseCount > 0)
        {
            pause = true
            pauseCount--
            printInfo()
            cancelAnimationFrame(jeu)
        }
        console.log("space")
    }
    else dir.push(e.key)
})


function fin(){
    cancelAnimationFrame(jeu)
    if(scoreRecord < serpent.getSize()) window.localStorage.setItem("score", serpent.getSize())
    dessin.drawEnd(serpent.getSize())
}

function checkSerpentMangePomme(s, p, r){
    let {x, y} = s.getCoordArr()[0]
    p.getArr().forEach(el => {
        if(el.x === x && el.y ==y ){
            p.del({x , y})
            s.addCoord({x, y})
            p.add(serpent.getCoordArr())
            if (Math.floor(Math.random() * 15) === 1)
            {
                p.add(serpent.getCoordArr())
                r.add(serpent.getCoordArr())
            }

            FRAME_TIME = FRAME_TIME > 300 ? FRAME_TIME - 5 : FRAME_TIME > 200 ? FRAME_TIME - 2 : FRAME_TIME - 1
            if(s.getSize()%15 == 0) pauseCount++
            printInfo()
        }
    })
    r.getArr().forEach(el =>
    {
        if (el.x === x && el.y === y)
        {
            s.fin = true
        }
    })
}

function printInfo()
{
    let score = serpent.getSize()
    scoreDiv.innerHTML = score
    if (score > scoreRecord)
    {
        scoreRecord = score
        window.localStorage.setItem("score", score)
    } 
    vitDiv.innerHTML = 410 - FRAME_TIME // (1000/FRAME_TIME).toFixed(2)
    highscoreDiv.innerHTML = scoreRecord
    pauseDiv.innerHTML = pauseCount
}

function newGame()
{
    scoreRecord = window.localStorage.getItem("score")
    lastMove = "ArrowRight"
    cancelAnimationFrame(jeu)
    jeu = requestAnimationFrame(game)
    doc.innerHTML = ""
    let size =Math.min(window.innerWidth, window.innerHeight) -25
    
    
    dessin = new OwnCanvas({div: doc, width:size, height:size})
    serpent  = new Serpent(dessin.getMax())
    pomme = new Pomme(dessin.getMax())
    rottenPomme = new RottenPomme(dessin.getMax())

    dir = []
    pomme.add(serpent.getCoordArr())
    //score = 1                   
    time = Date.now()
    FRAME_TIME = 400
    printInfo()
}
newGame()
window.onresize = newGame