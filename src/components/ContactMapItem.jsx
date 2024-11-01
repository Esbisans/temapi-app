import React from 'react'
import { useMapStore } from '../hooks/useMapStore';

export const ContactMapItem = ({user, markerAvailable}) => {

    const avatarUrl = user.avatar 
    ? `/assets/avatars/avatar-${user.avatar}.jpg` 
    : '/assets/avatars/avatar-0.jpg'; 

    const {setMarkerActive} = useMapStore();

    const onClickItem = () => {
        setMarkerActive(user.uid);
    }

  return (
    <div className='select-none'>
            <button 
                onClick={onClickItem} 
                className={`w-full h-[5.75rem] px-5 py-4 mb-3 rounded-xl ${
                    markerAvailable 
                        ? 'hover:bg-indigo-50 active:bg-indigo-100 group' 
                        : 'opacity-50'
                } focus:outline-none transition duration-500 ease-out flex justify-between items-center`}
                disabled={!markerAvailable}
            >    
            <div className='flex flex-col'>
                <div className='mb-2 md:ml-4 text-start'>
                    <p className='outline-none text-sm text-black opacity-60 font-semibold leading-4 tracking-[.01rem]'>
                        {user.name}
                    </p>
                </div>

                <div className='w-10 h-10 md:ml-6 rounded-full bg-cover bg-center' style={{ backgroundImage: `url(${avatarUrl})` }} /> 
            </div>

            <div 
                    className='text-indigo-400 group-hover:opacity-100 opacity-0 transition-opacity duration-300'
            >
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="35" height="35" viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    stroke="none">
                        <path fill="currentColor" d="M2382 5109 c-570 -66 -1079 -481 -1262 -1027 -91 -274 -104 -604 -35
                        -877 69 -272 182 -449 508 -789 90 -94 194 -205 232 -246 297 -325 507 -685
                        646 -1110 33 -101 53 -149 68 -158 40 -27 59 0 110 158 118 360 280 663 506
                        943 48 59 187 212 309 340 328 343 396 428 485 605 87 172 127 340 138 567 43
                        951 -762 1704 -1705 1594z m338 -454 c708 -107 1119 -867 819 -1513 -108 -233
                        -283 -411 -513 -522 -124 -59 -218 -86 -359 -102 -365 -41 -741 124 -967 424
                        -71 94 -150 251 -179 358 -68 243 -46 511 60 738 204 440 665 689 1139 617z"/>
                        <path fill="currentColor" d="M2385 4356 c-283 -65 -511 -290 -585 -580 -27 -107 -27 -274 0 -380
                        20 -80 98 -242 129 -270 18 -16 20 -15 40 17 25 42 122 134 179 172 23 15 42
                        29 42 31 0 1 -9 18 -19 36 -64 109 -67 268 -8 391 42 88 97 151 168 194 178
                        106 418 73 552 -77 22 -25 55 -78 74 -117 59 -123 56 -282 -8 -391 -10 -18
                        -19 -35 -19 -36 0 -2 19 -16 42 -31 57 -38 139 -117 173 -166 26 -37 29 -38
                        46 -23 31 28 107 186 128 268 25 96 28 257 6 358 -32 155 -97 270 -220 393
                        -103 103 -168 144 -292 188 -79 27 -102 31 -228 33 -93 3 -160 -1 -200 -10z"/>
                        <path fill="currentColor" d="M2516 3730 c-106 -32 -136 -174 -52 -248 59 -52 141 -50 198 5 79 76
                        44 213 -63 243 -39 11 -44 11 -83 0z"/>
                        <path fill="currentColor" d="M2470 3139 c-104 -20 -242 -116 -284 -198 l-17 -32 73 -33 c99 -46
                        197 -66 318 -66 121 0 219 20 318 66 l73 33 -15 30 c-28 52 -109 126 -176 159
                        -99 48 -188 61 -290 41z"/>
                        <path fill= "#5FFCCA" d="M730 2052 c-19 -9 -45 -32 -57 -51 l-23 -34 0 -538 0 -539 365 0 365
                        0 0 590 0 590 -307 0 c-273 0 -312 -2 -343 -18z"/>
                        <path fill= "#5FFCCA" d="M3506 1960 c-219 -242 -369 -472 -480 -733 -51 -119 -116 -301 -116
                        -323 0 -12 44 -14 265 -14 l265 0 0 233 c0 224 1 236 23 277 43 82 30 80 549
                        80 l458 0 0 244 c0 236 -1 244 -23 277 -45 68 -49 69 -467 69 l-375 0 -99
                        -110z"/>
                        <path fill= "#5FFCCA" d="M1680 1386 l0 -496 265 0 c212 0 265 3 265 13 0 7 -13 51 -29 98 -98
                        287 -221 522 -392 749 -49 65 -94 122 -99 125 -7 4 -10 -170 -10 -489z"/>
                        <path fill= "#5FFCCA" d="M3740 595 l0 -595 308 0 c343 0 355 2 399 69 l23 34 0 543 0 544
                        -365 0 -365 0 0 -595z"/>
                        <path fill= "#5FFCCA" d="M650 351 c0 -241 1 -249 23 -282 12 -19 38 -42 57 -51 33 -17 119
                        -18 1373 -18 l1337 0 0 300 0 300 -1395 0 -1395 0 0 -249z"/>
                    </g>
                </svg>
            </div>
        </button>
    </div>
  )
}
