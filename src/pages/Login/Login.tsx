import React, { FC, useState } from 'react';
import { IUserDataLogin } from '../../interfaces/Login/ILogin';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/UserService/UserService';
import { APP_ROUTER, LOCAL_STORAGE } from '../../constants/constant';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const initUserData: IUserDataLogin = {
    userName: '',
    password: '',
};

enum TYPE_FIELD {
    USER_NAME = 'userName',
    PASSWORD = 'password',
}
const theme = createTheme();

export interface ILoginProps {}

const Login: FC<ILoginProps> = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<IUserDataLogin>(initUserData);

    const handleChange = (field: TYPE_FIELD, value: any) => {
        const _userData = _.cloneDeep(userData);
        _userData[field] = value;
        setUserData(_userData);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await userService.login(userData);
            const { access_token, refresh_token, token_type } = res.data;

            localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, access_token);
            localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refresh_token);
            localStorage.setItem(LOCAL_STORAGE.TOKEN_TYPE, token_type);
            navigate(APP_ROUTER.INVOICE.INDEX);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e: any) => handleChange(TYPE_FIELD.USER_NAME, e?.target?.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e: any) => handleChange(TYPE_FIELD.PASSWORD, e?.target?.value)}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Login;
