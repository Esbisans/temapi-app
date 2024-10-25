import React, { useContext, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '../hooks/useMapbox';
import { useMapStore } from '../hooks/useMapStore';
import { SocketContext } from '../store/SocketContext';
import { useAuthStore } from '../hooks/useAuthStore';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


export const Map = () => {

  const initialCoords = {
    lng: -74.5,
    lat: 40,
    zoom: 9
  }

  const { coords, setRef, addUserMarker, addActiveMarker, updateMarkerLocation, flyToUserMarker } = useMapbox(initialCoords);

  const {socket} = useContext(SocketContext);
  const { userMarker, activeMarkers, markerExists} = useMapStore();
  const {user} = useAuthStore();

  useEffect(() => {

    if (markerExists) {
      socket.emit('new:marker', userMarker);
      console.log('new marker emitted');
    }

  }, [socket, markerExists])

  useEffect(() => {

    socket.on('new:marker', (marker) => {
      console.log('new marker received', marker);
      addActiveMarker(marker, marker.id);
    });

  }, [socket])

  useEffect(() => {
    socket.on('active:markers' , (markers) => {
      console.log('active markers received', markers);

      for (const key of Object.keys(markers)) {
        console.log('marker', key);
        if (key === user.uid) {
          addUserMarker(markers[key], key);
        } else {
          addActiveMarker(markers[key], key);
        }
      }
    })
  } , [socket])

  // Emit active markers on map component mount
  useEffect(() => {
    socket.emit('active:markers');
  }, [socket])

  useEffect(() => {
    socket.on('update:marker', (marker) => {
      updateMarkerLocation(marker);
    })
  }, [socket])

  useEffect(() => {
    if (userMarker.id){
      socket.emit('update:marker', userMarker);
    }
  }, [socket, userMarker])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={setRef} style={{ width: '100%', height: '100vh'}} className='map-container ml-5'/>
      <button
        onClick={flyToUserMarker}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1,
        }}
      >
        fly
      </button>
    </div>
  )
}
