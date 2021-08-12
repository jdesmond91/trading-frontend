import React from 'react'
import { useSelector } from 'react-redux'
import round from '../utils/round'

const Position = () => {
	const positions = useSelector((state) => state.positions.value)

	return (
		<section className='section'>
			<h2 className='section__heading'>Portfolio</h2>
			<hr className='section__hr' />
			<table className='table'>
				<tbody className='table__body'>
					{positions &&
						positions.map(({ id, security, quantity, bookValue, marketValue }) => {
							const difference = round(marketValue - bookValue)
							const performance = round(difference / bookValue) * 100
							// if there is a net profit, then add a positive sign to the string
							const differenceString = (difference) => {
								return difference > 0
									? `+${difference} (${performance}%)`
									: `${difference} (${performance}%)`
							}

							return (
								<tr className='table__row' key={id}>
									<td className='table__data'>
										<div className='table__inner'>
											<p className='table__detail'>{security.ticker}</p>
											<p className='table__detail'>{marketValue}</p>
										</div>
										<div className='table__inner'>
											<p className='table__sub-detail'>{quantity} shares</p>
											<p className='table__sub-detail'>{differenceString(difference)}</p>
										</div>
									</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</section>
	)
}

export default Position
