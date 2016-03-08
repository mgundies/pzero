
// var createGrid = function (boardS) {
//   var y = new Array(boardS);
//   for (var i = 0; i < boardS; i++) {
//     y[i] = new Array(boardS);
//   }
//   return y;
// }
var createGrid = function () {
  var y = new Array(3);
  for (var i = 0; i < 3; i++) {
    y[i] = new Array(3);
  }
  return y;
}//close createGrid function

//create an object 'board' to contain the game data and manipulate the board
var board = {
  boardSize : 3,
  playerMove : 1, //board variable defines which player has the next move
  gameOver : false,
  grid : createGrid(), //sets up a 3x3 matrix of undefined. undefined = not used

  //toggles between players. Called after a successful move
  swapPlrMv : function() {
    if (board.playerMove === 1) {
      board.playerMove = 2;
    }
    else {
      board.playerMove =1;
    }
  }, //close method swapPlrMv()

  //evaluate number of unused cells remaining
  freeCells: function() {
    var numFreeCells = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(!board.grid[i][j]){
          numFreeCells += 1;
        }
      }
    }
    return numFreeCells;
  },//close method freeCells()

  //return the contents of the (row,col) position. will be undefined, 1, or 2
  gridStatus : function(row,col) {
    return board.grid[row][col];
  }, //close method gridStatus()

  evalWin : function() {
    //8 ways to win. Check for completed rows and that the completed row...
    //... is not all empty
    if (
        //top row all the same and none of the 3 cells are unused (4th line)
       ((board.gridStatus(0,0)===board.gridStatus(0,1))
     && (board.gridStatus(0,0)===board.gridStatus(0,2))
     && (board.gridStatus(0,1)===board.gridStatus(0,2))
     && ((board.gridStatus(0,0)) && (board.gridStatus(0,1)) && (board.gridStatus(0,2)))
   )
     || //mid horiztontal row all same
       ((board.gridStatus(1,0)===board.gridStatus(1,1))
     && (board.gridStatus(1,0)===board.gridStatus(1,2))
     && (board.gridStatus(1,1)===board.gridStatus(1,2))
     && ((board.gridStatus(1,0)) && (board.gridStatus(1,1)) && (board.gridStatus(1,2)))
   )
     || //bottom row all same
       ((board.gridStatus(2,0)===board.gridStatus(2,1))
     && (board.gridStatus(2,0)===board.gridStatus(2,2))
     && (board.gridStatus(2,1)===board.gridStatus(2,2))
     && ((board.gridStatus(2,0)) && (board.gridStatus(2,1)) && (board.gridStatus(2,2)))
   )
     || //left vertical row all same
       ((board.gridStatus(0,0)===board.gridStatus(1,0))
     && (board.gridStatus(0,0)===board.gridStatus(2,0))
     && (board.gridStatus(1,0)===board.gridStatus(2,0))
     && ((board.gridStatus(0,0)) && (board.gridStatus(1,0)) && (board.gridStatus(2,0)))
   )
     || //center vertical row all same
       ((board.gridStatus(0,1)===board.gridStatus(1,1))
     && (board.gridStatus(0,1)===board.gridStatus(2,1))
     && (board.gridStatus(1,1)===board.gridStatus(2,1))
     && ((board.gridStatus(0,1)) && (board.gridStatus(1,1)) && (board.gridStatus(2,1)))
   )
     || //right vertical row all same
       ((board.gridStatus(0,2)===board.gridStatus(1,2))
     && (board.gridStatus(0,2)===board.gridStatus(2,2))
     && (board.gridStatus(1,2)===board.gridStatus(2,2))
     && ((board.gridStatus(0,2)) && (board.gridStatus(1,2)) && (board.gridStatus(2,2)))
   )
     || //diagonal top left to bottom right
       ((board.gridStatus(0,0)===board.gridStatus(1,1))
     && (board.gridStatus(0,0)===board.gridStatus(2,2))
     && (board.gridStatus(1,1)===board.gridStatus(2,2))
     && ((board.gridStatus(0,0)) && (board.gridStatus(1,1)) && (board.gridStatus(2,2)))
   )
     || //diagonal bottom left to top right
       ((board.gridStatus(2,0)===board.gridStatus(1,1))
     && (board.gridStatus(2,0)===board.gridStatus(0,2))
     && (board.gridStatus(1,1)===board.gridStatus(0,2))
     && ((board.gridStatus(2,0)) && (board.gridStatus(1,1)) && (board.gridStatus(0,2)))
   )
      ) {
       console.log("gameover" + board.grid)
       return true
     }
     else {
      return false
     }
  }, //close method evalWin()

  anyMovesLeft : function () {
    if ( board.grid[0][0]
      && board.grid[0][1]
      && board.grid[0][2]
      && board.grid[1][0]
      && board.grid[1][1]
      && board.grid[1][2]
      && board.grid[2][0]
      && board.grid[2][1]
      && board.grid[2][2]) {
      console.log("anyMovesLeft is true");
      board.gameOver = true;
      return false
      }
    else {
      return true
    }
  }, //close method anyMovesLeft()

  //Checks if a cell is NOT undefined.
  //If true then updates the cell with player move
  move : function(row, col, player) {
    if (!(board.grid[row][col])) {
      board.grid[row][col] = player;
      return true;
    }
    else {
      return false;
    }
  }, //close method move()

  // Checks if player move is successful.
  // if unsuccessful then tell player to try again
  // A successful move will:
  //    1) update the board.grid and the screen
  //    2) check if the player has won
  //    3) toggle the player with the next move
  upDate : function(r,c,p) {
    var selector = ".c" + r + c;
    console.log(board.freeCells());
    if (board.gameOver === false) {
      if (!board.move(r,c,p)) {
        $(".fart").text("already used");
      }
      else {
        if (p === 1) {
          $(selector).html('...X...');
        }
        else {
          $(selector).html('...O...');
        }
        if (board.evalWin()) {
          board.gameOver =true;
          $(".fart").text("GAME OVER: Player " + p
                          + " wins. Refresh screen to play again.");
        }
        else {
          board.swapPlrMv();
          p === 1 ? p=2 : p=1;
          $(".fart").text("Player " + p + "'s turn");
          if (board.anyMovesLeft() === false) {
            $(".fart").text('GAME OVER: no moves left. Refresh screen to play again.');
          }
          borg.gameCtrl();
        }
      }
    }
  }//close method upDate()
} //close Object board


//create an object 'borg' to govern moves by the AI
var borg = {
  aiPlayer1 : true, //board variable defines which player has the next move
  aiPlayer2 : false,
  // numAIplayers: 1,

  setAIplayer : function (pNum, setting) {
    if (pNum === 1) {
      setting ? (borg.aiPlayer1 = true) : (borg.aiPlayer1 = false);
    }
    else if (pNum === 2 ) {
      setting ? (borg.aiPlayer2 = true) : (borg.aiPlayer1 = false);
    }
  },// close method setAIplayer()

  //method to check if the opposition is 1 move away from a win
  //...if so then make a move to block
  blockMove : function() {
    //determine the oppostion player
    var p;
    board.playerMove === 1 ? p=2 : p=1;
    console.log("block " +p);
    //get the current board values
    var c00 = board.gridStatus(0,0);
    var c01 = board.gridStatus(0,1);
    var c02 = board.gridStatus(0,2);
    var c10 = board.gridStatus(1,0);
    var c11 = board.gridStatus(1,1);
    var c12 = board.gridStatus(1,2);
    var c20 = board.gridStatus(2,0);
    var c21 = board.gridStatus(2,1);
    var c22 = board.gridStatus(2,2);
    //work thru the 8 winning conditions to see if a block is required
    //top row
    if(c00===p && c01===p && !c02)
      {board.upDate(0,2, board.playerMove); return true;}
    if(c00===p && c02===p && !c01)
      {board.upDate(0,1, board.playerMove); return true;}
    if(c01===p && c02===p && !c00)
      {board.upDate(0,0, board.playerMove); return true;}
    //middle row
    if(c10===p && c11===p && !c12)
      {board.upDate(1,2, board.playerMove); return true;}
    if(c10===p && c12===p && !c11)
      {board.upDate(1,1, board.playerMove); return true;}
    if(c11===p && c12===p && !c10)
      {board.upDate(1,0, board.playerMove); return true;}
    //bottom row
    if(c20===p && c21===p && !c22)
      {board.upDate(2,2, board.playerMove); return true;}
    if(c20===p && c22===p && !c21)
      {board.upDate(2,1, board.playerMove); return true;}
    if(c21===p && c22===p && !c20)
      {board.upDate(2,0, board.playerMove); return true;}
    //left column
    if(c00===p && c10===p && !c20)
      {board.upDate(2,0, board.playerMove); return true;}
    if(c00===p && c20===p && !c10)
      {board.upDate(1,0, board.playerMove); return true;}
    if(c10===p && c20===p && !c00)
      {board.upDate(0,0, board.playerMove); return true;}
    //middle column
    if(c01===p && c11===p && !c21)
      {board.upDate(2,1, board.playerMove); return true;}
    if(c01===p && c21===p && !c11)
      {board.upDate(1,1, board.playerMove); return true;}
    if(c11===p && c21===p && !c01)
      {board.upDate(0,1, board.playerMove); return true;}
    //right column
    if(c02===p && c12===p && !c22)
      {board.upDate(2,2, board.playerMove); return true;}
    if(c02===p && c22===p && !c12)
      {board.upDate(1,2, board.playerMove); return true;}
    if(c12===p && c22===p && !c02)
      {board.upDate(0,2, board.playerMove); return true;}
    //top-left to bottom right diagonal
    if(c00===p && c11===p && !c22)
      {board.upDate(2,2, board.playerMove); return true;}
    if(c00===p && c22===p && !c11)
      {board.upDate(1,1, board.playerMove); return true;}
    if(c11===p && c22===p && !c00)
      {board.upDate(0,0, board.playerMove); return true;}
    //top-right to bottom left diagonal
    if(c02===p && c11===p && !c20)
      {board.upDate(2,0, board.playerMove); return true;}
    if(c02===p && c20===p && !c11)
      {board.upDate(1,1, board.playerMove); return true;}
    if(c11===p && c20===p && !c02)
      {board.upDate(0,2, board.playerMove); return true;}
    return false;
  },// close method blockMove()

  //Logic for making moves....
  moveStructure: function() {
    var FreeCells = board.freeCells();
    if (FreeCells === 9) {
      board.upDate(0,0, board.playerMove);
    }

    if (FreeCells === 8) {
      // use a corner if none are used
      if (!board.grid[0][0]  &&  !board.grid[0][2]
        &&!board.grid[2][0]  &&  !board.grid[2][2]) {
            board.upDate(0,0, board.playerMove);
      }
      else if (!board.grid[1][1]) {
          board.upDate(1,1, board.playerMove);
      }
      else {
        //prevent a win by looking for necessary blocks
        if (borg.blockMove()) {}
        else {
          //pick a cell from those remaining
          if (!board.grid[0][1]) {board.upDate(1,1, board.playerMove)}
          else
          if (!board.grid[1][0]) {board.upDate(1,0, board.playerMove)}
          else
          if (!board.grid[1][2]) {board.upDate(1,2, board.playerMove)}
          else
          if (!board.grid[2][1]) {board.upDate(2,1, board.playerMove)}
        }
      }
    }

    if (FreeCells < 8) {
      if (borg.blockMove()) {}
      else {
        if (!board.grid[0][0]) {board.upDate(0,0, board.playerMove)}
        else
        if (!board.grid[0][1]) {board.upDate(0,1, board.playerMove)}
        else
        if (!board.grid[0][2]) {board.upDate(0,2, board.playerMove)}
        else
        if (!board.grid[1][0]) {board.upDate(1,0, board.playerMove)}
        else
        if (!board.grid[1][1]) {board.upDate(1,1, board.playerMove)}
        else
        if (!board.grid[1][2]) {board.upDate(1,2, board.playerMove)}
        else
        if (!board.grid[2][0]) {board.upDate(2,0, board.playerMove)}
        else
        if (!board.grid[2][1]) {board.upDate(2,1, board.playerMove)}
        else
        if (!board.grid[2][2]) {board.upDate(2,2, board.playerMove)}
      }
    }
  },//close method moveStructure()

  gameCtrl : function () {
    if (borg.aiPlayer1 || borg.aiPlayer2) {
        if ((board.playerMove === 1) && (borg.aiPlayer1===true)) {
          borg.moveStructure();
        }
        if ((board.playerMove === 2) && (borg.aiPlayer2===true)) {
          borg.moveStructure();
        }
    }
  }//close method gameCtrl
}//close Object borg


// The following div classes represent the 9 cells on the board.
// Call the method board.upDate and pass the ref to the div and the...
//  ... row and col numbers
$('.c00').click(function(){board.upDate(0,0,board.playerMove);});
$('.c01').click(function(){board.upDate(0,1,board.playerMove);});
$('.c02').click(function(){board.upDate(0,2,board.playerMove);});
$('.c10').click(function(){board.upDate(1,0,board.playerMove);});
$('.c11').click(function(){board.upDate(1,1,board.playerMove);});
$('.c12').click(function(){board.upDate(1,2,board.playerMove);});
$('.c20').click(function(){board.upDate(2,0,board.playerMove);});
$('.c21').click(function(){board.upDate(2,1,board.playerMove);});
$('.c22').click(function(){board.upDate(2,2,board.playerMove);});

//run some code to start the game...
// set 0,1 or 2 AI players
borg.aiPlayer1 = false;
borg.aiPlayer2 = true;
//call gameCtrl method to play any opening AI moves
borg.gameCtrl();

// myStorage = localStorage;
// localStorage.setItem('player1',1);
// localStorage.setItem('player2',14);
