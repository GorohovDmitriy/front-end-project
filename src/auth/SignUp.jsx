import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {NavLink} from 'react-router-dom'
import {Button, Container, Grid, Paper, TextField, Typography} from '@mui/material'
import {makeStyles} from '@mui/styles'
import {useForm} from 'react-hook-form'

const useStyles = makeStyles({
	form: {
		marginTop: '5rem',
	},
	wrong: {
		color: 'red',
	},
})

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
	} = useForm({mode: 'onChange'})
	const history = useHistory()
	const classes = useStyles()

	const onSumbit = async ({name, email, password}) => {
		try {
			const response = await axios.post('https://course-deploy.herokuapp.com/user/register', {
				name: name,
				password: password,
				email: email,
			})
			console.log(response)
			reset()
			history.push('/login')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container container='true'>
			<form className={classes.form} onSubmit={handleSubmit(onSumbit)}>
				<Grid container direction='column' justifyContent='center' alignItems='center'>
					<Paper elevation={6} sx={{padding: '50px', width: '40%'}} variant='elevation'>
						<Grid container direction='column' justifyContent='center' alignItems='center'>
							<Typography
								color='textSecondary'
								component='h3'
								variant='h6'
								sx={{marginBottom: '1rem'}}
							>
								Hey, Welcome back!!
							</Typography>
							<TextField
								sx={{width: '100%', marginBottom: '1rem'}}
								id='outlined-name'
								label='Name'
								{...register('name', {required: true, minLength: 3})}
								color='primary'
								helperText={
									errors.name ? (
										<b className={classes.wrong}>Not a correct name</b>
									) : (
										'Enter your Name'
									)
								}
							/>
							<TextField
								sx={{width: '100%', marginBottom: '1rem'}}
								id='outlined-email'
								label='Email'
								{...register('email', {required: true})}
								helperText={
									errors.email ? (
										<b className={classes.wrong}>Not correct email</b>
									) : (
										'Enter your Email'
									)
								}
							/>
							<TextField
								sx={{width: '100%', marginBottom: '1rem'}}
								id='outlined-password'
								label='Password'
								type='password'
								{...register('password', {required: true, minLength: 6})}
								helperText={
									errors.password ? (
										<b className={classes.wrong}>Wrong password</b>
									) : (
										'Enter your Password'
									)
								}
							/>
							<Button
								type='submit'
								sx={{width: '100%', height: '50px'}}
								variant='contained'
								color='primary'
							>
								Sign up
							</Button>
							<Button
								variant='outlined'
								color='inherit'
								sx={{width: '100%', height: '50px', marginTop: '0.5rem'}}
							>
								<NavLink to='/login' style={{textDecoration: 'none', color: '#000'}}>
									Login
								</NavLink>
							</Button>
						</Grid>
					</Paper>
				</Grid>
			</form>
		</Container>
	)
}

export default SignUp
