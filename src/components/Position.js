import React from 'react'
import { useState } from 'react'
import securityService from '../services/security'
import transactionService from '../services/transaction'

const Position = ({ securities, positions }) => {
	return (
		<div className='grid'>
			<div></div>
			<div>Quantity</div>
			<div>Today's Price</div>
			<div>Total Value</div>

			{positions.map((position) => {
				const security = securities.find((security) => security.id === position.secId)

				// return a random intraday price
				const currentPrice = securityService.getSecurityPrice(security.price)

				// calculate today's total value based on the quantity and the intraday price
				const totalValue = position.quantity * currentPrice

				return (
					<React.Fragment key={position.id}>
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
