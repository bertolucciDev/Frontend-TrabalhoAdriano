import Dashboard from '@/pages/DashboarPage';
import Login from '@/pages/LoginPage';
import Register from '@/pages/RegisterPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}