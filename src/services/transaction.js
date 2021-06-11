import securityService from './security'

const initializeTransactions = () => {
	let transactions = []

	// each index is a hardcoded secId from a single security in initial securities list
	transactions[1] = [
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
	]

	transactions[2] = [
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
	]

	transactions[4] = [
		{
			id: 7,
			type: 'BUY',
			quantity: 1,
			price: 200,
		},
		{
			id: 8,
			type: 'BUY',
			quantity: 1,
			price: 200,
		},
		{
			id: 9,
			type: 'BUY',
			quantity: 1,
			price: 200,
		},
		{
			id: 10,
			type: 'BUY',
			quantity: 1,
			price: 200,
		},
		{
			id: 11,
			type: 'BUY',
			quantity: 1,
			price: 250,
		},
	]

	return transactions
}

const getTransactionQuantity = (securityTransactions, type) => {
	const filteredTransactions = securityTransactions.filter((t) => t.type === type)
	if (filteredTransactions !== null && filteredTransactions.length > 0) {
		return filteredTransactions.map((t) => t.quantity).reduce((total, acc) => total + acc)
	}

	return 0
}

const getPositionQuantity = (securityTransactions) => {
	const buyQuantity = getTransactionQuantity(securityTransactions, 'BUY')
	const sellQuantity = getTransactionQuantity(securityTransactions, 'SELL')
	const totalQuantity = buyQuantity - sellQuantity
	return totalQuantity > 0 ? totalQuantity : 0
}

const getPositions = (transactions) => {
	return transactions
		.map((transaction, index) => ({
			secId: index,
			quantity: getPositionQuantity(transaction),
		}))
		.filter((t) => t.quantity > 0)
}

const getAveragePrice = (price, quantity) => {
	return price * quantity
}

const getTransactionTotalValue = (securities, positions) => {
	try {
		return positions
			.map((position) => {
				const { price } = securityService.getSecurity(securities, position.secId)
				return position.quantity * price
			})
			.reduce((total, acc) => total + acc)
	} catch (error) {
		return 0
	}
}

export default {
	initializeTransactions,
	getPositions,
	getPositionQuantity,
	getAveragePrice,
	getTransactionTotalValue,
}
