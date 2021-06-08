import React, { useState, useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import Security from './Security'
import securityService from '../services/security'
import transactionService from '../services/transaction'
import { useSelector, useDispatch } from 'react-redux'

const Portfolio = () => {
	const [netWorth, setNetWorth] = useState(0)
	//const [cash, setCash] = useState(1000)
	//const [securities, setSecurities] = useState(securityService.initialSecurities)
	const cash = useSelector((state) => state.cash.value)
	const securities = useSelector((state) => state.securities.value)
	const [transactions, setTransactions] = useState(transactionService.initializeTransactions())
	const [positions, setPositions] = useState(transactionService.getPositions(transactions))

	const handleNetWorth = () => {
		const total = cash + transactionService.getTransactionTotalValue(securities, positions)
		setNetWorth(total)
	}

	useEffect(() => {
		handleNetWorth()
	}, [cash])

	return (
		<>
			<div>
				<div>Cash</div>
				<div>{cash}</div>
				<div>Net Worth</div>
				<div>{netWorth}</div>
			</div>
			<FundsForm />
			<Position securities={securities} positions={positions} />
			<Security />
		</>
	)
}

export default Portfolio
