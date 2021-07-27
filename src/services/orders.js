import axios from 'axios'
import baseUrl from '../config'

const createOrder = async (order) => {
	const res = await axios.post(`${baseUrl}/orders`, order)
	return res.data
}

const orderService = {
	createOrder,
}

export default orderService
