IMGS = ["assets/red coin.webp", "assets/black coin.webp", "assets/null.png"];
INDEX = 0;
SELECTED = "";
FIGURES = [];
function BuildBord(){
    COLOR = "white";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            fig = document.createElement("figure");
            fig.classList.add(COLOR); //apply css classes
            fig.id = "cell" + INDEX; //apply id
            img = document.createElement("img");
            if ((row + col) % 2 === 1) {
                if (row < 3) {
                    img.src = IMGS[0];
                } 
                if (row > 4) {
                    img.src = IMGS[1];
                }
            }
            fig.appendChild(img);
            board.appendChild(fig);

            INDEX++
            COLOR = (COLOR === "white") ? "black" : "white"; //switch color

            console.log (row * col + 1);
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
    if(e.target.id !== "board"){
        console.log(e.target.id);
        for (i = 0; i < 65; i++) {
            cell = document.getElementById("cell" + i);
            if (cell && cell.classList.contains("white")) {
                cell.style.backgroundColor = "white";
            }
            if (cell && cell.classList.contains("black")) {
                cell.style.backgroundColor = "rgb(30, 67, 38)";
            }
        }
        SELECTED = "";
        if(e.target.classList.contains("white")){
            e.target.style.backgroundColor = "rgb(0, 234, 255)"; 
        }
        else{
            e.target.style.backgroundColor = "rgb(17, 145, 149)"; 
        }
        SELECTED = "e.target.id";
    }
});
//bot starts here: