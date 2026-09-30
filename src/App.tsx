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

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path='/register' element={<Register />} />

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/categories" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
