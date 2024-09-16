import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import FloatingShape from './components/FloatingShape'

import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import EmailVerificationPage from './Pages/EmailVerificationPage'
import DashboardPage from './Pages/DashboardPage'
import LoadingSpinner from './components/LoadingSpinner'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ResetPasswordPage from './Pages/ResetPasswordPage'

import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

// Redirect authenticated users to the home page
// 이것도 한번 봐야겠네
const RedirectAuthenticatedUser = ({ children }) => { 
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children; //children 요소를 렌더링한다.
}

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gradient-to-br text-white
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5}/>
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2}/>

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute>} />
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <SignUpPage /> 
          </RedirectAuthenticatedUser>} />
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <LoginPage /> 
          </RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgotPasswordPage /> 
          </RedirectAuthenticatedUser>
        } />
        <Route path='/reset-password/:token' 
        element={<RedirectAuthenticatedUser>
          <ResetPasswordPage /> 
        </RedirectAuthenticatedUser>}/>
        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
