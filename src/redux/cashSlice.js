import { createSlice } from '@reduxjs/toolkit'

export const cashSlice = createSlice({
	name: 'cash',
	initialState: {
		value: 1000,
	},
	reducers: {
		setCash: (state, action) => {
			state.value = action.payload
		},
		addCash: (state, action) => {
			state.value += action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setCash, addCash } = cashSlice.actions

export default cashSlice.reducer
