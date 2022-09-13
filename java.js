let gameMatrix = [
    ["turmW", "springerW", "läuferW", "dameW", "königW", "läuferW", "springerW2", "turmW"],
    ["bauerW", "bauerW", "bauerW", "bauerW", "bauerW", "bauerW", "bauerW", "bauerW"],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    ["bauerS", "bauerS", "bauerS", "bauerS", "bauerS", "bauerS", "bauerS", "bauerS"],
    ["turmS", "springerS", "läuferS", "dameS", "königS", "läuferS", "springerS2", "turmS"],
]
let auswahl = false;
let position1;
let figure;
let white = true;

muster();
setFigure();

//Schachbrett erstellen
function muster(){
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

//Figuren am Anfang setzen
function setFigure(){
    for (let i = 1; i <= 8; i++) {
        let letter;
        switch(i){
            case(1): letter = "a"; break;
            case(2): letter = "b"; break;
            case(3): letter = "c"; break;
            case(4): letter = "d"; break;
            case(5): letter = "e"; break;
            case(6): letter = "f"; break;
            case(7): letter = "g"; break;
            case(8): letter = "h"; break;
        }

        document.getElementById(`${letter}2`).style.backgroundImage = "url(./Figuren/bauerW.png)";
        document.getElementById(`${letter}7`).style.backgroundImage = "url(./Figuren/bauerS.png)";
    }

    document.getElementById(`a1`).style.backgroundImage = "url(./Figuren/turmW.png)";
    document.getElementById(`h1`).style.backgroundImage = "url(./Figuren/turmW.png)";
    document.getElementById(`a8`).style.backgroundImage = "url(./Figuren/turmS.png)";
    document.getElementById(`h8`).style.backgroundImage = "url(./Figuren/turmS.png)";

    document.getElementById(`b1`).style.backgroundImage = "url(./Figuren/springerW.png)";
    document.getElementById(`g1`).style.backgroundImage = "url(./Figuren/springerW2.png)";
    document.getElementById(`b8`).style.backgroundImage = "url(./Figuren/springerS.png)";
    document.getElementById(`g8`).style.backgroundImage = "url(./Figuren/springerS2.png)";

    document.getElementById(`c1`).style.backgroundImage = "url(./Figuren/läuferW.png)";
    document.getElementById(`f1`).style.backgroundImage = "url(./Figuren/läuferW.png)";
    document.getElementById(`c8`).style.backgroundImage = "url(./Figuren/läuferS.png)";
    document.getElementById(`f8`).style.backgroundImage = "url(./Figuren/läuferS.png)";

    document.getElementById(`e1`).style.backgroundImage = "url(./Figuren/königW.png)";
    document.getElementById(`d1`).style.backgroundImage = "url(./Figuren/dameW.png)";
    document.getElementById(`e8`).style.backgroundImage = "url(./Figuren/königS.png)";
    document.getElementById(`d8`).style.backgroundImage = "url(./Figuren/dameS.png)";
}

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

//A,B,C,D,E,F,G,H Koordinaten in Zahlen umwandeln
function ah(position){
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