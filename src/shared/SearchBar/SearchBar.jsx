import {Button} from '@mui/material'
import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {styled, alpha} from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: '2rem',
	},
})

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

const SearchBar = ({setPostSearch}) => {
	const classes = useStyles()
	const history = useHistory()
	const [query, setQuery] = useState('')

	const getSearchPost = () => {
		if (query !== '') {
			axios.get(`https://course-deploy.herokuapp.com/posts/search/${query}`).then((resp) => {
				setPostSearch(resp.data)
				setQuery('')
				if (resp.data.length !== 0) {
					history.push('/feedback')
				} else {
					alert('Nothing found')
				}
			})
		} else {
			alert('Enter the title of the review')
		}
	}

	return (
		<>
			<div className={classes.container}>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder='Search…'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						inputProps={{'aria-label': 'search'}}
					/>
				</Search>
				<Button variant='contained' color='warning' onClick={getSearchPost}>
					send
				</Button>
			</div>
		</>
	)
}

export default SearchBar
