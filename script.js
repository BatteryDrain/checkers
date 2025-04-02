IMGS = ["assets/red coin.webp", "assets/black coin.webp", "assets/null.png"];
INDEX = 0;
function BuildBord(){
    COLOR = "white";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            fig = document.createElement("figure");
            fig.classList.add(COLOR); //apply CSS classes
            fig.id = "cell " + INDEX; //apply id
            img = document.createElement("img");
            if ((row + col) % 2 === 1) { // Only place pieces on dark squares
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
            COLOR = (COLOR === "white") ? "black" : "white"; // Toggle color
        }
        COLOR = (COLOR === "white") ? "black" : "white";
    }
}

BuildBord();

board.addEventListener("click", (e) => {
    if(e.target.id !== "container"){
        console.log(e.target.id);
        fig = e.target.id;
        e.target.style.backgroundColor = "red"; 
    }
});

//bot starts here:

class CheckersGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'black';
    }

    initializeBoard() {
        let board = new Array(8).fill(null).map(() => new Array(8).fill(null));
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    if (row < 3) board[row][col] = 'black';
                    if (row > 4) board[row][col] = 'red';
                }
            }
        }
        return board;
    }

    printBoard() {
        console.log(this.board.map(row => row.map(cell => cell || '-').join(' ')).join('\n'));
    }

    getValidMoves(player) {
        let moves = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col] === player) {
                    let directions = player === 'black' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];
                    for (let [dr, dc] of directions) {
                        let newRow = row + dr, newCol = col + dc;
                        if (this.isValidMove(row, col, newRow, newCol)) {
                            moves.push({ from: [row, col], to: [newRow, newCol] });
                        }
                    }
                }
            }
        }
        return moves;
    }

    isValidMove(row, col, newRow, newCol) {
        return newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && this.board[newRow][newCol] === null;
    }

    makeMove(move) {
        let { from, to } = move;
        this.board[to[0]][to[1]] = this.board[from[0]][from[1]];
        this.board[from[0]][from[1]] = null;
        this.currentPlayer = this.currentPlayer === 'black' ? 'red' : 'black';
    }

    aiMove() {
        let moves = this.getValidMoves(this.currentPlayer);
        if (moves.length > 0) {
            this.makeMove(moves[Math.floor(Math.random() * moves.length)]);
        }
    }
}

// Example usage:
let game = new CheckersGame();
game.printBoard();
game.aiMove();
game.printBoard();
