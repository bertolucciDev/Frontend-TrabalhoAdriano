import TaskManagerAdmin from '@/screens/app/admin/taskmanagerAdmin';
import Dashboard from '@/screens/app/Home';
import TasksManager from '@/screens/app/ManagerTask';
import LandingPage from '@/screens/Auth/Home';
import Login from '@/screens/Auth/Login';
import RecoverPassword from '@/screens/Auth/PasswordReset';
import RecoverStep1 from '@/screens/Auth/PasswordReset/steps/step1';
import ResetPassword from '@/screens/Auth/PasswordReset/steps/step2';
import Register from '@/screens/Auth/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/private';
import PublicRoute from '@/routes/public';

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                } />
                <Route path='/recoverpass' element={
                    <PublicRoute>
                        <RecoverPassword />
                    </PublicRoute>
                } />
                <Route path='/register' element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path='/step1' element={
                    <PublicRoute>
                        <RecoverStep1 />
                    </PublicRoute>
                } />
                <Route path='/step2' element={
                    <PublicRoute>
                        <ResetPassword />
                    </PublicRoute>
                } />

                <Route path='/dashboard' element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path='/taskmanager' element={
                    <ProtectedRoute>
                        <TasksManager />
                    </ProtectedRoute>
                } />
                <Route path='/taskmanageradmin' element={
                    <ProtectedRoute>
                        <TaskManagerAdmin />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}