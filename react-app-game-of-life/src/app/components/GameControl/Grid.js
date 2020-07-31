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
	let baseGrid = gridArr.map((coordinate, i) => initCell(i, coordinate));
	let [isLoading, setIsLoading] = useState(false);
	let [isClearing, setIsClearing] = useState(false);
	let [currentGridState, setCurrentGridState] = useState([...baseGrid]);
	let [nextGridState, setNextGridState] = useState([...baseGrid]);

	function initCell(key, coordinate, isAlive=false) {
		return {'key': key, 'coordinate': coordinate, 'isAlive': isAlive};
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

	// function checkGridCells(checkCellCoordinate) {
	// 	currentGridState.forEach(cell => {
	// 		if ((cell.coordinate[0] === checkCellCoordinate[0]) && (cell.coordinate[1] === checkCellCoordinate[1])) {
	// 			return cell;
	// 		}
	// 	});
	// }

	function nextStep() {
		let aliveCoordinates = [];
		currentGridState.forEach((cell, i) => {
			if (cell.isAlive) {
				aliveCoordinates.push(cell.coordinate);
			}
		});

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

	function clear() {
		setIsClearing(true);
		setCurrentGridState([...baseGrid]);
		setNextGridState([...baseGrid]);
	}

	useEffect(() => {
		setIsClearing(false);
	}, [currentGridState]);

	return (
		<div className='game-control'>
			{currentGridState.length > 0 && <ControlCenter nextStep={nextStep} clear={clear}/>}
			<div className='grid'>
				{!isLoading && !isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange}/>
					})}
				{!isLoading && isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={false} currentCellStateChange={currentCellStateChange}/>
					})}
			</div>
		</div>
	);
}

export default Grid;
