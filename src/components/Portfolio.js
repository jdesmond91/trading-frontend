import React, { useState } from 'react'
import Position from './Position'
import Security from './Security'
import securityService from '../services/security'

const Portfolio = () => {
	const [netWorth, setNetWorth] = useState(5000)
	const [securities, setSecurities] = useState(securityService.initialSecurities)

	return (
		<>
			<Position securities={securities} />
			<Security />
		</>
	)
}

export default Portfolio
