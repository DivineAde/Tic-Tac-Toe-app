import { useState } from 'react'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.success('Successfully');

function App() {
  const [char, setChar] = useState('X')
  const [count, setCount] = useState(1)
  const [winner, setWinner] = useState('')
  const [matrix, setMatrix] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  
  const getBGClass = (value) => {
    if(value === "X") return "yellow";
    if(value === "O") return "orange";

    return '';
  }

  const handleClick = (r,c) => {
    if (matrix[r][c]) return;
    const temMatrix = [...matrix]
    temMatrix[r][c] = char
    setMatrix(temMatrix)
    setChar(char === "X" ? "O" : "X")
    checkWinner();
    setCount(count + 1)
  }

  const checkWinner = () => {
    //check for row winner
    if (matrix[0][0] && matrix[0][0] === matrix[0][1] && matrix[0][1] === matrix[0][2] ) {
      setWinner(matrix[0][0] + " " + 'is the winner');
    }
    if (matrix[1][0] && matrix[1][0] === matrix[1][1] && matrix[1][1] === matrix[1][2] ) {
      setWinner(matrix[1][0] + " " +  'is the winner');
    }
    if (matrix[2][0] && matrix[2][0] === matrix[2][1] && matrix[2][1] === matrix[2][2] ) {
      setWinner(matrix[2][0] + " " + 'is the winner');
    }

    // check for column winner
    if (matrix[0][0] && matrix[0][0] === matrix[1][0] && matrix[1][0] === matrix[2][0] ) {
      setWinner(matrix[2][0] + " " + 'is the winner');
    }
    if (matrix[0][1] && matrix[0][1] === matrix[1][1] && matrix[1][1] === matrix[2][1] ) {
      setWinner(matrix[2][1] + " " + 'is the winner');
    }
    if (matrix[0][2] && matrix[0][2] === matrix[1][2] && matrix[1][2] === matrix[2][2] ) {
      setWinner(matrix[2][2] + " " + 'is the winner');
    }

    //checking for diagonal winner 
    if (matrix[0][0] && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] ) {
      setWinner(matrix[2][2] + " " + 'is the winner');
    }
    if (matrix[0][2] && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] ) {
      setWinner(matrix[2][0] + " " + 'is the winner');
    }

    if (count === 9){
      setWinner("XO Drawn!!!")
    }
  };

  

  return (
    <div className="app">
      <div className="header alignCenter">
         Tic Tac Toe game
      </div>

      <div className="alignCenter board">
        {!winner && <p>{char} turn now</p>}
        <div className="gameBoard">
          {winner ||
           matrix.map((row, rIndex) => (
              <div key={rIndex} className={`row row-${rIndex % 3}`}>
                {
                  row.map((cell, cIndex) => (
                    <div key={cIndex} 
                     onClick={() => handleClick(rIndex,cIndex)}
                     className={`cell alignCenter ${getBGClass(matrix[rIndex][cIndex])}  cell-${cIndex % 3}`}>{matrix[rIndex][cIndex]}</div>
                  ))
                }
              </div>
            ))
          }
        </div>
        <button onClick={() => { setWinner(''); notify(); setMatrix([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);}}>Reset game</button>
        <Toaster  
            position="top-center"
            reverseOrder={false}
        />
      </div>
    </div>
  )
}

export default App
