import axios from 'axios'
import { baseUrl } from '../config'

const createOrder = async (order) => {
	const res = await axios.post(`${baseUrl}/orders`, order)
	return res.data
}

export default { createOrder }
