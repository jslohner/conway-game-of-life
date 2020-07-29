import React from 'react';
import Header from './components/Header.js';
import ControlCenter from './components/ControlCenter/ControlCenter.js';
import Grid from './components/Grid/Grid.js';
import './App.css';

function App() {
	return (
		<div className='app'>
			<Header />
			<ControlCenter />
			<Grid />
		</div>
	);
}

export default App;
