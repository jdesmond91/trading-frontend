import { createSlice } from '@reduxjs/toolkit'

export const positionsSlice = createSlice({
	name: 'positions',
	initialState: {
		value: [],
	},
	reducers: {
		setPositions: (state, action) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setPositions } = positionsSlice.actions

export default positionsSlice.reducer
