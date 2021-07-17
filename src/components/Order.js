import React, { useState } from 'react'
import Select from 'react-select'
import orderService from '../services/orders'
import positionService from '../services/positions'
import transactionService from '../services/transactions'
import { useSelector, useDispatch } from 'react-redux'
import { setCash } from '../redux/cashSlice'
import { setTransactions } from '../redux/transactionsSlice'
import { setPositions } from '../redux/positionsSlice'

const OrderPreview = ({ selected, quantity, cash, orderType, handleSubmit }) => {
	return selected ? (
		<div>
			<div>Order Type: {orderType}</div>
			<div>Security: {selected.ticker}</div>
			<div>Security Price: {selected.price}</div>
			<div>Quantity: {quantity}</div>
			<div>Total: {selected.price * quantity}</div>
			<div>Cash Available to Trade: {cash}</div>
			<button onClick={handleSubmit}>Submit Order</button>
		</div>
	) : null
}

const Order = () => {
	const securities = useSelector((state) => state.securities.value)
	const cash = useSelector((state) => state.cash.value)
	const positions = useSelector((state) => state.positions.value)

	const [selected, setSelected] = useState(null)
	const [quantity, setQuantity] = useState(1)
	const [orderType, setOrderType] = useState('BUY')
	const [message, setMessage] = useState('')

	const securityOptions = securities.map((security) => {
		return { value: security.id, label: security.name }
	})

	const orderOptions = [
		{
			value: 'BUY',
			label: 'BUY',
		},
		{
			value: 'SELL',
			label: 'SELL',
		},
	]

	const handleSecurityChange = (selectedOption) => {
		if (selectedOption) {
			const selectedSecurity = securities.find((security) => security.id === selectedOption.value)
			setSelected(selectedSecurity)
		} else {
			setSelected(null)
		}
	}

	const handleQuantityChange = (event) => {
		setQuantity(parseInt(event.target.value))
	}

	const handleOrderChange = (selectedOption) => {
		setOrderType(selectedOption.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()

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
			} else if (orderType === 'SELL') {
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
			} else {
				alert('Please choose buy or sell!')
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
			<Select
				options={securityOptions}
				isSearchable={true}
				onChange={handleSecurityChange}
				isClearable={true}
			/>
			<Select options={orderOptions} defaultValue={orderOptions[0]} onChange={handleOrderChange} />
			<input
				type='number'
				name='orderQuantity'
				id='orderQuantity'
				value={quantity}
				onChange={handleQuantityChange}
				min='1'
			/>
			<div>{message}</div>
			<OrderPreview
				selected={selected}
				quantity={quantity}
				cash={cash}
				orderType={orderType}
				handleSubmit={handleSubmit}
			/>
		</div>
	)
}

export default Order
