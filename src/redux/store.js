import { configureStore } from '@reduxjs/toolkit'
import securitiesReducer from './securitiesSlice'
import transactionsReducer from './transactionsSlice'
import positionsReducer from './positionsSlice'
import cashReducer from './cashSlice'
import netWorthReducer from './netWorthSlice'

export default configureStore({
	reducer: {
		securities: securitiesReducer,
		transactions: transactionsReducer,
		positions: positionsReducer,
		cash: cashReducer,
		netWorth: netWorthReducer,
	},
})
