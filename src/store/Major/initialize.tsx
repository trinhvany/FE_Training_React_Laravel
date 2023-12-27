import { IStudent } from '../../model/student';
export const initStudent: IStudent = {
	student_id: '',
	name: '',
	email: '',
	birthday: '',
	password: '',
	phone: '',
	gender: 0,
	address: '',
	faculty_id: 0,
	major_id: 0,
};

const stateEditComponent = {
  student: initStudent,
  isShowEditModal: false,
  isNew: false,
};
const students: IStudent[] = [];

const initialState = {
  data: students,
  isLoading: false,
  errorMessage: null,
  stateEditComponent: stateEditComponent,
};

export default initialState;
