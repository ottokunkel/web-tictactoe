
/*
Object from factory method:
  - stores game state
  - sets pieces
  - 
*/
gameBoard = (
  function () {
    const board = ["","","","","","","","",""]; 

    let turn = "X";
    let round = 0;

    /*
    0 - going
    1 - X win
    2 - O win
    3 - tie
    */
    let gameState = 0; 

    function setPiece(index) {
     if(index >= 0 && index < 9 && gameState == 0){
      if (board[index] == "" ){
        board[index] = turn;
        if(turn == "X"){
          turn = "O";
        }else{
          turn = "X";
        }
        
        round = round + 1;
      }
     } 
    }

    function getPiece(index){
      if(index < 9 && index >= 0){
        return board[index];
      }  
    }

    function checkWin(){
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (const combination of winningCombinations){
        if(board[combination[0]] && board[combination[0]] == board[combination[1]] && board[combination[0]] == board[combination[2]]){
          if(board[combination[0]] == "X"){
            gameState = 1;
          }else{
            gameState = 2;
          }
          return;
        }
      }
      
      if(round == 9){
        gameState = 3;
        return;
      }
      
    }

    function getState(){
      return gameState;
    }
    
    return {getPiece,setPiece, checkWin, getState}; 
  }
)();

displayManager = (
  function () {
    
    const gameBox = document.querySelectorAll(".game-box");
    
    function updateBoard(index){
      const state = gameBoard.getState();
      if(state != 0){
        custom_style = { 
          boxSizing: "border-box",
          textAlign: "center",
          width: "400px",
          height: "90px",
          border: "5px solid var(--dark-brown)",
          borderRadius: "50px",
          fontSize: "50px",
        }
        
        element = document.querySelector(".gameState");
        if(element){
          Object.assign(element.style,custom_style);
        }
        if(state == 3){
          document.querySelector(".gameState").textContent = "TIE!"
        }else if(state == 2){
        document.querySelector(".gameState").textContent = "O WINS!"
  
        }else if(state == 1){
        document.querySelector(".gameState").textContent = "X WINS!"
        }
      }
      
      const box = document.querySelector(`[data-index="${index}"]`);      
      box.textContent = gameBoard.getPiece(index); 
    }

    gameBox.forEach((box) => {
      box.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        gameBoard.setPiece(index);
        gameBoard.checkWin();
        updateBoard(index);
        
      })
    })


  }
)();