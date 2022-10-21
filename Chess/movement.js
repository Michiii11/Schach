//----------- Movement -----------//
let picked = false; // Status if figure is picked
let white = true; // Current Player
let rochType = true; // true small | false big

/**
 * Moves the figure in the gameMatrix
 * then sets the Figures swap the move and remove the Mark
 * @param {*} position Position to move
 * @param {*} figure Figure to move
 */
function moveFigure(position, figure) {
    gameMatrix[position[1]][position[0]] = figure;
    gameMatrix[y1][x1] = 0;
    setFigures();
    swapMove();
    removeMark();
}

/**
 * Checks the move if it is possible
 * @param {*} figure Figure
 * @param {*} x1 x-Coordinate from the figure
 * @param {*} y1 y-Coordinate from the figure
 * @param {*} x2 x-Coordinate to check
 * @param {*} y2 y-Coordinate to check
 * @returns true or false, if the move is valid
 */
function checkMove(figure, x1, y1, x2, y2) {
    // Checks if the Endposition isn't a own figure
    if(gameMatrix[y2][x2] != 0){
        if(gameMatrix[y2][x2].substr(gameMatrix[y2][x2].length-1, 1) == figure.substr(figure.length-1, 1)){
            return false
        }
    }

    if (figure == "pawnW") {
        // Check if Farmer didn't move before
        if (x1 == x2) { // Move is in one Line
            if (y1 == 1) { // Checks if it's the first move
                if (y2 == y1 + 2 && gameMatrix[y2][x2] == 0 || y2 == y1 + 1 && gameMatrix[y2][x2] == 0) {
                    if(y2 == y1 + 2 && gameMatrix[y1+1][x1] != 0){
                        return false;
                    }
                    return true
                }
                return false
            }
            else {
                if (y2 == y1 + 1 && gameMatrix[y2][x2] == 0) {
                    return true
                }
                return false
            }
        } else{ // Crash a figure
            if(x2==x1-1 || x2==x1+1){
                if(y2 == y1+1 && gameMatrix[y2][x2] != 0){
                    return true;
                }
            }
            return false;
        }
    } else if (figure == "pawnB") {
        // Check if Farmer didn't move before
        if (x1 == x2) { // Move is in one Line
            if (y1 == 6) { // Checks if it's the first move
                if (y2 == y1 - 2 && gameMatrix[y2][x2] == 0 || y2 == y1 - 1 && gameMatrix[y2][x2] == 0) {
                    if(y2 == y1 - 2 && gameMatrix[y1-1][x1] != 0){
                        return false;
                    }
                    return true
                }
                return false
            }
            else {
                if (y2 == y1 - 1 && gameMatrix[y2][x2] == 0) {
                    return true
                }
                return false
            }
        } else{ // Crash a figure
            if(x2==x1-1 || x2==x1+1){
                if(y2 == y1-1 && gameMatrix[y2][x2] != 0){
                    return true;
                }
            }
            return false;
        }
    }

    let tfigure = figure.substr(0, figure.length - 1);
    if (tfigure == "knight") {
        // Difference between the coordinates
        let x = x1-x2;
        let y = y1-y2;

        // Possible moves
        let knight = [
            {"x": -2, "y": 1}, {"x": -1, "y": 2}, {"x": 1, "y": 2}, {"x": 2, "y": 1}, 
            {"x": -2, "y": -1}, {"x": 1, "y": -2}, {"x": -1, "y": -2}, {"x": 2, "y": -1}
        ]

        // Checks if the move is one of the possible moves
        for (let i = 0; i < knight.length; i++) {
            if(knight[i].x == x && knight[i].y == y) {
                return true
            }
        }
        return false
    } else if (tfigure == "bishop") {
        if(Math.abs(x2-x1) == Math.abs(y2-y1)){
            let xD;
            let yD;
            if(x1 > x2){xD = -1;} 
            else{xD = 1;}
            if(y1 > y2){yD = -1;} 
            else{yD = 1;}

            for (let i = 0; i < Math.abs(x2-x1)-1; i++) {
                if(gameMatrix[y1+1*yD+i*yD][x1+1*xD+i*xD] != 0) {
                    return false
                }
            }
            return true
        }
    } else if (tfigure == "queen") {
        // Check diagonal or linear, if linear rook, if diagonal bishop
        if(Math.abs(x2-x1) == Math.abs(y2-y1)){ // Diagonal
            let xD;
            let yD;
            if(x1 > x2){xD = -1;} 
            else{xD = 1;}
            if(y1 > y2){yD = -1;} 
            else{yD = 1;}

            for (let i = 0; i < Math.abs(x2-x1)-1; i++) {
                if(gameMatrix[y1+1*yD+i*yD][x1+1*xD+i*xD] != 0) {
                    return false
                }
            }
            return true
        } else if(Math.abs(x2-x1)!=0 && y2-y1==0 || Math.abs(y2-y1)!=0 && x2-x1==0){ // Linear
            let diff;
            if(x2 != x1){
                diff = Math.abs(x2-x1)
            } else{
                diff = Math.abs(y2-y1)
            }
    
            let xD;
            let yD;
            if(x1 > x2){xD = -1;} 
            else{xD = 1;}
            if(y1 > y2){yD = -1;} 
            else{yD = 1;}
    
            for (let i = 0; i < diff-1; i++) {
                if(y1 != y2){
                    if(gameMatrix[y1+1*yD+i*yD][x2] != 0) {
                        return false
                    }
                } else{
                    if(gameMatrix[y2][x1+1*xD+i*xD] != 0) {
                        return false
                    }
                }
            }
            return true
        }
        return false;
    } else if (tfigure == "king") {
        // King not next to King (Opposition)
        let king = [
            {"x": -1, "y": -1}, {"x": -1, "y": 0}, {"x": -1, "y": 1},
            {"x": 0, "y": -1}, {"x": 0, "y": 0}, {"x": 0, "y": 1},
            {"x": 1, "y": -1}, {"x": 1, "y": 0}, {"x": 1, "y": 1},
        ]

        for (let i = 0; i < king.length; i++) {
            if(x2+king[i].x >= 0 && x2+king[i].x < 8 && y2+king[i].y >= 0 && y2+king[i].y < 8) {
                if(figure == tfigure + "W") {
                    if(gameMatrix[y2+king[i].y][x2+king[i].x] == tfigure+"B") {
                        return false;
                    }
                }
                if(figure == tfigure + "B") {
                    if(gameMatrix[y2+king[i].y][x2+king[i].x] == tfigure+"W") {
                        return false;
                    }
                }
            }
        }

        // Standard Movement
        let diffX = Math.abs(x1-x2)
        let diffY = Math.abs(y1-y2)
        if(diffX == 1 && diffY == 0 || diffX == 0 && diffY == 1 || diffX == 1 && diffY == 1 || diffX == 1 && diffY == 1) {
            return true
        }

        // Rochade
        if(y1 == 7 && x1 == 4 || y1 == 0 && x1 == 4){ // Check if King is on the right place
            if(document.querySelector(`.F${x1}${y1}`).dataset.move){ // Check if King not moved
                // Small Rochade
                if(y2 == y1 && x2 == 6){ // Check if move place is correct
                    if(document.querySelector(`.F7${y2}`).dataset.move){ // Check if Rook not moved
                        if (gameMatrix[y1][5] == 0 && gameMatrix[y1][6] == 0) { // Field between free
                                rochType = true;
                                return true;
                            
                        }
                    }
                }

                // Big Rochade
                if(y2 == y1 && x2 == 2){ // Check if move place is correct
                    if(document.querySelector(`.F7${y2}`).dataset.move){ // Check if Rook not moved
                        if (gameMatrix[y1][2] == 0 && gameMatrix[y1][3] == 0) { // Field between free
                                rochType = false;
                                return true;
                            
                        }
                    }
                }
            }
        }
    
        return false;
    } else if (tfigure == "rook") {
        if(x2-x1 == 0 || y2-y1 == 0){
            let diff;
            if(x2 != x1){
                diff = Math.abs(x2-x1)
            } else{
                diff = Math.abs(y2-y1)
            }
    
            let xD;
            let yD;
            if(x1 > x2){xD = -1;} 
            else{xD = 1;}
            if(y1 > y2){yD = -1;} 
            else{yD = 1;}
    
            for (let i = 0; i < diff-1; i++) {
                if(y1 != y2){
                    if(gameMatrix[y1+1*yD+i*yD][x2] != 0) {
                        return false
                    }
                } else{
                    if(gameMatrix[y2][x1+1*xD+i*xD] != 0) {
                        return false
                    }
                }
            }
            return true
        }
        return false    
    }
}

/**
 * Check if the move is possible
 * when the king is checked the move isn't possible
 * @param {*} figure
 * @param {*} pos 
 * @returns true if move is possible - false if move isn't possible
 */
function checkMoveCheck(figure, pos, prePos){
    let tempMatrix = new Array(8);
    for (let y = 0; y < 8; y++) {
        tempMatrix[y] = new Array(8);
        
        for (let x = 0; x < 8; x++) {
            tempMatrix[y][x] = gameMatrix[y][x]
        }
    }

    gameMatrix[pos[1]][pos[0]] = figure;
    gameMatrix[prePos[1]][prePos[0]] = 0;

    retur = true;

    // If check color is the figure color return false
    if(checkCheck() == figure.substr(figure.length-1, 1)){
        retur = false;
    }

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            gameMatrix[y][x] = tempMatrix[y][x]
        }
    }

    return retur;
}

/**
 * Makes a rochade, sets the rooks to there new position
 * @param {*} y Coordinate to get the side
 */
function rochade(y){
    let side;
    if(y == 0){
        side = "W"
    } else{
        side = "B"
    }

    if(rochType){
        gameMatrix[y][7] = 0
        gameMatrix[y][5] = "rook" + side;
    } else{
        gameMatrix[y][0] = 0
        gameMatrix[y][3] = "rook" + side;
    }
}

/**
 * Sets the figures in HTML
 * @param {*} figure 
 * @param {*} x 
 * @param {*} y 
 */
function convertPawn(figure, x, y){
    let side = "B"
    if(figure.substr(figure.length-1, 1) == "W"){
        side = "W"
    }

    for (let i = 0; i < 4; i++) {
        document.getElementById(`${i}`).removeAttribute('class');
        document.getElementById(`${i}`).classList.add(`${x}`)
        document.getElementById(`${i}`).classList.add(`${y}`)
    }

    document.getElementById('0').src = `./Images/Figures/queen${side}.png`;
    document.getElementById(`0`).classList.add(`queen${side}`)

    document.getElementById('1').src = `./Images/Figures/rook${side}.png`;
    document.getElementById(`1`).classList.add(`rook${side}`)

    document.getElementById('2').src = `./Images/Figures/bishop${side}.png`;
    document.getElementById(`2`).classList.add(`bishop${side}`)

    document.getElementById('3').src = `./Images/Figures/knight${side}.png`;
    document.getElementById(`3`).classList.add(`knight${side}`)

    document.querySelector('#pawnField').style.display = "block";
}

/**
 * Attribute of the figure
 * @param {*} temp 
 */
function setPawn(temp){
    let x = temp.classList[0]
    let y = temp.classList[1]
    let figure = temp.classList[2]

    gameMatrix[y][x] = figure
    setFigures();
    checkCheck();
    document.querySelector('#pawnField').style.display = "none";
}