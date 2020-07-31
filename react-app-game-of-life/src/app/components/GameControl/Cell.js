import React, { useState } from 'react';

function Cell({ cellId, alive, currentCellStateChange }) {
	let [isAlive, setIsAlive] = useState(alive);
	let cellState = isAlive ? 'alive' : 'dead';

	function toggleAlive() {
		setIsAlive(!isAlive);
	}

	function handleChange(e) {
		toggleAlive();
		currentCellStateChange(e.target);
	}

	return (
		<div id={cellId} className={`grid-cell-${cellState}`} onClick={handleChange}></div>
	);
}

export default Cell;
