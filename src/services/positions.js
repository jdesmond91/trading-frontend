import axios from 'axios'
const baseUrl = '/api/positions'

const getPositions = async () => {
	const res = await axios.get(`http://localhost:3001/api/positions/`)
	console.log(res.data)
	return res.data
}

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

const getNetWorth = async () => {
	const res = await axios.get(`http://localhost:3001/api/positions/networth`)
	console.log(res.data)
	return res.data
}

export default { getPositions, getCash, depositCash, getNetWorth }
