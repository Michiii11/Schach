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
        let startN = 1;
        let startL = 'a';
    
        for(let x = startL.charCodeAt(0); x < startL.charCodeAt(0)+8; x++){
            content += `<div class="rows">`
            for(let y = startN; y <= 8; y++){
                content += `<div class="box" onclick="moveFigure('${String.fromCharCode(x)}${y}', elem)" id="${String.fromCharCode(x)}${y}">${String.fromCharCode(x)}${y}</div>`;
            }
            content += `</div>`
        }
    } else{ // Weiß unten
        let startN = 8;
        let startL = 'a';
    
        for(let x = startL.charCodeAt(0); x < startL.charCodeAt(0)+8; x++){
            content += `<div class="rows">`
            for(let y = startN; y > 0; y--){
                content += `<div class="box" onclick="moveFigure('${String.fromCharCode(x)}${y}')" id="${String.fromCharCode(x)}${y}">${String.fromCharCode(x)}${y}</div>`;
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
function setFigures(){
    let startN = 1;
    let startL = 'a';

    for(let x = startL.charCodeAt(0); x < startL.charCodeAt(0)+8; x++){
        for(let y = startN; y <= 8; y++){
            if(gameMatrix[y-1][x-97]){
                document.getElementById(`${String.fromCharCode(x)}${y}`).style.backgroundImage = `url(./Figures/${gameMatrix[y-1][x-97]}.png)`;
            }
        }
}}

function setMuster(){
    for (let i = 1; i <= 8; i++){
        for(let j = 1; j <= 8; j+=2){
            switch(i)
            {
                case(1) : document.getElementById(`a${j}`).style.backgroundColor = "grey";   break;
                case(2) : document.getElementById(`b${j+1}`).style.backgroundColor = "grey"; break;
                case(3) : document.getElementById(`c${j}`).style.backgroundColor = "grey";   break;
                case(4) : document.getElementById(`d${j+1}`).style.backgroundColor = "grey"; break;
                case(5) : document.getElementById(`e${j}`).style.backgroundColor = "grey";   break;
                case(6) : document.getElementById(`f${j+1}`).style.backgroundColor = "grey"; break;
                case(7) : document.getElementById(`g${j}`).style.backgroundColor = "grey";   break;
                case(8) : document.getElementById(`h${j+1}`).style.backgroundColor = "grey"; break;
            }
        }
    }
}

function ah(position){ // Converts letter into number
    switch(position){
        case("a"): x = 0; break;
        case("b"): x = 1; break;
        case("c"): x = 2; break;
        case("d"): x = 3; break;
        case("e"): x = 4; break;
        case("f"): x = 5; break;  
        case("g"): x = 6; break;
        case("h"): x = 7; break;  
    }
    return x;
}