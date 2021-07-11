import { createSlice } from '@reduxjs/toolkit'

export const securitiesSlice = createSlice({
	name: 'securities',
	initialState: {
		value: [],
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
