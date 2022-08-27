import React, {useEffect, useState} from 'react';
import './App.css'
import BoardComp from "./components/BoardComp";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState(new Player(Colors.BLACK))

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setCurrentPlayer(new Player(Colors.WHITE))
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

  return (
    <div className="app">
        <Timer currentPlayer={currentPlayer} restart={restart}/>
      <BoardComp board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>
        <div>
            <LostFigures title="Black figures: " figures={board.lostBlackFigures}/>
            <LostFigures title="White figures: " figures={board.lostWhiteFigures}/>
        </div>
    </div>
  );
};

export default App;
