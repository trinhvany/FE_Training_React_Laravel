import { createSlice } from "@reduxjs/toolkit";
const todoSlice = createSlice({
	name: 'students',
	initialState: [],
	reducers: {
		addStudent(state:any, action:any) {
			state.push(action.payload);
		},
		removeStudent(state:any, action:any) {
			state.splice(action.payload, 1)
		}
	}
});
const { actions, reducer } = todoSlice;
export const { addStudent, removeStudent } = actions;
export default reducer;