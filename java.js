//Figuren bewegen
function moveFigure(position){
    let x;
    if(auswahl == false){
        x = ah(position.substr(0,1));
        if(white == true){
            if(gameMatrix[position.substr(1,2)-1][x] == "bauerW" || gameMatrix[position.substr(1,2)-1][x] == "turmW" || gameMatrix[position.substr(1,2)-1][x] == "springerW" || gameMatrix[position.substr(1,2)-1][x] == "springerW2" || gameMatrix[position.substr(1,2)-1][x] == "läuferW" || gameMatrix[position.substr(1,2)-1][x] == "königW" || gameMatrix[position.substr(1,2)-1][x] == "dameW"){
                position1 = position;
                document.getElementById(position).style.border = "solid 1px yellow";
                auswahl = true;
                figure = gameMatrix[position.substr(1,2)-1][x];
                vorschlag(position.substr(0,1),position.substr(1,2));
            }
        } else{
            if(gameMatrix[position.substr(1,2)-1][x] == "bauerS" || gameMatrix[position.substr(1,2)-1][x] == "turmS" || gameMatrix[position.substr(1,2)-1][x] == "springerS" || gameMatrix[position.substr(1,2)-1][x] == "springerS2" || gameMatrix[position.substr(1,2)-1][x] == "läuferS" || gameMatrix[position.substr(1,2)-1][x] == "königS" || gameMatrix[position.substr(1,2)-1][x] == "dameS"){
                position1 = position;
                document.getElementById(position).style.border = "solid 1px yellow";
                auswahl = true;
                figure = gameMatrix[position.substr(1,2)-1][x];
            }
        }
    } else{
        x = ah(position.substr(0,1));
        x2 = ah(position1.substr(0,1));

        if(gameMatrix[position1.substr(1,2)-1][x2] != gameMatrix[position.substr(1,2)-1][x]){
            let fits = true;
            fits = FigureMovement(x2, position1.substr(1,2)-1, x, position.substr(1,2)-1);
                if(fits == true){
                    console.log(gameMatrix);
                        //Weiße Figuren können sich nicht selbst schlagen
                        if(white == true && gameMatrix[position.substr(1,2)-1][x] != "turmW" && gameMatrix[position.substr(1,2)-1][x] != "springerW" && gameMatrix[position.substr(1,2)-1][x] != "springerW2" && gameMatrix[position.substr(1,2)-1][x] != "läuferW" && gameMatrix[position.substr(1,2)-1][x] != "königW" && gameMatrix[position.substr(1,2)-1][x] != "dameW" && gameMatrix[position.substr(1,2)-1][x] != "bauerW"){
                            document.getElementById(position).style.backgroundImage = `url(./Figuren/${figure}.png)`
                            document.getElementById(position1).style.backgroundImage = `url(./Figuren/transparent.png)`
                            gameMatrix[position1.substr(1,2)-1][x2] = 0;
                            gameMatrix[position.substr(1,2)-1][x] = figure;
                            auswahl = false;
                            white = false;
                            document.getElementById(position1).style.border = "solid 1px black";
                            document.getElementById("who").innerHTML = "Schwarz ist am Zug!";
                        }
                        //Schwarze Figuren können sich nicht selbst schlagen
                        else if(white == false && gameMatrix[position.substr(1,2)-1][x] != "turmS" && gameMatrix[position.substr(1,2)-1][x] != "springerS" && gameMatrix[position.substr(1,2)-1][x] != "springerS2" && gameMatrix[position.substr(1,2)-1][x] != "läuferS" && gameMatrix[position.substr(1,2)-1][x] != "königS" && gameMatrix[position.substr(1,2)-1][x] != "dameS" && gameMatrix[position.substr(1,2)-1][x] != "bauerS"){
                            document.getElementById(position).style.backgroundImage = `url(./Figuren/${figure}.png)`
                            document.getElementById(position1).style.backgroundImage = `url(./Figuren/transparent.png)`
                            gameMatrix[position1.substr(1,2)-1][x2] = 0;
                            gameMatrix[position.substr(1,2)-1][x] = figure;
                            auswahl = false;
                            white = true;
                            document.getElementById(position1).style.border = "solid 1px black";
                            document.getElementById("who").innerHTML = "Weiß ist am Zug!";
                        }       
                    }
                }
        else{
            auswahl = false;
            document.getElementById(position1).style.border = "solid 1px black";
        }
    }
}

//Figuren Bewegung beschränken
function FigureMovement(x, y , x1, y1){
    console.log("y", y, "x", x,"y1", y1,"x1", x1)
    if(gameMatrix[y1][x1] == "turmW" || gameMatrix[y1][x1] == "turmS"){
        return false;
    }
    if(gameMatrix[y][x] == "springerW" || gameMatrix[y][x] == "springerS" || gameMatrix[y][x] == "springerW2" || gameMatrix[y][x] == "springerS2"){
        return false;
    }
    if(gameMatrix[y][x] == "läuferW" || gameMatrix[y][x] == "läuferS"){
        return false;
    }
    if(gameMatrix[y][x] == "königW" || gameMatrix[y][x] == "königS"){
        if(gameMatrix[y+1][x] == gameMatrix[y1][x1]){
            return true;
        } else if(gameMatrix[y-1][x] == gameMatrix[y1][x1]){
            return true;
        } else if(gameMatrix[y][x+1] == gameMatrix[y1][x1]){
            return true;
        } else if(gameMatrix[y][x-1] == gameMatrix[y1][x1]){
            return true;
        } else{
            return false;
        }
    }
    if(gameMatrix[y][x] == "dameW" || gameMatrix[y][x] == "dameS"){
        return false;
    }
    if(gameMatrix[y][x] == "bauerW"){
           //Check if Farmer didn't move before      
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
    } else if(gameMatrix[y][x] == "bauerS"){
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
}

//Vorschlag
/*function vorschlag(x,y){
    let y1 = parseInt(y);
    let x1 = ah(x);
    console.log(x,y1+2);
    if(gameMatrix[y-1][x1] == "bauerW"){
        if(y1 == 2){
            document.getElementById(`${x}${y1+1}`).style.backgroundImage = `url(blauer-Punkt.png)`
            document.getElementById(`${x}${y1+2}`).style.backgroundImage = `url(blauer-Punkt.png)`
        }
        else{
            document.getElementById(`${x}${y1+1}`).style.backgroundImage = `url(blauer-Punkt.png)`
        }
    } else if(gameMatrix[y-1][x1] == "bauerS"){
        if(y1 == 7){
            document.getElementById(`${x}${y1-1}`).style.backgroundImage = `url(blauer-Punkt.png)`
            document.getElementById(`${x}${y1-2}`).style.backgroundImage = `url(blauer-Punkt.png)`
        }
        else{
            document.getElementById(`${x}${y1-1}`).style.backgroundImage = `url(blauer-Punkt.png)`
        }
    } else{
        document.getElementById(`${x}${y1-1}`).style.backgroundImage = ``
        document.getElementById(`${x}${y1-2}`).style.backgroundImage = ``
    }   
}*/
