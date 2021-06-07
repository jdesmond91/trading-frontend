import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header>
			<nav className='nav flex'>
				<Link to='/'>Portfolio</Link>
				<Link to='/test'>Test</Link>
			</nav>
		</header>
	)
}

export default Header
