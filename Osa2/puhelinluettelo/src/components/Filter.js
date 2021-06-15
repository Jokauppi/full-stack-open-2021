import React from 'react'

const Filter = ({ handleFilter, nameFilter }) => {
		return (
			<div>
				filter shown with: <input onChange={handleFilter} value={nameFilter} />
			</div>
		)
	}

export default Filter