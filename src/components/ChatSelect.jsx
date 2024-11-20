/*-------------------------------------------------------------------
|  React FUNCTIONAL COMPONENT
|
|  Purpose: NO CHAT SELECTED COMPONENT
|
|  Returns:  JSX
*-------------------------------------------------------------------*/

import React from 'react'

export const ChatSelect = () => {

  return (
    <div className='
                    xs:z-10 xs:h-[calc(100vh-4rem)] xs:w-full xs:left-[0rem] xs:static xs:hidden
                    md:static md:w-fit md:flex
                    grow scrollbar-hidden bg-white transition-all duration-500 flex-col justify-between
                    '>
        <div className='h-full flex flex-col justify-center items-center'>
            <div className='w-10 h-10 mr-4 mb-5 flex justify-center items-center rounded-full bg-gray-50 transition duration-500'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-7 h-7 text-gray-400">
                    <path fillRule="evenodd" d="M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z" clipRule="evenodd"></path>
                </svg>
            </div>
            <p className='outline-none text-sm text-black opacity-60 font-semibold leading-4 tracking-[.01rem] mb-3 text-center'>
                No chat selected 
            </p>
            <p className='outline-none text-sm text-black opacity-60 font-normal leading-4 tracking-[.01rem] flex text-center'>
                Select a conversation from the conversation menu. 
            </p>
        </div>
    </div>
  )
}
