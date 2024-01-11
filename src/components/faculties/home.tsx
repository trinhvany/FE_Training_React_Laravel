import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogConfirm from '../../common/Dialog/dialogCofirm';
import Button from '@mui/material/Button';
import Create from './create';
import userService from '../../services/userService';
import { ToastError, ToastSuccess } from '../../utils';
import Footer from '../../common/Main/footer';
import api from '../../auth/api';

const Home = () => {
	const [facultyList, setFacultyList] = useState([]);
	const [isOpen, setisOpen] = useState(false);
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [facultyId, setfacultyId] = useState(0);
	const [isNew, setIsNew] = useState(false);
	const [changeFaculty, setChangeFaculty] = useState(false);
	const [rowSelection, setRowSelection] = useState([]);

	const toggle = (params: number) => {
		setisOpen(!isOpen);
		setfacultyId(params);
	}

	const toggleCreate = (params: number, type: boolean) => {
		setfacultyId(params);
		setIsOpenCreate(!isOpenCreate);
		if (!type) setIsNew(false);
		else setIsNew(true);
	}

	const handleChangeListFaculty = () => {
		setChangeFaculty(!changeFaculty);
	}

	useEffect(() => {
		getListFaculty();
	}, [changeFaculty]);

	const getListFaculty = async () => {
		try {
			const response = await api.get('/data-faculty');
			setFacultyList(response.data.data);
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
			userService.post({ path: 'delete-mutiple', data: { list: rowSelection } })
				.then((res) => {
					if (res.data.status) {
						ToastSuccess('Delete faculty successful');
						handleChangeListFaculty();
					}
				})
		} else {
			ToastError('Please select more than 1 faculty');
		}
	}

	const handledeleteFaculty = () => {
		userService.post({path:'delete-faculty',data:{faculty_id:facultyId}})
			.then(res => {
				if (res.data.status) {
					ToastSuccess('Delete faculty successful');
					setisOpen(!isOpen);
					handleChangeListFaculty();
				}
				else {
					ToastError('Delete faculty failed');
					setisOpen(!isOpen);
				}
			})
	}
	
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'name', headerName: 'Name', width: 800 },
		{ field: 'total_major', headerName: 'Total of Major', width: 300 },
		{
			field: 'total_student', headerName: 'Total of Student', width: 300,
		},
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
			{isOpenCreate && <Create isOpen={isOpenCreate} isNew={isNew} change={handleChangeListFaculty} facultyId={facultyId} toggle={toggleCreate}></Create>}
			<DataGrid sx={{ m: 2}}
				rows={facultyList}
				columns={columns}
				checkboxSelection
				getRowId={(row) => row.id}
				onRowSelectionModelChange={(ids: any) => setRowSelection(ids)}
			/>
			<Footer/>
			<DialogConfirm
				toggle={toggle}
				isOpen={isOpen}
				handleDelete={handledeleteFaculty}
				title={'Delete faculty'}
				text={'Do you want to delete this faculty?'}
			></DialogConfirm>
		</div>
	)
}
export default Home;