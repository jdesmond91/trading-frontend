import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import transactionService from '../services/transactions'
import { setTransactions } from '../redux/transactionsSlice'

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
					<thead className='table__head'>
						<tr className='table__row'>
							<th className='table__heading'>Type</th>
							<th className='table__heading'>Date</th>
							<th className='table__heading'>Quantity</th>
						</tr>
					</thead>
					<tbody className='table__body'>
						{transactions.map((transaction) => {
							return (
								<tr className='table__row' key={transaction.id}>
									<td className='table__data'>{transaction.type}</td>
									<td className='table__data'>{transaction.date.split('T')[0]}</td>
									<td className='table__data'>{transaction.quantity}</td>
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
