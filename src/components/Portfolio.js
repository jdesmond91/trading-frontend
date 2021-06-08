import React, { useState, useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import Security from './Security'
import transactionService from '../services/transaction'
import { useSelector, useDispatch } from 'react-redux'
import { setNetWorth } from '../redux/netWorthSlice'

const Portfolio = () => {
	// get from redux store
	const netWorth = useSelector((state) => state.netWorth.value)
	const cash = useSelector((state) => state.cash.value)
	const securities = useSelector((state) => state.securities.value)
	const transactions = useSelector((state) => state.transactions.value)

	const [positions, setPositions] = useState(transactionService.getPositions(transactions))

	const dispatch = useDispatch()

	const handleNetWorth = () => {
		const total = cash + transactionService.getTransactionTotalValue(securities, positions)
		dispatch(setNetWorth(total))
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
			<Position positions={positions} />
			<Security />
		</>
	)
}

export default Portfolio
