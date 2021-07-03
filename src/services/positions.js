import axios from 'axios'
const baseUrl = '/api/positions'

const getCash = async () => {
	const res = await axios.get(`http://localhost:3001/api/positions/cash`)
	console.log(res.data.quantity)
	return res.data.quantity
}

const depositCash = async (quantity) => {
	const res = await axios.post(`http://localhost:3001/api/transactions/deposit`, { quantity })
	console.log(res.data)
	return res.data
}

export default { getCash, depositCash }
