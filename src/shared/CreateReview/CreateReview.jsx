import {Button, ButtonGroup, Container, Grid, Paper, TextField, Typography} from '@mui/material'
import React, {useState, useEffect} from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import AddIcon from '@mui/icons-material/Add'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import {styled} from '@mui/material/styles'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	paper: {
		padding: '50px',
		width: '100%',
	},
	grid: {
		marginTop: '5rem',
	},
	active: {
		backgroundColor: '#af0000',
		color: '#fff',
		border: '1px solid black',
	},
	input: {
		marginBottom: '2rem',
	},
})

const Input = styled(TextField)({
	display: 'none',
})

const CreateReview = ({setPosts}) => {
	const history = useHistory()
	const classes = useStyles()
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [image, setImage] = useState([])
	const [category, setCategory] = useState([])
	const [select, setSelect] = useState(null)

	useEffect(() => {
		const getCategory = () => {
			axios.get('https://course-deploy.herokuapp.com/category/get').then(({data}) => {
				setCategory(data)
			})
		}

		getCategory()
	}, [])

	const createReview = () => {
		if (select === null) {
			alert('Select Category')
		} else {
			const formData = new FormData()
			formData.append('file', image[0])
			formData.append('upload_preset', 'udmcav7k')

			axios
				.post('https://api.cloudinary.com/v1_1/bsslmves/image/upload', formData)
				.then((response) => {
					const fileName = response.data.public_id

					axios
						.post('https://course-deploy.herokuapp.com/upload', {
							title: title,
							text: text,
							image: fileName,
							author: localStorage.getItem('name'),
							category: select,
						})
						.then(() => {
							axios.get('https://course-deploy.herokuapp.com/posts/get').then((resp) => {
								setPosts(resp.data)
								history.push('/')
							})
						})
				})
		}
	}

	const selectCategory = (string) => {
		setSelect(string)
	}

	return (
		<Container container='true' fixed>
			<Grid
				className={classes.grid}
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
			>
				<Paper className={classes.paper} elevation={10} variant='elevation'>
					<Grid container direction='column' justifyContent='center' alignItems='center'>
						<Typography component='h3' variant='h6' gutterBottom color='textPrimary'>
							Create an overview
						</Typography>
						{select === null ? (
							<Typography color='textSecondary' gutterBottom component='span' variant='p'>
								Select a category
							</Typography>
						) : (
							<Typography color='textSecondary' gutterBottom component='span' variant='p'>
								{select} category selected
							</Typography>
						)}
						<ButtonGroup color='inherit' sx={{marginBottom: '1rem'}}>
							{category.map((item) => (
								<Button key={item.id} onClick={() => selectCategory(item.category_name)}>
									{item.category_name}
								</Button>
							))}
						</ButtonGroup>
						<TextField
							fullWidth
							className={classes.input}
							id='outlined-textarea'
							label='Review title'
							placeholder='Enter the title of the review'
							multiline
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							// inputProps={{readOnly: true}}
						/>
						<TextField
							fullWidth
							className={classes.input}
							id='outlined-multiline-static'
							label='Description'
							placeholder='Describe the review'
							multiline
							rows={6}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<Grid container direction='row' justifyContent='space-between' alignItems='center'>
							<label htmlFor='contained-button-file'>
								<Input
									onChange={(e) => setImage(e.target.files)}
									accept='image/*'
									id='contained-button-file'
									multiple
									type='file'
								/>
								<Button startIcon={<PhotoCameraIcon />} variant='contained' component='span'>
									Upload
								</Button>
							</label>
							<Button onClick={createReview} variant='contained' startIcon={<AddIcon />}>
								Create Review
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Container>
	)
}

export default CreateReview
