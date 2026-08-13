IMGS = ["assets/red coin.webp", "assets/black coin.webp"];
INDEX = 0;
SELECTED = "";
FIGURES = [];
BOARD = [
    [,'r',,'r',,'r',,'r'],
    ['r',,'r',,'r',,'r',],
    [,'r',,'r',,'r',,'r'],
    [,,,,,,,],
    [,,,,,,,],
    ['b',,'b',,'b',,'b',],
    [,'b',,'b',,'b',,'b'],
    ['b',,'b',,'b',,'b',],
]
function BuildBord(){
    COLOR = "white";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            fig = document.createElement("figure");
            fig.classList.add(COLOR); //apply css classes
            fig.id = "cell" + INDEX; //apply id
            img = document.createElement("img");

            boardsquare = BOARD[row][col];
            if (boardsquare=='r') {
                img.src = IMGS[0];
            }
            if (boardsquare=='b') {
                img.src = IMGS[1];
            }
            
            img.id = "img" + INDEX;
            fig.appendChild(img);
            board.appendChild(fig);

            INDEX++
            COLOR = (COLOR === "white") ? "black" : "white"; //switch color

            // console.log (row * col + 1);
            if((row * col + 1) == 50){
                setFigures();
            }
        }
        COLOR = (COLOR === "white") ? "black" : "white";
    }
}

function setFigures(){
    FIGURES = document.querySelectorAll("figure");
    console.log(FIGURES);
}

BuildBord();

board.addEventListener("click", (e) => {
    if(e.target.classList.contains("black") || e.target.classList.contains("white")){
        // console.log(e.target.id);
        cellcolor = null;
        if(SELECTED == e.target.id){
            clear();
        }
        else{
            clear();
            if(e.target.classList.contains("white")) {
                e.target.style.backgroundColor = "rgb(0, 234, 255)";
                cellcolor = "white";
            }
            else{
                e.target.style.backgroundColor = "rgb(17, 145, 149)";
                cellcolor = "black";
            }
            SELECTED = e.target.id;
            moves(SELECTED, false, cellcolor);
        }
    }
    else{
        if(e.target instanceof HTMLImageElement == true){
            number = e.target.id.substr(3,2);
            tileId = number;
            tile = document.getElementById("cell" + tileId);
            if(SELECTED == "cell" + tileId){
                clear();
                SELECTED = "";
            }
            else{
                clear();
                SELECTED = "";
                // console.log("tile = " + tile.classList);
                if(tile.classList.contains("white")){
                    tile.style.backgroundColor = "rgb(0, 234, 255)";
                    cellcolor = "white";
                }
                else{
                    tile.style.backgroundColor = "rgb(17, 145, 149)";
                    cellcolor = "black";
                }
                SELECTED = "cell" + tileId;
                moves(SELECTED, true, cellcolor);
            }
        }
    }
});

function clear(){
    for (i = 0; i < 65; i++) {
        cell = document.getElementById("cell" + i);
        if (cell && cell.classList.contains("white")) {
            cell.style.backgroundColor = "white";
        }
        if (cell && cell.classList.contains("black")) {
            cell.style.backgroundColor = "rgb(30, 67, 38)";
        }
    }
}
//movement

function moves(selected, img, ccolor){
    console.log("log: "+selected);
    val = selected.slice(4,selected.length);
    col = val % 8;
    row = (val - col) / 8;
    // console.log("cell id: " + val, "row: " + row, "columb: " + col);
    if (img == true) {
        if (BOARD[row][col] == "r") {
            brval = "cell" + (parseInt(val) + 7);
            console.log(brval);
            console.log(brval.classList);
            if(ccolor == "white") {
                brval.style.backgroundColor = "rgb(0, 234, 255)";
            }
            else{
                brval.style.backgroundColor = "rgb(17, 145, 149)";
            }
        }
    }
}

//bot starts here: