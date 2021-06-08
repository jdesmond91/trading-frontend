import React from 'react'
import transactionService from '../services/transaction'
import { useSelector } from 'react-redux'

const Position = () => {
	const positions = useSelector((state) => state.positions.value)
	const securities = useSelector((state) => state.securities.value)

	return (
		<div className='grid'>
			<div></div>
			<div>Quantity</div>
			<div>Today's Price</div>
			<div>Total Value</div>

			{positions.map((position) => {
				const security = securities.find((security) => security.id === position.secId)

				// return a random intraday price
				const currentPrice = security.price

				// calculate today's total value based on the quantity and the intraday price
				const totalValue = transactionService.getAveragePrice(currentPrice, position.quantity)

				return (
					<React.Fragment key={position.secId}>
						<div>{security.name}</div>
						<div>{position.quantity}</div>
						<div>{currentPrice}</div>
						<div>{totalValue}</div>
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default Position
