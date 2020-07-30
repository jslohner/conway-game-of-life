import React, { useState, useEffect } from 'react';
import ControlCenter from './ControlCenter.js';
import Cell from './Cell.js';

function Grid() {
	let [gridCells, setGridCells] = useState([]);
	let gridArr = [];
	for (let x = 0; x < 25; x++) {
		for (let y = 0; y < 25; y++) {
			gridArr.push([y, x]);
		}
	}
	useEffect(() => {
		// setGridCells(gridArr);
		// console.log(gridCells);
		setGridCells(
			...gridCells,
			gridArr.map((coordinate, i) => {
				return <Cell key={i} coordinate={coordinate}/>
			})
		);
	}, []);

	return (
		<div className='game-control'>
			{gridCells.length > 0 && <ControlCenter gridCells={gridCells}/>}
			<div className='grid'>
				{
					gridCells.map((cell, i) => {
						// console.log(coordinate);
						// return <Cell key={i} coordinate={coordinate}/>
						return cell;
					})
				}
			</div>
		</div>
	);
}

export default Grid;
