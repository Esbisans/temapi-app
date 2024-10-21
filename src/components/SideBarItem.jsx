import React from 'react'
import { useUIStore } from '../hooks/useUIStore';

export const SideBarItem = ({name, icon, onClick}) => {

    const { activateSection , activeSection} = useUIStore();

    const clickActivateSection = () => {
        activateSection(name);
    }


    return (
        <li className='cz-color-0 cz-color-15460325'>
            <div className='xs:mb-0 md:mb-6 cz-color-0 cz-color-15460325'>
                <button 
                    className='group relative focus:outline-none cz-color-0 cz-color-15460325'
                    title={name}
                    onClick={onClick ? onClick : clickActivateSection}
                >
                    <div className={`w-7 h-6 ${name === activeSection && 'text-indigo-400'} group-focus:text-indigo-400 hover:text-indigo-400 active:text-indigo-400 active:scale-110 dark:text-gray-500 transition ease-out duration-200 text-gray-300`}>
                        {icon}
                    </div>
                </button>
            </div>
        </li>
    )
}
