// select the item element
let posStart;
let posEnd;
let figure;
let temp = 1;

const boxes = document.querySelectorAll('div');

boxes.forEach(box => {
    box.addEventListener('dragstart', dragStart)
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragStart(e){
    posStart = null;
    posEnd = null;
    figure = null;
    temp = 1;

    let pos = e.path[1].classList[1];

    if(pos){
        posStart = pos.charAt(1) + pos.charAt(2)
    
        figure = gameMatrix[pos.charAt(2)][pos.charAt(1)]
    }
    
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');

    let pos = e.target.classList[1]

    if(pos){
        posEnd = pos.charAt(1) + pos.charAt(2)
    }
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    pickFigure(posStart)

    if(temp == 1){
        e.target.classList.remove('drag-over');
        document.querySelector('.hide').classList.remove('hide');

        pickFigure(posEnd)
    } else if(temp == 4){
        temp = 1;
    }
    temp++
}