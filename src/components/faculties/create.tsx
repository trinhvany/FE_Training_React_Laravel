import { useEffect, useState } from 'react';
import {
	TextField,
	Select,
	InputLabel,
	Box,
	Modal,
	Button,
	Divider,
	Stack,
} from '@mui/material';
import '../../index';
import styled from 'styled-components';
import { ToastSuccess, ToastError } from '../../utils';
import { studentType, IStudent, errorStudent } from '../../models/student'
import { facultyType, IFaculty, errorFaculty } from '../../models/faculty'
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
	const [faculty, setFaculty] = useState<IFaculty>(facultyType)
	const [errorList, setErrorList] = useState(errorFaculty);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
    console.log(value);
    
		setFaculty({ ...faculty, [name]: value });
	}

	// useEffect(() => {
	// 	setFacultyId(0);
	// 	if (props.isNew) setStudent(studentType);
	// 	else getDataStudent();
	// }, [props.studentId]);

	// const getDataStudent = () => {
	// 	if (props.studentId > 0) {
	// 		userService.get({ path: 'data-student/' + props.studentId })
	// 			.then(res => {
	// 				setFacultyId(res.data.data);
	// 				setFacultyId(res.data.data.faculty_id);
	// 			})
	// 	} else {
	// 		setFacultyId(studentType);
	// 	}
	// }

	// const handelCreateStudent = () => {
	// 	userService.post({ path: 'create-student', data: student })
	// 		.then(() => {
	// 			ToastSuccess('Create new student successful');
	// 			props.toggle();
	// 			props.change();
	// 		})
	// 		.catch((res) => {
	// 			if (facultyId === 0) {
	// 				res.response.data.errors['faculty_id'] = ['Faculty invalid'];
	// 			}
	// 			setErrorList(res.response.data.errors);
	// 		});
	// }

	// const hanldeUpdateStudent = () => {
	// 	userService.put({ path: 'update-student', data: student })
	// 		.then(res => {
	// 			if (res.data.status) {
	// 				ToastSuccess('Update success');
	// 				props.toggle();
	// 				props.change();
	// 			}
	// 			else {
	// 				ToastError('Update failed');
	// 			}
	// 		})
	// 		.catch((res) => {
	// 			setErrorList(res.response.data.errors);
	// 		});
	// }

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (props.isNew) {
			// handelCreateStudent();
		}
		else {
			// hanldeUpdateStudent();
		}
	};

	return (
		<div>
			<Modal open={props.isOpen}>
				<Box sx={{height:270}} className='modal'>
					<h2 id='parent-modal-title'>{(props.isNew) ? 'Create New Faculty' : 'Edit Faculty'}</h2>
					<Divider />
					<form onSubmit={(e) => handleSubmit(e)}>
						<StyledTextField  value={faculty.faculty_id} name='faculty_id' onChange={handleChange} size='small' label='Faculty Id' placeholder='Auto gerate' />
						{errorList.faculty_id && <p> {errorList['faculty_id'][0]}</p>}

						<StyledTextField required value={faculty.name} size='small' onChange={handleChange} name='name' label='Name' placeholder='Nguyen Van A' />
						{errorList.name && <p> {errorList['name'][0]}</p>}

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