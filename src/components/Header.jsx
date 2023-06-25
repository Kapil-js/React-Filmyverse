import React, { useContext } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import { Appstate } from '../App'

function Header () {
  const useAppstate = useContext(Appstate)

  return (
    <>
      <div className='sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2  header'>
        <Link to={'/'}>
          <span className='logo'>
            Filmy<span className='text-white'>Verse</span>
          </span>
        </Link>
        {useAppstate.login ? (
          <Link to={'/addmovie'}>
            <h1 className='text-lg cursor-pointer flex items-center'>
              <Button className='add_btn'>
                <AddIcon className='mr-1' color='secondary' />{' '}
                <span className='text-black font-semibold'>Add New</span>
              </Button>
            </h1>
          </Link>
        ) : (
          <Link to={'/login'}>
            <h1
              className=' bg-white cursor-pointer flex items-center'
              style={{ borderRadius: '5px' }}
            >
              <Button className='login_btn'>
                <span className=' text-black  font-semibold'>Login</span>
              </Button>
            </h1>
          </Link>
        )}
      </div>
    </>
  )
}

export default Header
