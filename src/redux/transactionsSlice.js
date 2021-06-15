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
		addTransactions: (state, action) => {
			if (!state.value[action.payload.secId]) {
				state.value[action.payload.secId] = []
			}

			state.value[action.payload.secId].push({
				id: action.payload.id,
				type: action.payload.type,
				quantity: action.payload.quantity,
				price: action.payload.price,
			})
		},
	},
})

// Action creators are generated for each case reducer function
export const { setTransactions, addTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer
