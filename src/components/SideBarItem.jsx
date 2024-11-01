import React from 'react'
import { useUIStore } from '../hooks/useUIStore';

export const SideBarItem = ({name, icon, onClick}) => {

    const { activateSection , activeSection} = useUIStore();

    const clickActivateSection = () => {
        activateSection(name);
    }


    return (
        <li>
            <div className='xs:mb-0 md:mb-6'>
                <button 
                    className='group relative focus:outline-none'
                    title={name}
                    onClick={onClick ? onClick : clickActivateSection}
                >
                    <div className={`w-7 h-6 ${name === activeSection && 'text-indigo-400'} group-focus:text-indigo-400 hover:text-indigo-400 active:text-indigo-400 active:scale-110 transition ease-out duration-200 text-gray-300`}>
                        {icon}
                    </div>
                </button>
            </div>
        </li>
    )
}
