import {
	Button,
	Divider,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box
} from '@mui/material'
import { ToastContainer } from 'react-toastify';

type TConfirm = {
	isOpen:boolean,
	title:string,
	text:string,	
	handleDelete: any,
	toggle: any,
}
const ConfirmDialog = (props: TConfirm) => {
	return (
		<>
			<Box sx={{ width: 1000 }}>
				<Dialog open={props.isOpen}>
					<DialogTitle><b>{props.title}</b></DialogTitle>
					<Divider />
					<DialogContent sx={{ width: 400 }}>
						<DialogContentText>
							{props.text}
						</DialogContentText>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ m: 1 }}>
						<Button onClick={props.handleDelete} variant="contained">DELETE</Button>
						<Button onClick={props.toggle} variant="outlined">CANCEL</Button>
					</DialogActions>
				</Dialog>
			</Box>
			<ToastContainer />
		</>
	);
};

export default ConfirmDialog;