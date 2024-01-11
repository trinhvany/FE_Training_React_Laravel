import './App.css';
import Login from './components/Account/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeStudent from './components/students/home';
import HomeMajor from './components/majors/home';
import HomeFaculty from './components/faculties/home';
import Header from './common/Main/header';

function App() {
	var token = localStorage.getItem('token');
	if ( ! token && window.location.pathname !== '/login') {
		window.location.pathname = '/login';
	}
	return (
		<div>
			<BrowserRouter>
				<Header/>
				<Routes>
					<Route path='/' element={<HomeStudent />}></Route>
					<Route path='/login' element={<Login />}></Route>
					<Route path='/major' element={<HomeMajor />}></Route>
					<Route path='/faculty' element={<HomeFaculty />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
