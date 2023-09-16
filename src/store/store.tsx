import { configureStore } from "@reduxjs/toolkit";
import todoSlice from './slice';
const store = configureStore({
	reducer: {
		todos: todoSlice
	},
})