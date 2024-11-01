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
      <div className="transition-all duration-500">
        <div className='xs:relative md:static h-full flex xs:flex-col md:flex-row overflow-hidden'>

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
