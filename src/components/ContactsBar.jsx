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

export const ContactsMapBar = () => {

    const { users, lastMessages, unseenMessages } = useChatStore();
    const { activeMarkers } = useMapStore();
    const { user } = useAuthStore();
    const { activeSection } = useUIStore();


  return (
    <aside
        className="
            grow xs:h-[calc(100vh-4rem)] flex flex-col overflow-visible transition-all duration-500 scrollbar-hidden
            xs:w-[10.125rem] xs:pl-2 xs:grow-1 xs:overflow-y-auto xs:min-w-[7.157rem] xs:overflow-hidden
            md:w-[18.125rem] md:p-0 md:grow-0  md:overflow-visible md:h-full"
        onClick={onclick}
        >
        <div className="h-full flex flex-col">
            <div className='w-full min-h-[5rem] max-h-fit xs:px-0 md:px-5 py-6 flex justify-between items-center'>
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
