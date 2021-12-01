import {
	Avatar,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Grid,
	IconButton,
	Paper,
	Rating,
	Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FavoriteIcon from '@mui/icons-material/Favorite'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Image} from 'cloudinary-react'
import React, {useState} from 'react'
import MyLoader from '../../components/MyLoader/MyLoader'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	image: {
		width: 300,
		height: 200,
		'&:hover': {
			cursor: 'pointer',
		},
	},
	container: {
		maxWidth: '100%',
	},
})

const Home = ({posts, setPosts}) => {
	const classes = useStyles()
	const [value, setValue] = useState(undefined)

	const likePost = (id) => {
		axios
			.post('https://course-deploy.herokuapp.com/posts/like/post', {
				userLike: localStorage.getItem('name'),
				postId: id,
			})
			.then((response) => {
				axios.get('https://course-deploy.herokuapp.com/posts/get').then((resp) => {
					setPosts(resp.data)
				})
			})
	}

	const ratingHandler = (id, value) => {
		axios
			.put('https://course-deploy.herokuapp.com/posts/rating/post', {
				postId: id,
				rating: value,
			})
			.then(() => {
				axios.get('https://course-deploy.herokuapp.com/posts/get').then((response) => {
					setPosts(response.data)
				})
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
		<Container className={classes.container}>
			<Paper
				className={classes.container}
				sx={{padding: '2rem', marginTop: '2rem'}}
				elevation={2}
				variant='elevation'
			>
				<Grid container direction='row' alignItems='center' justifyContent='start'>
					{posts.length === 0
						? Array(8)
								.fill(0)
								.map((_, index) => <MyLoader key={index} />)
						: posts
								.map((post) => {
									return (
										<Card key={post.id} sx={{width: 300, marginBottom: '2rem', margin: '1rem'}}>
											<CardHeader
												avatar={
													<Avatar sx={{bgcolor: 'green'}} aria-label='recipe'>
														{post.author.slice(0, 1)}
													</Avatar>
												}
												action={
													post.author === localStorage.getItem('name') ? (
														<IconButton onClick={() => deletePost(post.id)}>
															<HighlightOffIcon color='inherit' />
														</IconButton>
													) : null
												}
												title={
													post.title.length > 20
														? post.title.slice(0, 20).concat('...')
														: post.title
												}
												subheader={post.author}
											/>
											<Link to={`/post/${post.id}`}>
												<Image
													cloudName='bsslmves'
													publicId={post.image}
													className={classes.image}
												/>
											</Link>
											<CardContent>
												<Typography
													sx={{height: '100px', overflow: 'hidden'}}
													variant='body2'
													color='text.secondary'
												>
													{post.text}
												</Typography>
											</CardContent>
											<CardActions>
												<Typography
													sx={{marginLeft: '0.5rem'}}
													variant='body2'
													color='text.secondary'
												>
													{post.category}
												</Typography>
											</CardActions>
											<CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
												<Grid>
													{localStorage.getItem('name') ? (
														<IconButton
															onClick={() => likePost(post.id)}
															aria-label='add to favorites'
														>
															{post.likes === 0 ? (
																<FavoriteBorderIcon />
															) : (
																<FavoriteIcon color='error' />
															)}
														</IconButton>
													) : (
														<IconButton
															disabled
															onClick={() => likePost(post.id)}
															aria-label='add to favorites'
														>
															{post.likes === 0 ? (
																<FavoriteBorderIcon />
															) : (
																<FavoriteIcon readOnly color='error' />
															)}
														</IconButton>
													)}

													{post.likes}
												</Grid>

												{localStorage.getItem('name') ? (
													<Rating
														name='simple-controlled'
														value={post.rating}
														defaultValue={value}
														precision={1}
														max={5}
														onChange={(event, newValue) => {
															ratingHandler(post.id, newValue)
															setValue(newValue)
														}}
													/>
												) : (
													<Rating
														name='simple-controlled'
														value={post.rating}
														defaultValue={value}
														precision={1}
														readOnly
														max={5}
														onChange={(event, newValue) => {
															ratingHandler(post.id, newValue)
															setValue(newValue)
														}}
													/>
												)}

												<Link
													style={{textDecoration: 'none', color: '#000'}}
													to={`/review/${post.id}`}
												>
													{post.author === localStorage.getItem('name') ? (
														<IconButton>
															<EditIcon />
														</IconButton>
													) : null}
												</Link>
											</CardActions>
										</Card>
									)
								})
								.reverse()}
				</Grid>
			</Paper>
		</Container>
	)
}

export default Home
