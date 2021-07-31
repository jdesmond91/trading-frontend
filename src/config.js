const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api/trading'
		: 'https://jonathandesmond.me/api/trading'

export default baseUrl
