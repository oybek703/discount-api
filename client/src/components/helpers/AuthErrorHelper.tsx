import React, { FC } from 'react'
import { useTranslations } from 'next-intl'
import { FormHelperText } from '@mui/material'
import { LocalizationKeys } from '@/common/constants'

const ErrorHelperText: FC<{ minLength?: number }> = ({ minLength = 3 }) => {
  const t = useTranslations()
  return <FormHelperText>{t(LocalizationKeys.authMinLength, { minLength })}</FormHelperText>
}

export default ErrorHelperText
