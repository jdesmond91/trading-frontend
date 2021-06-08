import { configureStore } from '@reduxjs/toolkit'
import securitiesReducer from './securitiesSlice'
import positionsReducer from './positionsSlice'
import cashReducer from './cashSlice'

export default configureStore({
	reducer: {
		securities: securitiesReducer,
		positions: positionsReducer,
		cash: cashReducer,
	},
})
