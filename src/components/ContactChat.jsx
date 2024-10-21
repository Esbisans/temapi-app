import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../hooks/useAuthStore';
import { useChatStore } from '../hooks/useChatStore';
import { SocketContext } from '../store/SocketContext';
import { RecipientMessage } from './RecipientMessage';
import { SenderMessage } from './SenderMessage';

export const ContactChat = () => {

  const imageUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const { socket } = useContext(SocketContext);
  const { user } = useAuthStore();
  const { chatActive, messages, users } = useChatStore();
  const [userChatActive, setUserChatActive] = useState(null);

  const [message, setMessage] = useState('');

  const onMessageChange = ({target}) => {
    setMessage(target.value);
  }
  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (message.length === 0) {
      return;
    }
    setMessage('');

    socket.emit('personal:message', {
      from: user.uid,
      to: chatActive,
      message
    });

  }

  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior: behavior });
  };

  useEffect(() => {
    scrollToBottom('auto'); 
  }, [messages]);

  useEffect(() => {

    const userFound = users.find( u => u.uid === chatActive );
    setUserChatActive(userFound);

  } , [users, chatActive])

  return (
    <div className='xs:absolute xs:z-10 md:static grow h-[100vh] xs:w-full md:w-fit scrollbar-hidden bg-white dark:bg-gray-800 transition-all duration-500 xs:left-[0rem] xs:static flex flex-col justify-between'>
  
      {/* Contact Information */}
      <div className='w-full'>
        <div className='w-full min-h-[5.25rem] px-5 py-6'>
          <div className='w-full flex justify-center items-center'>
            <div className='flex grow'>
              <div className='mr-5 outline-none'>
                <div className='w-[2.25rem] h-[2.25rem] rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${imageUrl})` }}>
                </div>
              </div>
              <div className='flex flex-col'>
                <p className='outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem] mb-2 default-outline cursor-pointer'>
                  {userChatActive?.name}
                </p>
                <p className={`outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 leading-4 tracking-[.01rem] font-extralight default-outline rounded-[.25rem] ${userChatActive?.online ? 'text-green-700' : 'text-red-700'}`}>
                  {userChatActive?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className='grow px-5 py-5 flex flex-col overflow-y-auto scrollbar-hidden'>

        {
          messages.map( (msg) => (
            (msg.from === user.uid)
              ? <SenderMessage key={msg._id} message={msg} />
              : <RecipientMessage key={msg._id} message={msg} />
          ))
        }
        <div ref={messagesEndRef} />
      </div>

      {/* message input start*/}
      <form 
        className='w-full'
        onSubmit={onMessageSubmit}
      >
        <div className='relative transition-all duration-200'>
        </div>
        <div className='h-auto min-h-[5.25rem] p-5 flex items-end'>
          <div className='grow md:mr-5 xs:mr-4 self-end'>
            <div className='relative'>
              <input 
                className='max-w-full w-full px-5 py-4 rounded-3xl content-center outline-none text-sm placeholder:text-black placeholder:opacity-40 text-opacity-70 dark:placeholder:text-white dark:placeholder:opacity-70 focus:outline-none transition duration-200 ease-out text-black bg-gray-50 dark:text-white border-opacity-0 dark:bg-gray-700 dark:bg-opacity-70 dark:border-opacity-70 dark:border-gray-700 max-h-[5rem] pr-[3.125rem] resize-none scrollbar-hidden'
                cols="30"
                rows="1"
                placeholder="Write your message here"
                aria-label="Write your message here"
                value={message}
                onChange={onMessageChange}
              >
              </input>
            </div>
          </div>

          <div className='min-h-[2.75rem] flex'>
            <button className='mt-1 group flex justify-center items-center outline-none rounded-full focus:outline-none transition-all duration-200 group w-7 h-7 bg-indigo-300 hover:bg-indigo-400 focus:bg-indigo-400 dark:focus:bg-indigo-300 dark:bg-indigo-400 dark:hover:bg-indigo-400 active:scale-110'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-[1.0625rem] h-[1.0625rem] text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
      {/* message input end */}
    </div>
  )
}
