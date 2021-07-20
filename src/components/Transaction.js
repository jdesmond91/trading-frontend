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
		<section className='transactions background'>
			<h2>Transactions</h2>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Date</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => {
						return (
							<tr key={transaction.id}>
								<td>{transaction.type}</td>
								<td>{transaction.date.split('T')[0]}</td>
								<td>{transaction.quantity}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</section>
	)
}

export default Transaction
