import Dashboard from '@/screens/app/Home';
import TasksManager from '@/screens/app/ManagerTask';
import LandingPage from '@/screens/Auth/Home';
import Login from '@/screens/Auth/Login';
import RecoverPassword from '@/screens/Auth/PasswordReset';
import RecoverStep1 from '@/screens/Auth/PasswordReset/steps/step1';
import ResetPassword from '@/screens/Auth/PasswordReset/steps/step2';
import Register from '@/screens/Auth/Register';
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
                <Route path='/taskmanager' element={<TasksManager />} />
                <Route path='/step1' element={<RecoverStep1 />} />
                <Route path='/step2' element={<ResetPassword />} />
            </Routes>
        </BrowserRouter>
    )
}