import { configureStore } from '@reduxjs/toolkit'
import securitiesReducer from './securitiesSlice'

export default configureStore({
	reducer: {
		securities: securitiesReducer,
	},
})
