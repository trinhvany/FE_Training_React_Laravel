export const majorType = {
	id: '',
	name: '',
	faculty_id: 0,
}

export interface IMajor {
	[key: number | string]: string | number,
	id: string,
	name: string,
	faculty_id: number,
}

export const errorMajor = {
	id: [''],
	name: [''],
	faculty_id: [''],
}
