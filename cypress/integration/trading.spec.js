describe('Trading Integration Tests', () => {
	it('should open front page', function () {
		cy.visit('http://localhost:3000/trading')
		cy.contains('Net Worth')
	})

	describe('Funds Testing', () => {
		beforeEach(() => {
			cy.intercept('GET', '/api/trading/securities/equity').as('getSecurities')
			cy.intercept('GET', '/api/trading/positions/cash').as('getCash')
			cy.intercept('GET', '/api/trading/positions/networth').as('getNetWorth')
			cy.intercept('GET', '/api/trading/positions').as('getPositions')
			cy.visit('http://localhost:3000/trading')
			cy.wait(['@getSecurities', '@getCash', '@getNetWorth', '@getPositions'])
		})

		it('should add funds correctly', () => {
			const amount = 100

			cy.get('[data-cy=net-worth]')
				.invoke('text')
				.then((text) => {
					const currentNetWorth = parseInt(text.split('$')[1])
					cy.get('[data-cy=funds-input]').type(amount)
					cy.get('[data-cy=funds-submit').click()
					cy.get('[data-cy=modal-close').click()
					cy.wait(1000)
					cy.get('[data-cy=net-worth]')
						.invoke('text')
						.then((text) => {
							const postNetWorth = parseInt(text.split('$')[1])
							expect(postNetWorth).to.equal(currentNetWorth + amount)
						})
				})
		})
	})

	describe('Order Testing', () => {
		beforeEach(() => {
			cy.intercept('GET', '/api/trading/securities/equity').as('getSecurities')
			cy.intercept('GET', '/api/trading/positions/cash').as('getCash')
			cy.intercept('GET', '/api/trading/positions/networth').as('getNetWorth')
			cy.intercept('GET', '/api/trading/positions').as('getPositions')
			cy.visit('http://localhost:3000/trading/order')
			cy.wait(['@getSecurities', '@getCash', '@getNetWorth', '@getPositions'])
		})

		it('should create an order successfully and increase position quantity by 1', () => {
			cy.window()
				.its('store')
				.invoke('getState')
				.then((state) => {
					const position = state.positions.value.find(
						(position) => position.security.name === 'Royal Bank'
					)

					const quantityBefore = position ? position.quantity : 0

					cy.get('[class*="-control"]') // find all react-select elements
						.eq(0) // select the first element found (security select)
						.click(0, 0, { force: true })
						.get('[class*="-menu"]')
						.find('[class*="-option"]')
						.eq(0)
						.click(0, 0, { force: true })
					cy.get('[data-cy=order-submit').click()
					cy.get('[data-cy=back-portfolio').click()
					cy.window()
						.its('store')
						.invoke('getState')
						.then((state) => {
							const position = state.positions.value.find(
								(position) => position.security.name === 'Royal Bank'
							)

							const quantityAfter = position ? position.quantity : 0
							expect(quantityAfter).to.equal(quantityBefore + 1)
						})
				})
		})
	})
})
