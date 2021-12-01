import {ButtonBase, Container, Grid, Paper, Typography} from '@mui/material'
import React from 'react'
import {Image} from 'cloudinary-react'
import {Link} from 'react-router-dom'
import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
	image: {
		width: 300,
		height: '100%',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	container: {
		maxWidth: '100%',
		marginTop: '2rem',
	},
	paper: {},
})

const GetFeedback = ({postSearch}) => {
	const classes = useStyles()
	return (
		<Container xs={12} md={8} className={classes.container}>
			<Grid sx={{width: '100%'}} container direction='column'>
				{postSearch.length === 0
					? null
					: postSearch.map((item) => (
							<Link style={{textDecoration: 'none'}} key={item.id} to={`/post/${item.id}`}>
								<Paper
									sx={{padding: '1rem 0.5rem', marginBottom: '1rem', width: '100%'}}
									elevation={6}
									variant='outlined'
								>
									<Grid container wrap='nowrap' spacing={2}>
										<Grid item>
											<ButtonBase sx={{width: 300, height: '100%'}}>
												<Image
													className={classes.image}
													cloudName='bsslmves'
													publicId={item.image}
												/>
											</ButtonBase>
										</Grid>
										<Grid item xs>
											<Typography
												sx={{fontWeight: 200}}
												variant='h5'
												component='div'
												color='primary'
											>
												{item.title}
											</Typography>
											<Typography variant='caption' color='textSecondary'>
												{item.text}
											</Typography>
											<Typography variant='caption' component='div' sx={{fontSize: '16px'}}>
												Author: {item.author}
											</Typography>
											<Typography variant='inherit' component='div' sx={{fontSize: '18px'}}>
												Category: {item.category}
											</Typography>
										</Grid>
									</Grid>
								</Paper>
							</Link>
					  ))}
			</Grid>
		</Container>
	)
}

export default GetFeedback
