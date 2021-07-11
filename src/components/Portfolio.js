import React, { useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import positionService from '../services/positions'
import { useSelector, useDispatch } from 'react-redux'
import { setNetWorth } from '../redux/netWorthSlice'
import { setPositions } from '../redux/positionsSlice'
import { setCash } from '../redux/cashSlice'

const Portfolio = () => {
	// get from redux store
	const netWorth = useSelector((state) => state.netWorth.value)
	const cash = useSelector((state) => state.cash.value)

	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setCash(await positionService.getCash()))
		}

		fetchData()
	}, [dispatch, cash])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setNetWorth(await positionService.getNetWorth()))
		}

		fetchData()
	}, [dispatch, cash])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setPositions(await positionService.getPositions()))
		}

		fetchData()
	}, [dispatch, cash])

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
		</>
	)
}

export default Portfolio
