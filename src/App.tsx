import './App.css'
import Authenticated from '@layout/Authenticated'
import { Routes, Route } from 'react-router-dom';
import  Dashboard from '@modules/dashboard'
import Login from '@modules/login';
import NotFound from '@component/NotFound';
import { Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '@contexts/auth.context';
import Register from '@modules/register';
import Profile from '@modules/profile';
import { useUserStore, UserRole } from './stores/user';
import { useShallow } from 'zustand/shallow';
import UserManagement from '@modules/user';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Authenticated />
  ) : (
    <>
      <Navigate to="/" replace/>
      <Login /> 
    </>
  );
};

const RenderRoute = {
  admin: (
    <>
      <Route path="user-management" element={<UserManagement />} />
    </>
  ),
  merchant: (
    <>
      <Route path="/profile" element={<Profile />} />
      <Route path="categories" element={<Dashboard />} />
    </>
  )
}

function App() {
  const { user } = useUserStore(
    useShallow((state) => ({
      user: state.user,
    }))
  )

  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/register' element={<Register />} />

        <Route path="/" element={<ProtectedRoute />}>
          { RenderRoute[user?.roles?.[0] as keyof typeof RenderRoute] }
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
