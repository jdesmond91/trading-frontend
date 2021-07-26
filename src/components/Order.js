import React, { useState, useRef } from 'react'
import Select from 'react-select'
import orderService from '../services/orders'
import positionService from '../services/positions'
import transactionService from '../services/transactions'
import { useSelector, useDispatch } from 'react-redux'
import { setCash } from '../redux/cashSlice'
import { setTransactions } from '../redux/transactionsSlice'
import { setPositions } from '../redux/positionsSlice'
import Modal from './Modal'

const OrderQuantity = ({
	quantity,
	handleQuantityIncrease,
	handleQuantityDecrease,
	handleQuantityChange,
}) => {
	return (
		<div className='order-quantity'>
			<div className='order-quantity__input-row'>
				<button className='order-quantity__button button' onClick={handleQuantityDecrease}>
					-
				</button>
				<input
					className='order-quantity__input input'
					type='number'
					name='orderQuantity'
					id='orderQuantity'
					value={quantity}
					onChange={handleQuantityChange}
					min='1'
				/>
				<button className='order-quantity__button button' onClick={handleQuantityIncrease}>
					+
				</button>
			</div>
		</div>
	)
}

const OrderPreview = ({ selected, quantity, cash, orderType, handleSubmit, message }) => {
	// only show the preview if a security has been selected
	return selected ? (
		<section className='order-preview section'>
			<h2 className='section__heading'>Order Preview</h2>
			<hr className='section__hr' />
			<p className='section__text'>Order Type: {orderType}</p>
			<p className='section__text'>Security: {selected.ticker}</p>
			<p className='section__text'>Security Price: {selected.price}</p>
			<p className='section__text'>Quantity: {quantity}</p>
			<p className='section__text'>Total: {selected.price * quantity}</p>
			<p className='section__text'>Cash Available to Trade: {cash}</p>
			<p className='section__text errorMessage'>{message}</p>
			<button onClick={handleSubmit} className='order-section__button button'>
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
	const [isModalOpen, setIsModalOpen] = useState(false)

	const dispatch = useDispatch()

	const securitySelectRef = useRef()

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
		setQuantity(parseInt(event.target.value))
	}

	const handleQuantityIncrease = () => {
		if (quantity) {
			setQuantity(quantity + 1)
		} else {
			setQuantity(1)
		}
	}

	const handleQuantityDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1)
		}
	}

	// handler for order type changes (BUY or SELL)
	const handleOrderChange = (selectedOption) => {
		setOrderType(selectedOption.value)
	}

	// turn on scroll lock and open modal
	const handleModalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsModalOpen(true)
	}

	// use a ref to the react-select input and clear its field value
	const resetFields = () => {
		setSelected(null)
		setQuantity(1)
		securitySelectRef.current.select.clearValue()
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

		// if the order is validated, then invoke the createOrder method which will use the service to call the trading backend
		try {
			if (isValidOrder) {
				await orderService.createOrder(order)
				dispatch(setCash(await positionService.getCash()))
				dispatch(setPositions(await positionService.getPositions()))
				dispatch(setTransactions(await transactionService.getTransactions()))
				handleModalOpen()
			}
		} catch (err) {
			setMessage('Unable to complete order, please try again later!')
		}
	}

	return (
		<article className='order article grid-container'>
			<section className='order-form section'>
				<h2 className='section__heading'>Create an order</h2>
				<hr className='section__hr' />
				<Select
					className='select'
					options={securityOptions}
					isSearchable={true}
					onChange={handleSecurityChange}
					isClearable={true}
					ref={securitySelectRef}
				/>
				<Select
					className='select'
					options={orderOptions}
					defaultValue={orderOptions[0]}
					onChange={handleOrderChange}
				/>
				<p className='order-form__quantity'>How many shares?</p>
				<OrderQuantity
					quantity={quantity}
					handleQuantityIncrease={handleQuantityIncrease}
					handleQuantityDecrease={handleQuantityDecrease}
					handleQuantityChange={handleQuantityChange}
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
			<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} resetFields={resetFields} />
		</article>
	)
}

export default Order
