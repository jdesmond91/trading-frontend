import { useState } from 'react'

const FundsForm = ({ addFunds }) => {
	const [value, setValue] = useState(0)

	const handleValueChange = (event) => {
		setValue(parseInt(event.target.value))
	}

	const handleFundsSubmit = (event) => {
		event.preventDefault()
		addFunds(value)
	}

	return (
		<div>
			<form onSubmit={handleFundsSubmit}>
				<label htmlFor='funds'>Add Funds</label>
				<input type='number' name='funds' id='funds' onChange={handleValueChange} />
				<button id='submit' type='submit'>
					Add Funds
				</button>
			</form>
		</div>
	)
}

export default FundsForm
