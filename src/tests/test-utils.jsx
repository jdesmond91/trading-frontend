// test-utils.jsx
import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import securitiesReducer from '../redux/securitiesSlice'
import transactionsReducer from '../redux/transactionsSlice'
import positionsReducer from '../redux/positionsSlice'
import cashReducer from '../redux/cashSlice'
import netWorthReducer from '../redux/netWorthSlice'

function render(
	ui,
	{
		preloadedState,
		store = configureStore({
			reducer: {
				securities: securitiesReducer,
				transactions: transactionsReducer,
				positions: positionsReducer,
				cash: cashReducer,
				netWorth: netWorthReducer,
			},
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
