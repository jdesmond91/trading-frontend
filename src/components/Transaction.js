import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import transactionService from '../services/transactions'
import { setTransactions } from '../redux/transactionsSlice'
import round from '../utils/round'

const TransactionData = ({ transaction }) => {
	if (transaction.type === 'DEPOSIT') {
		return (
			<td className='table__data'>
				<div className='table__inner'>
					<p className='table__detail'>{transaction.type}</p>
					<p className='table__detail'>{transaction.quantity}</p>
				</div>
				<div className='table__inner'>
					<p className='table__sub-detail'>{transaction.date.split('T')[0]}</p>
				</div>
			</td>
		)
	} else {
		// show ticker and total purchase price for BUYS and SELLS
		const total = round(transaction.quantity * transaction.price)
		return (
			<td className='table__data'>
				<div className='table__inner'>
					<p className='table__detail'>
						{transaction.order.security.ticker} <span>{transaction.type}</span>
					</p>
					<p className='table__detail'>{total}</p>
				</div>
				<div className='table__inner'>
					<p className='table__sub-detail'>{transaction.date.split('T')[0]}</p>
				</div>
			</td>
		)
	}
}

const Transaction = () => {
	const transactions = useSelector((state) => state.transactions.value)
	const dispatch = useDispatch()
	useEffect(() => {
		const fetchData = async () => {
			dispatch(setTransactions(await transactionService.getTransactions()))
		}

		fetchData()
	}, [dispatch])

	return (
		<article className='transactions article grid-container'>
			<section className='section'>
				<h2 className='section__heading'>Transactions</h2>
				<hr className='section__hr' />
				<table className='table'>
					<tbody className='table__body'>
						{transactions &&
							transactions.map((transaction) => {
								return (
									<tr className='table__row' key={transaction.id}>
										{<TransactionData transaction={transaction} />}
									</tr>
								)
							})}
					</tbody>
				</table>
			</section>
		</article>
	)
}

export default Transaction
