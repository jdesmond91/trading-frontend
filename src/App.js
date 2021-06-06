import './App.css'
import Header from './components/Header'
import Portfolio from './components/Portfolio'

const App = () => {
	return (
		<div>
			<Header />
			<div className='container'>
				<Portfolio />
			</div>
		</div>
	)
}

export default App
