import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCash } from '../redux/cashSlice'

const FundsForm = ({ addFunds }) => {
	const [value, setValue] = useState(0)
	const dispatch = useDispatch()

	const handleCashValueChange = (event) => {
		setValue(parseInt(event.target.value))
	}

	const handleFundsSubmit = (event) => {
		event.preventDefault()
		dispatch(addCash(value))
	}

	return (
		<div>
			<form onSubmit={handleFundsSubmit}>
				<label htmlFor='funds'>Add Funds</label>
				<input
					type='number'
					name='funds'
					id='funds'
					autoComplete='off'
					onChange={handleCashValueChange}
				/>
				<button id='submit' type='submit'>
					Add Funds
				</button>
			</form>
		</div>
	)
}

export default FundsForm
