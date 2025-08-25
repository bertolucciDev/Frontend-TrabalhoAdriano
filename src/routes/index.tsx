import Dashboard from '@/pages/Home/DashboarPage';
import LandingPage from '@/pages/Auth/Ladingpage/LandingPage';
import Login from '@/pages/Auth/Login/LoginPage';
import RecoverPassword from '@/pages/Auth/PasswordReset/RecoverPassword';
import Register from '@/pages/Auth/Registro/RegisterPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/recoverpass' element={<RecoverPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}