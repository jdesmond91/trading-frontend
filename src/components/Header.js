import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='shadow'>
			<nav className='nav'>
				<span class='material-icons'>account_balance</span>
				<Link to='/'>Portfolio</Link>
				<Link to='/order'>Order</Link>
				<Link to='/transaction'>Transactions</Link>
			</nav>
		</header>
	)
}

export default Header
