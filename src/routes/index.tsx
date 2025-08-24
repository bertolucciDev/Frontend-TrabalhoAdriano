import Dashboard from '@/pages/DashboarPage';
import LandingPage from '@/pages/LandingPage';
import Login from '@/pages/LoginPage';
import RecoverPassword from '@/pages/RecoverPassword';
import Register from '@/pages/RegisterPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/recoverpass' element={<RecoverPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}