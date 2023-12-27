export const facultyType = {
	id: '',
	name: '',
}

export interface IFaculty {
	[key: number | string]: string | number,
	id: string,
	name: string,
}

export const errorFaculty = {
	id: [''],
	name: [''],
}
