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

const getSecurity = (securities, secId) => {
	return securities.find((security) => security.id === secId)
}

const getSecurityPrice = (price) => {
	return Math.floor(Math.random() * (price + 5 - price) + price)
}

export default { initialSecurities, getSecurity, getSecurityPrice }
