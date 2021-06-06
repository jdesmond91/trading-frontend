import React, { useState, useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import Security from './Security'
import securityService from '../services/security'
import transactionService from '../services/transaction'

const Portfolio = () => {
	const [netWorth, setNetWorth] = useState(0)
	const [cash, setCash] = useState(0)
	const [securities, setSecurities] = useState(securityService.initialSecurities)
	const [transactions, setTransactions] = useState(transactionService.initializeTransactions())
	const [positions, setPositions] = useState(transactionService.getPositions(transactions))

	const handleIncrease = () => {
		setCash(cash + 1)
	}

	const handleDecrease = () => {
		setCash(cash - 1)
	}

	const addFunds = (value) => {
		setCash(value)
	}

	const handleNetWorth = () => {
		const total = cash + transactionService.getTransactionTotalValue(securities, positions)
		setNetWorth(total)
	}

	useEffect(() => {
		handleNetWorth()
	}, [])

	return (
		<>
			<div>{netWorth}</div>
			<FundsForm addFunds={addFunds} />
			<div className='total'>
				<div className='totalButtons'>
					<button onClick={handleIncrease}>Increase</button>
					<button onClick={handleDecrease}>Decrease</button>
				</div>
			</div>
			<Position securities={securities} positions={positions} />
			<Security />
		</>
	)
}

export default Portfolio
