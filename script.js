const userMessage = document.querySelector(".userMessage");
const userDisplay = document.querySelectorAll(".userMessage > *");
const startBtn = document.getElementById("strBtn");
const types2 = document.querySelectorAll(".p2 > *");
const types1 = document.querySelectorAll(".p1 > *");
const playerNames = document.getElementById("enterName");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const cells = document.querySelectorAll(".game  > *");





const myBoard = gameBoard();
let player1;
let player2;

types2.forEach((elem) => elem.addEventListener("click", setPlayer));
types1.forEach((elem) => elem.addEventListener("click", setPlayer));
startBtn.addEventListener("click", () => startGame());
cells.forEach((elem) => elem.addEventListener("click", makeMove));
playerNames.addEventListener('click', () => changeName())





function makeMove(e){
    if (player1 == null || player2 == null){
        removeMessage();
        let div = document.createElement("div");
        div.innerHTML = "pick player or AI";
        userMessage.appendChild(div);
    }
    let cord  =  e.target.id;
    let row = parseInt(cord[1]);
    let col = parseInt(cord[2]);


    if (!myBoard.isWinner() && !myBoard.isBoardFull()){
        if (myBoard.turn == true){
            if (myBoard.isValidMove(row, col)){
                myBoard.placeMark(player1.pmark, row, col);
                myBoard.turn = !myBoard.turn;
                e.target.innerHTML = "O";
                isEndState();
            }
            else{
                alert("cell already filled");
            }
        }else{
            if (myBoard.isValidMove(row, col)){
                myBoard.placeMark(player2.pmark, row, col);
                myBoard.turn = !myBoard.turn;
                e.target.innerHTML = "x";  
                isEndState();
            } 
            else{
                alert("cell already filled");
            }
        }
    }

}

function isEndState(){
    if (myBoard.isWinner()){
        let temp = "";
        if(myBoard.getWinner() == 1){
            temp = player1.pname;
        }
        if(myBoard.getWinner() == -1){
            temp = player2.pname;   
        }
        
        removeMessage();

        let div = document.createElement("div");
        div.innerHTML = temp + " wins";
        userMessage.appendChild(div);
    }
    if(myBoard.isBoardFull()){
        removeMessage();

        let div = document.createElement("div");
        div.innerHTML = "board is full";
        userMessage.appendChild(div);
    }



}

function startGame(){
    removeMessage();
    myBoard.clear();
    cells.forEach((elem) => elem.innerHTML = "");

    let div = document.createElement("div");
    div.innerHTML = "pick player or AI";
    userMessage.appendChild(div);
}

function setPlayer(e){
    let temp = e.target.innerHTML;
    let temptype = temp.slice(0, temp.length -2);
    let num = parseInt(temp.charAt(temp.length-1));
    if (num == 1){
        player1 = player(temptype + " " + num, 1);
    }
    else if(num == 2){
        player2 = player(temptype + " " + num, -1);
    }
} 




function gameBoard(){
    let board = [];
    const turn = true;
    let winner = 0;
    for(let i =0; i<3; i++){
        board[i] = [];
        for(let j =0; j<3; j++){
            board[i][j] = 0;
        }
    }

    const placeMark = (mark, row, col) => {
        board[row][col] = mark;
    };

    const isValidMove = (row, col)=>{
        if(board[row][col] == 0){
            return true;
        }
        return false;
    };


    const isWinner = () =>{
        // vertical check
        let sum =0;
        for (let i =0; i<3; i++){
            for (let j=0; j<3; j++){
                sum += board[j][i];
            }
            if (sum == 3 || sum == -3){
                winner = sum;
                return true;
            }
            sum =0;
        }
        // horizontal
        for (let i =0; i<3; i++){
            for (let j=0; j<3; j++){
                sum += board[i][j];
            }
            if (sum == 3 || sum == -3){
                winner = sum;
                return true;
            }
            sum =0;
        }

        sum = board[0][0] + board[1][1] +board[2][2];
        if (sum == 3 || sum == -3){
            winner = sum;
            return true;
        }

        sum = board[2][0] + board[1][1] +board[0][2];
        if (sum == 3 || sum == -3){
            winner = sum;
            return true;
        }
        
        sum =0 
        return false;
    };

    const isBoardFull = () => {
        for(let i =0; i<3; i++){
            for(let j =0; j<3; j++){
                if (board[i][j] == 0){
                    return false;
                }
            }
        }
        return true;
    } ;

    const getWinner =  () => {
        if (winner == 3){
            return 1;
        } 
        else if(winner == -3){
            return -1;
        }
        else{
            return 0
        }
    }
    const clear = () => {
        for(let i =0; i<3; i++){
            for(let j =0; j<3; j++){
                board[i][j] = 0;
            }
        }
    }


    return {board, turn, isWinner, placeMark, isBoardFull, getWinner, isValidMove, clear};
}


function player(name, mark){
    const pname = name;
    const pmark = mark;
    const result = false;
    const type = 0;

    const makeMove = (board) => {
        let row, col = -1;
        do {
            row = prompt(pname+" put in a row: ");
            col = prompt(pname+ " put in a col: ");
        }while(!board.isValidMove(row, col))
        
            
        board.placeMark(pmark, parseInt(row), parseInt(col));
        board.turn = !board.turn;

    }; 

    const setType = (newType) => {
        type = newType;
    }


    return {pname, pmark, result, makeMove, setType}
}





function removeMessage(){
    let parent = document.querySelector(".userMessage");
    let list = document.querySelectorAll(".userMessage > *");

    list.forEach((elem) => {
        if (elem.tagName == "DIV"){
            // console.log(elem.innerHTML);
            parent.removeChild(elem);
        }
    });
}

function changeName() {
    if(player1 == undefined || player2 == undefined){
        removeMessage();
        let div = document.createElement("div");
        div.innerHTML = "pick player or AI";
        userMessage.appendChild(div);
    }
    else{
    if(name1.value != ""){
        let btnName = document.getElementById("p1");
        btnName.innerHTML =name1.value;
        player1.pname = name1.value;

    }
    if(name2.value != ""){
        let btnName = document.getElementById("p2");
        btnName.innerHTML =name2.value;
        player2.pname = name2.value;
    }
}
}