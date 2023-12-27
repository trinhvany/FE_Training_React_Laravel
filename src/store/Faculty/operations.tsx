import { createAsyncThunk } from '@reduxjs/toolkit';
import { execute, Request } from '../../util/request';

const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

// Fetch list students
const fechthStudents = createAsyncThunk('data-student', async () => {
  const request: Request = { endpoint: `${BASE_URL_API}students`, method: 'GET' };
  return await execute(request, 'Failed to get student');
});

// get student by id
const getStudentById = createAsyncThunk('student/getStudent', async (arg: { id: number }) => {
  const request: Request = { endpoint: `${BASE_URL_API}getStudentByID`, method: 'GET' };
  // const request: Request = { endpoint: `${BASE_URL_API}getStudentByID/${arg.id}`, method: 'GET' };
  return await execute(request, 'Failed to get student');
});

const addStudent = createAsyncThunk('student/addStudent', async (student: any) => {
  const request: Request = { endpoint: `${BASE_URL_API}student`, method: 'POST' };
  return await execute(request, 'Failed to get student', student);
});

const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (arg: { id: number; payload: any }) => {
    const request: Request = { endpoint: `${BASE_URL_API}student/${arg.id}`, method: 'PUT' };
    return await execute(request, 'Failed to update student', arg.payload);
  }
);

const deleteStudentById = createAsyncThunk('delete-student', async (arg: { id: number }) => {
  const request: Request = { endpoint: `${BASE_URL_API}student/${arg.id}`, method: 'DELETE' };
  return await execute(request, 'Failed to delete student');
});

export { fechthStudents, getStudentById, addStudent, updateStudent, deleteStudentById };
