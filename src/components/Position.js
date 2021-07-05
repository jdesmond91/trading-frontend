import React from 'react'
import { useSelector } from 'react-redux'

const Position = () => {
	const positions = useSelector((state) => state.positions.value)

	return (
		<div className='grid'>
			<div></div>
			<div>Quantity</div>
			<div>Today's Price</div>
			<div>Total Value</div>

			{positions.map((position) => {
				return (
					<React.Fragment key={position.id}>
						<div>{position.security.name}</div>
						<div>{position.quantity}</div>
						<div>{position.security.price}</div>
						<div>{position.totalValue}</div>
					</React.Fragment>
				)
			})}
		</div>
	)
}

export default Position
