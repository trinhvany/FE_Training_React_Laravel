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
} from '@mui/material';
import '../../index';
import styled from 'styled-components';
import { ToastSuccess, ToastError } from '../../utils';
import { majorType, IMajor, errorMajor } from '../../model/major'
import userService from '../../services/userService';


interface TProps {
	isNew: boolean,
	isOpen: boolean,
	majorId: number,
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
	const [major, setMajor] = useState<IMajor>(majorType)
	const [errorList, setErrorList] = useState(errorMajor);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setMajor({ ...major, [name]: value });
	}

	useEffect(() => {
		getDatFaculty();
	}, []);

	useEffect(() => {
		setFacultyId(0);
		if (props.isNew) setMajor(majorType);
		else getDataMajor();
	}, [props.majorId]);

	const getDatFaculty = () => {
		userService.get({ path: 'data-faculty' })
			.then(res => {
				setFacultyList(res.data.data);
			})
	}

	const getDataMajor = () => {
		if (props.majorId > 0) {
			userService.get({ path: 'data-major/' + props.majorId })
			.then(res => {
				setMajor(res.data.data);
			})
		} else {
			setMajor(majorType);
		}
	}

	const handelCreateMajor = () => {
		userService.post({ path: 'create-major', data: major })
			.then(() => {
				ToastSuccess('Create new student successful');
				props.toggle();
				props.change();
			})
			.catch((res) => {
				setErrorList(res.response.data.errors);
			});
	}

	const hanldeUpdateStudent = () => {
		userService.put({ path: 'update-major', data: major })
			.then(res => {
				if (res.data.status) {
					ToastSuccess('Update success');
					props.toggle();
					props.change();
				} else {
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
			handelCreateMajor();
		} else {
			hanldeUpdateStudent();
		}
	};

	return (
		<div>
			<Modal open={props.isOpen}>
				<Box className='modal-major'>
					<h2 id='parent-modal-title'>{(props.isNew) ? 'Create New Major' : 'Edit Major'}</h2>
					<Divider />
					<form onSubmit={(e) => handleSubmit(e)}>
						<StyledTextField disabled value={major.id} name='student_id' onChange={handleChange} size='small' label='Major Id' placeholder='Auto gerate' />
						{errorList.id && <p> {errorList['id'][0]}</p>}

						<StyledTextField required value={major.name} size='small' onChange={handleChange} name='name' label='Name' placeholder='Software Engineering' />
						{errorList.name && <p> {errorList['name'][0]}</p>}


						<FormControl fullWidth>
							<StyledInputLabel>Faculty</StyledInputLabel>
							<StyledSelect required value={major.faculty_id} onChange={handleChange} size='small' name='faculty_id' label='Faculty'>
								<MenuItem value='0'></MenuItem>
								{facultyList && facultyList.map((item: any) => {
									return (<MenuItem value={item.id}>{item.name}</MenuItem>)
								})}
							</StyledSelect>
						</FormControl>
						{errorList.faculty_id && <p> {errorList['faculty_id'][0]}</p>}

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