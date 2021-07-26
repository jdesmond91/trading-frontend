import React, { useRef } from 'react'

export const Modal = ({ isModalOpen, handleModalClose, children }) => {
	const modalRef = useRef()

	// checks to see if the user clicks on modal area before executing handleClose
	const handleClickAway = (event) => {
		if (modalRef.current === event.target) {
			handleModalClose()
		}
	}

	return isModalOpen ? (
		<div className='modal' ref={modalRef} onClick={handleClickAway}>
			<div className='modal__inner'>
				<button className='modal__close' onClick={handleModalClose}>
					<span className='material-icons'>cancel</span>
				</button>
				<div className='modal__top'>
					<span className='material-icons'>check_circle</span>
				</div>
				<div className='modal__bottom'>{children}</div>
			</div>
		</div>
	) : null
}

export default Modal
