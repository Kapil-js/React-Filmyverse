import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import app, { usersRef } from '../components/firebase/Firebase'
import swal from 'sweetalert'
import { addDoc } from 'firebase/firestore'
import bcrypt from 'bcryptjs'


const auth = getAuth(app)

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState('');

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  };

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        swal({
          text: 'OTP Sent',
          icon: 'success',
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: 'Successfully Registered',
          icon: 'success',
          buttons: false,
          timer: 3000,
        });
        navigate('/login');
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

    const uploadData = async () => {
      try {
         const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(form.password, salt);
    await addDoc(usersRef, {
      name: form.name,
      password: hash,
      mobile: form.mobile
    });
      } catch (error) {
        console.log(error);
      }
   
  };

    
  return (
    <>
      <section className=' h-full'>
        <div className='h-full'>
          <div className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
            <div className='w-full'>
              <div className='block bg-white shadow-lg dark:bg-neutral-800 '>
                <div className='g-0 lg:flex lg:flex-wrap login_main'>
                  {/* Left column container*/}
                  <div className='flex items-center lg:w-6/12  left_login'>
                    <div className='px-4 py-6 text-white md:mx-6 md:p-12 '>
                      <h4 className='mb-6 text-xl font-semibold'>
                        Hey, How are you
                      </h4>
                      <p className='text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                  {/* Right column container with background and description*/}
                  {otpSent ? (
                    <>
                   <div className='px-4 md:px-0 lg:w-6/12 login_input_main'>
                                              <div className='md:mx-6 md:p-12 '>
                                                  <div className='text-center'>
                            <h4 className='mb-12 mt-1 pb-1 text-4xl font-semibold'>
                              Sign up filmyverse
                            </h4>
                          </div>
                          <form>
                            <div
                              className='relative mb-4'
                              data-te-input-wrapper-init=''
                            >
                              <div className='input_log mb-5'>
                                <TextField
                                  id='outlined-basic'
                                  label='Otp'
                                  variant='outlined'
                                  className='w-full login_input '
                                  value={OTP}
                                  onChange={(e) =>
                                    setOTP(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            {/*Submit button*/}
                            <div className='mb-12 pb-1 pt-1 text-center'>
                              <Button
                                variant='success'
                                onClick={verifyOTP}
                                className='login_btnn mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
                                type='button'
                              >
                                {loading ? (
                                  <TailSpin height={25} color='white' />
                                ) : (
                                  'Confirm OTP'
                                )}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='px-4 md:px-0 lg:w-6/12 login_input_main'>
                        <div className='md:mx-6 md:p-12 '>
                          {/*Logo*/}
                          <div className='text-center'>
                            <h4 className='mb-12 mt-1 pb-1 text-4xl font-semibold'>
                              Sign up filmyverse
                            </h4>
                          </div>
                          <form>
                            <p className='mb-4 text-lg'>
                              Please login to your account
                            </p>
                            {/*Username input*/}
                            <div
                              className='relative mb-4'
                              data-te-input-wrapper-init=''
                            >
                              <div className='input_log mb-5'>
                                <TextField
                                  id='outlined-basic'
                                  label='Name'
                                  variant='outlined'
                                  type={'text'}
                                  className='w-full login_input '
                                  value={form.name}
                                  onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                  }
                                />
                              </div>
                              <div className='input_log mb-5'>
                                <TextField
                                  id='outlined-basic'
                                  label='Mobile No.'
                                  variant='outlined'
                                  type={'number'}
                                  className='w-full login_input '
                                  value={form.mobile}
                                  onChange={(e) =>
                                    setForm({ ...form, mobile: e.target.value })
                                  }
                                />
                              </div>
                              <div className='input_log'>
                                <FormControl
                                  className='w-full login_input text-white'
                                  variant='outlined'
                                >
                                  <InputLabel htmlFor='outlined-adornment-password'>
                                    Password
                                  </InputLabel>
                                  <OutlinedInput
                                    id='outlined-adornment-password'
                                    type={showPassword ? 'text' : 'password'}
                                    label='Password'
                                    value={form.password}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        password: e.target.value
                                      })
                                    }
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <IconButton
                                          aria-label='toggle password visibility'
                                          onClick={handleClickShowPassword}
                                          edge='end'
                                          className='w-full login_input'
                                        >
                                          {showPassword ? (
                                            <VisibilityOff />
                                          ) : (
                                            <Visibility />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              </div>
                            </div>
                            {/*Submit button*/}
                            <div className='mb-12 pb-1 pt-1 text-center'>
                              <Button
                                variant='success'
                                onClick={requestOtp}
                                className='login_btnn mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
                                type='button'
                              >
                                {loading ? (
                                  <TailSpin height={25} color='white' />
                                ) : (
                                  'Request OTP'
                                )}
                              </Button>
                            </div>
                            {/*Register button*/}
                            <div className='flex items-center  pb-6'>
                              <p className='mb-0 mr-2'>
                                Already have an account
                              </p>
                              <Link to={'/login'}>
                                <Button
                                  type='button'
                                  variant='success'
                                  className='login_btnn'
                                >
                                  Sign In
                                </Button>
                              </Link>
                            </div>
                            <div id='recaptcha-container'></div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup
