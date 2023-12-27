import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../../services/userService';
import { ToastError, ToastSuccess } from '../../utils';
import PropTypes from 'prop-types';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const TInfoLogin = {
	email: '',
	password: '',
}

export default function Login() {
	const [infoLogin, setInfoLogin] = useState(TInfoLogin);
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setInfoLogin({...infoLogin, [name]: value});
	}

	const handleSubmit = (e:any) => {
		e.preventDefault();
		userService.post({ path: 'login', data: infoLogin })
		.then((response: any) => {
			if (response.data.status) {
				ToastSuccess('Login successful');
				setTimeout(() => {
					window.location.replace('http://localhost:3000');
				}, 2000);
				localStorage.setItem('token', response.data.access_token);
				localStorage.setItem('token_expires_in', response.data.token_expires_in);
				localStorage.setItem('refresh_token', response.data.refresh_token);
			} else {
				ToastError('Login failed');
			}
		})
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<Box sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
						<Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								onChange={handleChange}
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								>
								Sign In
							</Button>
							<Divider sx={{ mt: 2, mb: 2 }}></Divider>
							<Typography sx={{ fontWeight: 'bold'}} component="h3" align='center'>
								D1 Laravel & React Project
							</Typography>
						</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
