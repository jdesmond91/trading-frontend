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
		<form className='form' onSubmit={handleFundsSubmit}>
			<input
				className='form__input input'
				type='number'
				name='funds'
				id='funds'
				autoComplete='off'
				onChange={handleCashValueChange}
			/>
			<button id='submit' className='form__button button' type='submit'>
				Add Funds
			</button>
		</form>
	)
}

export default FundsForm
