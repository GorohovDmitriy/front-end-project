import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import axios from 'axios'

const SelectSort = ({setUserPost}) => {
	const [age, setAge] = React.useState('')

	const handleChange = (event) => {
		if (event.target.value === 30) {
			axios
				.get(
					`https://course-project-deploy.herokuapp.com/posts/sortBy/${localStorage.getItem(
						'name',
					)}/title`,
				)
				.then((response) => {
					setUserPost(response.data)
				})
		} else if (event.target.value === 20) {
			axios
				.get(
					`https://course-project-deploy.herokuapp.com/posts/sortBy/${localStorage.getItem(
						'name',
					)}/likes`,
				)
				.then((response) => {
					setUserPost(response.data)
				})
		} else if (event.target.value === 10) {
			axios
				.get(
					`https://course-project-deploy.herokuapp.com/posts/sortBy/${localStorage.getItem(
						'name',
					)}/rating`,
				)
				.then((response) => {
					setUserPost(response.data)
				})
		}

		setAge(event.target.value)
	}

	return (
		<Box sx={{minWidth: 320, mb: '0.5rem'}}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Sorting</InputLabel>
				<Select
					sx={{height: '50px', mt: '0.2rem'}}
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={age}
					label='Sorting'
					onChange={handleChange}
				>
					<MenuItem value={10}>Rating</MenuItem>
					<MenuItem value={20}>Likes</MenuItem>
					<MenuItem value={30}>Alphabet</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default SelectSort
