


var createGrid = function () {
  var y = new Array(3);
  for (var i = 0; i < 3; i++) {
    y[i] = new Array(3);
  }
  return y;
}//close createGrid function

//create an object 'board' to contain the game data and manipulate the board
var board = {
  playerMove : 1, //board variable defines which player has the next move
  gameOver : false,
  grid : createGrid(), //sets up a 3x3 matrix of undefined. undefined = not used


  //toggles between players. Called after a successful move
  swapPlrMv : function() {
    board.playerMove === 1 ? board.playerMove = 2 : board.playerMove =1;
  }, //close method swapPlrMv()


  //evaluate number of unused cells remaining
  freeCells : function() {
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
       return true
     }
     else {
      return false
     }
  }, //close method evalWin()


  anyMovesLeft : function () {
    if (  board.grid[0][0]
       && board.grid[0][1]
       && board.grid[0][2]
       && board.grid[1][0]
       && board.grid[1][1]
       && board.grid[1][2]
       && board.grid[2][0]
       && board.grid[2][1]
       && board.grid[2][2])
    {
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
    var xTag = "X";
    var oTag = "O";
    if (board.gameOver === false) {
      if (!board.move(r,c,p)) {
        $(".fart").text("already used");
      }
      else {
        if (p === 1) {
          $(selector).html(xTag);
          $(selector).css("background-color","yellow")
        }
        else {
          $(selector).html(oTag);
          $(selector).css("background-color","red")

        }
        if (board.evalWin()) {
          board.gameOver =true;
          $(".fart").text("GAME OVER: Player " + p
                          + " wins. Click Start to play again.");
          strP_ls = 'player'+p;
          localStorage.setItem(strP_ls,(parseInt(localStorage.getItem(strP_ls),10)+1));
          console.log("P1 total: " + localStorage.getItem('player1'));
          console.log("P2 total: " + localStorage.getItem('player2'));
          $("#score1").text("Player 1 wins: " + parseInt(localStorage.getItem('player1')));
          $("#score2").text("Player 2 wins: " + parseInt(localStorage.getItem('player2')));

        }
        else {
          board.swapPlrMv();
          p === 1 ? p=2 : p=1;  //do i need this?
          $(".fart").text("Player " + p + "'s turn");
          if (board.anyMovesLeft() === false) {
            $(".fart").text('GAME OVER: no moves left. Click the blue button to play again.');
          }
            borg.gameCtrl();
        }
      }
    }
  }//close method upDate()
} //close Object board



//create an object 'borg' to govern moves by the AI
var borg = {
  aiPlayer1 : true, //note during the game board.playerMove defines which player has the next move
  aiPlayer2 : false,

  //method to check if either player is 1 move away from a win
  //...if so then play for the win (if forWin = true), or make a move to block
  blockMove : function(forWin) {
    //determine the oppostion player
    var p;
    if (forWin ===true) {
      p=board.playerMove; //player = current player. Use blockMove to win.
    }
    else { //determine the oppostion player
      board.playerMove === 1 ? p=2 : p=1;
    }
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


  takeCorner: function() {
    (Math.random() < 0.5) ? g =0 : g=2;
    (Math.random() < 0.5) ? h =0 : h=2;

    //if all corners free pick one at random
    if (!board.grid[0][0]  &&  !board.grid[0][2]
      &&!board.grid[2][0]  &&  !board.grid[2][2]) {
          board.upDate(g, h, board.playerMove);
          return true;
    }
      else if (!board.grid[0][0]) {board.upDate(0,0,board.playerMove);return true}
      else if (!board.grid[0][2]) {board.upDate(0,2,board.playerMove);return true}
      else if (!board.grid[2][0]) {board.upDate(2,0,board.playerMove);return true}
      else if (!board.grid[2][2]) {board.upDate(2,2,board.playerMove);return true}
    else {
      return false;
    }
  },// close method takeCorner;


  //Logic for making moves....
  moveStructure: function() {
    var FreeCells = board.freeCells();
    if (FreeCells === 9) {
      borg.takeCorner();
    }
    if (FreeCells === 8) {
      if (!board.grid[1][1]) {
          board.upDate(1,1, board.playerMove);
      }
      else if (!borg.takeCorner()) {}
      else {
        //look for wins
        if (borg.blockMove(true)) {}
        else //move to block oppostion wins
        if (borg.blockMove(false)) {}
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
      if (borg.blockMove(true)) {}
      else
      if (borg.blockMove(false)) {}
      else if (borg.takeCorner()) {}
      else {
        if (!board.grid[0][0]) {board.upDate(0,0, board.playerMove);}
        else
        if (!board.grid[0][1]) {board.upDate(0,1, board.playerMove);}
        else
        if (!board.grid[0][2]) {board.upDate(0,2, board.playerMove);}
        else
        if (!board.grid[1][0]) {board.upDate(1,0, board.playerMove);}
        else
        if (!board.grid[1][1]) {board.upDate(1,1, board.playerMove);}
        else
        if (!board.grid[1][2]) {board.upDate(1,2, board.playerMove);}
        else
        if (!board.grid[2][0]) {board.upDate(2,0, board.playerMove);}
        else
        if (!board.grid[2][1]) {board.upDate(2,1, board.playerMove);}
        else
        if (!board.grid[2][2]) {board.upDate(2,2, board.playerMove);}
      }
    }
  },//close method moveStructure()


  gameCtrl : function () {
    // setTimeout(function(){console.log("a"); },1000);
    if (borg.aiPlayer1 || borg.aiPlayer2) {
      if ((board.playerMove === 1) && (borg.aiPlayer1===true)) {
        setTimeout(function() {
          borg.moveStructure();
        },300);
      }
      if ((board.playerMove === 2) && (borg.aiPlayer2===true)) {
        setTimeout(function() {
          borg.moveStructure();
        },300);
      }
    if (board.gameOver) {return};
    }
  }//close method gameCtrl
}//close Object borg


//sUV = (s)creen (U)pdate (V)alues
var sUV= {
  // divClassNames : [".AI1","AI2"],
  PL1 : 0,
  PL2 : 1,
  borgName: ["aiPlayer1","aiPlayer2"],
  // isAItrue : 0,
  // isAIfalse : 1,
  // divText : ["Borg","Human"],
  // divColor : ["Red","Yellow"]
};

var toggleAI = function(divPassed) {
  var className = "#" + divPassed;
  //swap the currentAI setting for the player
  if (borg[sUV.borgName[sUV[divPassed]]] === true) {
    borg[sUV.borgName[sUV[divPassed]]] = false;
    $(className).text("Human");
  } else {
    borg[sUV.borgName[sUV[divPassed]]] =true;
    $(className).text("Borg");
  }
}//close function toggleAI()

var clrScreen = function() {
  for (var u=0; u<3;u++) {
    for (var v=0; v<3;v++) {
      var selector = ".c" + u + v;
      $(selector).html("");
      $(selector).css("background-color","lightgrey")
      board.grid[u][v] = undefined;
      }
    }
  $('.fart').text="Player 1 move";
}//close function clrScreen()


var onStartClick = function() {
  clrScreen();
  board.playerMove = 1;
  board.gameOver = false;
  borg.gameCtrl();
}//close onStartClick() function


$( document ).ready(function() {
  // setup on load
  borg.aiPlayer1 = true;
  $("#PL1").text("Borg");
  $("#PL1").css("background-color","yellow")
  borg.aiPlayer2 = false;
  $("#PL2").text("Human");
  $("#PL2").css("background-color","red");
  //Local storage setup
  myStorage = localStorage;
  if(!localStorage.getItem('player1')) {
    localStorage.setItem('player1',0);
  }
  if(!localStorage.getItem('player2')) {
    localStorage.setItem('player2',0);
  }

  $("#score1").text("Player 1 wins: " + parseInt(localStorage.getItem('player1')));
  $("#score2").text("Player 2 wins: " + parseInt(localStorage.getItem('player2')));

});//close doc ready


////////////////////////////////////////////////////////////////
//
// Event handlers
//
////////////////////////////////////////////////////////////////
$('#PL1').click(function () {toggleAI($(this).attr('id'))});
$('#PL2').click(function () {toggleAI($(this).attr('id'))});
$('#start').click(function(){onStartClick()});

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
$('#scorebox').click(function(){
  console.log("scorebox clicked");
  $('.arrow2').stop();
  localStorage.setItem('player1',0);
  localStorage.setItem('player2',0);
  $("#score1").text("Player 1 wins: " + parseInt(localStorage.getItem('player1')));
  $("#score2").text("Player 2 wins: " + parseInt(localStorage.getItem('player2')));
});
$('.arrow2').click(function() {$('.arrow2').stop()});
// $('.arrow').click(function(){
//   $('.arrow').stop(true,true);
//   console.log("clicked")});

////////////////////////////////////////////////////////////////
//
// END
//
////////////////////////////////////////////////////////////////


//firebase stuff
// myDataRef.set('User ' + name + ' says ' + text);
// myDataRef.set({name: name, text: text});
//myDataRef.push({name: name, text: text});
//
    //myDataRef.on('child_added', function(snapshot) {
      //We'll fill this in later.
    //});
//
    // var message = snapshot.val();
    // displayChatMessage(message.name, message.text);

////////////////////////////////////////////////////////////////
//
// Stuff below relates to some unanswered questions
//
////////////////////////////////////////////////////////////////
    //Question: why can't I pass a parameter when calling this from the board object?
    // var createGrid = function (boardS) {
    //   var y = new Array(boardS);
    //   for (var i = 0; i < boardS; i++) {
    //     y[i] = new Array(boardS);
    //   }
    //   return y;
    // }
    // var myDataRef = new Firebase('https://th8nlssn08b.firebaseio-demo.com/');

    //Question: why can't I use this method to clear the object properties gameOver etc?
    // resetBoard : function() {
    //   board.playerMove = 1;//board variable defines which player has the next move
    //   board.gameOver = false;
    //
    //   // createGrid(); //sets up a 3x3 matrix of undefined. undefined = not used
    // },
