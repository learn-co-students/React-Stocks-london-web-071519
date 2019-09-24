import React from 'react';

const SearchBar = (props) => {
	return (
		<div>
			<strong>Sort by:</strong>
			<label>
				<input
					type="radio"
					value="Alphabetically"
					checked={null}
					onChange={(ev) => props.sort(ev.target.value)}
				/>
				Alphabetically
			</label>
			<label>
				<input
					type="radio"
					value="Price"
					checked={null}
					onChange={(ev) => props.sort(ev.target.value)}
				/>
				Price
			</label>
			<br />

			<label>
				<strong>Filter:</strong>
				<select onChange={(ev) => props.filter(ev.target.value)}>
					<option value="Tech">Tech</option>
					<option value="Sportswear">Sportswear</option>
					<option value="Finance">Finance</option>
				</select>
			</label>
		</div>
	);
};

export default SearchBar;
