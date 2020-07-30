import React, { useEffect } from 'react';

function ControlCenter({ gridCells }) {
	function nextStep(e) {
		e.preventDefault();
	}

	useEffect(() => {
		console.log(gridCells);
	}, []);

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			<button onClick={nextStep}>Next Step</button>
		</div>
	);
}

export default ControlCenter;
