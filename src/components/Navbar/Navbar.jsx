import React, {useState} from 'react'
import {Box, AppBar, Toolbar, Typography, Button, IconButton} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import {Link} from 'react-router-dom'
import {auth} from '../../auth/firebase-config'
import SearchBar from '../../shared/SearchBar/SearchBar'

const Navbar = ({setLoggedIn, loggedIn, postSearch, setPostSearch}) => {
	const [name, setName] = useState(localStorage.getItem('name'))

	const logOff = () => {
		if (window.confirm('Do you really want to leave ???')) {
			auth.signOut()
			localStorage.setItem('loggedIn', false)
			setName(localStorage.removeItem('name'))
			setLoggedIn((prev) => !prev)
		}
	}

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static'>
				<Toolbar>
					{loggedIn ? (
						<Link style={{textDecoration: 'none', color: '#fff'}} to='/user'>
							<IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{mr: 2}}>
								<AccountBoxIcon />
							</IconButton>
						</Link>
					) : null}
					<Typography variant='h6' component='div' sx={{flexGrow: 1}}>
						<Link style={{textDecoration: 'none', color: '#fff'}} to='/'>
							Home Page
						</Link>
					</Typography>
					<SearchBar postSearch={postSearch} setPostSearch={setPostSearch} />
					{loggedIn ? (
						<div>
							<Button sx={{marginRight: '1rem'}} color='inherit' variant='outlined'>
								<Link style={{textDecoration: 'none', color: '#fff'}} to='/create'>
									create review
								</Link>
							</Button>
							<Button onClick={logOff} color='inherit' variant='outlined'>
								Log off
							</Button>
						</div>
					) : (
						<Button color='inherit' variant='outlined'>
							<Link style={{textDecoration: 'none', color: '#fff'}} to='/signup'>
								Sign up
							</Link>
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Navbar
