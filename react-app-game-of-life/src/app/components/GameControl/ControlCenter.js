import React from 'react';

function ControlCenter() {
	function nextStep(e) {
		e.preventDefault();
	}

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			<button onClick={nextStep}>Next Step</button>
		</div>
	);
}

export default ControlCenter;
