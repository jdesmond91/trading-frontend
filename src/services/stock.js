import axios from 'axios'

const baseUrl = 'https://www.alphavantage.co/query?'
//const API_KEY = `${process.env.REACT_APP_ALPHAVANTAGE_API_KEY}`
const API_KEY = 'W7V9WMUGGV6ZEN7E'

const getCompanyOverview = async () => {
	const url = `${baseUrl}/function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`
	const response = await axios.get(url)
	console.log(response)
}

const getQuoteData = async () => {
	const url = `${baseUrl}/function=GLOBAL_QUOTE&symbol=IBM&&apikey=${API_KEY}`
	const response = await axios.get(url)
	console.log(response)
	return response
}

export default { getCompanyOverview, getQuoteData }
