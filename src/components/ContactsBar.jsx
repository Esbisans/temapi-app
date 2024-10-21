import { useChatStore } from '../hooks/useChatStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { ContactItem } from './ContactItem';

export const ContactsBar = () => {

    const { users, lastMessages, unseenMessages } = useChatStore();
    const { user } = useAuthStore();



  return (
    <aside
        className="xs:w-full md:w-[18.125rem] h-full xs:px-5 md:p-0 flex flex-col overflow-visible transition-all duration-500 xs:grow-1 md:grow-0 xs:overflow-y-scroll md:overflow-visible scrollbar-hidden"
        onClick={onclick}
        >
        <div className="h-full flex flex-col">
            <div className='w-full min-h-[5rem] max-h-fit px-5 py-6 flex justify-between items-center'>
                <p className='text-black opacity-60 dark:text-white text-xl leading-4 tracking-[.01rem] outline-none'>
                    Contacts
                </p>
            </div>
            <div className='w-full h-full scroll-smooth scrollbar-hidden'>
                <div>
                {
                            users
                                .filter(u => u.uid !== user.uid)
                                .map(u => {
                                    // Find the last message between the current user and the user u
                                    const lastMessage = lastMessages.find(msg => msg.uid === u.uid);

                                    const unseenMessageObject = unseenMessages.find(msg => msg.uid === u.uid);
                                    const unseenMessageCount = unseenMessageObject ? unseenMessageObject.count : null;

                                    return (
                                        <ContactItem 
                                            key={u.uid} 
                                            user={u} 
                                            lastMessage={lastMessage} 
                                            unseenMessagesCount={unseenMessageCount} 
                                        />
                                    );
                                })
                        }
                </div>
            </div>

        </div>
    </aside>
  )
}
