import './App.css'
import Header from './components/Header'
import Portfolio from './components/Portfolio'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Test = () => <div>Hello</div>

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
						<Route path='/test'>
							<Test />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	)
}

export default App
