import { useRef, useState, useEffect, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAuthStore } from './useAuthStore'
import { useMapStore } from './useMapStore';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


export const useMapbox = (initialCoords) => {

    const imageUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

    const {user} = useAuthStore();
    const {userMarker, setUserMarker, setMarkerExists, setMarkerActive} = useMapStore();

    const mapRef = useRef();
    const setRef = useCallback((node) => {
        mapRef.current = node;
    }, []);

    const map = useRef();
    const [coords, setCoords] = useState(initialCoords);
    
    const markerRef = useRef(null);
    const activeMarkersRef = useRef({});


    const customMarker = () => {
        const el = document.createElement('div');

        el.innerHTML = `
        <svg class="e-marker" fill= "#060F60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 130.7" width="36">
            <defs>
                <clipPath id="circle">
                    <path d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
                </clipPath>
            </defs>
            <path class="e-marker__marker" d="M60.7,45.4C54.1,38.8,45.3,35.2,36,35.2c-9.3,0-18.1,3.6-24.7,10.3C4.6,52,1,60.8,1,70.2c0,6.3,1.5,11.6,4.6,16.7
            C8.4,91.3,12.1,95,16,98.9c7.3,7.2,15.5,15.4,19,30.5c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c3.5-15.1,11.7-23.3,19-30.5
            c3.9-3.9,7.6-7.6,10.4-12.1c3.1-5.1,4.6-10.3,4.6-16.7C71,60.8,67.4,52,60.7,45.4z M36,97.4c-15,0-27.3-12.2-27.3-27.3
            S21,42.9,36,42.9c15,0,27.3,12.2,27.3,27.3C63.3,85.2,51,97.4,36,97.4z"/>
            <path class="e-marker__circle" d="M36,97.4c15,0,27.3-12.2,27.3-27.3c0-15-12.2-27.3-27.3-27.3S8.7,55.1,8.7,70.2S21,97.4,36,97.4z"/>
            <image class="e-marker__image" width="100%" height="100%" clip-path="url(#circle)" href="${imageUrl}" />
        </svg>
        `;
        return el;
    }

    const addUserMarker = useCallback((ev, id) => {
        const { lng, lat } = ev.lngLat || ev;

        if (!activeMarkersRef.current[user.uid]) {
            // Crear un nuevo marcador si no existe

            const markerElement = customMarker();

            const marker = new mapboxgl.Marker({ 
                element: markerElement,
                draggable: true,
                offset: [0, -35] 

            })
                .setLngLat([lng, lat])
                .addTo(map.current)

            marker.id = id ?? user.uid;
            markerRef.current = marker; 
            activeMarkersRef.current[marker.id] = marker;

            setUserMarker({ lng, lat, id: user.uid, userName: user.name });
            if (!id) {
                setMarkerExists(true);
            }

            marker.on('drag', () => {
                const { lng, lat } = marker.getLngLat();
                setUserMarker({ lng, lat, id: user.uid, userName: user.name });
            });


        } else {
            // Move the marker to the new position
            activeMarkersRef.current[user.uid].setLngLat([lng, lat]);

            setUserMarker({ lng, lat, id: user.uid, userName: user.name });
        }

    }, []);

    const addActiveMarker = useCallback((activeMarker, id) => {

        if (activeMarkersRef.current[id]) {
            // if the marker already exists, update its location
            updateMarkerLocation(activeMarker);
            return;
        }

        const { lng, lat, userName } = activeMarker;

        const markerElement = customMarker();

        const popup = new mapboxgl.Popup({
            closeButton: false, 
            closeOnClick: false,
            offset: [0, -50] 
        }).setText(userName);

        const marker = new mapboxgl.Marker({ 
            element: markerElement,
            offset: [0, -35] 
        })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map.current)

        marker.id = id;

        // Show the popup when the mouse enters the marker
        markerElement.addEventListener('mouseenter', () => {
            marker.togglePopup()
            markerElement.style.cursor = 'default';
        }
    );
    
        // Hide the popup when the mouse leaves the marker
        markerElement.addEventListener('mouseleave', () => marker.togglePopup());

        activeMarkersRef.current[marker.id] = marker;

    } , []);

    const updateMarkerLocation = useCallback((marker) => {
        const { lng, lat, id } = marker;
        activeMarkersRef.current[id].setLngLat([lng, lat]);
    } , []);

    const deleteActiveMarker = useCallback((id) => {
        const marker = activeMarkersRef.current[id];
        if (marker) {
            marker.remove(); 
            delete activeMarkersRef.current[id]; 
        }
    }, []);

    const flyToUserMarker = useCallback(() => {
        if (Object.keys(userMarker).length > 0) {
            map.current.flyTo({
                center: activeMarkersRef.current[user.uid].getLngLat(),
                essential: true
            });
        }
    } , [userMarker]);

    const flyToActiveMarker = useCallback((id) => {
        if (activeMarkersRef.current[id]) {
            map.current.flyTo({
                center: activeMarkersRef.current[id].getLngLat(),
                essential: true
            });
            setMarkerActive(null);
        }
    }, []);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [initialCoords.lng, initialCoords.lat],
            zoom: initialCoords.zoom
        });

        return () => map.current.remove();
    } , []);


    useEffect(() => {
        map.current.on('move', () => {
            const { lng, lat } = map.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.current.getZoom().toFixed(2)
            });
        });
    } , []);

    useEffect(() => { 
        map.current.on('click', addUserMarker);
    } , [addUserMarker]);


    return { 
        coords,

        setRef,
        addUserMarker,
        addActiveMarker,
        updateMarkerLocation,
        deleteActiveMarker,
        flyToUserMarker,
        flyToActiveMarker
    };
}