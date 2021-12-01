import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import SignUp from './auth/SignUp'
import Login from './auth/Login.jsx'
import Navbar from './components/Navbar/Navbar'
import Home from './shared/Home/Home'
import AppContext from './Context/Context'
import UserPage from './users/UserPage/UserPage'
import CreateReview from './shared/CreateReview/CreateReview'
import EdditPost from './components/EdditPost/EdditPost'
import SelectPost from './components/SelectPost/SelectPost'
import GetFeedback from './shared/GetFeedback/GetFeedback'

const App = () => {
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))
	const [posts, setPosts] = useState([])
	const [postSearch, setPostSearch] = useState([])

	useEffect(() => {
		axios.get('https://course-deploy.herokuapp.com/posts/get').then((response) => {
			setPosts(response.data)
		})
	}, [])

	return (
		<AppContext.Provider value={{}}>
			<Router>
				<Switch>
					<Navbar postSearch={postSearch} setPostSearch={setPostSearch} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				</Switch>
				<Switch>
					<Route path='/' exact>
						<Home setPosts={setPosts} posts={posts} />
					</Route>
					<Route path='/signup' exact>
						<SignUp />
					</Route>
					<Route path='/login' exact>
						<Login setLoggedIn={setLoggedIn} />
					</Route>
					<Route path='/user' exact>
						<UserPage setPosts={setPosts} posts={posts} />
					</Route>
					<Route path='/create' exact>
						<CreateReview setPosts={setPosts} />
					</Route>
					<Route path='/review/:id' exact>
						<EdditPost posts={posts} setPosts={setPosts} />
					</Route>
					<Route path='/post/:id' exact>
						<SelectPost posts={posts} setPosts={setPosts} />
					</Route>
					<Route path='/feedback' exact>
						<GetFeedback postSearch={postSearch} />
					</Route>
				</Switch>
			</Router>
		</AppContext.Provider>
	)
}

export default App
