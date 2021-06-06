import React from 'react'
import { useState } from 'react'
import securityService from '../services/security'
import transactionService from '../services/transaction'

const Position = ({ securities, transactions }) => {
	const [positions, setPositions] = useState(transactionService.getPositions(transactions))

	return (
		<div className='grid'>
			<div></div>
			<div>Quantity</div>
			<div>Today's Price</div>
			<div>Total Value</div>

			{positions.map((position) => {
				const key = position.key
				const value = position.value

				const security = securities.find((security) => security.id === key)
				const securityTransactions = transactions.get(security.id)
				const quantity = transactionService.getPositionQuantity(securityTransactions)
				const currentPrice = securityService.getSecurityPrice(security.price)
				const averagePrice = quantity * currentPrice

				return (
					<React.Fragment key={key}>
						<div>{security.name}</div>
						<div>{quantity}</div>
						<div>{currentPrice}</div>
						<div>{averagePrice}</div>
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default Position
