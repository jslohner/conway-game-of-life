import React, { useState, useEffect } from 'react';
import ControlCenter from './ControlCenter.js';
import Cell from './Cell.js';

let gridArr = [];
for (let x = 0; x < 25; x++) {
	for (let y = 0; y < 25; y++) {
		gridArr.push([y, x]);
	}
}

function Grid() {
	// let [gridCells, setGridCells] = useState(
	// 	gridArr.map((coordinate, i) => {
	// 		return <Cell key={i} cellId={i} coordinate={coordinate} cellStateChange={cellStateChange}/>
	// 	})
	// );
	let [gridCells, setGridCells] = useState(
		gridArr.map((coordinate, i) => {
			return {'key': i, 'coordinate': coordinate, 'isAlive': false};
		})
	);

	function cellStateChange(cell) {
		let rtnGridCells = [...gridCells];
		let targetCellData = {...gridCells[cell.id]};
		targetCellData.isAlive = !targetCellData.isAlive;
		rtnGridCells[cell.id] = targetCellData;
		setGridCells(rtnGridCells);
	}

	function nextStep() {
		// let aliveCoordinates = gridCells.filter((cell, i) => {
		// 	if (cell.isAlive) {
		// 		console.log(cell.coordinate);
		// 		return cell.coordinate;
		// 	}
		// });
		let aliveCoordinates = [];
		gridCells.forEach((cell, i) => {
			if (cell.isAlive) {
				aliveCoordinates.push(cell.coordinate);
			}
		});
	}

	useEffect(() => {
	}, []);

	return (
		<div className='game-control'>
			{gridCells.length > 0 && <ControlCenter nextStep={nextStep}/>}
			<div className='grid'>
				{/* {console.log(gridCells)} */}
				{gridCells.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} coordinate={cell.coordinate} alive={cell.isAlive} cellStateChange={cellStateChange}/>
					})}
			</div>
		</div>
	);
}

export default Grid;
