import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from './test-utils'
import Portfolio from '../components/Portfolio'

const cash = 500
const netWorth = 1000

const id = '1'
const security = {
	name: 'Royal Bank',
	ticker: 'RY',
	price: 120,
	type: 'EQUITY',
	id: '123',
}
const quantity = 3
const totalValue = 360

const deposit = {
	type: 'DEPOSIT',
	date: '2021-07-27T20:25:18.744Z',
	quantity: 100,
	id: '123',
}

jest.mock('../services/positions', () => ({
	getCash: () => cash,
	getNetWorth: () => netWorth,
	getPositions: () => [{ id, security, quantity, totalValue }],
	depositCash: () => deposit,
}))

let component

beforeEach(() => {
	component = render(<Portfolio />)
})

describe('Portfolio Tests', () => {
	test('should render Portfolio correctly', async () => {
		expect(await screen.findByText(security.name)).toBeInTheDocument()
		expect(await screen.findByText(quantity)).toBeInTheDocument()
		expect(await screen.findByText(totalValue)).toBeInTheDocument()
		expect(await screen.findByText(`$${cash}`)).toBeInTheDocument()
		expect(await screen.findByText(`$${netWorth}`)).toBeInTheDocument()
	})

	test('should add funds correctly', async () => {
		const fundsInput = component.container.querySelector('#funds')
		const addFundsButton = component.getByText('Add Funds')
		fireEvent.change(fundsInput, { target: { value: deposit.quantity } })
		expect(parseInt(fundsInput.value)).toEqual(deposit.quantity)

		fireEvent.click(addFundsButton)
		expect(await screen.findByText(`$${cash + deposit.quantity}`)).toBeInTheDocument()
	})
})
