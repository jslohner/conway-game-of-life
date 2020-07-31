import React, { useEffect } from 'react';

function ControlCenter({ nextStep, clear }) {
	function handleNextStepClick(e) {
		e.preventDefault();
		nextStep();
	}

	function handleClear(e) {
		e.preventDefault();
		clear();
	}

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			<button className='next-step button' onClick={handleNextStepClick}>Next Step</button>
			<button className='clear button' onClick={handleClear}>Clear</button>
		</div>
	);
}

export default ControlCenter;
