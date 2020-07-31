import React from 'react';

function Rules() {
	return (
		<div className ='rules'>
			<h3>Game Rules</h3>
			<p>1 - If a cell is alive, and 2 or 3 of it's neighbours are also alive, the cell remains alive.</p>
			<p>2 - If a cell is alive and it has more than 3 alive neighbours, it dies.</p>
			<p>3 - If a cell is alive and it has fewer than 2 alive neighbours, it dies.</p>
			<p>4 - If a cell is dead and it has exactly 3 neighbours it becomes alive again.</p>
			<p>Click on cells to set them to alive and click on them again to set them back to dead</p>
			<p>Click on next step button to get the next game state</p>
		</div>
	);
}

export default Rules;
