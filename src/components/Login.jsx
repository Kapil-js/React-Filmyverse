import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import swal from 'sweetalert';
import { getDocs, query, where } from 'firebase/firestore';
import { usersRef } from './firebase/Firebase';
import bcrypt from 'bcryptjs'
import { Appstate } from '../App';

function Login() {
    const navigate =  useNavigate()
    const useAppstate = useContext(Appstate);
    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const login = async () => {
        setLoading(true)
        try {
            const quer = query(usersRef, where('mobile', '==', form.mobile));
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                    timer: 3000
                })
                navigate('/');
                } else {
                    swal({
                    title: "Invalid Credentials",
                    icon: "error",
                    buttons: false,
                    timer: 3000
                })
                }
            })
        } catch (error) {
              swal({
                    title: error.message,
                    icon: "error",
                    buttons: false,
                    timer: 3000
                })
        }
        setLoading(false)
     }



    return (
        <>
            <section className=' h-full'>
                <div className='h-full'>
                    <div className='g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
                        <div className='w-full'>
                            <div className='block bg-white shadow-lg dark:bg-neutral-800 '>
                                <div className='g-0 lg:flex lg:flex-wrap login_main'>
                                    {/* Left column container*/}
                                    <div className='px-4 md:px-0 lg:w-6/12 login_input_main'>
                                        <div className='md:mx-6 md:p-12 '>
                                            <div className='text-center'>
                                                <h4 className='mb-12 mt-1 pb-1 text-4xl font-semibold'>
                                                    Login filmyverse
                                                </h4>
                                            </div>
                                            <form>
                                                <p className='mb-4 text-lg'>Please login to your account</p>
                                                {/*Username input*/}
                                                <div
                                                    className='relative mb-4'
                                                    data-te-input-wrapper-init=''
                                                >
                                                    <div className='input_log mb-5'>
                                                        <TextField id="outlined-basic" label="Mobile No." variant="outlined" type={'number'} className='w-full login_input '
                                                            value={form.mobile}
                                                            onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                                                    </div>
                                                    <div className='input_log'>
                                                        <FormControl className='w-full login_input text-white' variant="outlined" >
                                                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                            <OutlinedInput
                                                                id="outlined-adornment-password"
                                                                type={showPassword ? 'text' : 'password'}
                                                                label="Password"
                                                                value={form.password}
                                                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickShowPassword}
                                                                            edge="end"
                                                                            className='w-full login_input'
                                                                        >
                                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                {/*Submit button*/}
                                                <div className='mb-12 pb-1 pt-1 text-center'>
                                                    <Button variant='success'
                                                        onClick={login}
                                                        className='login_btnn mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
                                                        type='button'
                                                    >
                                                        {loading ? <TailSpin height={25} color='white' /> : 'Log in'}
                                                    </Button>
                                                </div>
                                                {/*Register button*/}
                                                <div className='flex items-center  pb-6'>
                                                    <p className='mb-0 mr-2'>Don't have an account?</p>
                                                    <Link to={'/signup'}>
                                                        <Button
                                                            type='button'
                                                            variant='success'
                                                            className='login_btnn'
                                                        >
                                                            Sign Up
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* Right column container with background and description*/}
                                    <div
                                        className='flex items-center lg:w-6/12  left_login'
                                    >
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login
