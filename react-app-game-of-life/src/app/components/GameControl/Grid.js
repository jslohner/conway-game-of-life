import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ControlCenter from './ControlCenter.js';
import Cell from './Cell.js';

let gridArr = [];
for (let x = 0; x < 25; x++) {
	for (let y = 0; y < 25; y++) {
		gridArr.push([y, x]);
	}
}

function Grid() {
	// let [currentGridState, setCurrentGridState] = useState(
	// 	gridArr.map((coordinate, i) => {
	// 		return <Cell key={i} cellId={i} coordinate={coordinate} currentCellStateChange={currentCellStateChange}/>
	// 	})
	// );
	let baseGrid = gridArr.map((coordinate, i) => {
		return initCell(i, coordinate);
	});
	let [isLoading, setIsLoading] = useState(false);
	// let [currentGridState, setCurrentGridState] = useState(
	// 	gridArr.map((coordinate, i) => {
	// 		return initCell(i, coordinate);
	// 	})
	// );
	// // let [nextAliveCoordinates, setNextAliveCoordinates] = useState([]);
	// let [nextGridState, setNextGridState] = useState(
	// 	gridArr.map((coordinate, i) => {
	// 		return initCell(i, coordinate);
	// 	})
	// );
	let [currentGridState, setCurrentGridState] = useState([...baseGrid]);
	let [nextGridState, setNextGridState] = useState([...baseGrid]);

	function initCell(key, coordinate, isAlive=false) {
		return {'key': key, 'coordinate': coordinate, 'isAlive': isAlive};
		// return {'key': coordinate, 'isAlive': false};
	}

	function cellStateChange(cell, grid) {
		let rtnGridCells = [...grid];
		let targetCellData = {...grid[cell.id]};
		targetCellData.isAlive = !targetCellData.isAlive;
		rtnGridCells[cell.id] = targetCellData;
		return rtnGridCells;
	}

	function currentCellStateChange(cell) {
		setCurrentGridState(cellStateChange(cell, currentGridState));
	}

	// function nextCellStateChange(cell) {
	// 	let rtnGridCells = [...nextGridState];
	// 	let targetCellData = {...nextGridState[cell.key]};
	// 	targetCellData.isAlive = !targetCellData.isAlive;
	// 	rtnGridCells[cell.id] = targetCellData;
	// 	setNextGridState(rtnGridCells);
	// 	// setNextGridState(cellStateChange(cell, nextGridState));
	// }

	function checkGridCells(checkCellCoordinate) {
		currentGridState.forEach(cell => {
			// console.log(cell);
			if ((cell.coordinate[0] === checkCellCoordinate[0]) && (cell.coordinate[1] === checkCellCoordinate[1])) {
				return cell;
			}
		});
		// setIsLoading(false);
	}

	function nextStep() {
		let aliveCoordinates = [];
		currentGridState.forEach((cell, i) => {
			if (cell.isAlive) {
				aliveCoordinates.push(cell.coordinate);
			}
		});
		console.log(aliveCoordinates);

		let urlString = '';
		aliveCoordinates.forEach(c => {
			urlString += (`[${c[0]},${c[1]}]`) + (c !== aliveCoordinates[aliveCoordinates.length - 1] ? ', ' : '');
			urlString = (c === aliveCoordinates[aliveCoordinates.length - 1] ? `[${urlString}]` : urlString);
		});
		aliveCoordinates = [];
		axios.get(`http://127.0.0.1:5000/nextstep/${urlString}`)
			.then(res => {
				setIsLoading(true);
				let nextAliveCoordinates = [];
				for (let key of Object.keys(res.data)) {
					res.data[key].forEach((cell, i) => {
						if (cell === 1) {
							nextAliveCoordinates.push([parseInt(key),i]);
						}
					});
				}
				nextAliveCoordinates.forEach(coordinate => {
					nextGridState.forEach(cell => {
						if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
							cell.isAlive = !cell.isAlive;
							let rtnGridCells = [...nextGridState];
							let targetCellData = {...nextGridState[cell.key]};
							// targetCellData.isAlive = !targetCellData.isAlive;
							rtnGridCells[cell.key] = targetCellData;
							setNextGridState(rtnGridCells);
						}
					});
				});
				setCurrentGridState(nextGridState);
				setNextGridState([...baseGrid]);
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<div className='game-control'>
			{currentGridState.length > 0 && <ControlCenter nextStep={nextStep}/>}
			<div className='grid'>
				{/* {console.log(currentGridState)} */}
				{/* {console.log(currentGridState === nextGridState)} */}
				{!isLoading && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange}/>
					})}
			</div>
		</div>
	);
}

export default Grid;
