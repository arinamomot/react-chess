import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComp from "./CellComp";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardCompProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComp: FC<BoardCompProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];

    function cellClick(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if(cell.figure?.color === currentPlayer?.color) {
            setSelectedCell(cell);
        }
        }
    }

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3 className="currentPlayer">Current user: {currentPlayer?.color}</h3>
        <div className="board">
            {board.cells.map((row, index) =>
               <React.Fragment key={index}>
                   {row.map(cell =>
                       <CellComp
                           cellClick={cellClick}
                           cell={cell} key={cell.id}
                           selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                       />
                   )}
               </React.Fragment>
            )}
        </div>
        </div>
    );
};

export default BoardComp;