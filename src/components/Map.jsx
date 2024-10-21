import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


export const Map = () => {

//   <svg className="e-marker" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 72 130.7" width="36">
//   <defs>
//       <clipPath id="circle">
//           <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
//       </clipPath>
//   </defs>
//   <path className="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
// C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
// c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
// S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
// <path className="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
//   {currentIcon}
//   <path className="e-marker__loader" d="M49.5,62.5l-7.7,7.7h5.8c0,6.4-5.2,11.5-11.5,11.5c-1.9,0-3.8-0.5-5.4-1.3l-2.8,2.8c2.4,1.5,5.2,2.4,8.2,2.4
// c8.5,0,15.4-6.9,15.4-15.4h5.8L49.5,62.5z M24.5,70.2c0-6.4,5.2-11.5,11.5-11.5c1.9,0,3.8,0.5,5.4,1.3l2.8-2.8
// c-2.4-1.5-5.2-2.4-8.2-2.4c-8.5,0-15.4,6.9-15.4,15.4h-5.8l7.7,7.7l7.7-7.7H24.5z"/>
//   <image className="e-marker__image" width="100%" height="100%" clipPath="url(#circle)" xlinkHref={imageUrl} />
//   <text className="e-marker__text" transform="matrix(1 0 0 1 0 13.9998)">
//       <tspan x="50%" y="0" >{titleFirst.join(' ')}</tspan>
//       <tspan x="50%" y="13" >{titleLast.join(' ')}</tspan>      
//   </text>
// </svg>


    const mapRef = useRef();

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 9, // starting zoom
        });

        return () => map.remove();
    } , []);


  return (
    <div ref={mapRef} style={{ width: '100vh', height: '100vh'}} className='mx-4 '/>
  )
}
