//----------- Movement -----------//
let position1; // Start Position
let figure; // Current Figure
let picked = false; // Status if figure is picked
let white = true; 

function moveFigure(position, elem){
    let x = ah(position.substr(0,1));
    console.log(x)
    if(picked == false){
        if(document.querySelector('.active')){
            document.querySelector('.active').classList.remove("active");
        }
        elem.classList.add("active")
        picked = true;
        position1 = position
        document.getElementById(position1).style.border = "solid 1px orange";
    } else {
        document.querySelector('.active').classList.remove("active");
        picked = false;
        document.getElementById(position1).style.border = "solid 1px black";
    }
}

function checkMove(figure, x1, y1, x2, y2){ // Figur, Position before, Position after
    if(figure == "turmW"){
        if(y == 1){
            //2 forward
            if(y == y1-2 && x == x1 && gameMatrix[y+2][x] == 0){
                return true;
            } 
            //1 forward
            else if(y == y1-1 && x == x1 && gameMatrix[y+1][x] == 0){
                return true;
            }         
            else{
                return false;
            }
        } 
        else{
            //1 forward
            if(y == y1-1 && gameMatrix[y+1][x] == 0){
                return true;
            }      
            else{
                return false;
            }
        }
    } 
    else if(figure == "turmB"){
            //Check if Farmer didn't move before
            if(y == 6){
                //2 forward
                if(y == y1+2 && x == x1 && gameMatrix[y-2][x] == 0){
                    return true;
                } 
                //1 forward
                else if(y == y1+1 && x == x1 && gameMatrix[y-1][x] == 0){
                    return true;
                }         
                else{
                    return false;
                }
            } else{
                //1 forward
                if(y == y1+1 && gameMatrix[y-1][x] == 0){
                    return true;
                }      
                else{
                    return false;
                }
            }
    }
    else{
        figure = figure.substr(0, figure.length-1);
        if(figure == "springer"){

        } else if(figure == "läufer"){

        } else if(figure == "dame"){
            
        } else if(figure == "könig"){

        } else if(figure == "bauer"){
            
        }
    }
}