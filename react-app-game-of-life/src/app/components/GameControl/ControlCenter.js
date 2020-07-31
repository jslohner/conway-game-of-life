import React, { useState } from 'react';

function ControlCenter({ isRunningRef, getNextNSteps, startAnimation, stopAnimation, nextStep, clear }) {
	let [isAnimating, setIsAnimating] = useState(false);

	function handleStartAnimate(e) {
		e.preventDefault();
		setIsAnimating(true);
		startAnimation(1);
	}

	function handleStopAnimate(e) {
		e.preventDefault();
		setIsAnimating(false);
		stopAnimation();
	}

	function handleNextStepClick(e) {
		e.preventDefault();
		nextStep();
	}

	function handleNextNStepClick(e) {
		e.preventDefault();
		getNextNSteps();
	}

	function handleClear(e) {
		e.preventDefault();
		clear();
	}

	return (
		<div className='control-center'>
			<h2>Control Center</h2>
			{!isAnimating && <button className='animate button' onClick={handleStartAnimate}>Animate</button>}
			{isAnimating && <button className='stop-animate button' onClick={handleStopAnimate}>Stop Animation</button>}
			<button className='next-step button' onClick={handleNextStepClick}>Next Step</button>
			<button className='next-n-step button' onClick={handleNextNStepClick}>Next N Steps</button>
			<button className='clear button' onClick={handleClear}>Clear</button>
		</div>
	);
}

export default ControlCenter;
