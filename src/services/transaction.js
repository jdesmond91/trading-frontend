import securityService from './security'

const initializeTransactions = () => {
	const securityTransactions = new Map()

	// key is sec id
	securityTransactions.set(1, [
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

	securityTransactions.set(2, [
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

	return securityTransactions
}

const getTransactionQuantity = (transactions, type) => {
	try {
		return transactions
			.filter((t) => t.type === type)
			.map((t) => t.quantity)
			.reduce((total, acc) => total + acc)
	} catch (error) {
		return 0
	}
}

const getPositions = (transactions) => {
	return [...transactions].map(([key, value]) => ({ key, value }))
}

const getPositionQuantity = (transactions) => {
	const buyQuantity = getTransactionQuantity(transactions, 'BUY')
	const sellQuantity = getTransactionQuantity(transactions, 'SELL')
	return buyQuantity - sellQuantity
}

const getAveragePrice = (transactions, price) => {
	return securityService.getSecurityPrice(price) * getPositionQuantity(transactions)
}

export default { initializeTransactions, getPositions, getPositionQuantity }
