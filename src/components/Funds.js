import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCash } from '../redux/cashSlice'
import positionService from '../services/positions'

const FundsForm = () => {
	const [value, setValue] = useState(0)
	const dispatch = useDispatch()

	const handleCashValueChange = (event) => {
		setValue(parseInt(event.target.value))
	}

	const handleFundsSubmit = async (event) => {
		event.preventDefault()
		const res = await positionService.depositCash(value)
		if (res.id) {
			dispatch(addCash(value))
			setValue(0)
		}
	}

	return (
		<form onSubmit={handleFundsSubmit} className='fundsForm'>
			<input
				type='number'
				name='funds'
				id='funds'
				autoComplete='off'
				onChange={handleCashValueChange}
				className='fundsInput'
			/>
			<button id='submit' type='submit' className='button'>
				Add Funds
			</button>
		</form>
	)
}

export default FundsForm
