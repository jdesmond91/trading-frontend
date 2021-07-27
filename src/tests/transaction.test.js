import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from './test-utils'
import Transaction from '../components/Transaction'

const id = '1'
const type = 'DEPOSIT'
const date = '2021-07-10T22:51:06.190+00:00'
const quantity = 199

jest.mock('../services/transactions', () => ({
	getTransactions: () => [{ id: id, type: type, date: date, quantity: quantity }],
}))

describe('Transaction Tests', () => {
	test('should render Transaction correctly', async () => {
		render(<Transaction />)
		expect(await screen.findByText(type)).toBeInTheDocument()
		expect(await screen.findByText(date.split('T')[0])).toBeInTheDocument()
		expect(await screen.findByText(quantity)).toBeInTheDocument()
	})
})
