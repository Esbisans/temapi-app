/*-------------------------------------------------------------------
|  React FUNCTIONAL COMPONENT
|
|  Purpose: RE-USEABLE COMPONENT FOR RECIPIENT MESSAGES
|
|  Returns:  JSX
*-------------------------------------------------------------------*/

import React from 'react'
import { dateConvert } from '../helpers/dateConvert'

export const RecipientMessage = ({message}) => {

  return (
    <div className='select-none'>
      <div className='xs:mb-6 md:mb-5 flex'>
        <div className='mr-4'></div>
        <div className='flex items-end'>
          <div className='group max-w-[31.25rem] p-5 rounded-3xl transition duration-500 rounded-tl mr-4 bg-gray-50 dark:bg-gray-600'>
            <p className='text-sm font-normal leading-4 tracking-[.01rem] outline-none text-black opacity-60 dark:text-white dark:opacity-70'>
              {message.message}
            </p>
          </div>
          <div className='mr-4'>
            <div className='outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[.01rem] whitespace-pre'>
              {dateConvert(message.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
