import React, { useState } from 'react'
import Select from 'react-select'
import orderService from '../services/orders'
import positionService from '../services/positions'
import transactionService from '../services/transactions'
import { useSelector, useDispatch } from 'react-redux'
import { setCash } from '../redux/cashSlice'
import { setTransactions } from '../redux/transactionsSlice'
import { setPositions } from '../redux/positionsSlice'

const Order = () => {
	const securities = useSelector((state) => state.securities.value)
	const cash = useSelector((state) => state.cash.value)
	const positions = useSelector((state) => state.positions.value)

	const [selected, setSelected] = useState(null)
	const [quantity, setQuantity] = useState(1)

	let orderTotal

	const dispatch = useDispatch()

	let options = securities.map((security) => {
		return { value: security.id, label: security.name }
	})

	const handleChange = (selectedOption) => {
		// console.log(selectedOption.value)
		// console.log('handleChangeSecurities', securities)
		const selectedSecurity = securities.find((security) => security.id === selectedOption.value)
		// console.log('handleChangeSelectedSec', selectedSecurity)
		setSelected(selectedSecurity)
		// console.log('handleChange', selected)
	}

	const handleQuantityChange = (event) => {
		setQuantity(parseInt(event.target.value))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const orderType = event.target.value
		let order

		if (selected) {
			if (orderType === 'BUY') {
				if (cash - selected.price * quantity > 0) {
					order = {
						type: 'BUY',
						securityId: selected.id,
						quantity: quantity,
					}
				} else {
					alert('You do not have enough cash!')
				}
			} else {
				const position = positions.find((position) => position.security.name === selected.name)
				if (quantity <= position.quantity) {
					order = {
						type: 'SELL',
						securityId: selected.id,
						quantity: quantity,
					}
				} else {
					alert('You do not own enough positions to sell!')
				}
			}

			console.log(order)

			// try {
			// 	const newOrder = await orderService.createOrder(order)
			// 	dispatch(setCash(await positionService.getCash()))
			// 	dispatch(setPositions(await positionService.getPositions()))
			// 	dispatch(setTransactions(await transactionService.getTransactions()))
			// 	console.log('newOrder', newOrder)
			// } catch (err) {
			// 	alert('Unable to complete order')
			// }
		} else {
			alert('Please select a security')
		}
	}

	return (
		<div>
			<Select options={options} isSearchable={true} onChange={handleChange} />
			<input
				type='number'
				name='orderQuantity'
				id='orderQuantity'
				value={quantity}
				onChange={handleQuantityChange}
				min='1'
			/>
			<button onClick={handleSubmit} value='BUY'>
				BUY
			</button>
			<button onClick={handleSubmit} value='SELL'>
				SELL
			</button>
		</div>
	)
}

export default Order
