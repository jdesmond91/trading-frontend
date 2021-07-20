import React from 'react'
import FundsForm from './Funds'
import Position from './Position'
import { useSelector } from 'react-redux'

const Portfolio = () => {
	// get from redux store
	const netWorth = useSelector((state) => state.netWorth.value)
	const cash = useSelector((state) => state.cash.value)

	return (
		<main className='container'>
			<section className='networth'>
				<h2>Total Net Worth</h2>
				<hr />
				<h1>${netWorth}</h1>
			</section>

			<section className='portfolio'>
				<aside className='funds background'>
					<h3>Available to trade</h3>
					<hr />
					<h2>${cash}</h2>
					<FundsForm />
				</aside>
				<Position />
			</section>
		</main>
	)
}

export default Portfolio
