import { useEffect, useState } from 'react';
import {
	MenuItem,
	TextField,
	Select,
	FormControl,
	InputLabel,
	Box,
	Modal,
	Button,
	Divider,
	Stack,
	OutlinedInput,
	InputAdornment 
} from '@mui/material';
import '../../index';
import styled from 'styled-components';
import { ToastSuccess, ToastError } from '../../utils';
import { studentType, IStudent, errorStudent } from '../../model/student'
import userService from '../../services/userService';


interface TProps {
	isNew: boolean,
	isOpen: boolean,
	studentId: number,
	toggle: any,
	change: any,
}

const StyledTextField = styled(TextField)`
	margin-top:15px;
	width: 450px;
`;

const StyledSelect = styled(Select)`
	margin-top:15px;
	width: 450px;
`;

const StyledInputLabel = styled(InputLabel)`
	margin-top:12px;
`;


export default function Create(props: TProps) {
	const [facultyList, setFacultyList] = useState([]);
	const [facultyId, setFacultyId] = useState(0);
	const [majorList, setMajorList] = useState([]);
	const [student, setStudent] = useState<IStudent>(studentType)
	const [errorList, setErrorList] = useState(errorStudent);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		if (e.target.name === 'faculty_id') {
			handleChangeFaculty(e);
		}
		setStudent({ ...student, [name]: value });
		
	}

	useEffect(() => {
		handleChangeFaculty(null);
	}, [facultyId]);

	useEffect(() => {
		getDatFaculty();
	}, []);

	useEffect(() => {
		setFacultyId(0);
		if (props.isNew) setStudent(studentType);
		else getDataStudent();
	}, [props.studentId]);

	const getDatFaculty = () => {
		userService.get({ path: 'data-faculty' })
			.then(res => {
				setFacultyList(res.data.data);
			})
	}

	const getDataStudent = () => {
		if (props.studentId > 0) {
			userService.get({ path: 'data-student/' + props.studentId })
				.then(res => {
					setStudent(res.data.data);
					setFacultyId(res.data.data.faculty_id);
				})
		} else {
			setStudent(studentType);
		}
	}

	const handleChangeFaculty = (e: any | null) => {
		if (e !== null) setFacultyId(e.target.value);
		if (facultyId === 0) return setMajorList([]);
		userService.get({ path: 'data-major-by-faculty', id: facultyId })
			.then(res => {
				setMajorList(res.data.data);
			})
	}

	const handelCreateStudent = () => {
		userService.post({ path: 'create-student', data: student })
			.then(() => {
				ToastSuccess('Create new student successful');
				props.toggle();
				props.change();
			})
			.catch((res) => {
				if (facultyId === 0) {
					res.response.data.errors['faculty_id'] = ['Faculty invalid'];
				}
				setErrorList(res.response.data.errors);
			});
	}

	const hanldeUpdateStudent = () => {
		userService.put({ path: 'update-student', data: student })
			.then(res => {
				if (res.data.status) {
					ToastSuccess('Update success');
					props.toggle();
					props.change();
				}
				else {
					ToastError('Update failed');
				}
			})
			.catch((res) => {
				if (facultyId === 0) {
					res.response.data.errors['faculty_id'] = ['Faculty invalid'];
				}
				setErrorList(res.response.data.errors);
			});
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (props.isNew) {
			handelCreateStudent();
		}
		else {
			hanldeUpdateStudent();
		}
	};

	return (
		<div>
			<Modal open={props.isOpen}>
				<Box className='modal'>
					<h2 id='parent-modal-title'>{(props.isNew) ? 'Create New Student' : 'Edit Student'}</h2>
					<Divider />
					<form onSubmit={(e) => handleSubmit(e)}>
						<StyledTextField  value={student.student_id} name='student_id' onChange={handleChange} size='small' label='Student Id' placeholder='Auto gerate' />
						{errorList.student_id && <p> {errorList['student_id'][0]}</p>}

						<StyledTextField required value={student.email} size='small' onChange={handleChange} name='email' label='Student Email' placeholder='aaaaa@gmail.com' />
						{errorList.email && <p> {errorList['email'][0]}</p>}

						{props.isNew &&
							<StyledTextField required value={student.password} size='small' onChange={handleChange} name='password' label='Password' placeholder='********' />
						}
						{errorList.password && <p> {errorList['password'][0]}</p>}

						<StyledTextField required value={student.name} size='small' onChange={handleChange} name='name' label='Name' placeholder='Nguyen Van A' />
						{errorList.name && <p> {errorList['name'][0]}</p>}

						<FormControl>
							<StyledInputLabel>Gender</StyledInputLabel>
							<StyledSelect required value={student.gender} size='small' onChange={handleChange} name='gender' label='Gender'>
								<MenuItem value={0}>Male</MenuItem>
								<MenuItem value={1}>Female</MenuItem>
							</StyledSelect>
						</FormControl>
						{errorList.gender && <p> {errorList['gender'][0]}</p>}

						<StyledTextField required value={student.birthday} type='date' size='small' onChange={handleChange} name='birthday' />
						{errorList.birthday && <p> {errorList['birthday'][0]}</p>}

						<StyledTextField required value={student.address} size='small' onChange={handleChange} name='address' label='Address' />
						{errorList.address && <p> {errorList['address'][0]}</p>}

						<StyledTextField required value={student.phone} size='small' onChange={handleChange} type='tel' name='phone' label='Phone Number' />
						{errorList.phone && <p> {errorList['phone'][0]}</p>}

						<FormControl fullWidth>
							<StyledInputLabel>Faculty</StyledInputLabel>
							<StyledSelect required value={student.faculty_id} size='small' onChange={handleChange} name='faculty_id' label='Faculty'>
								{facultyList.map((item: any) => {
									return (<MenuItem value={item.id}>{item.name}</MenuItem>)
								})}
							</StyledSelect>
						</FormControl>
						{errorList.faculty_id && <p> {errorList['faculty_id'][0]}</p>}

						<FormControl fullWidth>
							<StyledInputLabel>Major</StyledInputLabel>
							<StyledSelect required value={student.major_id} size='small' onChange={handleChange} name='major_id' label='Major'>
								{majorList && majorList.map((item: any) => {
									return (<MenuItem value={item.id}> {item.name} </MenuItem>)
								})}
							</StyledSelect>
						</FormControl>
						{errorList.major_id && <p> {errorList['major_id'][0]}</p>}

						<Stack sx={{ mt: 3, ml: 27 }} spacing={2} direction='row'>
							<Button type='submit' variant='contained'>{(props.isNew) ? 'CREATE' : 'UPDATE'}</Button>
							<Button onClick={props.toggle} variant='outlined'>Cancel</Button>
						</Stack>
					</form>
				</Box>
			</Modal>
		</div>
	);
}