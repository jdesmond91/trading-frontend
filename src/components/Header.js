import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return (
		<header className='header header--shadow'>
			<nav className='nav'>
				<span className='nav__item material-icons'>account_balance</span>
				<Link className='nav__item' to='/'>
					Portfolio
				</Link>
				<Link className='nav__item' to='/order'>
					Order
				</Link>
				<Link className='nav__item' to='/transaction'>
					Transactions
				</Link>
			</nav>
		</header>
	)
}

export default Header
