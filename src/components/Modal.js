import React, { useRef, useEffect, useCallback } from 'react'

export const Modal = ({ isModalOpen, setIsModalOpen, resetFields }) => {
	const modalRef = useRef()

	const handleClose = () => {
		// turn off scroll lock and close modal
		document.body.style.overflow = 'auto'
		resetFields()
		setIsModalOpen(false)
	}

	// checks to see if the user clicks on modal area before executing handleClose
	const handleClickAway = (event) => {
		if (modalRef.current === event.target) {
			handleClose()
		}
	}

	return isModalOpen ? (
		<div className='modal' ref={modalRef} onClick={handleClickAway}>
			<div className='modal-inner'>
				<button className='modal-close' onClick={handleClose}>
					<span className='material-icons'>cancel</span>
				</button>
				<div className='modal-inner-top'>
					<span className='material-icons'>check_circle</span>
				</div>
				<div className='modal-inner-bottom'>
					<h2>Success!</h2>
					<p>Your order was confirmed!</p>
				</div>
			</div>
		</div>
	) : null
}

export default Modal
