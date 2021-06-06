import React from 'react'
import { useState } from 'react'
import securityService from '../services/security'
import transactionService from '../services/transaction'

const Position = ({ securities }) => {
	const securityTransactions = transactionService.initializeTransactions()
	const [positions, setPositions] = useState(transactionService.getPositions(securityTransactions))

	return (
		<div className='grid'>
			<div>Security Name</div>
			<div>Quantity</div>
			<div>Current Price</div>
			<div>Total Value</div>

			{positions.map((position) => {
				const key = position.key
				const value = position.value
				//console.log(key, value)
				const security = securities.find((security) => security.id === key)
				//console.log('security', security)

				const transactions = securityTransactions.get(security.id)
				const currentPrice = securityService.getSecurityPrice(security.price)
				const quantity = transactionService.getPositionQuantity(transactions)
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
