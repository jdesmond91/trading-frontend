import { createSlice } from '@reduxjs/toolkit'
import transactionService from '../services/transaction'

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState: {
		value: transactionService.initializeTransactions(),
	},
	reducers: {
		setTransactions: (state, action) => {
			state.value = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { setTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer
