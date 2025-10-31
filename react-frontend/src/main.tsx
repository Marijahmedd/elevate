import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Login from './pages/login/Login.tsx'
import JobListing from './pages/job-listing/JobListing.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import JobListingLayout from './layouts/JobListingLayout.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import Profile from './pages/profile/Profile.tsx'


export const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="848342217121-rtfr8987cd6qboig7loc2gm7dk7ugv4k.apps.googleusercontent.com">
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>

            <Route element={<ProtectedRoute />}>
              <Route element={< UserLayout />}>
                <Route element={<Profile />} path='profile' />
              </Route>
            </Route>


            <Route element={< JobListingLayout />}>
              <Route element={<JobListing />} path='jobs' />
            </Route>
            <Route element={<Login />} path='login' />

          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  </GoogleOAuthProvider >,
)
