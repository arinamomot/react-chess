import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellCompProps {
    cell: Cell;
    selected: boolean;
    cellClick: (cell: Cell) => void;
}

const CellComp: FC<CellCompProps> = ({cell, selected, cellClick}) => {
    return (
        <div className={['cell', cell.color, selected ? "selected" : ''].join(' ')}
        onClick={() => cellClick(cell)}
             style={{background: cell.figure && cell.available ? 'green' : ''}}
        >
            {/*<div className="coordinates">{cell.x} {cell.y}</div>*/}
            {!cell.figure && cell.available && <div className={"available"}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="figure"/>}
        </div>
    );
};

export default CellComp;