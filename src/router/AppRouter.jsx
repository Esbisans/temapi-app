import { useEffect } from 'react'
import { useAuthStore } from '../hooks/useAuthStore';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { TemapiApp } from '../TemapiApp';
import { RegisterPage } from '../auth/pages/RegisterPage';
import { Toaster } from 'react-hot-toast';
import { LoadingPage } from '../auth/pages/LoadingPage';

export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => { 
        checkAuthToken();
    }, []);

    if (status === 'checking') {
        return (
            <>
                <Toaster
                    position="top-left"
                    reverseOrder={true}
                />
                <LoadingPage />
            </>
        )
    }

    return (
        <>
            <Toaster 
                  position="top-left"
                  reverseOrder={true}
            />
        <Routes>
            {
                status === 'not-authenticated' || status === 'logout'
                ? (
                    <>
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                )

                : (
                    <>
                        <Route path="/" element={<TemapiApp />}/>
                        <Route path="/*" element={<Navigate to="/" />}/>
                    </>
                )
            }

        </Routes>
        </>
    )
}
