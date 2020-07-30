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
		setGridCells(gridArr);
	}, []);

	return (
		<div className='game-control'>
			<ControlCenter />
			<div className='grid'>
				{
					gridCells.map((coordinate, i) => {
						return <Cell key={i} coordinate={coordinate}/>
					})
				}
			</div>
		</div>
	);
}

export default Grid;
