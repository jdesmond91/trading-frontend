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
]

const getSecurityPrice = (price) => {
	return Math.floor(Math.random() * (price + 5 - price) + price)
}

export default { initialSecurities, getSecurityPrice }
