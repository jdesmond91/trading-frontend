import axios from 'axios'
import { baseUrl } from '../config'

const getTransactions = async () => {
	const res = await axios.get(`${baseUrl}/transactions`)
	return res.data
}

const transactionService = {
	getTransactions,
}

export default transactionService
