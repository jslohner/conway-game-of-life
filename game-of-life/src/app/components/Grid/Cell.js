import React, { useState } from 'react';

function Cell({ cellNum }) {
	let [isAlive, setIsAlive] = useState(false);
	let cellState = isAlive ? 'alive' : 'dead'

	const toggleAlive = () => {
		setIsAlive(!isAlive);
	}

	return (
		<div className={`grid-cell-${cellState}`} onClick={toggleAlive}>
			{/* <p></p> */}
		</div>
	);
}

export default Cell;
