import {Alert, Container} from '@mui/material'
import React from 'react'

const NoReviews = () => {
	return (
		<Container xs={12} md={8} lg={4}>
			<Alert variant='filled' severity='error'>
				You have no reviews in this category.
			</Alert>
		</Container>
	)
}

export default NoReviews
