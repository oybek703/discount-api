'use client'
import React, { useState } from 'react'
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
import { ILoginAuth } from '@/interfaces/auth.interfaces'
import ErrorHelperText from '@/components/helpers/AuthErrorHelper'
import { IconButton, InputAdornment } from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const Page = () => {
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginAuth>()

  const onSubmit: SubmitHandler<ILoginAuth> = async data => {
    console.log('Login data: ', data)
  }
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t(LocalizationKeys.login)}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            error={Boolean(errors.username)}
            margin="normal"
            required
            fullWidth
            id="username"
            label={t(LocalizationKeys.username)}
            autoComplete="username"
            autoFocus
            {...register('username', { minLength: 3, required: true })}
          />
          {errors.username && <ErrorHelperText />}
          <TextField
            error={Boolean(errors.password)}
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            required
            fullWidth
            label={t(LocalizationKeys.password)}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
                </InputAdornment>
              )
            }}
            {...register('password', { minLength: 6, required: true })}
          />
          {errors.password && <ErrorHelperText minLength={6} />}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t(LocalizationKeys.sendBtn)}
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography component={Link} href={AppRoutePaths.register} variant="body2">
                {`${t(LocalizationKeys.doNotHaveAccount)} ${t(LocalizationKeys.register)}`}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Page
