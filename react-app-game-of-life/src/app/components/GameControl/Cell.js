import React, { useState, useRef } from 'react';

function Cell({ cellId, alive, currentCellStateChange, toggleCellAlive }) {
	let [isAlive, setIsAlive] = useState(alive);
	let cellState = useRef(null);
	// cellState.current = isAlive;
	// if (cellState.current === true) {
	// 	setIsAlive(true);
	// } else if (cellState.current === false) {
	// 	setIsAlive(false);
	// }
	let cellClass = isAlive ? 'alive' : 'dead';

	// function toggleAlive() {
	// 	setIsAlive(!isAlive);
	// }

	function handleChange(e) {
		setIsAlive(!isAlive);
		// toggleCellAlive(cellState);
		currentCellStateChange(e.target);
	}

	return (
		<div id={cellId} className={`grid-cell-${cellClass}`} ref={cellState} onClick={handleChange}></div>
	);
}

export default Cell;
