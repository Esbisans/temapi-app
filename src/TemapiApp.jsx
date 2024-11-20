import { Map } from './components/Map'
import { Sidebar } from './components/Sidebar';
import { useChatStore } from './hooks/useChatStore';
import { ContactsMapBar } from './components/ContactsBar';
import { ContactChat } from './components/ContactChat';
import { ChatSelect } from './components/ChatSelect';
import { useUIStore } from './hooks/useUIStore';
import { ContactsChatBar } from './components/ContactChatBar';

export const TemapiApp = () => {

  const { chatActive } = useChatStore();
  const { activeSection } = useUIStore();

  return (
    <div>
      <div className="transition-all duration-500">
        <div className='
          xs:relative xs:flex-col xs:h-screen
          md:static md:flex-row md:h-full
          flex
          '>

          {/* side bar */}
          <Sidebar />

          {/* contact bar */}

          {/* <div className="xs:flex xs:flex-row w-full"> */}

          {activeSection === 'chat' ? (
            <>
              <ContactsChatBar
                className={`
                  ${chatActive ? 'hidden' : ''}
                  md:flex
                `}
              />
              {chatActive ? <ContactChat /> : <ChatSelect />}
            </>
          ) : (
            <>
            <div className="xs:flex xs:flex-row w-full">
              <ContactsMapBar />
              <Map />
            </div>
            </>
          )}
          {/* </div> */}

        </div>
      </div>
    </div>
  )
}
