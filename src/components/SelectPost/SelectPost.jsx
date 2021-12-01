import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material'
import {Image} from 'cloudinary-react'
import React from 'react'
import {useParams} from 'react-router'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	image: {
		width: '100%',
		height: '100%',
		'&:hover': {
			cursor: 'pointer',
		},
	},
})

const SelectPost = ({posts, setPosts}) => {
	const {id} = useParams()
	const classes = useStyles()
	let post = posts.find((item) => Number(item.id) === Number(id))

	return (
		<Container xs={12} md={8} maxWidth='lg'>
			{post === undefined ? (
				'...Loading'
			) : (
				<Paper
					sx={{
						padding: '1rem',
						width: '100%',
						height: '100%',
						marginBottom: '1rem',
						marginTop: '2rem',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
					elevation={10}
					variant='elevation'
				>
					<Grid container>
						<Grid container columnSpacing={{xs: 1, sm: 2, md: 3}}>
							<Grid item xs={6} md={4}>
								<Image className={classes.image} cloudName='bsslmves' publicId={post?.image} />
							</Grid>
							<Grid container direction='row' item xs={6} md={8}>
								<Grid>
									<Typography variant='overline' component='div' gutterBottom color='#1976d2'>
										{post?.title}
									</Typography>
									<Typography variant='subtitle2' color='textSecondary'>
										{post?.text}
									</Typography>
									<Typography variant='overline' color='textSecondary'>
										Author: {post?.author}
									</Typography>
									<Typography variant='button' component='div' color='textSecondary'>
										Category: {post?.category}
									</Typography>
								</Grid>
								<Grid
									container
									direction='row'
									justifyContent='start'
									alignItems='start'
									spacing={2}
								>
									<Grid item>
										<Typography color='#fa0000' variant='caption' component='p'>
											Like: {post?.likes}
										</Typography>
									</Grid>
									<Grid item>
										<Typography color='orange' variant='caption' component='p'>
											Rating: {post?.rating}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

					<Paper
						square
						variant='outlined'
						sx={{
							padding: '1rem',
							marginTop: '1rem',
						}}
					>
						<TextField sx={{width: '80%'}} />
						<Button sx={{width: '18%', marginLeft: '0.5rem', height: '3.5rem'}} variant='outlined'>
							push comment
						</Button>
					</Paper>
				</Paper>
			)}
		</Container>
	)
}

export default SelectPost
