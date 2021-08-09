import { createSlice } from '@reduxjs/toolkit'

export const netWorthSlice = createSlice({
	name: 'netWorth',
	initialState: {
		value: { bookValue: 0, marketValue: 0 },
	},
	reducers: {
		setNetWorth: (state, action) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setNetWorth } = netWorthSlice.actions

export default netWorthSlice.reducer
