import AppBar  from '@mui/material/AppBar';
import Toolbar  from '@mui/material/Toolbar';
import IconButton  from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography  from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import userService from '../services/userService';
import { ToastSuccess } from '../utils';
import Login from '../components/Account/login';

const create = () => {

	const handelLogout = () => {
		userService.post({ path: 'logout' })
			.then((res) => {
				if (res.data.status) {
					ToastSuccess('Logout  successful');
          localStorage.removeItem('token');
          localStorage.removeItem('token_expires_in');
          localStorage.removeItem('refresh_token');
          setTimeout(function() {
            window.location.pathname = '/login';
          }, 2000)
				}
			})
		} 

	return (
		<AppBar sx={{ height: 60 }} position="static" >
			<Toolbar variant="dense">
				<IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" color="inherit" component="div">
					List
				</Typography>
				<IconButton edge="end" color="inherit" sx={{ mr: 2 }}>
					<LogoutIcon onClick={handelLogout} />
				</IconButton>
			</Toolbar>
		</AppBar>
	)
}

export default create

