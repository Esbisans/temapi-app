import React, { useContext, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '../hooks/useMapbox';
import { useMapStore } from '../hooks/useMapStore';
import { SocketContext } from '../store/SocketContext';
import { useAuthStore } from '../hooks/useAuthStore';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


export const Map = () => {

  const {socket} = useContext(SocketContext);
  const {user} = useAuthStore();
  const { userMarker, markerActive, markerExists, setActiveMarkers, appendActiveMarker} = useMapStore();

  const initialCoords = {
    lng: userMarker && userMarker.lng !== undefined ? userMarker.lng : -74.5,
    lat: userMarker && userMarker.lat !== undefined ? userMarker.lat : 40,
    zoom: 9
  }

  const { coords, setRef, addUserMarker, addActiveMarker, updateMarkerLocation, deleteActiveMarker, flyToUserMarker, flyToActiveMarker } = useMapbox(initialCoords);
  

  // Emit new marker on map component mount
  useEffect(() => {

    if (markerExists) {
      socket.emit('new:marker', userMarker);
    }

  }, [socket, markerExists])

  // Listen for new markers
  useEffect(() => {

    socket.on('new:marker', (marker) => {
      addActiveMarker(marker, marker.id);
      appendActiveMarker(marker);
    });

  }, [socket])

  // Listen for active markers 
  useEffect(() => {
    socket.on('active:markers' , (markers) => {
      console.log('active markers received', markers);
      setActiveMarkers(markers);
      for (const key of Object.keys(markers)) {
        if (key === user.uid) {
          addUserMarker(markers[key], key);
        } else {
          addActiveMarker(markers[key], key);
        }
      }
    })
  } , [socket])

  // Emit event active markers for listen active markers
  useEffect(() => {
    socket.emit('active:markers');
  }, [socket])

  // Listen for marker updates
  useEffect(() => {
    socket.on('update:marker', (marker) => {
      updateMarkerLocation(marker);
    })
  }, [socket])

  // Emit marker update
  useEffect(() => {
    if (userMarker.id){
      socket.emit('update:marker', userMarker);
    }
  }, [socket, userMarker])

  useEffect(() => {
    socket.on('delete:marker', (id) => {
      deleteActiveMarker(id);
    })
  }, [socket])

  // Fly to active marker
  useEffect(() => {
    if (markerActive) {
      flyToActiveMarker(markerActive);
    }
  } , [markerActive])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={setRef} style={{ width: '100%', height: '100vh'}} className='map-container ml-5'/>
      <button
        onClick={flyToUserMarker}
        className=' absolute bg-white hover:bg-indigo-50 active:bg-indigo-100 focus:outline-none'
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px',
          border: 'none',
          borderRadius: '30px',
          zIndex: 1,
        }}
      >
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="40" height="40" viewBox="0 0 512.000000 512.000000"
        preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#818CF8" stroke="none">
        <path d="M2488 5099 c-59 -31 -78 -78 -78 -197 l0 -99 -84 -7 c-221 -17 -517
        -101 -749 -214 -454 -221 -814 -580 -1038 -1036 -112 -229 -198 -528 -215
        -749 l-7 -87 -99 0 c-120 0 -167 -19 -198 -80 -25 -50 -25 -90 0 -140 31 -62
        77 -80 200 -80 l100 0 0 -40 c0 -22 7 -86 15 -143 133 -886 789 -1617 1655
        -1843 112 -29 317 -64 378 -64 l42 0 0 -100 c0 -123 18 -169 80 -200 50 -25
        90 -25 140 0 62 31 80 77 80 200 l0 100 40 0 c62 0 234 28 349 56 649 161
        1199 608 1486 1207 70 147 114 264 151 407 29 112 64 317 64 378 l0 42 100 0
        c123 0 169 18 200 80 25 50 25 90 0 140 -31 62 -77 80 -200 80 l-100 0 0 43
        c0 60 -35 265 -64 377 -37 143 -81 260 -151 407 -319 667 -958 1138 -1692
        1248 -57 8 -121 15 -143 15 l-40 0 0 100 c0 123 -18 169 -80 200 -49 25 -94
        25 -142 -1z m-78 -689 c0 -71 4 -99 20 -130 23 -45 80 -80 130 -80 50 0 107
        35 130 80 16 31 20 59 20 131 l0 92 72 -7 c194 -18 436 -89 634 -186 488 -240
        852 -669 1010 -1189 35 -116 74 -314 74 -377 l0 -34 -90 0 c-112 0 -159 -20
        -190 -80 -25 -50 -25 -90 0 -140 31 -60 78 -80 190 -80 l90 0 0 -34 c0 -19 -9
        -85 -19 -148 -122 -709 -641 -1305 -1332 -1526 -113 -36 -265 -69 -367 -78
        l-72 -7 0 92 c0 113 -20 160 -80 191 -50 25 -90 25 -140 0 -60 -31 -80 -78
        -80 -190 l0 -90 -34 0 c-18 0 -85 9 -148 20 -724 126 -1320 654 -1534 1359
        -35 116 -74 314 -74 377 l0 34 90 0 c112 0 159 20 190 80 25 50 25 90 0 140
        -31 60 -78 80 -191 80 l-92 0 7 72 c18 194 89 436 186 634 240 487 669 852
        1187 1009 121 37 300 73 371 74 l42 1 0 -90z"/>
        <path d="M2390 3896 c-345 -62 -616 -264 -769 -573 -80 -162 -106 -280 -105
        -473 1 -123 5 -160 28 -245 50 -192 87 -251 515 -825 411 -552 426 -570 501
        -570 75 0 90 18 501 570 429 575 466 635 514 824 141 557 -197 1130 -751 1272
        -123 31 -319 40 -434 20z m262 -597 c86 -19 158 -59 223 -124 259 -258 118
        -695 -244 -757 -141 -24 -280 21 -386 127 -178 176 -178 454 0 630 112 112
        257 156 407 124z"/>
        <path d="M2488 2989 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 21 -11
        53 -20 70 -20 76 0 150 74 150 150 0 50 -35 107 -80 130 -49 25 -94 25 -142
        -1z"/>
        </g>
        </svg>
      </button>
    </div>
  )
}
