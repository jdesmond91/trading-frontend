import './App.css'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import Order from './components/Order'
import Transaction from './components/Transaction'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const App = () => {
	return (
		<Router>
			<div>
				<Header />
				<div className='container'>
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
				</div>
			</div>
		</Router>
	)
}

export default App
