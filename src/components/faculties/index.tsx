import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogConfirm from '../../common/dialogCofirm';
import Button from '@mui/material/Button';
import Create from './create';
import userService from '../../services/userService';
import { ToastError, ToastSuccess } from '../../utils';


const Home = () => {
	const [studentList, setStudentList] = useState([]);
	const [majorList, setMajorList] = useState([]);
	const [isOpen, setisOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [studentId, setStudentId] = useState(0);
	const [isNew, setIsNew] = useState(false);
	const [changeStudent, setChangeStudent] = useState(false);
	const [rowSelection, setRowSelection] = useState([]);

	const toggle = (params: number) => {
		setisOpen(!isOpen);
		setStudentId(params);
	}

	const toggleCreate = (params: number, type: boolean) => {
		setStudentId(params);
		setIsOpenCreate(!isOpenCreate);
		if (!type) setIsNew(false);
		else setIsNew(true);
	}

	const handleChangeListStudent = () => {
		setChangeStudent(!changeStudent);
	}

	useEffect(() => {
		getListMajor();
	}, []);

	useEffect(() => {
		getListStudent();
	}, [changeStudent]);

	const getListStudent = () => {
		userService.get({ path: 'data-student' })
			.then(res => {
				setStudentList(res.data.data);
			})
	}

	const getListMajor = () => {
		userService.get({ path: 'data-major' })
			.then(res => {
				setMajorList(res.data.data);
			})
	}

	const handelDeleteAll = () => {
		if (rowSelection.length > 1) {
			userService.post({ path: 'delete-all-student', data: { list: rowSelection } })
				.then((res) => {
					if (res.data.status) {
						ToastSuccess('Delete student successful');
						handleChangeListStudent();
					}
				})
		} else {
			ToastError('Please select more than 1 student');
		}
	}

	const handledeleteStudent = () => {
		userService.post({path:'delete-student',data:{student_id:studentId}})
			.then(res => {
				if (res.data.status) {
					ToastSuccess('Delete student successful');
					setisOpen(!isOpen);
					handleChangeListStudent();
				}
				else {
					ToastError('Delete student failed');
					setisOpen(!isOpen);
				}
			})
			.catch(error => console.log(error));
	}
	const columns: GridColDef[] = [
		{ field: 'student_id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Name', width: 450 },
    { field: '111', headerName: 'Total of major', width: 250 },
    { field: '222', headerName: 'Total of student', width: 250 },
		{
			field: 'edit', headerName: 'Edit', type: 'actions', width: 110,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem icon={<EditIcon style={{ color: "#1976D2" }} />} onClick={() => toggleCreate(params.row.id, false)} label="Edit" />,
			]
		},
		{
			field: 'delete', headerName: 'Delete', type: 'actions', width: 110,
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem icon={<DeleteIcon style={{ color: "#1976D2" }} />} onClick={() => toggle(params.row.id)} label="Delete" />,
			]
		},
	];
	return (
		<div style={{ height: 630, width: '100%' }}>
			<Button onClick={() => toggleCreate(0, true)} sx={{ m: 2 }} variant="contained">Create</Button>
			<Button onClick={handelDeleteAll} sx={{ m: 2 }} variant="contained">DELETE SELECTED ROWS</Button>
			{isOpenCreate && <Create isOpen={isOpenCreate} isNew={isNew} change={handleChangeListStudent} studentId={studentId} toggle={toggleCreate}></Create>}
			<DataGrid sx={{ m: 2}}
				rows={studentList}
				columns={columns}
				checkboxSelection
				getRowId={(row) => row.id}
				onRowSelectionModelChange={(ids: any) => setRowSelection(ids)}
			/>
			<DialogConfirm
				toggle={toggle}
				isOpen={isOpen}
				handleDelete={handledeleteStudent}
				title={'Delete student'}
				text={'Do you want to delete this student?'}
			></DialogConfirm>
		</div>
	)
}
export default Home;