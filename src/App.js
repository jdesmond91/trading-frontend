import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import Order from './components/Order'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import securityService from './services/securities'
import positionService from './services/positions'
import { useDispatch } from 'react-redux'
import { setSecurities } from './redux/securitiesSlice'
import { setNetWorth } from './redux/netWorthSlice'
import { setPositions } from './redux/positionsSlice'
import { setCash } from './redux/cashSlice'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setSecurities(await securityService.getSecurities()))
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setCash(await positionService.getCash()))
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setNetWorth(await positionService.getNetWorth()))
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setPositions(await positionService.getPositions()))
		}

		fetchData()
	}, [dispatch])

	return (
		<Router>
			<Header />
			<main>
				<Switch>
					<Route exact path='/'>
						<Portfolio />
					</Route>
					<Route path='/order'>
						<Order />
					</Route>
					<Route path='/transaction'>
						<Transaction />
					</Route>
				</Switch>
			</main>
		</Router>
	)
}

export default App
