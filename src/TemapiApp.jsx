import React, { useState } from 'react'
import { Map } from './components/Map'
import { Sidebar } from './components/Sidebar';
import { useChatStore } from './hooks/useChatStore';
import { ContactsBar } from './components/ContactsBar';
import { ContactChat } from './components/ContactChat';
import { ChatSelect } from './components/ChatSelect';
import { useUIStore } from './hooks/useUIStore';

export const TemapiApp = () => {

  const { chatActive } = useChatStore();
  const { activeSection } = useUIStore();




  return (
    <div>
      <div className="dark:bg-gray-800 transition-all duration-500">
        <div className='static h-full flex flex-row overflow-hidden'>

          {/* side bar */}
          <Sidebar />

          {/* contact bar */}
          <ContactsBar />

          {
            activeSection === 'chat' ? (
              chatActive ? <ContactChat /> : <ChatSelect />
            ) : (
              <Map />
            )
          }

        </div>
      </div>
    </div>
  )
}
