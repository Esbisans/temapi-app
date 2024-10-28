import { useDispatch, useSelector } from "react-redux";
import { setActiveSection, toggleProfileMenu, uiLogout } from "../store/UI/UISlice";


export const useUIStore = () => {
    const { isProfileMenuOpen, activeSection } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    
    const setIsProfileMenuOpen = () => {
        dispatch(toggleProfileMenu());
    };

    const activateSection = (section) => {
        dispatch(setActiveSection(section));
    }

    const logoutClearUI = () => {
        dispatch(uiLogout());
    }

    return { isProfileMenuOpen, activeSection, setIsProfileMenuOpen, activateSection, logoutClearUI };
}