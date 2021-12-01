import React from 'react'
import {Card} from '@mui/material'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
	<>
		<Card sx={{width: 300, marginBottom: '2rem', margin: '1rem'}}>
			<ContentLoader
				speed={1}
				width={476}
				height={500}
				viewBox='0 0 476 500'
				backgroundColor='#e0e0e0'
				foregroundColor='#e8e8e8'
				{...props}
			>
				<rect x='48' y='6' rx='3' ry='3' width='88' height='6' />
				<rect x='48' y='26' rx='3' ry='3' width='52' height='6' />
				<circle cx='20' cy='20' r='20' />
				<rect x='5' y='58' rx='0' ry='0' width='291' height='200' />
				<rect x='6' y='262' rx='0' ry='0' width='291' height='100' />
				<rect x='9' y='397' rx='4' ry='4' width='92' height='26' />
				<rect x='15' y='460' rx='0' ry='0' width='7' height='17' />
				<rect x='10' y='452' rx='5' ry='5' width='95' height='42' />
				<rect x='163' y='465' rx='6' ry='6' width='134' height='24' />
			</ContentLoader>
		</Card>
	</>
)

export default MyLoader
