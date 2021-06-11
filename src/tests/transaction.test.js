import transactionService from '../services/transaction'

describe('Transction Service Tests', () => {
	describe('Position Quantity Tests', () => {
		test('Position Quantity is calculated successfully', () => {
			const securityTransactions = [
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

			const quantity = transactionService.getPositionQuantity(securityTransactions)
			expect(quantity).toBe(4)
		})

		test('Position Quantity is returns 0 when array only contains sells', () => {
			const securityTransactions = [
				{
					id: 1,
					type: 'SELL',
					quantity: 1,
					price: 100,
				},
				{
					id: 2,
					type: 'SELL',
					quantity: 2,
					price: 120,
				},
				{
					id: 3,
					type: 'SELL',
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

			const quantity = transactionService.getPositionQuantity(securityTransactions)
			expect(quantity).toBe(0)
		})
	})

	describe('Positions Tests', () => {
		test('Positions are created successfully from transactions', () => {
			const transactions = []

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

			const positions = transactionService.getPositions(transactions)
			expect(positions.length).toBe(2)
		})

		test('Positions will be empty if all transactions are sells', () => {
			const transactions = []
			transactions[1] = [
				{
					id: 1,
					type: 'SELL',
					quantity: 1,
					price: 100,
				},
				{
					id: 2,
					type: 'SELL',
					quantity: 2,
					price: 120,
				},
				{
					id: 3,
					type: 'SELL',
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

			const positions = transactionService.getPositions(transactions)
			expect(positions.length).toBe(0)
		})
	})

	describe('Total transaction value is calculated successfully', () => {
		test('Transaction value is calculated successfully ', () => {
			const initialSecurities = [
				{
					id: 1,
					name: 'Royal Bank',
					ticker: 'RY',
					price: 120,
				},
				{
					id: 2,
					name: 'Apple',
					ticker: 'AAPL',
					price: 200,
				},
				{
					id: 3,
					name: 'IBM',
					ticker: 'IBM',
					price: 75,
				},
				{
					id: 4,
					name: 'Microsoft',
					ticker: 'MFST',
					price: 150,
				},
			]

			const transactions = []

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

			const positions = transactionService.getPositions(transactions)
			const totalValue = transactionService.getTransactionTotalValue(initialSecurities, positions)
			expect(totalValue).toBe(480 + 400)
		})
	})
})
