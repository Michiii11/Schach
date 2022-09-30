//----------- Movement -----------//
let position1; // Start Position
let figure; // Current Figure
let picked = false; // Status if figure is picked
let white = true; // Current Player

function moveFigure(position, figure) {
    gameMatrix[position[1]][position[0]] = figure;
}

function checkMove(figure, x1, y1, x2, y2) { // Figur, Position before, Position after
    console.log(figure, x1, y1, x2, y2)

    if(gameMatrix[y2][x2] != 0){
        if(gameMatrix[y2][x2].substr(gameMatrix[y2][x2].length-1, 1) == figure.substr(figure.length-1, 1)){
            return false
        }
    }

    if (figure == "pawnW") {
        // Check if Farmer didn't move before
        if (x1 == x2) { // Move is in one Line
            if (y1 == 1) {
                if (y2 == y1 + 2 || y2 == y1 + 1 && gameMatrix[y2][x2] == 0) {
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
        } else{
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
            if (y1 == 6) {
                if (y2 == y1 - 2 || y2 == y1 - 1 && gameMatrix[y2][x2] == 0) {
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
        } else{
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
        let x = x1-x2;
        let y = y1-y2;
        let knight = [
            {"x": -2, "y": 1}, {"x": -1, "y": 2}, {"x": 1, "y": 2}, {"x": 2, "y": 1}, 
            {"x": 2, "y": -1}, {"x": 1, "y": -2}, {"x": -1, "y": -2}, {"x": 2, "y": -1}
        ]

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
        // Check diagonal oder gerade , wenn gerade dann rook, wenn diagonl dann bishop
        console.log(Math.abs(x2-x1) == Math.abs(y2-y1), Math.abs(x2-x1)!=0 || Math.abs(x2-x1)!=0)
        console.log(Math.abs(x2-x1), Math.abs(y2-y1))
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
        } else if(Math.abs(x2-x1)!=0 && y2-y1==0 || Math.abs(y2-y1)!=0 && x2-x1==0){
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
        if(x1-x2 == 1 || x1-x2 == -1) {
            return true
        }
        if(y1-y2 == 1 || y1-y2 == -1) {
            return true
        }
        return false
    } else if (tfigure == "rook") {
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
}