import React from 'react'
import FundsForm from './Funds'
import Position from './Position'
import { useSelector } from 'react-redux'

const Portfolio = () => {
	// get from redux store
	const netWorth = useSelector((state) => state.netWorth.value)
	const cash = useSelector((state) => state.cash.value)

	return (
		<article className='portfolio article grid-container'>
			<section className='net-worth section section--no-background flex-wrapper'>
				<h2 className='section__heading'>Total Net Worth</h2>
				<hr className='section__hr' />
				<h1 className='section__main'>${netWorth}</h1>
			</section>

			<section className='section flex-wrapper'>
				<h3 className='section__heading'>Available to trade</h3>
				<hr className='section__hr' />
				<h2 className='section__main'>${cash}</h2>
				<FundsForm />
			</section>

			<Position />
		</article>
	)
}

export default Portfolio
