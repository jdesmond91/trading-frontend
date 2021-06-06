const getSecurity = (securities, secId) => {
	return securities.find((security) => security.id === secId)
}

const getIntradayPrice = (price) => {
	return Math.floor(Math.random() * (price + 10 - price) + price)
}

const initialSecurities = [
	{
		id: 1,
		name: 'Royal Bank',
		ticker: 'RY',
		price: getIntradayPrice(120),
	},
	{
		id: 2,
		name: 'Apple',
		ticker: 'AAPL',
		price: getIntradayPrice(200),
	},
	{
		id: 3,
		name: 'IBM',
		ticker: 'IBM',
		price: getIntradayPrice(75),
	},
	{
		id: 4,
		name: 'Microsoft',
		ticker: 'MFST',
		price: getIntradayPrice(150),
	},
]

export default { getSecurity, getIntradayPrice, initialSecurities }
