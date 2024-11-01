import React from 'react'
import { dateConvert } from '../helpers/dateConvert'

export const SenderMessage = ({message}) => {

  return (
    <div className='select-none'>
      <div className='xs:mb-6 md:mb-5 flex justify-end'>
        <div className='mr-4'></div>
        <div className='flex items-end'>
          <div className='group max-w-[31.25rem] p-5 rounded-3xl transition duration-500 rounded-tr ml-4 order-2 bg-indigo-50'>
            <p className='text-sm font-normal leading-4 tracking-[.01rem] outline-none text-black opacity-60'>
              {message.message}
            </p>
          </div>
          <div className='ml-4 order-1'>
            <p className='outline-none text-xs text-black opacity-60 font-light leading-4 tracking-[.01rem] whitespace-pre'>
              {dateConvert(message.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
