import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCash } from '../redux/cashSlice'
import { setNetWorth } from '../redux/netWorthSlice'
import positionService from '../services/positions'
import Modal from './Modal'

const FundsForm = () => {
	const [value, setValue] = useState('')
	const [message, setMessage] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const dispatch = useDispatch()

	const handleCashValueChange = (event) => {
		setValue(parseInt(event.target.value))
	}

	const resetFields = () => {
		setValue('')
	}

	// turn on scroll lock and open modal
	const handleModalOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsModalOpen(true)
	}

	// turn off scroll lock and close modal
	const handleModalClose = () => {
		document.body.style.overflow = 'auto'
		resetFields()
		setIsModalOpen(false)
	}

	const handleFundsSubmit = async (event) => {
		event.preventDefault()
		try {
			await positionService.depositCash(value)
			dispatch(addCash(value))
			dispatch(setNetWorth(await positionService.getNetWorth()))
			resetFields()
			handleModalOpen()
		} catch (err) {
			setMessage('Unable to complete deposit, please try again later!')
		}
	}

	return (
		<>
			<form className='form' onSubmit={handleFundsSubmit}>
				<input
					id='funds'
					className='form__input input'
					type='number'
					name='funds'
					autoComplete='off'
					onChange={handleCashValueChange}
					value={value}
					data-cy='funds-input'
				/>
				<button id='submit' className='form__button button' type='submit' data-cy='funds-submit'>
					Add Funds
				</button>
				<p className='section__text message'>{message}</p>
			</form>
			<Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
				<h2 className='modal__heading'>Success!</h2>
				<p className='modal__text'>Your deposit was confirmed!</p>
			</Modal>
		</>
	)
}

export default FundsForm
