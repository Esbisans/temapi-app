import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import temapiApi from "../api/temapiApi";
import toast from "react-hot-toast";
import { useChatStore } from "./useChatStore";
import { useMapStore } from "./useMapStore";
import { useUIStore } from "./useUIStore";


export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    
    const {logoutClearChat} = useChatStore();
    const {logoutClearMap} = useMapStore();
    const {logoutClearUI} = useUIStore();

    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {

        dispatch( onChecking());

        const loginPromise = temapiApi.post('/api/login', { email, password });

        toast.promise(
            loginPromise,
            {
                loading: 'Logging in...',
                success: (data) => `Successfully logged in as ${data.data.user.name}`,
                error: (error) => {
                    const errorMessage = error.response?.data?.msg || error.message;
                    return `Login failed: ${errorMessage}`;
                },
            },
            {
                success: {
                    duration: 5000,
                },
                error: {
                    duration: 5000,
                },
            }
        );

        try {
            
            //const {data} = await temapiApi.post('/api/login', { email, password });
            const { data } = await loginPromise;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid, avatar: user.avatar}));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('login error'));
        }
    }

    const startRegister = async ({ name, email, password, avatar }) => {

        dispatch( onChecking());

        const registerPromise = temapiApi.post('/api/login/new', { name, email, password, avatar });

        toast.promise(
            registerPromise,
            {
                loading: 'Registering...',
                success: (data) => `Successfully registered as ${data.data.user.name}`,
                error: (error) => {
                    const errorMessage = error.response?.data?.msg || error.message;
                    return `Registration failed: ${errorMessage}`;
                },
            },
            {
                success: {
                    duration: 5000,
                },
                error: {
                    duration: 5000,
                },
            }
        );

        try {
            const { data } = await registerPromise;
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid, avatar: user.avatar}));

        } catch (error) {
            console.log(error);
            dispatch(onLogout('login error'));
        }
    }

    const startDeleteUser = async() => {

            const deletePromise = temapiApi.delete(`/api/login/delete/${user.uid}`);
    
            toast.promise(
                deletePromise,
                {
                    loading: 'Deleting user...',
                    success: (data) => 'Successfully deleted user',
                    error: (error) => {
                        const errorMessage = error.response?.data?.msg || error.message;
                        return `Deletion failed: ${errorMessage}`;
                    },
                },
                {
                    success: {
                        duration: 5000,
                    },
                    error: {
                        duration: 5000,
                    },
                }
            );

            try {

                //const {data} = await temapiApi.delete(`/api/login/delete/${uid}`);
                const { data } = await deletePromise;

                localStorage.clear();
                dispatch(onLogout(data.msg));
                logoutClearChat();
                logoutClearMap();
                logoutClearUI();
            } catch (error) {
                console.log(error);
            }
    }

    const checkAuthToken = async () => {
    
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(onLogout());
            return;
        }
    
        try {
            const {data} = await temapiApi.get('/api/login/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            const {user} = data;
            dispatch(onLogin({name: user.name, uid: user.uid, avatar: user.avatar}));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    const startLogout = () => {
        toast.success('Successfully logged out', {
            duration: 5000, 
        });
        localStorage.clear();
        dispatch(onLogout());
        logoutClearChat();
        logoutClearMap();
        logoutClearUI();
    }

    return {
        // Properties
        status,
        user,
        errorMessage,
        
        // Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
        startDeleteUser
    }
}
