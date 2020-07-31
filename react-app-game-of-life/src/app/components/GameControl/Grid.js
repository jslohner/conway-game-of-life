import React, { useState, useEffect, useRef } from 'react';
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
	let [request, setRequest] = useState(null);
	let [frameIndex, setFrameIndex] = useState(0);
	// let start;
	// let [stop, setStop] = useState(false);
	let frameCount = 0;

	// let [prevTimestamp, setPrevTimeStamp] = useState(timestamp - 30);
	// let [continueAnimation, setContinueAnimation] = useState(true);
	// let [started, setStarted] = useState(false);
	let [animationTimeout, setAnimationTimeout] = useState(null);
	let [update, setUpdate] = useState(false);
	let [isRunning, setIsRunning] = useState(false);
	let [isLoading, setIsLoading] = useState(false);
	let [isClearing, setIsClearing] = useState(false);
	let [isSettingGrid, setIsSettingGrid] = useState(false);
	let [nextNSteps, setNextNSteps] = useState([]);
	let [currentGridState, setCurrentGridState] = useState([...baseGrid]);
	let [nextGridState, setNextGridState] = useState([...baseGrid]);
	let [tempGrid, setTempGrid] = useState([...baseGrid]);

	let isRunningRef = useRef(isRunning);
	isRunningRef.current = isRunning;

	function initCell(key, coordinate, isAlive=false) {
		return {'key': key, 'coordinate': coordinate, 'isAlive': isAlive};
	}

	// function animate(time) {
	// 	if (previousTimeRef.current != undefined) {
	// 		let deltaTime = time - previousTimeRef.current;
	// 		setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
	// 	}
	// 	previousTimeRef.current = time;
	// 	if (requestAnimationFrame(nextStep) !== 'no cells to change') {
	// 		requestRef.current = requestAnimationFrame(nextStep);
	// 	}
	// 	// requestRef.current = requestAnimationFrame(nextStep);
	// }
	// let [fps, setFps] = useState(null);
	// let [fpsInterval, setFpsInterval] = useState(null);
	// let [startTime, setStartTime] = useState(null);
	// let [now, setNow] = useState(null);
	// let [then, setThen] = useState(null);
	// let [elapsed, setElapsed] = useState(null);
	let fps, fpsInterval, startTime, now, then, elapsed;

	function animate() {
		let request = requestAnimationFrame(animate);
		setRequest(request);
		now = Date.now();
		// setNow(Date.now());
		elapsed = now - then;
		// setElapsed(now - then);
		if ((elapsed > fpsInterval)) {
			then = now - (elapsed % fpsInterval);
			// setThen((now - (elapsed % fpsInterval)));
			// setNextRecursion(nextNSteps[frameIndex]);
			// frameCount += 1;
			// console.log(nextNSteps[frameCount]);
			// setNextRecursion(nextNSteps[frameCount]);
			// setFrameIndex(frameIndex + 1);
			// console.log(nextNSteps);
			// console.log(frameIndex);
		}
		// setInterval(() => {
		// 	frameCount += 1;
		// 	setNextRecursion(nextNSteps[frameCount]);
		// }, 5000);
	}

	function toggleCellAlive(cellState) {
		cellState.current = !cellState.current;
	}

	function runIteration() {
		console.log(nextNSteps);
		// setIsRunning(true);
		if (frameCount < nextNSteps.length) {
			setNextRecursion(nextNSteps[frameCount]);
			// setGrid([...currentGridState]);
			// setCurrentGridState([...baseGrid]);
			tempGrid.forEach(cell => {
				nextNSteps.forEach(coordinate => {
					if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
						// toggleCellAlive(cell);
						cell.isAlive = !cell.isAlive;
						let rtnGridCells = [...tempGrid];
						let targetCellData = {...tempGrid[cell.key]};
						targetCellData.isAlive = !targetCellData.isAlive;
						rtnGridCells[cell.key] = targetCellData;
						setTempGrid([...rtnGridCells]);
					}
				});
			});
			setGrid(tempGrid);
			setTempGrid([...baseGrid]);
			// setNextRecursion(nextNSteps[frameCount]);
			// console.log(nextNSteps[frameCount]);
			// nextNSteps[frameCount].forEach(coordinate => {
			// 	nextGridState.forEach(cell => {
			// 		if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
			// 			cell.isAlive = !cell.isAlive;
			// 			let rtnGridCells = [...nextGridState];
			// 			let targetCellData = {...nextGridState[cell.key]};
			// 			targetCellData.isAlive = !targetCellData.isAlive;
			// 			rtnGridCells[cell.key] = targetCellData;
			// 			setNextGridState(rtnGridCells);
			// 		}
			// 	});
			// });
			// setCurrentGridState(nextGridState);
			// setNextGridState([...baseGrid]);
			frameCount += 1;
			setUpdate(true);
		} else {
			setUpdate(false);
		}

		// nextNSteps[frameCount].forEach(coordinate => {
		// 	currentGridState.forEach(cell => {
		// 		if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
		//
		// 		}
		// 	});
		// });
		// 	nextGridState.forEach(cell => {
		// 		if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
		// 			cell.isAlive = !cell.isAlive;
		// 			let rtnGridCells = [...nextGridState];
		// 			let targetCellData = {...nextGridState[cell.key]};
		// 			// targetCellData.isAlive = !targetCellData.isAlive;
		// 			rtnGridCells[cell.key] = targetCellData;
		// 			setNextGridState(rtnGridCells);
		// 		}
		// 	});
		// });
		// setCurrentGridState(nextGridState);
		// setNextGridState([...baseGrid]);
		// let timeoutHandler = window.setTimeout(() => {runIteration()}, 5000);
		setAnimationTimeout(setTimeout(() => {runIteration()}, 1000));
	}

	function startAnimation(fps) {
		// setIsRunning(true);
		runIteration();
		// getNextNSteps();
		// fpsInterval = 1000 / fps;
		// // setFpsInterval(1000 / fps)
		// // setThen(Date.now());
		// then = Date.now();
		// startTime = then;
		// setStartTime(then)
		// console.log(startTime);
		// animate();
		// frameCount += 1;
		// setNextRecursion(nextNSteps[frameCount]);

	}

	function stopAnimation() {
		frameCount = 0;
		clearTimeout(animationTimeout);
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

	function getUrlString() {
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
		return urlString;
	}

	function setNextRecursion(nextAliveCoordinates) {
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
	}

	function getNextNSteps() {
		let urlString = getUrlString();
		let recursions = [];
		let ac = [];
		let allUpdates = [];
		axios.get(`http://127.0.0.1:5000/animate/10/${urlString}`)
			.then(res => {
				setIsLoading(true);
				recursions = res.data;
				console.log(recursions);
				for (let key of Object.keys(recursions)) {
					for (let key2 of Object.keys(recursions[key])) {
						recursions[key][key2].forEach((cell, i) => {
							if (cell === 1) {
								ac.push([parseInt(key2),i]);
							}
						});
					}
					allUpdates.push(ac);
					ac = [];
				}
				// allUpdates.forEach(update => setNextNSteps(...nextNSteps, update));
				setNextNSteps(allUpdates);
				console.log(allUpdates);
				// setNextRecursion(allUpdates[4]);
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
			});
	}

	function nextStep() {
		// if (setIsRunning())
		// let aliveCoordinates = [];
		// currentGridState.forEach((cell, i) => {
		// 	if (cell.isAlive) {
		// 		aliveCoordinates.push(cell.coordinate);
		// 	}
		// });
		//
		// let urlString = '';
		// aliveCoordinates.forEach(c => {
		// 	urlString += (`[${c[0]},${c[1]}]`) + (c !== aliveCoordinates[aliveCoordinates.length - 1] ? ', ' : '');
		// 	urlString = (c === aliveCoordinates[aliveCoordinates.length - 1] ? `[${urlString}]` : urlString);
		// });
		let urlString = getUrlString();
		// aliveCoordinates = [];
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
				// console.log(nextAliveCoordinates);
				setNextRecursion(nextAliveCoordinates);
				// nextAliveCoordinates.forEach(coordinate => {
				// 	nextGridState.forEach(cell => {
				// 		if ((cell.coordinate[0] === coordinate[0]) && (cell.coordinate[1] === coordinate[1])) {
				// 			cell.isAlive = !cell.isAlive;
				// 			let rtnGridCells = [...nextGridState];
				// 			let targetCellData = {...nextGridState[cell.key]};
				// 			// targetCellData.isAlive = !targetCellData.isAlive;
				// 			rtnGridCells[cell.key] = targetCellData;
				// 			setNextGridState(rtnGridCells);
				// 		}
				// 	});
				// });
				// setCurrentGridState(nextGridState);
				// setNextGridState([...baseGrid]);
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

	function setGrid(grid) {
		setIsSettingGrid(true);
		console.log(grid);
		setCurrentGridState([...grid]);
	}

	// function onFrame(timestamp) {
	// 	if (continueAnimation) {
	// 		requestAnimationFrame(onFrame);
	// 	}
	// 	let elapsed = prevTimeStamp - timestamp;
	// 	setTimeStamp(timestamp);
	// }
	//
	// function cancelAnimation() {
	// 	setContinueAnimation(false);
	// }
	//
	// useEffect(() => {
	// 	if (!started) {
	// 		setStarted(true);
	// 		requestAnimationFrame(onFrame);
	// 	}
	// }, [started]);

	// useEffect(() => {
	// 	if (update) {
	// 		setUpdate(false);
	// 	} else {
	// 		// setIsRunning(false);
	// 	}
	// }, [currentGridState]);

	useEffect(() => {
		if (update) {
			setUpdate(false);
		}
		setIsClearing(false);
		setIsSettingGrid(false);
	}, [currentGridState]);

	return (
		<div className='game-control'>
			{currentGridState.length > 0 && <ControlCenter isRunningRef={isRunningRef} getNextNSteps={getNextNSteps} startAnimation={startAnimation} stopAnimation={stopAnimation} nextStep={nextStep} clear={clear}/>}
			<div className='grid'>
				{/* {isRunning && current.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange}/>
					})} */}
				{isSettingGrid && !isLoading && !update && !isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange} toggleCellAlive={toggleCellAlive}/>
					})}
				{!isLoading && !update && !isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange} toggleCellAlive={toggleCellAlive}/>
					})}
				{!isLoading && !update && isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={false} currentCellStateChange={currentCellStateChange} toggleCellAlive={toggleCellAlive}/>
					})}
				{!isLoading && update && !isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={cell.isAlive} currentCellStateChange={currentCellStateChange} toggleCellAlive={toggleCellAlive}/>
					})}
				{/* {!isLoading && !isRunning && isClearing && currentGridState.map((cell, i) => {
						return <Cell key={cell.key} cellId={cell.key} alive={false} currentCellStateChange={currentCellStateChange}/>
					})} */}
			</div>
		</div>
	);
}

export default Grid;
