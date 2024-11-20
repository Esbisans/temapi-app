/*-------------------------------------------------------------------
|  React FUNCTIONAL COMPONENT
|
|  Purpose: CONTACTS BAR COMPONENT FOR DISPLAYING CONTACTS
|
|  Returns:  JSX
*-------------------------------------------------------------------*/

import { useChatStore } from '../hooks/useChatStore';
import { useAuthStore } from '../hooks/useAuthStore';
import { ContactChatItem } from './ContactChatItem';
import { useUIStore } from '../hooks/useUIStore';
import { ContactMapItem } from './ContactMapItem';
import { useMapStore } from '../hooks/useMapStore';

export const ContactsChatBar = () => {

    const { users, lastMessages, unseenMessages } = useChatStore();
    const { activeMarkers } = useMapStore();
    const { user } = useAuthStore();
    const { activeSection } = useUIStore();
    const { chatActive } = useChatStore();

  return (
    <aside
        className={` ${chatActive ? 'xs:hidden md:flex' : ''}
xs:w-full md:w-[18.125rem] h-full xs:px-5 md:p-0 flex flex-col overflow-visible transition-all duration-500 xs:grow-1 md:grow-0 xs:overflow-y-auto md:overflow-visible scrollbar-hidden
            `}
        onClick={onclick}
        >
        <div className="h-full flex flex-col">
            <div className='w-full min-h-[5rem] max-h-fit px-5 py-6 flex justify-between items-center'>
                <p className='text-black opacity-60 text-xl leading-4 tracking-[.01rem] outline-none'>
                    Contacts
                </p>
            </div>
            <div className='w-full h-full overflow-y-auto scroll-smooth scrollbar-hidden'>
                <div>
                {
                            users
                                .filter(u => u.uid !== user.uid)
                                .map(u => {
                                    // Find the last message between the current user and the user u
                                    const lastMessage = lastMessages.find(msg => msg.uid === u.uid);

                                    const unseenMessageObject = unseenMessages.find(msg => msg.uid === u.uid);
                                    const unseenMessageCount = unseenMessageObject ? unseenMessageObject.count : null;


                                    // Check if user has a marker
                                    const markerAvailable = Boolean(activeMarkers[u.uid]);
                                    
                                    return activeSection === 'chat' ? (
                                        <ContactChatItem 
                                            key={u.uid} 
                                            user={u} 
                                            lastMessage={lastMessage} 
                                            unseenMessagesCount={unseenMessageCount} 
                                        />
                                    ) : (
                                        <ContactMapItem
                                            key={u.uid}
                                            user={u}
                                            markerAvailable={markerAvailable}
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
