import { studentType, IStudent, errorStudent } from '../models/student'
export const validateStudent = (student:IStudent) => {
  var errors = errorStudent;
  if(student.name === '') {
    errors.name = ['Name cannot be blank'];
  }
}