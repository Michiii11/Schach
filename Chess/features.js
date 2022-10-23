// select the item element
const item = document.querySelector('.box');

let posStart;
let posEnd;
let figure;

// attach the dragstart event handler
item.addEventListener('dragstart', dragStart);

// handle the dragstart

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}


const boxes = document.querySelectorAll('div');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    if(!posStart){
        posStart = e.target.classList[1];
        if(posStart){
            pickFigure(posStart.charAt(1) + posStart.charAt(2))
        }
    }
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    posEnd = e.target.classList[1];
    document.querySelector('#devField').innerHTML += `<p>PosEnd: ${posEnd}</p>`

    if(posEnd){
        pickFigure(posEnd.charAt(1) + posEnd.charAt(2))
    }
    document.querySelector('#devField').innerHTML += `<p>${posStart}, ${posEnd}</p>`

    let posS = [posStart.charAt(1), posStart.charAt(2)] // x - y
    let posE = [posEnd.charAt(1), posEnd.charAt(2)] // x - y
}
