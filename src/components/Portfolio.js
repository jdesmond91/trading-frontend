import React, { useState, useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import Order from './Order'
import transactionService from '../services/transaction'
import positionService from '../services/positions'
import { useSelector, useDispatch } from 'react-redux'
import { setNetWorth } from '../redux/netWorthSlice'
import { setPositions } from '../redux/positionsSlice'
import { setCash } from '../redux/cashSlice'

const Portfolio = () => {
	// get from redux store
	const netWorth = useSelector((state) => state.netWorth.value)
	const cash = useSelector((state) => state.cash.value)
	const securities = useSelector((state) => state.securities.value)
	const transactions = useSelector((state) => state.transactions.value)
	const positions = useSelector((state) => state.positions.value)

	const dispatch = useDispatch()

	const handleNetWorth = () => {
		const total = cash + transactionService.getTransactionTotalValue(securities, positions)
		dispatch(setNetWorth(total))
	}

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setCash(await positionService.getCash()))
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setNetWorth(await positionService.getNetWorth()))
		}

		fetchData()
	}, [dispatch])

	// useEffect(() => {
	// 	dispatch(setPositions(transactionService.getPositions(transactions)))
	// }, [transactions])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setPositions(await positionService.getPositions()))
		}

		fetchData()
	}, [dispatch])

	return (
		<>
			<div>
				<div>Cash</div>
				<div>{cash}</div>
				<div>Net Worth</div>
				<div>{netWorth}</div>
			</div>
			<FundsForm />
			<Position />
			<Order />
		</>
	)
}

export default Portfolio
