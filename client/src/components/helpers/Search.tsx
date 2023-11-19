import React, { useState } from 'react'
import { alpha, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment } from '@mui/material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  color: 'black',
  marginX: '10px',
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1)
  },
  width: '100%'
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
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.7, 1, 0.7, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch'
      }
    },
    [theme.breakpoints.up('lg')]: {
      width: '35ch',
      '&:focus': {
        width: '40ch'
      }
    }
  }
}))

const ClearAdornment = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: 'gray !important',
          color: 'white !important',
          width: '15px',
          height: '15px',
          marginRight: '10px'
        }}
        size="small"
      >
        &times;
      </IconButton>
    </InputAdornment>
  )
}

export default function SearchComponent() {
  const [query, setQuery] = useState<string>('')
  const clearQuery = () => setQuery('')
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={query}
          onChange={e => setQuery(e.target.value)}
          size="small"
          endAdornment={query.length ? <ClearAdornment handleClick={clearQuery} /> : undefined}
          placeholder={'Chegirmalar, mahsulot nomi...'}
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </Box>
  )
}
