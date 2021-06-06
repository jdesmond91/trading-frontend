import './App.css'
import { useState } from 'react'
import Header from './components/Header'
import Portfolio from './components/Portfolio'

const FundsForm = ({ addFunds }) => {
	const [value, setValue] = useState(0)

	const handleValueChange = (event) => {
		setValue(parseInt(event.target.value))
	}

	const handleFundsSubmit = (event) => {
		event.preventDefault()
		addFunds(value)
	}

	return (
		<div>
			<form onSubmit={handleFundsSubmit}>
				<label htmlFor='funds'>Add Funds</label>
				<input type='number' name='funds' id='funds' onChange={handleValueChange} />
				<button id='submit' type='submit'>
					Add Funds
				</button>
			</form>
		</div>
	)
}

const App = () => {
	const [total, setTotal] = useState(0)

	const handleIncrease = () => {
		setTotal(total + 1)
	}

	const handleDecrease = () => {
		setTotal(total - 1)
	}

	const addFunds = (value) => {
		setTotal(value)
	}

	return (
		<div>
			<Header />
			<div className='container'>
				{/* <FundsForm addFunds={addFunds} />
				<div className='total'>
					{total}
					<div className='totalButtons'>
						<button onClick={handleIncrease}>Increase</button>
						<button onClick={handleDecrease}>Decrease</button>
					</div>
				</div> */}
				<Portfolio />
			</div>
		</div>
	)
}

export default App
