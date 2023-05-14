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

    let move = chess.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;
    setFen(chess.fen());
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