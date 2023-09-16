export const studentType = {
	student_id: '',
	name: '',
	email: '',
	birthday: '',
	password: '',
	phone: '',
	gender: 0,
	address: '',
	major_id: 0,
}

export interface IStudent {
	student_id:string,
	name:string,
	email:string,
	birthday:string,
	password:string,
	phone:string,
	gender:number,
	address:string,
	major_id:number,
}

export const errorStudent = {
	address: [''],
	birthday: [''],
	email: [''],
	name: [''],
	password: [''],
	gender: [''],
	phone: [''],
	student_id: [''],
	major_id: [''],
	faculty_id: [''],
}
