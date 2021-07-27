import React, { useEffect } from 'react'
import FundsForm from './Funds'
import Position from './Position'
import { useSelector, useDispatch } from 'react-redux'
import positionService from '../services/positions'
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
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setNetWorth(await positionService.getNetWorth()))
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setPositions(await positionService.getPositions()))
		}

		fetchData()
	}, [dispatch])

	return (
		<article className='portfolio article grid-container'>
			<section className='net-worth section section--no-background'>
				<h1 className='section__heading'>Total Net Worth</h1>
				<hr className='section__hr' />
				<p className='section__main'>${netWorth}</p>
			</section>

			<section className='funds section'>
				<h2 className='section__heading'>Available to trade</h2>
				<hr className='section__hr' />
				<p className='section__main'>${cash}</p>
				<FundsForm />
			</section>

			<Position />
		</article>
	)
}

export default Portfolio
