import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Fragment, useContext } from 'react'
import { useTranslations } from 'next-intl'
import { AppRoutePaths, LocalizationKeys } from '@/common/constants'
import { Link } from '@/navigation'
import { AppContext } from '@/components/context/AppContext'
import { signOut, useSession } from 'next-auth/react'

export default function AccountBtn() {
  const session = useSession()
  const t = useTranslations()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { drawer, setDrawer } = useContext(AppContext)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => {
    setAnchorEl(null)
    if (drawer) setDrawer(false)
  }
  const handleLogout = () => signOut()
  // @ts-ignore
  const username = session.data?.user?.username
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
        {username || t(LocalizationKeys.userAccountBtn)}
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
        {session.status === 'authenticated' ? (
          <div>
            <MenuItem component={Link} href={AppRoutePaths.profile} onClick={handleClose}>
              {t(LocalizationKeys.profileBtn)}
            </MenuItem>
            <MenuItem onClick={handleLogout}>{t(LocalizationKeys.logoutBtn)}</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem component={Link} href={AppRoutePaths.login} onClick={handleClose}>
              {t(LocalizationKeys.login)}
            </MenuItem>
            <MenuItem component={Link} href={AppRoutePaths.register} onClick={handleClose}>
              {t(LocalizationKeys.register)}
            </MenuItem>
          </div>
        )}
      </Menu>
    </Fragment>
  )
}
