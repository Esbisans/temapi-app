import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import { avatars} from '../../helpers/avatars';
import toast from 'react-hot-toast';
import { useClickOutside } from '../../hooks/useClickOutside';

export const RegisterPage = () => {

    const { startRegister } = useAuthStore();

    const {name, email, password, avatar, onInputChange, validateFields, errors, updateExtraField} = useForm(
        {
            email: '', password: '', name: ''
        },
        { avatar: null }
    );


    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    
    const handleAvatarSelect = (id) => {
        updateExtraField('avatar', id);
        setIsAvatarMenuOpen(false);
        console.log(avatar);
    };

    const { ref } = useClickOutside(() => {
        setIsAvatarMenuOpen(false); 
    });
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            startRegister({ email, password, name, avatar });
        } else {
            toast.error('Please fill in all fields');
        }
    }

    return (
    <div className='min-h-screen flex justify-center items-center'>
        <div className='p-10 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center'>
            <div className='w-full md:px-[15%] xs:px-[45%]'>
                <div className='mb-4 flex flex-col'>
                    <p className='outline-none text-3xl text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem] mb-4'>
                        Register
                    </p>
                    <p className='mt-4 outline-none text-md text-black opacity-60 dark:text-white dark:opacity-70 leading-5 tracking-[.01rem] text-opacity-75 font-light'>
                        Create an account a start messaging now! 
                    </p>
                </div>
                <form onSubmit={onFormSubmit}>
                    <div className='mb-6'>
                        <label>
                            <span className='w-13 text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]'>
                                Avatar
                            </span>
                        </label>
                        <button 
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAvatarMenuOpen(!isAvatarMenuOpen);
                            }}
                            className='mt-3 mb-2 w-20 h-20 rounded-full overflow-hidden bg-indigo-300 hover:bg-indigo-400 flex items-center justify-center'
                        >
                            {avatar ? (
                                <img src={avatars.find(av => av.id === avatar).source} alt="Selected Avatar"/>
                            ) : (
                                <span className='text-white font-medium'>Select Avatar</span>
                            )}
                        </button>
                        {errors.avatar && (
                            <p className='text-red-400 text-sm mt-1 ml-2'>
                                {errors.avatar}
                            </p>
                        )}

                        {/* Avatar Selection Menu */}
                        {isAvatarMenuOpen && (
                            <div ref={ref} className='z-50 absolute grid grid-cols-5 gap-2 bg-white p-4 rounded-lg shadow-lg border border-gray-100'>
                                {avatars
                                .filter(avatar => avatar.id !== 0) 
                                .map(avatar => (
                                <button 
                                    key={avatar.id}
                                    onClick={() => handleAvatarSelect(avatar.id)}
                                    className='w-16 h-16 rounded-full overflow-hidden flex items-center justify-center'
                                >
                                    <img 
                                    src={avatar.source} // Ajuste del src para el entorno de React
                                    alt={avatar.label} 
                                    className="object-cover" 
                                    />
                                </button>
                                ))}
                            </div>
                        )}
                        <div>  
                        {/* name */}
                        <div className='flex justify-start'>
                                <label className='mt-4 mb-3'>
                                    <span className='w-13 text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]'>
                                        Name
                                    </span>
                                </label>
                            </div>
                            <div className='relative'>
                                <input 
                                    type='name' 
                                    placeholder='Enter your name' 
                                    name='name'
                                    value={name}
                                    onChange={onInputChange}
                                    className='max-w-full w-full h-12 p-4 rounded-xl content-center placeholder:text-black placeholder:opacity-40 text-opacity-70 dark:placeholder:text-white dark:placeholder:opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 dark:text-white border-opacity-0 dark:bg-gray-700 dark:bg-opacity-70 dark:border-opacity-70 dark:border-gray-700 focus:ring focus:ring-indigo-100 dark:focus:bg-opacity-0 focus:bg-opacity-0' 
                                />
                                {errors.name && (
                                    <p className='text-red-400 text-sm mt-1 ml-2 transition-opacity duration-300 ease-in-out'>
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* email */}
                        <div>           
                            <div className='flex justify-start'>
                                <label className='mt-4 mb-3'>
                                    <span className='w-13 text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]'>
                                        Email
                                    </span>
                                </label>
                            </div>
                            <div className='relative'>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange} 
                                    className='max-w-full w-full h-12 p-4 rounded-xl content-center placeholder:text-black placeholder:opacity-40 text-opacity-70 dark:placeholder:text-white dark:placeholder:opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 dark:text-white border-opacity-0 dark:bg-gray-700 dark:bg-opacity-70 dark:border-opacity-70 dark:border-gray-700 focus:ring focus:ring-indigo-100 dark:focus:bg-opacity-0 focus:bg-opacity-0' 
                                    />
                                {errors.email && (
                                    <p className='text-red-400 text-sm mt-1 ml-2 transition-opacity duration-300 ease-in-out'>
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* password */}
                        <div>
                            <div className='flex justify-start'>
                                <label className='mt-4 mb-3'>
                                    <span className='w-13 text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]'>
                                        Password
                                    </span>
                                </label>
                            </div>
                            <div className='relative'>
                                <input 
                                    type='password' 
                                    placeholder='Enter your password'
                                    name='password'
                                    value={password}
                                    onChange={onInputChange} 
                                    className='max-w-full w-full h-12 p-4 rounded-xl content-center placeholder:text-black placeholder:opacity-40 text-opacity-70 dark:placeholder:text-white dark:placeholder:opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 dark:text-white border-opacity-0 dark:bg-gray-700 dark:bg-opacity-70 dark:border-opacity-70 dark:border-gray-700 focus:ring focus:ring-indigo-100 dark:focus:bg-opacity-0 focus:bg-opacity-0' 
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
                            className='h-12 group p-3 flex justify-center items-center rounded-2xl transition-all duration-200 ease-out outline-none bg-indigo-300 dark:bg-indigo-400 active:ring active:ring-indigo-200 focus:outline-none focus:ring focus:ring-indigo-100 w-full mb-4'
                        >
                            <p className='text-lg font-semibold text-white leading-4 tracking-[.01rem]'>
                                Sign up
                            </p>
                        </button>
                    </div>

                    <div className='flex justify-center'>
                        <p className='outline-none text-md text-black opacity-60 dark:text-white dark:opacity-70 font-normal leading-4 tracking-[.01rem]'>
                            Already have an account? 
                            <Link to='/auth/login' className='ml-2 text-indigo-500 font-bold opacity-100'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
