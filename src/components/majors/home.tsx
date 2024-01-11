import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogConfirm from '../../common/Dialog/dialogCofirm';
import Button from '@mui/material/Button';
import Create from '../majors/create';
import userService from '../../services/userService';
import { ToastError, ToastSuccess } from '../../utils';
import Footer from '../../common/Main/footer';
import api from '../../auth/api';

const Home = () => {
	const [majorList, setMajorList] = useState([]);
	const [facultyList, setFacultyList] = useState([]);
	const [isOpen, setisOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [majorId, setMajorId] = useState(0);
	const [isNew, setIsNew] = useState(false);
	const [changeMajor, setChangeMajor] = useState(false);
	const [rowSelection, setRowSelection] = useState([]);

	const toggle = (params: number) => {
		setisOpen(!isOpen);
		setMajorId(params);
	}

	const toggleCreate = (params: number, type: boolean) => {
		setMajorId(params);
		setIsOpenCreate(!isOpenCreate);
		if (!type) setIsNew(false);
		else setIsNew(true);
	}

	const handleChangeListMajor = () => {
		setChangeMajor(!changeMajor);
	}

	useEffect(() => {
		getFacultyList();
	}, []);

	useEffect(() => {
		getListMajor();
	}, [changeMajor]);

	const getFacultyList = async() => {
		try {
			const response = await api.get('/data-faculty');
			setMajorList(response.data.data);
		} catch (error) {
			setTimeout(() => {
				window.location.replace('http://localhost:3000/login');
				localStorage.removeItem("token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("token_expires_in");
			}, 1000);
		}
	}

	const getListMajor = async () => {
		try {
			const response = await api.get('/data-major');
			setMajorList(response.data.data);
		} catch (error) {
			setTimeout(() => {
				window.location.replace('http://localhost:3000/login');
				localStorage.removeItem("token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("token_expires_in");
			}, 1000);
		}
	}

	const handelDeleteAll = () => {
		if (rowSelection.length > 1) {
			userService.post({ path: 'delete-all-student', data: { list: rowSelection } })
				.then((res) => {
					if (res.data.status) {
						ToastSuccess('Delete student successful');
						handleChangeListMajor();
					}
				})
		} else {
			ToastError('Please select more than 1 major');
		}
	}	

	const handleDeleteMajor = () => {
		userService.post({path:'delete-major',data:{major_id:majorId}})
			.then(res => {
				if (res.data.status) {
					ToastSuccess('Delete student successful');
					setisOpen(!isOpen);
					handleChangeListMajor();
				}
				else {
					ToastError('Delete student failed');
					setisOpen(!isOpen);
				}
			})
	}
	
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 230 },
		{ field: 'name', headerName: 'Major name', width: 450 },
		{
			field: 'faculty', headerName: 'Belong to', width: 450,
			valueGetter: (params: GridValueGetterParams) => (facultyList.length > 0) ? facultyList[params.row.faculty_id - 1]['name'] : ''
		},
		{ field: 'total_student', headerName: 'Total of Students', width: 400},
		{
			field: 'edit', headerName: 'Edit', type: 'actions', width: 150,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem icon={<EditIcon style={{ color: "#1976D2" }} />} onClick={() => toggleCreate(params.row.id, false)} label="Edit" />,
			]
		},
		{
			field: 'delete', headerName: 'Delete', type: 'actions', width: 150,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem icon={<DeleteIcon style={{ color: "#1976D2" }} />} onClick={() => toggle(params.row.id)} label="Delete" />,
			]
		},
	];
	return (
		<div style={{ height: 630, width: '100%' }}>
			<Button onClick={() => toggleCreate(0, true)} sx={{ m: 2 }} variant="contained">Create</Button>
			<Button onClick={handelDeleteAll} sx={{ m: 2 }} variant="contained">DELETE SELECTED ROWS</Button>
			{isOpenCreate && <Create isOpen={isOpenCreate} isNew={isNew} change={handleChangeListMajor} majorId={majorId} toggle={toggleCreate}></Create>}
			<DataGrid sx={{ m: 2}}
				rows={majorList}
				columns={columns}
				checkboxSelection
				getRowId={(row) => row.id}
				onRowSelectionModelChange={(ids: any) => setRowSelection(ids)}
			/>
			<Footer/>
			<DialogConfirm
				toggle={toggle}
				isOpen={isOpen}
				handleDelete={handleDeleteMajor}
				title={'Delete student'}
				text={'Do you want to delete this major?'}
			></DialogConfirm>
		</div>
	)
}
export default Home;