import { studentType, IStudent, errorStudent } from '../model/student'
export const validateStudent = (student:IStudent) => {
  var errors = errorStudent;
  if(student.name === '') {
    errors.name = ['Name cannot be blank'];
  }
}