import React, { useContext, useEffect, useRef } from 'react'
import { useUIStore } from '../hooks/useUIStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { SocketContext } from '../store/SocketContext';

export const DropdownProfile = ({buttonRef}) => {

    const {setIsProfileMenuOpen} = useUIStore();
    const {startDeleteUser} = useAuthStore();
    const {user} = useAuthStore();

    const {socket} = useContext(SocketContext);

    const menuRef = useRef(null); 

    const handleClickOutside = (event) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
          ) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleClickDeleteAccount = async () => {
        setIsProfileMenuOpen(false);
        await startDeleteUser();
        socket?.emit('users:changes');
    }

    useEffect(() => {
    
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

  return (
    <div
    id="profile-menu-dropdown"
    aria-labelledby="profile-menu-button"
    className='transition-all duration-1000'
    ref={menuRef}
    >
        <div
            className='md:bottom-0 md:left-[2.5rem] md:top-[auto] bottom-[3.125rem] left-[-4.8125rem] absolute z-[100] w-[12.5rem] mt-2 rounded-sm bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-600 focus:outline-none cz-color-0 cz-color-16777215 cz-color-16184563'
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            <div className='cz-color-0 cz-color-15460325' role="none">
                <div
                    className=' w-full px-4 py-3 flex justify-center items-center border-b opacity-60 dark:opacity-70 outline-none text-sm border-gray-200 dark:border-gray-600 transition-all duration-200 text-black dark:text-white active:bg-gray-100 dark:hover:bg-gray-600 dark:focus:bg-gray-600 hover:bg-gray-50'
                    aria-label="Profile Information"
                    role="menuitem"
                >
                    <p className='text-lg'>
                        {user.name}
                    </p>
                </div>
                
                <button
                    onClick={handleClickDeleteAccount}
                    className='w-full px-4 py-3 flex items-center border-b opacity-60 dark:opacity-70 outline-none text-sm border-gray-200 dark:border-gray-600 transition-all duration-200 text-red-500 dark:hover:text-red-50 hover:bg-red-50 active:bg-red-100 dark:hover:bg-red-900 cz-color-4474095 cz-color-15460325'
                    aria-label='Delete Account'
                    role='menuitem'
                >
                    <div className='w-full flex items-center justify-start cz-color-4474095 cz-color-15460325'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Delete Account
                    </div>
                </button>
            </div>
        </div>
    </div>
  )
}
