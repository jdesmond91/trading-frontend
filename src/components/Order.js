import React, { useState } from 'react'
import securityService from '../services/security'
import { addTransactions } from '../redux/transactionsSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Order = () => {
	const securities = useSelector((state) => state.securities.value)

	// sort the array based on security name
	const sortedSecurities = [...securities].sort((a, b) => a.name.localeCompare(b.name))
	const defaultValue = sortedSecurities[0].id

	const [selected, setSelected] = useState('')

	const newTransaction = {
		secId: 3,
		id: 20,
		type: 'BUY',
		quantity: 1,
		price: 250,
	}

	const dispatch = useDispatch()

	const addTransaction = () => {
		dispatch(addTransactions(newTransaction))
	}

	const handleSelectChange = (event) => {
		const selectedSecurity = securityService.getSecurity(securities, parseInt(event.target.value))
		setSelected(selectedSecurity)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		alert(`You have selected ${selected}`)
	}

	return (
		<div className='order flex column'>
			<div>Hello</div>
			<button onClick={addTransaction}>Add Transaction</button>
			<div>
				<form className='orderForm flex column' onSubmit={handleSubmit}>
					<select name='securities' id='security-select' onChange={handleSelectChange}>
						{sortedSecurities.map((security) => (
							<option value={security.id} key={security.id}>
								{security.name}
							</option>
						))}
					</select>
					<label htmlFor='orderQuantiy'>
						How many shares of {selected.ticker} do you want to buy?
					</label>
					<input type='text' name='orderQuantity' id='orderQuantity' />
					<input type='submit' name='submit' className='submitOrder' value='Create Order' />
				</form>
			</div>
		</div>
	)
}

export default Order
