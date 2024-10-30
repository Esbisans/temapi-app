import { useContext, useEffect } from 'react';
import { useChatStore } from '../hooks/useChatStore';
import { SocketContext } from '../store/SocketContext';
import { dateConvert } from '../helpers/dateConvert';

export const ContactChatItem = ({user, lastMessage, unseenMessagesCount}) => {

    const { chatActive, activateChat } = useChatStore();
    const { loadMessages } = useChatStore();

    const { socket } = useContext(SocketContext);

    const onClickActivateChat = () => {
        activateChat(user.uid);
        // LOAD MESSAGES
        loadMessages(user.uid);

        // MARK MESSAGES AS SEEN
        unseenMessagesCount && 
        (socket?.emit('mark:messages:seen', user.uid));

    }

    const avatarUrl = user.avatar 
    ? `/assets/avatars/avatar-${user.avatar}.jpg`
    : '/assets/avatars/avatar-0.jpg';

    useEffect(() => {

        // if the chatActive is the same as the last message sender
        if (chatActive === lastMessage?.uid) {
            console.log('chatActive', chatActive);
            socket?.emit('mark:messages:seen', user.uid)
        }

    }, [lastMessage])

  return (
    <div className='select-none' onClick={onClickActivateChat}>
        <button className={`w-full h-[5.75rem] px-5 py-6 mb-3 flex rounded-xl focus:bg-indigo-50 hover:bg-indigo-50 ${user.uid === chatActive && 'bg-indigo-50'} active:bg-indigo-100 focus:outline-none transition duration-500 ease-out`}>
            {/* avatar */}
            <div className='relative mr-4'>
                <div className='w-9 h-9 rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${avatarUrl})` }}> 
                </div>
                {
                    (user.online) 
                    &&
                    <span className="absolute top-0 right-[-4px] w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> 
                }
            </div>
            <div className='w-full flex flex-col'>
                <div className='w-full'>
                    <div className='flex items-start'>
                        {/* name */}
                        <div className='grow mb-4 text-start'>
                            <p className='outline-none text-sm text-black opacity-60 dark:text-white dark:opacity-70 font-semibold leading-4 tracking-[.01rem]'>
                                {user.name}
                            </p>
                        </div>
                        {/* time */}
                        {
                            lastMessage?.createdAt &&
                            <p className='outline-none text-xs text-black opacity-60 dark:text-white dark:opacity-70 font-light leading-4 tracking-[.01rem]'>
                                {dateConvert(lastMessage?.createdAt)}
                            </p>
                        }
                    </div>


                    <div className='flex justify-between'>
                        {/* last message */}
                        <p className={`overflow-hidden outline-none ${unseenMessagesCount ? 'text-indigo-700 font-semibold' : 'text-black' } text-sm opacity-60 dark:text-white dark:opacity-70 font-normal leading-4 tracking-[.01rem] flex justify-start items-center flex-grow w-0`}>
                            <span className='truncate'>
                                {lastMessage?.message}
                            </span>
                            {/* <span className='text-indigo-400'>You're welcome</span> */}
                        </p>
                        {/* unread messages */}
                        {
                            (unseenMessagesCount && chatActive != user.uid) &&                         
                            <div className='w-[1.125rem] h-[1.125rem] flex justify-center items-center rounded-[50%] bg-indigo-300'>
                                <p className='outline-none text-xs font-light leading-4 tracking-[.01rem] text-white'>
                                    {unseenMessagesCount}
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </button>
    </div>
  )
}
