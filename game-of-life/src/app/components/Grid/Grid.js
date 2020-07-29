import React, { useState } from 'react';
import Cell from './Cell.js';

// let initArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
let initArray = (new Array(25 * 25)).fill(0);
// initArray.fill(0)

function Grid() {
	let [gridCells, setGridCells] = useState(initArray);

	return (
		<div className='grid'>
			{
				gridCells.map(num => {
					return <Cell key={num} cellNum={num}/>
				})
			}
		</div>
	);
}

export default Grid;
