import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import Order from './components/Order'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import securityService from './services/securities'
import { useDispatch } from 'react-redux'
import { setSecurities } from './redux/securitiesSlice'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setSecurities(await securityService.getSecurities()))
		}

		fetchData()
	}, [dispatch])

	return (
		<Router>
			<Header />
			<ScrollToTop />
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
