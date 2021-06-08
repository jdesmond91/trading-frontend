import { createSlice } from '@reduxjs/toolkit'
import securityService from '../services/security'

const initialSecurities = [
	{
		id: 1,
		name: 'Royal Bank',
		ticker: 'RY',
		price: securityService.getIntradayPrice(120),
	},
	{
		id: 2,
		name: 'Apple',
		ticker: 'AAPL',
		price: securityService.getIntradayPrice(200),
	},
	{
		id: 3,
		name: 'IBM',
		ticker: 'IBM',
		price: securityService.getIntradayPrice(75),
	},
	{
		id: 4,
		name: 'Microsoft',
		ticker: 'MFST',
		price: securityService.getIntradayPrice(150),
	},
]

export const securitiesSlice = createSlice({
	name: 'securities',
	initialState: {
		value: initialSecurities,
	},
	reducers: {
		setSecurities: (state, action) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setSecurities } = securitiesSlice.actions

export default securitiesSlice.reducer
