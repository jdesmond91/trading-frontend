const baseUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:3001/api'
		: 'https://tranquil-ridge-54040.herokuapp.com/api'

export default baseUrl
