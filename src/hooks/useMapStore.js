import { useDispatch, useSelector } from "react-redux";
import { onSetActiveMarkers, onSetUserMarker, onSetMarkerExists } from "../store/map/mapSlice";



export const useMapStore = () => {

    const {userMarker, activeMarkers, markerExists} = useSelector(state => state.map);
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

    return {
        userMarker,
        activeMarkers,
        markerExists,

        setUserMarker,
        setActiveMarkers,
        setMarkerExists
    }

}   