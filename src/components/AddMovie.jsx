import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from './firebase/Firebase';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    year: '',
    description: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const addMovie = async () => {
    setLoading(true)
    try {
      if(useAppstate.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000
        })
        navigate('/')
        setForm({
          title: '',
          year: '',
          description: '',
          image: ''
        })
      } else {
        navigate('/login')
      }
    } catch (err) {
      swal({
        title: "err",
        icon: "error  ",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false)
  }

  return (
    <>
      <section className='addmovie_sec'>
        <div class='flex flex-col text-center w-full mb-4'>
          <h1
            class='sm:text-3xl text-xl font-medium title-font mb-4 text-white m-5'
            style={{ margin: '50px' }}
          >
            Add Movie
          </h1>
        </div>
        <div className='flex justify-center items-center'>
          <div className='flex '>
            <form className='form_main bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4'>
              <div className='flex mb-2'>
                <div className=' pr-3 w-full'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='Title'
                  >
                    Title
                  </label>
                  <input
                    className='shadow focus:border-indigo-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id='Title'
                    type='text'
                    placeholder='Title'
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                  />
                </div>
                <div className=' w-full'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='Year'
                  >
                    Year
                  </label>
                  <input
                    className='shadow focus:border-indigo-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    id='year'
                    type='text'
                    placeholder='Year'
                    value={form.year}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                  />
                </div>
              </div>
              <div className='mb-4  w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='Title'
                >
                  Image Link
                </label>
                <input
                  className='shadow focus:border-indigo-500 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='link'
                  type='text'
                  placeholder='Image Link'
                  onChange={e => setForm({ ...form, image: e.target.value })}
                />
              </div>
              <div className='mb-4  w-full'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='Title'
                >
                  Description
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  class='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
                ></textarea>
              </div>
              <div className='flex items-center justify-between'>
                <Button className=' submit_btn' type='button' onClick={addMovie}>
                  {loading ? <TailSpin height={25} color='white' /> : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddMovie
