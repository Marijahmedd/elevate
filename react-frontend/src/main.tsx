import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import JobListing from './pages/job-listing/JobListing.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import JobListingLayout from './layouts/JobListingLayout.tsx'
import UserLayout from './layouts/UserLayout.tsx'
import Profile from './pages/profile/Profile.tsx'
import RecruiterRoute from './components/RecruiterRoute.tsx'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard.tsx'
import RecruiterRegister from './pages/recruiter/register-recruiter/RecruiterRegister.tsx'
import RecruiterLayout from './layouts/RecruiterLayout.tsx'
import AiSearch from './pages/ai-search/AiSearch.tsx'
import RecruiterJobDetails from './pages/recruiter/job-details/JobDetails.tsx'
import RecruiterJobCreate from './pages/recruiter/create-job/RecruiterJobCreate.tsx'
import Home from './pages/home/Home.tsx'


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

                <Route element={<RecruiterRegister />} path='recruiter/register' />
              </Route>
            </Route>

            <Route element={< UserLayout />}>
              <Route element={<AiSearch />} path='ai-search' />
            </Route>

            <Route element={< JobListingLayout />}>
              <Route element={<JobListing />} path='jobs' />
            </Route>


            <Route element={<Home />} path='/' />


            <Route element={< ProtectedRoute />}>
              <Route element={< RecruiterRoute />}>
                <Route element={< RecruiterLayout />}>
                  <Route element={<RecruiterDashboard />} path='recruiter' />
                  <Route element={<RecruiterJobCreate />} path='recruiter/jobs/new' />

                  <Route element={<RecruiterJobDetails />} path='recruiter/jobs/:jobId' />
                </Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  </GoogleOAuthProvider >,
)
