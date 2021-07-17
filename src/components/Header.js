import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header>
			<nav className='nav flex'>
				<span class='material-icons'>account_balance</span>
				<Link to='/'>Portfolio</Link>
				<Link to='/order'>Order</Link>
				<Link to='/transaction'>Transaction History</Link>
			</nav>
		</header>
	)
}

export default Header
