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


//----------- Build -----------//
let side = false;
buildChessboard();
/**
 * Builds the Chessboard in HTML
 * You can swap the sides
 */
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
    setPattern();
    setFigures();
}

/**
 * Set Figure is a method which goes throw the Game Matrix and sets the Figures
 */
function setFigures() {
    for (let x = 0; x < 8; x++) {
        for (let y = 7; y >= 0; y--) {
            document.querySelector(`.F${x}${y}`).style.backgroundImage = "none";
            if (gameMatrix[y][x]) {
                document.querySelector(`.F${x}${y}`).style.backgroundImage = `url(./Figures/${gameMatrix[y][x]}.png)`;
            }
        }
    }
}

/**
 * Set Template is a method which draws the Chessboard pattern
 */
function setPattern() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i + j) % 2 == 0) {
                getPos(i, j).style.backgroundColor = "grey";
            }
        }
    }
}

/**
 * @param {*} x Coordinate
 * @param {*} y Coordinate
 * @returns the number of the box
 */
 function getPos(x, y) {
    let basepos = 0
    if (y > 0)
        basepos = y * 8
    return document.querySelectorAll('.box')[basepos + x]
}


//----------- Tools -----------//
let prevPos = null;
/**
 * Picks a figure and checks if it can be activated to mark or move
 * @param {*} position Array with [x][y] coordinates
 */
function pickFigure(position) {
    let x = position[0]
    let y = position[1]

    if(prevPos && gameMatrix[y][x] != 0){ // If a other figure get picked it get marked
        if(prevPos != position){
            if(white == true && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "W" || white == false && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "B"){
                picked = false;
                prevPos = null;
                removeMark(position)
            }
        }
    }

    if (picked == false || prevPos != position) { // If a figure is already picked and the position is the same as previous the marker gets removed
        if (!prevPos && gameMatrix[y][x] != "") { // Mark the Figure
            if(white == true && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "W" || white == false && gameMatrix[y][x].substr(gameMatrix[y][x].length - 1, 1) == "B"){
                if (document.querySelector('.active')) {
                    removeMark();
                }
                preMove(x,y)
                addMark(position)
                picked = true;
                prevPos = position
            }
        } else{ // Make a move / check the move
            if(prevPos){
                x1 = parseInt(prevPos.substr(0,1))
                y1 = parseInt(prevPos.substr(1,1))
                let check = checkMove(gameMatrix[y1][x1], x1, y1, parseInt(x), parseInt(y))
                if(check){ // Make the move
                    document.querySelector(`.F${prevPos[0]}${prevPos[1]}`).classList.remove("notUsed")

                    let pos = [x, y]
                    moveFigure(pos, gameMatrix[y1][x1])
                    
                    if(checkCheck()){
                        let check = checkCheck();
                        checkCheckmate(check)
                    }

                    picked = false;
                    prevPos = null;
                }
            }
        }
    } else { // Remove marker
        picked = false;
        prevPos = null;
        removeMark(position)
    }
}

/**
 * Checks if the king is checked
 */
function checkCheck(){
    // Get King Position
    let xW, yW;
    let xB, yB
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if(gameMatrix[y][x] == "kingW"){
                yW = y
                xW = x
            } else if(gameMatrix[y][x] == "kingB"){
                yB = y
                xB = x
            }
        }
    }   

    for (let x0 = 0; x0 < 8; x0++) {
        for (let y0 = 0; y0 < 8; y0++) {
            figure = gameMatrix[y0][x0]
            if(figure != 0){
                if(checkMove(figure, x0, y0, xW, yW)){
                    console.log(figure, x0, y0, xW, yW, "White")
                    return "W";
                }
                if(checkMove(figure, x0, y0, xB, yB)){
                    console.log(figure, x0, y0, xB, yB, "Black")
                    return "B";
                }
            }
        }
    }
    return false;
}

/**
 * Checks if the king is checkmate
 * @returns true or false
 */
function checkCheckmate(check){
    let position = getPosFigure("king"+check)
    position = position[0]
    let x = position[0]
    let y = position[1]

    for (let x0 = 0; x0 < 8; x0++) {
        for (let y0 = 0; y0 < 8; y0++) {
            if(checkMove("king"+check, x, y, x0, y0)){
                console.log(x0, y0)
            }
        }
    }
    return true;
}

/**
 * Swaps the Move from white to black or black to white
 */
function swapMove(){
    if(white == false){
        white = true;
        document.querySelector('#who').innerHTML = "Weiß ist am Zug!"
    } else{
        white = false;
        document.querySelector('#who').innerHTML = "Schwarz ist am Zug!"
    }
}

/**
 * Adds a marker at a position
 * @param {*} position which should be marked
 */
function addMark(position){
    let elem = document.querySelector(`.F${position}`)
    elem.classList.add("active")
}

/**
 * Removes all marker
 */
function removeMark(){
    document.querySelector('.active').classList.remove("active");
    removePreMove();
}

function getPosFigure(figure){
    let positions = new Array(8)
    for (let i = 0; i < positions.length; i++) {
        positions[i] = new Array(2);
    }

    let temp = 0;
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if(gameMatrix[y][x] == figure){
                positions[temp][0] = x;
                positions[temp][1] = y;
                temp++;
            }
        }
    }
    return positions;
}


//----------- Features -----------//
/**
 * Gets the possible moves of the activated figure
 * and sets the preMove image into the HTML
 */
function preMove(x,y){
    x = parseInt(x); y = parseInt(y)
    figure = gameMatrix[y][x]

    for (let x0 = 0; x0 < 8; x0++) {
        for (let y0 = 0; y0 < 8; y0++) {
            if(checkMove(figure, x, y, x0, y0)){
                document.querySelector(`.F${x0}${y0}`).innerHTML = "<img src='./Pictures/preMove.png'>"
            }
        }
    }
}

/**
 * Removes all preMove images
 */
function removePreMove(){
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            document.querySelector(`.F${x}${y}`).innerHTML = ""
        }
    }
}

function endMatch(){
    console.log("End")
}