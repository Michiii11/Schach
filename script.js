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
let side = false;
buildChessboard();
function buildChessboard() { // true == white , false == black
    let content = ""

    if (!side) { // Schwarz unten   
        for (let x = 0; x < 8; x++) { 
            content += `<div class="rows">`
            for (let y = 7; y >= 0; y--) {
                if(x == 4 && y == 0 || x == 4 && y == 7 || x == 7 && y == 7 || x == 0 && y == 7 || x == 0 && y == 0 || x == 7 && y == 0){
                    content += `<div class="box F${x}${y} notUsed" onclick="pickFigure('${x}${y}')"></div>`;
                } else{
                    content += `<div class="box F${x}${y}" onclick="pickFigure('${x}${y}')"></div>`;
                }
            }
            content += `</div>`
        }
    } else { // Weiß unten
        for (let x = 7; x >= 0; x--) {
            content += `<div class="rows">`
            for (let y = 0; y < 8; y++) {
                if(x == 4 && y == 0 || x == 4 && y == 7 || x == 7 && y == 7 || x == 0 && y == 7 || x == 0 && y == 0 || x == 7 && y == 0){
                    content += `<div class="box F${x}${y} notUsed" onclick="pickFigure('${x}${y}')"></div>`;
                } else{
                    content += `<div class="box F${x}${y}" onclick="pickFigure('${x}${y}')"></div>`;
                }
            }
            content += `</div>`
        }
    }

    if (side) {
        side = false;
    } else {
        side = true;
    }
    document.getElementById("chessboard").innerHTML = content;
    setMuster();
    setFigures();
}

//----------- Tools -----------//
let prevPos = null;
function pickFigure(position) {
    let x = position[0]
    let y = position[1]

    if(prevPos && gameMatrix[y][x] != 0){
        if(prevPos != position){
            if(white == true && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "W" || white == false && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "B"){
                picked = false;
                prevPos = null;
                removeMark(position)
            }
        }
    }

    if (picked == false || prevPos != position) {
        if (!prevPos && gameMatrix[y][x] != "") {
            if(white == true && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "W" || white == false && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "B"){
                if (document.querySelector('.active')) {
                    removeMark();
                }
                addMark(position)
                picked = true;
                prevPos = position
            }
        } else{
            if(prevPos){
                x1 = parseInt(prevPos.substr(0,1))
                y1 = parseInt(prevPos.substr(1,1))
                let check = checkMove(gameMatrix[y1][x1], x1, y1, parseInt(x), parseInt(y))
                if(check){
                    document.querySelector(`.F${prevPos[0]}${prevPos[1]}`).classList.remove("notUsed")

                    let pos = [x, y]
                    moveFigure(pos, gameMatrix[y1][x1])
                    gameMatrix[y1][x1] = 0;
                    setFigures();
    
                    swapMove();
                    picked = false;
                    prevPos = null;
                    removeMark();
                }
            }
        }
    } else {
        picked = false;
        prevPos = null;
        removeMark(position)
    }
}

function setFigures() {
    let startN = 1;
    let startL = 'a';

    for (let x = 0; x < 8; x++) {
        for (let y = 7; y >= 0; y--) {
            document.querySelector(`.F${x}${y}`).style.backgroundImage = "none";
            if (gameMatrix[y][x]) {
                document.querySelector(`.F${x}${y}`).style.backgroundImage = `url(./Figures/${gameMatrix[y][x]}.png)`;
            }
        }
    }
}

function setMuster() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                getPos(i, j).style.backgroundColor = "grey";
            }
        }
    }
}
function getPos(x, y) {
    let basepos = 0
    if (y > 0)
        basepos = y * 8
    return document.querySelectorAll('.box')[basepos + x]
}

function swapMove(){
    if(white == false){
        white = true;
        document.querySelector('#who').innerHTML = "Weiß ist am Zug!"
    } else{
        white = false;
        document.querySelector('#who').innerHTML = "Schwarz ist am Zug!"
    }
}
function addMark(position){
    let elem = document.querySelector(`.F${position}`)
    elem.classList.add("active")
}
function removeMark(){
    document.querySelector('.active').classList.remove("active");
}
