import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// alert
import Alert from '@mui/material/Alert';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFCheckbox } from '../../../components/hook-form';
import AuthUser from './AuthUser';
import DashboardLayout from '../../../layouts/dashboard';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { http,setToken } = AuthUser();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(false);
  
  

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleLogin = () => {
    http.post('/login', {
      email,
      password
    }).then((res) => {
      // console.log(res.data);
      setToken(res.data.user, res.data.access_token);
      // console.log("Data Login", res.data.user);
    })
    .catch((err) => {
      setLogin(true);
      console.log(err);
    });
  };


  const onSubmit = async () => {
    console.log("email",email);
    console.log("password",password);
  };

  const { getToken } = AuthUser();
  console.log("token",getToken());
  if (getToken()) {
    window.location.href = '/dashboard/app';
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {
        login ? (
          <Alert sx={{ mb:3 }} severity="error">Email atau Password Salah</Alert>
        ) : (
          <></>
        )
      }
      <Stack spacing={3}>
        {/* buat form login */}
        <TextField
          fullWidth
          autoComplete="email"
          type="email"
          label="Email address"
          {...methods.register('email')}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          {...methods.register('password')}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                  <Iconify icon={showPassword ? 'bx:bxs-show' : 'bx:bxs-hide'} width={20} height={20} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth type="submit" variant="contained" loading={isSubmitting} onClick={handleLogin}>
        <Typography variant="h4" noWrap>
          LOGIN
        </Typography>
      </LoadingButton>
    </FormProvider>
  );
}
