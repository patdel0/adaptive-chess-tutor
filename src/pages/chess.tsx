import React, { useEffect, useState } from 'react';
const isBrowser = typeof window !== "undefined";
const Chess = isBrowser ? require('chess.js').Chess : null;
let Chessboard: any = () => null;

if (isBrowser) {
  Chessboard = require('chessboardjsx').default;
}

export default function ChessGame() {
  const [fen, setFen] = useState('start');
  const [chess, setChess] = useState(null);

  useEffect(() => {
    if (Chess) {
      setChess(new Chess());
    }
  }, []);

  const handleMove = ({ sourceSquare, targetSquare }) => {
    if (!chess) return;
  
    try {
      let move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
  
      if (move === null) return;
  
      setFen(chess.fen());
  
      if (chess.isCheckmate()) {
        const winner = chess.turn() === 'w' ? 'BLACK' : 'WHITE';
        console.log(`Game over, ${winner} is the winner.`);
      }
  
    } catch (error) {
      console.log('Illegal move');
    }
  };
  
  
  
  
  

  return (
    <div>
      {chess && (
        <Chessboard
          position={fen}
          onDrop={(move) =>
            handleMove({
              sourceSquare: move.sourceSquare,
              targetSquare: move.targetSquare
            })
          }
        />
      )}
    </div>
  );
}
