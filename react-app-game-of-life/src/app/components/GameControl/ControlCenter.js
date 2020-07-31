import React, { useEffect } from 'react';

function ControlCenter({ nextStep }) {
	function handleNextStepClick(e) {
		e.preventDefault();
		nextStep();
	}

	// function nextStep(gridCells) {
	// 	// e.preventDefault();
	// 	let aliveCoordinates = gridCells.map(cell => {
	// 		// console.log(cell.props.alive);
	// 		// if (cell.isAlive) {
	// 		// 	console.log('test')
	// 		// }
	// 		return cell;
	// 	});
	// }

	// useEffect(() => {
	// 	// console.log(gridCells);
	// }, []);

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			<button className='next-step-button' onClick={handleNextStepClick}>Next Step</button>
		</div>
	);
}

export default ControlCenter;
