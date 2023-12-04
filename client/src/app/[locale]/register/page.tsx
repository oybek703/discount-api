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
import { IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { IRegisterAuth } from '@/interfaces/auth.interfaces'
import ErrorHelperText from '@/components/helpers/AuthErrorHelper'

const Page = () => {
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterAuth>()

  const onSubmit: SubmitHandler<IRegisterAuth> = async data => {
    console.log('Register data: ', data)
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
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {t(LocalizationKeys.sendBtn)}
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
