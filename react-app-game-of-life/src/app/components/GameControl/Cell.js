import React, { useState } from 'react';

function Cell({ cellId, coordinate, cellStateChange }) {
	let [isAlive, setIsAlive] = useState(false);
	let cellState = isAlive ? 'alive' : 'dead';

	function toggleAlive() {
		setIsAlive(!isAlive);
	}

	function handleChange(e) {
		toggleAlive();
		cellStateChange(e.target);
	}

	return (
		<div id={cellId} className={`grid-cell-${cellState}`} onClick={handleChange}></div>
	);
}

export default Cell;
