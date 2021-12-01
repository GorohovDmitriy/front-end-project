import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Button, ButtonGroup, Container, Grid, Paper, Typography} from '@mui/material'
import {Image} from 'cloudinary-react'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import NoReviews from '../../components/NoReviews/NoReviews'
import {Link} from 'react-router-dom'
import SelectSort from '../../components/SelectSort/SelectSort'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	image: {
		width: '100%',
		height: '100%',
	},
})

const UserPage = ({setPosts, posts}) => {
	const classes = useStyles()
	const [userPost, setUserPost] = useState([])
	const [category, setCategory] = useState([])

	useEffect(() => {
		axios
			.get(`https://course-deploy.herokuapp.com/user/get/${localStorage.getItem('name')}`)
			.then(({data}) => {
				setUserPost(data)
			})
	}, [posts])

	useEffect(() => {
		const getCategory = () => {
			axios.get('https://course-deploy.herokuapp.com/category/get').then(({data}) => {
				setCategory(data)
			})
		}

		getCategory()
	}, [])

	const sortCategory = (name, author) => {
		axios.get(`https://course-deploy.herokuapp.com/category/get/${name}/${author}`).then((resp) => {
			setUserPost(resp.data)
		})
	}

	const deletePost = (id) => {
		if (window.confirm('Are you sure you want to delete the review ??')) {
			axios
				.delete('https://course-deploy.herokuapp.com/posts/delete', {data: {postId: id}})
				.then((response) => {
					axios.get('https://course-deploy.herokuapp.com/posts/get').then((resp) => {
						setPosts(resp.data)
					})
				})
		}
	}

	return (
		<Container xs={12} md={8}>
			<Typography
				sx={{fontSize: '22px'}}
				variant='overline'
				gutterBottom
				component='div'
				color='#1976d2'
			>
				{localStorage.getItem('name')}
			</Typography>
			<Grid container direction='row' justifyContent='space-between' alignItems='center'>
				<ButtonGroup variant='contained' sx={{mb: '1rem'}}>
					{category &&
						category.map((item) => (
							<Button
								onClick={() => sortCategory(item.category_name, localStorage.getItem('name'))}
								key={item.id}
							>
								{item.category_name}
							</Button>
						))}
				</ButtonGroup>
				<SelectSort setUserPost={setUserPost} />
			</Grid>

			{userPost.length === 0 ? (
				<NoReviews />
			) : (
				userPost.map((value) => (
					<Paper
						key={value.id}
						sx={{padding: '1rem', width: '100%', marginBottom: '1rem'}}
						elevation={10}
						variant='elevation'
					>
						<Grid container columnSpacing={{xs: 1, sm: 2, md: 3}}>
							<Grid item xs={6} md={4}>
								<Link to={`/post/${value.id}`}>
									<Image className={classes.image} cloudName='bsslmves' publicId={value.image} />
								</Link>
							</Grid>
							<Grid container direction='row' item xs={6} md={8}>
								<Grid>
									<Typography variant='overline' component='div' gutterBottom color='#1976d2'>
										{value.title}
									</Typography>
									<Typography variant='subtitle2' color='textSecondary'>
										{value.text}
									</Typography>
									<Typography variant='overline' color='textSecondary'>
										Author: {value.author}
									</Typography>
									<Typography variant='button' component='div' color='textSecondary'>
										Category: {value.category}
									</Typography>
								</Grid>
								<Grid
									container
									direction='row'
									justifyContent='center'
									alignItems='end'
									spacing={2}
								>
									<Grid container direction='row' item xs={6} md={4}>
										<Grid item xs>
											<Typography color='#fa0000' variant='caption' component='p'>
												Like: {value.likes}
											</Typography>
										</Grid>
										<Grid item xs>
											<Typography color='orange' variant='caption' component='p'>
												Rating: {value.rating}
											</Typography>
										</Grid>
									</Grid>
									<Grid container justifyContent='end' item xs={6} md={8}>
										<Grid>
											<Link
												style={{textDecoration: 'none', color: '#000'}}
												to={`/review/${value.id}`}
											>
												<Button startIcon={<EditIcon />} variant='outlined' color='success'>
													Edit
												</Button>
											</Link>
											<Button
												onClick={() => deletePost(value.id)}
												sx={{marginLeft: '0.5rem'}}
												variant='outlined'
												color='error'
												startIcon={<DeleteOutlineIcon />}
											>
												DELETE
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				))
			)}
		</Container>
	)
}

export default UserPage
