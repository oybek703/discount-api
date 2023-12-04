'use client'
import React, { FC, useContext } from 'react'
import Alert from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import { AppContext } from '@/components/context/AppContext'

const MessageSnackbar: FC = () => {
  const { snackbar, setSnackbar } = useContext(AppContext)
  if (!snackbar?.message) return null
  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar && setSnackbar({ open: false, message: '' })}
    >
      <Alert severity={snackbar.severity}>{snackbar.message} </Alert>
    </Snackbar>
  )
}

export default MessageSnackbar
