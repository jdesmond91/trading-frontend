import securityService from './security'

const initializeTransactions = () => {
	const transactions = new Map()

	// key is secId
	transactions.set(1, [
		{
			id: 1,
			type: 'BUY',
			quantity: 1,
			price: 100,
		},
		{
			id: 2,
			type: 'BUY',
			quantity: 2,
			price: 120,
		},
		{
			id: 3,
			type: 'BUY',
			quantity: 2,
			price: 120,
		},
		{
			id: 4,
			type: 'SELL',
			quantity: 1,
			price: 120,
		},
	])

	transactions.set(2, [
		{
			id: 5,
			type: 'BUY',
			quantity: 1,
			price: 200,
		},
		{
			id: 6,
			type: 'BUY',
			quantity: 1,
			price: 250,
		},
	])

	return transactions
}

const getSecurityTransactions = (transactions, secId) => {
	return transactions.get(secId)
}

const getTransactionQuantity = (securityTransactions, type) => {
	try {
		return securityTransactions
			.filter((t) => t.type === type)
			.map((t) => t.quantity)
			.reduce((total, acc) => total + acc)
	} catch (error) {
		return 0
	}
}

const getPositionQuantity = (securityTransactions) => {
	const buyQuantity = getTransactionQuantity(securityTransactions, 'BUY')
	const sellQuantity = getTransactionQuantity(securityTransactions, 'SELL')
	return buyQuantity - sellQuantity
}

const getPositions = (transactions) => {
	// convert map to array
	const transactionArray = [...transactions].map(([key, value]) => ({ key, value }))

	// initialize id
	let id = 1

	const positions = transactionArray.map((transaction) => {
		return { id: id++, secId: transaction.key, quantity: getPositionQuantity(transaction.value) }
	})

	return positions
}

const getAveragePrice = (price, transactions) => {
	return securityService.getSecurityPrice(price) * getPositionQuantity(transactions)
}

const getTransactionTotalValue = (securities, positions) => {
	return positions.map((position) => {
		const { price } = securityService.getSecurity(securities, position.secId)
		return position.quantity * price
	})
	// .reduce((total, acc) => {
	// 	total + acc
	// })
}

export default {
	initializeTransactions,
	getPositions,
	getTransactionTotalValue,
}
