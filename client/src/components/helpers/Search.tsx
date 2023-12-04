import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import { useTranslations } from 'next-intl'
import { LocalizationKeys } from '@/common/constants'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: 'black',
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1)
  },
  marginLeft: 0,
  width: '100%',
  maxHeight: '40px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.5, 0.5, 0.5, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.85em'
  }
}))

const SearchComponent = () => {
  const t = useTranslations()
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon fontSize="small" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t(LocalizationKeys.searchPlaceholder)}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  )
}

export default SearchComponent
