import React, { useState } from 'react'
import securityService from '../services/security'
import { addTransactions } from '../redux/transactionsSlice'
import { substractCash } from '../redux/cashSlice'
import { useSelector, useDispatch } from 'react-redux'

export const Order = () => {
	const securities = useSelector((state) => state.securities.value)
	const cash = useSelector((state) => state.cash.value)

	// sort the array based on security name
	const sortedSecurities = [...securities].sort((a, b) => a.name.localeCompare(b.name))
	const defaultValue = sortedSecurities[0]

	// state variables for selected security and purchase quantity
	const [selected, setSelected] = useState(defaultValue)
	const [quantity, setQuantity] = useState(0)

	const fakeTransaction = {
		secId: 3,
		id: 20,
		type: 'BUY',
		quantity: 1,
		price: 250,
	}

	const dispatch = useDispatch()

	const addTransaction = () => {
		dispatch(addTransactions(fakeTransaction))
	}

	const handleSelectChange = (event) => {
		const selectedSecurity = securityService.getSecurity(securities, parseInt(event.target.value))
		setSelected(selectedSecurity)
	}

	const handleQuantityChange = (event) => {
		setQuantity(parseInt(event.target.value))
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		//alert(`You have selected ${selected}`)
		if (cash - selected.price * quantity > 0) {
			const newTransaction = {
				secId: selected.id,
				id: 20,
				type: 'BUY',
				quantity: quantity,
				price: selected.price,
			}
			dispatch(addTransactions(newTransaction))
			dispatch(substractCash(selected.price * quantity))
		} else {
			alert('You do not have enough cash!')
		}
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
					<input
						type='number'
						name='orderQuantity'
						id='orderQuantity'
						value={quantity}
						onChange={handleQuantityChange}
					/>
					<div>Total Cash: {cash}</div>
					<div>Total Purchase Price: {selected.price * quantity}</div>
					<div>Cash After Purchase: {cash - selected.price * quantity}</div>
					<input type='submit' name='submit' className='submitOrder' value='Create Order' />
				</form>
			</div>
		</div>
	)
}

export default Order
