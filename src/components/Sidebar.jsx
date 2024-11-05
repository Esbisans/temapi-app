/*-------------------------------------------------------------------
|  REACT FUNCTIONAL COMPONENT FOR SIDEBAR
|
|  Purpose: SIDEBAR COMPONENT FOR NAVIGATION AND PROFILE INTERACTION
|
|  Returns:  JSX
*-------------------------------------------------------------------*/

import React, { useRef } from 'react'
import icon from '../assets/icon.png'
import { DropdownProfile } from './DropdownProfile';
import { useUIStore } from '../hooks/useUIStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { SideBarItem } from './SideBarItem';


export const Sidebar = () => {


    const { isProfileMenuOpen, setIsProfileMenuOpen } = useUIStore();
    const {user} = useAuthStore();
    const buttonRef = useRef(null);
    
    const toggleMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const { startLogout } = useAuthStore();

    const avatarUrl = user.avatar 
    ? `/assets/avatars/avatar-${user.avatar}.jpg`
    : '/assets/avatars/avatar-0.jpg';

    return (
        <div className='flex flex-col items-center py-7 px-5 transition-all duration-500'>
            {/* logo */}
            <div className='mb-10 h-7 xs:hidden md:block'>
                <button className='outline-none'>
                    <img 
                        src={icon} 
                        alt="icon" 
                        className="w-8 h-8"  
                    />
                </button>
            </div>

            {/* main section */}
            <div className='grow'>
                <nav>
                    <ul className='xs:flex md:block xs:justify-between xs:items-center'>

                        <SideBarItem 
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule='evenodd' d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd"></path>
                                </svg>
                                
                            }
                            name='chat'
                        />

                        <SideBarItem 
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z" clipRule="evenodd" />
                                </svg>
                                
                            }
                            name='map'
                        />
                    </ul>
                </nav>
            </div>

            {/* lower section  */}
            <div className='mt-auto'>
                <nav className='xs:hidden md:block'>
                    <ul>

                        <SideBarItem 
                            icon={ 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fill="#6563ff" fillRule="evenodd" clipRule="evenodd" transform="scale(-1, 1) translate(-24, 0)" d="m21.207 11.293-3-3a1 1 0 1 0-1.414 1.415L18.086 11H12.5a1 1 0 0 0 0 2h5.586l-1.293 1.293a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.415Z"></path>
                                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" transform="scale(-1, 1) translate(-24, 0)" d="M12.5 13a1 1 0 0 1 0-2h4V5a3.003 3.003 0 0 0-3-3h-8a3.003 3.003 0 0 0-3 3v14a3.003 3.003 0 0 0 3 3h8a3.003 3.003 0 0 0 3-3v-6Z"></path>    
                                </svg>
                            }
                            onClick={startLogout}
                        />
                            
                    </ul>
                </nav>

                {/* button profile */}
                <div className='relative xs:hidden md:block'>
                    <button 
                    onClick={toggleMenu}
                    ref={buttonRef}
                    className='bg-white rounded-full active:scale-110 focus:outline-none focus:scale-110 transition duration-200 ease-out'
                    id='profile-menu-button'
                    data-dropdown-toggle="profile-menu-dropdown"
                    aria-expanded='false'
                    aria-controls='profile-menu'
                    aria-label='toggle profile menu'  
                    style={{
                        boxShadow: 
                        'rgba(193, 202, 255, 0.5) 0px 0.125rem 0.3125rem, ' + 
                        'rgba(193, 202, 255, 0.5) 0.125rem 0px 0.3125rem, ' + 
                        'rgba(193, 202, 255, 0.5) -0.125rem 0px 0.3125rem, ' + 
                        'rgba(193, 202, 255, 0.5) 0px -0.125rem 0.3125rem'
                    }}
                    >
                    <div className='w-8 h-8 rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${avatarUrl})` }}/>
                    </button>
                    
                    {/* dropdown menu */}
                    {isProfileMenuOpen && (
                        <DropdownProfile buttonRef={buttonRef} />
                    )}
                </div>
            </div>
        </div>
    )
}
