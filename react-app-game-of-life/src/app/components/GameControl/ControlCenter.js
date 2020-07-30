import React, { useEffect } from 'react';

function ControlCenter({ gridCells }) {
	// function nextStep(e) {
	// 	e.preventDefault();
	// }

	function nextStep(gridCells) {
		// e.preventDefault();
		let aliveCoordinates = gridCells.map(cell => {
			// console.log(cell.props.alive);
			// if (cell.isAlive) {
			// 	console.log('test')
			// }
			return cell;
		});
	}

	useEffect(() => {
		// console.log(gridCells);
	}, []);

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			<button onClick={() => nextStep(gridCells)}>Next Step</button>
		</div>
	);
}

export default ControlCenter;
