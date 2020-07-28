import React, { useState } from 'react';
import Cell from './Cell.js';

let initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

function Grid() {
	// let gridSize = 25;
	let [gridCells, setGridCells] = useState(initArray);
	// let initArray = new Array(25)
	// setGridCells(initArray)

	return (
		<div>
			{
				gridCells.map(num => {
					return <Cell cellNum={num}/>
				})
			}
		</div>
	);
}

export default Grid;
