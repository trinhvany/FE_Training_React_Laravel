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
import userService from '../../services/userService';
import { facultyType, IFaculty, errorFaculty } from '../../model/faculty';


interface TProps {
	isNew: boolean,
	isOpen: boolean,
	facultyId: number,
	toggle: any,
	change: any,
}

const StyledTextField = styled(TextField)`
	margin-top:15px;
	width: 450px;
`;

export default function Create(props: TProps) {
	const [faculty, setFaculty] = useState<IFaculty>(facultyType)
	const [errorList, setErrorList] = useState(errorFaculty);

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFaculty({ ...faculty, [name]: value });
	}

	useEffect(() => {
		if (props.isNew) setFaculty(facultyType);
		else getDataFaculty();
	}, [props.facultyId]);

	const getDataFaculty = () => {
        userService.get({ path: 'data-faculty/' + props.facultyId })
            .then(res => {
                setFaculty(res.data.data);
            })
	}

	const handelCreateFaculty = () => {
		userService.post({ path: 'create-faculty', data: faculty })
			.then(() => {
				ToastSuccess('Create new faculty successful');
				props.toggle();
				props.change();
			})
			.catch((res) => {
				setErrorList(res.response.data.errors);
			});
	}

	const hanldeUpdateFaculty = () => {
		userService.put({ path: 'update-faculty', data: faculty })
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
				setErrorList(res.response.data.errors);
			});
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (props.isNew) {
			handelCreateFaculty();
		}
		else {
			hanldeUpdateFaculty();
		}
	};

	return (
		<div>
			<Modal open={props.isOpen}>
				<Box className='modal-major'>
					<h2 id='parent-modal-title'>{(props.isNew) ? 'Create New Faculty' : 'Edit Faculty'}</h2>
					<Divider />
					<form onSubmit={(e) => handleSubmit(e)}>
						<StyledTextField disabled value={faculty.id} name='faculty_id' onChange={handleChange} size='small' label='Faculty Id' placeholder='Auto gerate' />
						{errorList.id && <p> {errorList['id'][0]}</p>}

						<StyledTextField required value={faculty.name} size='small' onChange={handleChange} name='name' label='Name' placeholder='Software Engineering' />
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