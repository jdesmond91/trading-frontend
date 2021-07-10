import axios from 'axios'
import { baseUrl } from '../config'

const getPositions = async () => {
	const res = await axios.get(`${baseUrl}/positions`)
	return res.data
}

const getCash = async () => {
	const res = await axios.get(`${baseUrl}/positions/cash`)
	return res.data.quantity
}

const depositCash = async (quantity) => {
	const res = await axios.post(`${baseUrl}/transactions/deposit`, { quantity })
	return res.data
}

const getNetWorth = async () => {
	const res = await axios.get(`${baseUrl}/positions/networth`)
	return res.data
}

export default { getPositions, getCash, depositCash, getNetWorth }
