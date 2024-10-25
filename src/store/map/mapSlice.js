import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userMarker: {},
    activeMarkers: [],
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
    },
    
});

export const { onSetUserMarker, onSetActiveMarkers, onSetMarkerExists } = mapSlice.actions;