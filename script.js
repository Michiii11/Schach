let side = true;
function buildChessboard(){ // true == white , false == black
    let content = ""
    if(!side){
        let startN = 1;
        let startL = 'a';
    
        for(let x = startL.charCodeAt(0); x < startL.charCodeAt(0)+8; x++){
            content += `<div class="rows">`
            for(let y = startN; y <= 8; y++){
                content += `<div class="box" onclick="moveFigure('${String.fromCharCode(x)}${y}')" id="${String.fromCharCode(x)}${y}">${String.fromCharCode(x)}${y}</div>`;
            }
            content += `</div>`
        }
    } else{
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
    muster();
    setFigure();
}

buildChessboard();


