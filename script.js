//----------- Game Matrix  -----------//
let gameMatrix = [
    ["rookW", "knightW", "bishopW", "queenW", "kingW", "bishopW", "knightW", "rookW"],
    ["pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW"],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ["pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB"],
    ["rookB", "knightB", "bishopB", "queenB", "kingB", "bishopB", "knightB", "rookB"],
]


//----------- Build Chess Board -----------//
let side = true;
buildChessboard();
function buildChessboard(){ // true == white , false == black
    let content = ""

    if(!side){ // Schwarz unten    
        for(let x = 0; x < 8; x++){
            content += `<div class="rows">`
            for(let y = 0; y < 8; y++){
                content += `<div class="box ${x}${y}" onclick="pickFigure('${x}${y}')">${x}${y}</div>`;
            }
            content += `</div>`
        }
    } else{ // Weiß unten
        let startN = 7;
        let startL = 0;
    
        for(let x = 0; x < 8; x++){
            content += `<div class="rows">`
            for(let y = 7; y >= 0; y--){
                content += `<div class="box ${x}${y}" onclick="pickFigure('${x}${y}')">${x}${y}</div>`;
            }
            content += `</div>`
        }
    }

    if(side){
        side = false;
    } else{
        side = true;
    }
    document.getElementById("chessboard").innerHTML = content;
    setMuster();
    setFigures();
}

//----------- Tools -----------//
function getPos(x, y){
    let basepos = 0
    if(y>0)
    basepos = y*8
    return document.querySelectorAll('.box')[basepos+x]
}

function pickFigure(position){
    let x = ah(position.substr(0,1));
    let y = parseInt(position.substr(1,1)-1)

    if(picked == false){
        if(white == true){
            if(gameMatrix[y][x].substr(gameMatrix[y][x].length-1, 1) == "W"){
                if(document.querySelector('.active')){
                    document.querySelector('.active').classList.remove("active");
                }
                let elem = document.querySelector(`.${position}`)
                elem.classList.add("active")

                picked = true;
                position1 = position
            }
        } else{
            if(gameMatrix[y][x].substr(gameMatrix[y][x].length-1, 1) == "B"){
                if(document.querySelector('.active')){
                    document.querySelector('.active').classList.remove("active");
                }
                let elem = document.querySelector(`.${position}`)
                elem.classList.add("active")

                picked = true;
                position1 = position
            }
        }
        console.log(document.querySelector('.active').classList)

    } else {
        picked = false;
    }}

function setFigures(){
    let startN = 1;
    let startL = 'a';

    for(let x = startL.charCodeAt(0); x < startL.charCodeAt(0)+8; x++){
        for(let y = startN; y <= 8; y++){
            if(gameMatrix[y-1][x-97]){
                document.querySelector(`.${String.fromCharCode(x)}${y}`).style.backgroundImage = `url(./Figures/${gameMatrix[y-1][x-97]}.png)`;
            }
        }
}}

function setMuster(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if((i+j)%2 == 0){
                getPos(i,j).style.backgroundColor = "grey";
            }
        }
    }
}
