import React from 'react';
import Header from './components/Header.js';
import Rules from './components/Rules.js';
// import ControlCenter from './components/ControlCenter/ControlCenter.js';
import Grid from './components/GameControl/Grid.js';
import './App.css';

function App() {
	return (
		<div className='app'>
			<Header />
			<Rules />
			{/* <ControlCenter /> */}
			<Grid />
		</div>
	);
}

export default App;
