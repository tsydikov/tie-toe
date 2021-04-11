
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var player1 = prompt('Игрок1');
var player2 = prompt('Игрок2');
let rank1 =  0;
let rank2 =  0;


function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Score extends React.Component {
  render() {
    
    return (
      <table>Score
          <tr>
            <td>{player1}:</td>
            <td>{rank1}</td>
          </tr>
          <tr>
            <td>{player2}:</td>
            <td>{rank2}</td>
          </tr>
      </table>
    );
  }
}

class Board extends React.Component {
  


  renderSquare(i) {
    return (
      <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
    );
  }

  

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
    
  }
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  zanovo() {
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i,props) {
    const squares = this.state.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      
      return;
  }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }


  result(winname) {
    if (winname == player1) {
       rank1++; 
     } else if (winname == player2) { 
       rank2++;
     } else {
       alert("none");
     }
   } 
   

  render() {

  const winner = calculateWinner(this.state.squares);
  const nobody = calculateNobody(this.state.squares);
  
  if (winner) {
    let winname = this.state.xIsNext ? player2 : player1;
    this.result(winname);
    alert(`Winner: ${winname}`); 
    this.zanovo();
  }

  if (nobody) {
    alert("ничья");
    this.zanovo();
    
  }
  
  

    return (
      
      <div className="game">
        
        <div className="game-board">
        <Board
           squares={this.state.squares}
           onClick={(i) => this.handleClick(i)}
          />
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
        <div className="line4"></div>
        </div>
        <div className="game-score">
          <Score />
        </div>
        
      </div>
    );
  }
 }





  

  

  function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
     
      return squares[a]
    }
  }
  return null;
}

function calculateNobody(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  let hod = 0;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    
    if ((squares[a] == "X" || squares[b] == "X" || squares[c] == "X") && (squares[a] == "O" || squares[b] == "O" || squares[c] == "O")) {
     hod++;
    }
    
    if (hod == 8) {
      return squares[a]
    }
  }
  return null;
}

// ========================================
ReactDOM.render(<Game />, document.getElementById("root"));