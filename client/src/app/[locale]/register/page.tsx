'use client'
import React, { useContext, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AppRoutePaths, LocalizationKeys } from '@/common/constants'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Link } from '@/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IRegisterAuth } from '@/interfaces/auth.interfaces'
import ErrorHelperText from '@/components/helpers/AuthErrorHelper'
import axiosInstance from '@/common/axios-utils'
import { AppContext } from '@/components/context/AppContext'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'

const Page = () => {
  const { setSnackbar } = useContext(AppContext)
  const [registerLoading, setRegisterLoading] = useState<boolean>(false)
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterAuth>()

  const onSubmit: SubmitHandler<IRegisterAuth> = async formData => {
    try {
      setRegisterLoading(true)
      const { data } = await axiosInstance.post(`/auth/register`, formData)
      const { data: tokenData } = await axiosInstance.post(`/auth/login`, {
        username: data.username,
        password: formData.password
      })
      await signIn('credentials', {
        callbackUrl: '/',
        redirect: true,
        token: tokenData.token,
        username: data.username
      })
      setRegisterLoading(true)
      setSnackbar({ open: false })
    } catch (e: unknown) {
      if (e instanceof AxiosError)
        setSnackbar({ open: true, message: e.response?.data?.message, severity: 'error' })
      setRegisterLoading(false)
    }
  }
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t(LocalizationKeys.register)}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.firstName)}
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label={t(LocalizationKeys.firstName)}
                autoFocus
                {...register('firstName', { minLength: 3, required: true })}
              />
              {errors.firstName && <ErrorHelperText />}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.lastName)}
                required
                fullWidth
                id="lastName"
                label={t(LocalizationKeys.lastName)}
                autoComplete="family-name"
                {...register('lastName', { minLength: 3, required: true })}
              />
              {errors.lastName && <ErrorHelperText />}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.username)}
                required
                fullWidth
                id="username"
                label={t(LocalizationKeys.username)}
                autoComplete="username"
                {...register('username', { minLength: 3, required: true })}
              />
              {errors.username && <ErrorHelperText />}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(errors.password)}
                required
                fullWidth
                label={t(LocalizationKeys.password)}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </IconButton>
                  )
                }}
                {...register('password', { minLength: 6, required: true })}
              />
              {errors.password && <ErrorHelperText minLength={6} />}
            </Grid>
          </Grid>
          <Button
            disabled={registerLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: 'none', fontSize: '1.1em' }}
          >
            {t(LocalizationKeys.sendBtn)}
            {registerLoading && (
              <>
                &nbsp; <CircularProgress size={18} color="secondary" />
              </>
            )}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component={Link} href={AppRoutePaths.login} variant="body2">
                {`${t(LocalizationKeys.alreadyHaveAccount)} ${t(LocalizationKeys.login)}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
