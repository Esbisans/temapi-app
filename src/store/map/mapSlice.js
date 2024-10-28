import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userMarker: {},
    activeMarkers: [],
    markerActive: null,
    markerExists: false,
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        onSetUserMarker: (state, action) => {
            state.userMarker = action.payload;
        },
        onSetActiveMarkers: (state, action) => {
            state.activeMarkers = action.payload;
        },
        onSetMarkerExists: (state, action) => {
            state.markerExists = action.payload;
        },
        onSetMarkerActive: (state, action) => {
            state.markerActive = action.payload;
        },
        onAddMarkerActive: (state, action) => {
            const marker = action.payload;
            state.activeMarkers[marker.id] = marker;
        },
        mapLogout: () => initialState,
    },
    
});

export const { onSetUserMarker, onSetActiveMarkers, onSetMarkerExists, onSetMarkerActive, onAddMarkerActive, mapLogout } = mapSlice.actions;