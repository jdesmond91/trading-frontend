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
			<section className='net-worth section section--no-background'>
				<h1 className='section__heading'>Total Net Worth</h1>
				<hr className='section__hr' />
				<p className='section__main' data-cy='net-worth'>
					${netWorth}
				</p>
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
