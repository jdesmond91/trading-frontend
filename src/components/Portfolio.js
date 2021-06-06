import React, { useState } from 'react'
import Position from './Position'
import Security from './Security'
import securityService from '../services/security'
import transactionService from '../services/transaction'
import transaction from '../services/transaction'

const Portfolio = () => {
	const [netWorth, setNetWorth] = useState(5000)
	const [securities, setSecurities] = useState(securityService.initialSecurities)
	const [transactions, setTransactions] = useState(transactionService.initializeTransactions())

	return (
		<>
			<Position securities={securities} transactions={transactions} />
			<Security />
		</>
	)
}

export default Portfolio
