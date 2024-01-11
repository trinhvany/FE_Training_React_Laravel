import * as React from 'react';
import AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import IconButton  from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../../services/userService';
import {ToastSuccess } from '../../utils';

const create = () => {
	const handelLogout = () => {
		userService.post({ path: 'logout' })
			.then((res) => {
				if (res.data.status) {
					ToastSuccess(res.data.message);
					setTimeout(function(){
						window.location.replace('http://localhost:3000/login');
					}, 1000)
					localStorage.removeItem("token");
					localStorage.removeItem("refresh_token");
					localStorage.removeItem("token_expires_in");
				}
			})
		}

	var logoutButton;
	if (localStorage.getItem("token") !== null) {
		logoutButton = <IconButton color="inherit" sx={{ ml: 'auto' }}>
							<LogoutIcon onClick={handelLogout}/>
						</IconButton>
	}

	return (
		<AppBar sx={{ height: 60 }} position="static" >
			<Toolbar variant="dense">
				<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
				<PopupState variant="popover" popupId="demo-popup-menu">
					{(popupState:any) => (
					<React.Fragment>
						<MenuIcon {...bindTrigger(popupState)} />
						<Menu {...bindMenu(popupState)}>
							<MenuItem onClick={popupState.close}>
								<Button href='/'>Student</Button>
							</MenuItem>
							<MenuItem onClick={popupState.close}>
								<Button href='/faculty'>Faculty</Button>
							</MenuItem>
							<MenuItem onClick={popupState.close}>
								<Button href='/major'>Major</Button>
							</MenuItem>
						</Menu>
					</React.Fragment>
					)}
				</PopupState>
				
				</IconButton>
				<Typography variant="h6" color="inherit" component="div">
					List
				</Typography> 
				{logoutButton}
			</Toolbar>
		</AppBar>
	)
}

export default create
