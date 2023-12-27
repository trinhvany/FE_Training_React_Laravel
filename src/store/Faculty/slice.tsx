import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IStudent } from '../../model/student';
import { RootState } from '../configureStore';
import initialState from './initialize';

import { fechthStudents, getStudentById, addStudent, deleteStudentById } from './operations';
interface Action {
	payload: {
		key: string;
		value: string | number;
	};
}
const students: IStudent[] = [];

export const studentSlice = createSlice({
	name: 'student',
	initialState,
	reducers: {
		setStatusEditModel(state, action) {
			state.stateEditComponent.isShowEditModal = action.payload;
			// state.stateEditComponent.isShowEditModal = [...state.stateEditComponent.isShowEditModal, action.payload];
		},
		setIsNew(state, action) {
			state.stateEditComponent.isNew = action.payload;
		},
		setStudent(state: { stateEditComponent: { student: IStudent } }, action) {
			state.stateEditComponent.student = action.payload;
		},
		setStudentValue(state: { stateEditComponent: { student: IStudent } }, action: Action) {
			state.stateEditComponent.student[action.payload.key] = action.payload.value;
		},
	},
	extraReducers: (builder) => {
		// Start fechthStudents request
		builder.addCase(fechthStudents.pending, (state) => {
			state.isLoading = true;
		});

		// Request successful
		builder.addCase(fechthStudents.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		// Request fail
		builder.addCase(fechthStudents.rejected, (state, action: PayloadAction<any>) => {
			// We show the error message
			state.errorMessage = action.payload;
			state.isLoading = false;
		});

		builder.addCase(getStudentById.pending, (state) => {
			state.isLoading = true;
		});

		// Request successful
		builder.addCase(getStudentById.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.stateEditComponent.student = action.payload;
		});
		// Request fail
		builder.addCase(getStudentById.rejected, (state, action: PayloadAction<any>) => {
			// We show the error message
			state.errorMessage = action.payload;
			state.isLoading = false;
		});

		builder.addCase(addStudent.pending, (state) => {
			state.isLoading = true;
		});

		// Request successful
		builder.addCase(addStudent.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.stateEditComponent.student = action.payload;
		});

		// Request fail
		builder.addCase(addStudent.rejected, (state, action: PayloadAction<any>) => {
			// We show the error message
			state.errorMessage = action.payload;
			state.isLoading = false;
		});

		builder.addCase(deleteStudentById.pending, (state) => {
			state.isLoading = true;
		});

		// Request successful
		builder.addCase(deleteStudentById.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
		});

		// Request fail
		builder.addCase(deleteStudentById.rejected, (state, action: PayloadAction<any>) => {
			// We show the error message
			state.errorMessage = action.payload;
			state.isLoading = false;
		});
	},
});

export const selectStudents = (state: RootState) => state.students.data;
export const selectStatusModal = (state: RootState) =>
	state.students.stateEditComponent.isShowEditModal;

export const { setStatusEditModel, setIsNew, setStudent, setStudentValue } = studentSlice.actions;
export default studentSlice.reducer;
