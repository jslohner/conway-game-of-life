import React from 'react';

function Cell({ cellNum }) {
	return (
		<div className="grid-cell">
			<p>{cellNum}</p>
		</div>
	);
}

export default Cell;
