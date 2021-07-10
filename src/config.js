module.exports = {
	baseUrl:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3001/api'
			: 'http://localhost:3001/api',
}
