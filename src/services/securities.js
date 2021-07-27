import axios from 'axios'
import baseUrl from '../config'

const getSecurities = async () => {
	const res = await axios.get(`${baseUrl}/securities/equity`)
	return res.data
}

const securityService = {
	getSecurities,
}

export default securityService
