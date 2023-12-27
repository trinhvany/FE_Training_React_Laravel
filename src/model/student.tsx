export const studentType = {
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
}

export interface IStudent {
	[key: number | string]: string | number,
	student_id:string,
	name:string,
	email:string,
	birthday:string,
	password:string,
	phone:string,
	gender:number,
	address:string,
	faculty_id: number,
	major_id:number,
}

export const errorStudent = {
	student_id: [''],
	address: [''],
	birthday: [''],
	email: [''],
	name: [''],
	password: [''],
	gender: [''],
	phone: [''],
	faculty_id: [''],
	major_id: [''],
}
