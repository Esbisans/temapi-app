import React, { useContext, useEffect } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import icon from '../../assets/icon.png';

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const {email, password, onInputChange, validateFields, errors} = useForm(
        {
            email: '', password: ''
        }
    );

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            startLogin({ email, password });
        } else {
            toast.error('Please fill in all fields');
        }
    }


  return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='p-10 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center'>
            <div className='w-full md:px-[15%] xs:px-[45%]'>
                <div className='mb-10 flex flex-col'>
                    <p className='outline-none text-3xl text-black opacity-60 font-semibold leading-4 tracking-[.01rem] mb-4'>
                        Login 
                    </p>
                    <p className='mt-4 outline-none text-md text-black opacity-60 leading-5 tracking-[.01rem] text-opacity-75 font-light'>
                        Sign in to start using messaging! 
                    </p>
                </div>
                <form onSubmit={onFormSubmit}>
                    <div className='mb-6'>
                        {/* email */}
                        <div>           
                            <div className='flex justify-start'>
                                <label className='mb-3'>
                                    <span className='w-13 text-sm text-black opacity-60 font-semibold leading-4 tracking-[.01rem]'>
                                        Email
                                    </span>
                                </label>
                            </div>
                            <div className='relative'>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    autoComplete='email'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                    className='max-w-full w-full h-12 p-4 rounded-xl content-center placeholder:text-black placeholder:opacity-40 text-opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 border-opacity-0 focus:ring focus:ring-indigo-100 focus:bg-opacity-0 ' 
                                    />
                            </div>
                            {errors.email && (
                                <p className='text-red-400 text-sm mt-1 ml-2 transition-opacity duration-300 ease-in-out'>
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        {/* password */}
                        <div>
                            <div className='flex justify-start'>
                                <label className='mt-4 mb-3'>
                                    <span className='w-13 text-sm text-black opacity-60 font-semibold leading-4 tracking-[.01rem]'>
                                        Password
                                    </span>
                                </label>
                            </div>
                            <div className='relative'>
                                <input 
                                    type='password' 
                                    placeholder='Enter your password' 
                                    autoComplete='current-password'
                                    name='password'
                                    value={password}
                                    onChange={onInputChange}
                                    className='max-w-full w-full h-12 p-4 rounded-xl content-center placeholder:text-black placeholder:opacity-40 text-opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 border-opacity-0 focus:ring focus:ring-indigo-100 focus:bg-opacity-0' 
                                />
                                {errors.password && (
                                    <p className='text-red-400 text-sm mt-1 ml-2 transition-opacity duration-300 ease-in-out'>
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mt-9 mb-6'>
                        <button 
                            type='submit' 
                            className='h-12 group p-3 flex justify-center items-center rounded-2xl transition-all duration-200 ease-out outline-none bg-indigo-300 active:ring active:ring-indigo-200 focus:outline-none focus:ring focus:ring-indigo-100 w-full mb-4'
                        >
                            <p className='text-lg font-semibold text-white leading-4 tracking-[.01rem]'>
                                Sign in
                            </p>
                        </button>
                    </div>

                    <div className='flex justify-center'>
                        <p className='outline-none text-md text-black opacity-60 font-normal leading-4 tracking-[.01rem]'>
                            Don’t have an account? 
                            <Link to='/auth/register' className='ml-2 text-indigo-500 font-bold opacity-100'>
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>

  )
}
