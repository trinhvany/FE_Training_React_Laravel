import './App.css';
import Login from './components/Account/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeStudent from './components/students/home';
import HomeMajor from './components/majors/home';
import HomeFaculty from './components/faculties/home';
import { Provider } from "react-redux";
import store from "../src/store/configureStore";
import Header from './common/header';

function App() {
	var token = localStorage.getItem('token');
	if ( ! token && window.location.pathname !== '/login') {
		window.location.pathname = '/login';
	}
	return (
		<div>
				<BrowserRouter>
				<Provider store={store}>
					<Header/>
					<Routes>
						<Route path='/' element={<HomeStudent />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/major' element={<HomeMajor />}></Route>
						<Route path='/faculty' element={<HomeFaculty />}></Route>
					</Routes>
				</Provider>
				</BrowserRouter>
			
		</div>
	);
}

export default App;
