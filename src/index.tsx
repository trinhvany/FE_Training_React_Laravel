import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Major from './components/majors/index';
import Faculty from './components/faculties/index';
import Login from '../src/components/login';
import reportWebVitals from './reportWebVitals';
import Student from './components/students';
import Header from './common/header';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
   <Header/>
		<Routes>
			<Route path='/' element={<Student />}></Route>
			<Route path='/login' element={<Login />}></Route>
      <Route path='/major' element={<Major />}></Route>
      <Route path='/faculty' element={<Faculty />}></Route>
		</Routes>
	</BrowserRouter>
);
reportWebVitals();
