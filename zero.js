
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
}



var board = {
  boardSize : 3,
  playerMove : 1,
  grid : createGrid(this.boardSize),

  swapPlrMv : function() {
    if (this.playerMove === 1) {
      this.playerMove = 2;
    }
    else {
      this.playerMove =1;
    }
  },

  clearBoard: function() {
    for(var i = 0 ; i < this.boardSize ; i++) {
      console.log("here");
      this.grid[i].length = 3;
    }
  },

  //return the contents of the (row,col) position. will be undefined, 1, or 2
  gridStatus : function(row,col) {
    return this.grid[row][col];
  },

  evalWin : function() {
    //8 ways to win
    if (
        //top row all the same and none of the 3 cells are unused (4th line)
       ((this.gridStatus(0,0)===this.gridStatus(0,1))
     && (this.gridStatus(0,0)===this.gridStatus(0,2))
     && (this.gridStatus(0,1)===this.gridStatus(0,2))
     && ((this.gridStatus(0,0)) && (this.gridStatus(0,1)) && (this.gridStatus(0,2)))
   )
     || //mid horiztontal row all same
       ((this.gridStatus(1,0)===this.gridStatus(1,1))
     && (this.gridStatus(1,0)===this.gridStatus(1,2))
     && (this.gridStatus(1,1)===this.gridStatus(1,2))
     && ((this.gridStatus(1,0)) && (this.gridStatus(1,1)) && (this.gridStatus(1,2)))
   )
     || //bottom row all same
       ((this.gridStatus(2,0)===this.gridStatus(2,1))
     && (this.gridStatus(2,0)===this.gridStatus(2,2))
     && (this.gridStatus(2,1)===this.gridStatus(2,2))
     && ((this.gridStatus(2,0)) && (this.gridStatus(2,1)) && (this.gridStatus(2,2)))
   )
     || //left vertical row all same
       ((this.gridStatus(0,0)===this.gridStatus(1,0))
     && (this.gridStatus(0,0)===this.gridStatus(2,0))
     && (this.gridStatus(1,0)===this.gridStatus(2,0))
     && ((this.gridStatus(0,0)) && (this.gridStatus(1,0)) && (this.gridStatus(2,0)))
   )
     || //center vertical row all same
       ((this.gridStatus(0,1)===this.gridStatus(1,1))
     && (this.gridStatus(0,1)===this.gridStatus(2,1))
     && (this.gridStatus(1,1)===this.gridStatus(2,1))
     && ((this.gridStatus(0,1)) && (this.gridStatus(1,1)) && (this.gridStatus(2,1)))
   )
     || //right vertical row all same
       ((this.gridStatus(0,2)===this.gridStatus(1,2))
     && (this.gridStatus(0,2)===this.gridStatus(2,2))
     && (this.gridStatus(1,2)===this.gridStatus(2,2))
     && ((this.gridStatus(0,2)) && (this.gridStatus(1,2)) && (this.gridStatus(2,2)))
   )
     || //diagonal top left to bottom right
       ((this.gridStatus(0,0)===this.gridStatus(1,1))
     && (this.gridStatus(0,0)===this.gridStatus(2,2))
     && (this.gridStatus(1,1)===this.gridStatus(2,2))
     && ((this.gridStatus(0,0)) && (this.gridStatus(1,1)) && (this.gridStatus(2,2)))
   )
     || //diagonal bottom left to top right
       ((this.gridStatus(2,0)===this.gridStatus(1,1))
     && (this.gridStatus(2,0)===this.gridStatus(0,2))
     && (this.gridStatus(1,1)===this.gridStatus(0,2))
     && ((this.gridStatus(2,0)) && (this.gridStatus(1,1)) && (this.gridStatus(0,2)))
   )
      ) {
       console.log("gameover" + this.grid)
     }
  },

  move : function(row, col, player) {
    if (!(this.grid[row][col])) {
      this.grid[row][col] = player;
      this.evalWin();
      return true;
    }
    else {
      return false;
    }
  }

}


var upDate = function(a,r,c) {
  if (board.playerMove === 1) {
    if (board.move(r,c,1)) {
      $(a).html('XXX');
      board.swapPlrMv();
      $(".fart").text('P2');
    }
    else {
      alert("already used");
    }
  }
  else {
    if (board.move(r,c,2)) {
      $(a).html('OOO');
      board.swapPlrMv();
      $(".fart").text('P1');
    }
    else {
      alert("already used");
    }
  }
};

$('.c00').click(function(){upDate(this,0,0);});
$('.c01').click(function(){upDate(this,0,1);});
$('.c02').click(function(){upDate(this,0,2);});
$('.c10').click(function(){upDate(this,1,0);});
$('.c11').click(function(){upDate(this,1,1);});
$('.c12').click(function(){upDate(this,1,2);});
$('.c20').click(function(){upDate(this,2,0);});
$('.c21').click(function(){upDate(this,2,1);});
$('.c22').click(function(){upDate(this,2,2);});

///
/////8 way win tests
// board.move(0,0,1);
// board.move(0,1,1);
// board.move(0,2,1);

// board.move(1,0,1);
// board.move(1,1,1);
// board.move(1,2,1);

// board.move(2,0,1);
// board.move(2,1,1);
// board.move(2,2,1);

// board.move(0,0,1);
// board.move(1,0,1);
// board.move(2,0,1);

// board.move(0,1,1);
// board.move(1,1,1);
// board.move(2,1,1);

// board.move(0,2,1);
// board.move(1,2,1);
// board.move(2,2,1);

// board.move(0,0,1);
// board.move(1,1,1);
// board.move(2,2,1);

// board.move(2,0,2);
// board.move(1,1,2);
// board.move(0,2,2);
//
////end 8 way win test
//
