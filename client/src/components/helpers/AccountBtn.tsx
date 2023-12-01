import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Fragment } from 'react'
import { useTranslations } from 'next-intl'
import { LocalizationKeys } from '@/common/constants'

export default function AccountBtn() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const t = useTranslations()
  return (
    <Fragment>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={open ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
        sx={{
          textTransform: 'none',
          border: '1px solid #fff',
          borderRadius: '5px',
          color: 'white',
          padding: '2px 10px',
          '&:hover': {
            border: '1px solid #fff'
          }
        }}
      >
        {t(LocalizationKeys.userAccountBtn)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={handleClose}>{t(LocalizationKeys.profileBtn)}</MenuItem>
        <MenuItem onClick={handleClose}>{t(LocalizationKeys.logoutBtn)}</MenuItem>
      </Menu>
    </Fragment>
  )
}
