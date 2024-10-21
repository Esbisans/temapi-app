import { createSlice } from "@reduxjs/toolkit";



export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        isProfileMenuOpen: false,
        activeSection: 'chat',
    },
    reducers: {
        toggleProfileMenu: state => {
            state.isProfileMenuOpen = !state.isProfileMenuOpen;
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload;
        }
    }
});

export const { toggleProfileMenu, setActiveSection } = UISlice.actions;