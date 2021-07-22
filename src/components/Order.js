import React, { useState } from 'react'
import Select from 'react-select'
import orderService from '../services/orders'
import positionService from '../services/positions'
import transactionService from '../services/transactions'
import { useSelector, useDispatch } from 'react-redux'
import { setCash } from '../redux/cashSlice'
import { setTransactions } from '../redux/transactionsSlice'
import { setPositions } from '../redux/positionsSlice'

const OrderPreview = ({ selected, quantity, cash, orderType, handleSubmit, message }) => {
	// only show the preview if a security has been selected
	return selected ? (
		<section className='orderPreview background'>
			<h2>Order Preview</h2>
			<p>Order Type: {orderType}</p>
			<p>Security: {selected.ticker}</p>
			<p>Security Price: {selected.price}</p>
			<p>Quantity: {quantity}</p>
			<p>Total: {selected.price * quantity}</p>
			<p>Cash Available to Trade: {cash}</p>
			<p className='errorMessage'>{message}</p>
			<button onClick={handleSubmit} className='button'>
				Submit Order
			</button>
		</section>
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

	const dispatch = useDispatch()

	// map securities retrieved from redux to react-select component options
	const securityOptions = securities.map((security) => {
		return { value: security.id, label: security.name }
	})

	// react-select options to BUY or SELL
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

	// set selected state variable to the security that was selected by the user through the select box
	// if the user clears the select, security will be set to null
	const handleSecurityChange = (selectedOption) => {
		if (selectedOption) {
			const selectedSecurity = securities.find((security) => security.id === selectedOption.value)
			setSelected(selectedSecurity)
		} else {
			setSelected(null)
		}
	}

	// handler for quantity changes
	const handleQuantityChange = (event) => {
		if (parseInt(event.target.value)) {
			setQuantity(parseInt(event.target.value))
		} else {
			setQuantity(0)
		}
	}

	// handler for order type changes (BUY or SELL)
	const handleOrderChange = (selectedOption) => {
		setOrderType(selectedOption.value)
	}

	// handler for the order submissions
	const handleSubmit = async (event) => {
		// prevent default form action
		event.preventDefault()

		let order
		let isValidOrder = false

		// check if a security has been selected
		if (!selected) {
			setMessage('Please select a security')
			return
		}

		if (quantity <= 0) {
			setMessage('Please select a quantity greater than 0')
			return
		}

		// if it's a BUY, verify that the user has enough cash to purchase the positions
		if (orderType === 'BUY') {
			if (cash - selected.price * quantity > 0) {
				order = {
					type: 'BUY',
					securityId: selected.id,
					quantity: quantity,
				}
				isValidOrder = true
			} else {
				setMessage('You do not have enough cash!')
				return
			}
			// if its a SELL, verify that user has enough positions to sell
		} else if (orderType === 'SELL') {
			const position = positions.find((position) => position.security.name === selected.name)
			if (quantity <= position.quantity) {
				order = {
					type: 'SELL',
					securityId: selected.id,
					quantity: quantity,
				}
				isValidOrder = true
			} else {
				setMessage('You do not own enough positions to sell!')
				return
			}
		} else {
			setMessage('Please choose buy or sell!')
			return
		}

		console.log(order)

		// if the order is validated, then invoke the createOrder method which will use the service to call the trading backend
		try {
			if (isValidOrder) {
				const newOrder = await orderService.createOrder(order)
				dispatch(setCash(await positionService.getCash()))
				dispatch(setPositions(await positionService.getPositions()))
				dispatch(setTransactions(await transactionService.getTransactions()))
				setMessage('Order was successful!')
				console.log('newOrder', newOrder)
			}
		} catch (err) {
			setMessage('Unable to complete order')
			alert('Unable to complete order')
		}
	}

	return (
		<section className='order'>
			<section className='orderForm background'>
				<h2>Create an order</h2>
				<Select
					options={securityOptions}
					isSearchable={true}
					onChange={handleSecurityChange}
					isClearable={true}
					className='select'
				/>
				<Select
					options={orderOptions}
					defaultValue={orderOptions[0]}
					onChange={handleOrderChange}
					className='select'
				/>
				<input
					type='number'
					name='orderQuantity'
					id='orderQuantity'
					value={quantity}
					onChange={handleQuantityChange}
					min='1'
					className='orderInput'
				/>
			</section>
			<OrderPreview
				selected={selected}
				quantity={quantity}
				cash={cash}
				orderType={orderType}
				handleSubmit={handleSubmit}
				message={message}
			/>
		</section>
	)
}

export default Order
