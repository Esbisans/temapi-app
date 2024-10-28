import { useDispatch, useSelector } from "react-redux";
import { onSetActiveMarkers, onSetUserMarker, onSetMarkerExists, onSetMarkerActive, onAddMarkerActive, mapLogout } from "../store/map/mapSlice";



export const useMapStore = () => {

    const {userMarker, activeMarkers, markerExists, markerActive} = useSelector(state => state.map);
    const dispatch = useDispatch();

    const setUserMarker = (userMarker) => {
        dispatch( onSetUserMarker(userMarker) );
    }

    const setActiveMarkers = (activeMarker) => {
        dispatch( onSetActiveMarkers(activeMarker) );
    }

    const setMarkerExists = (markerExists) => {
        dispatch( onSetMarkerExists(markerExists) );
    }

    const setMarkerActive = (markerActive) => {
        dispatch( onSetMarkerActive(markerActive) );
    }

    const appendActiveMarker = (activeMarker) => {
        dispatch( onAddMarkerActive(activeMarker) );
    }

    const logoutClearMap = () => {
        dispatch( mapLogout() );
    }

    return {
        userMarker,
        activeMarkers,
        markerExists,
        markerActive,

        setUserMarker,
        setActiveMarkers,
        setMarkerExists,
        setMarkerActive,
        appendActiveMarker,
        logoutClearMap
    }

}   