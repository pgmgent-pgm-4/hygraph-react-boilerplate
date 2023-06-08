import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// React Router v6 imports
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route
} from "react-router-dom";

// Custom compoments
import App from './app';
import * as AppRoutes from './app/routes';

// Utilities
import { CommunitiesPage, DashboardPage, HomePage, PostDetailsPage, PostsPage, ProfilePage, Signin, Signup } from './app/pages';
import { AuthProvider, HygraphProvider } from './app/context';
import { AuthLayout, PublicLayout, UserLayout } from './app/components/layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HygraphProvider>
        <AuthProvider>
          <Routes>
            <Route element={<App />}>
              <Route path={AppRoutes.LANDING} element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path={AppRoutes.HOME} element={<Navigate to="/" replace={true} />} />
                <Route path={AppRoutes.POSTS} element={<PostsPage />} />  
                <Route path={AppRoutes.POST_DETAILS} element={<PostDetailsPage />} />
                <Route path={AppRoutes.COMMUNITIES} element={<CommunitiesPage />} /> 
              </Route> 
              <Route path="auth" element={<AuthLayout />}>
                <Route index element ={<Navigate to={AppRoutes.AUTH_SIGN_IN} replace={true} />} />
                <Route path={AppRoutes.AUTH_SIGN_IN} element ={<Signin />} />
                <Route path={AppRoutes.AUTH_SIGN_UP} element ={<Signup />} />
              </Route>           
              <Route path="user" element={<UserLayout />}>
                <Route index element ={<DashboardPage />} />
                <Route path="profile" element ={<ProfilePage/>} />
              </Route>
              <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>There's nothing here!</p>
                    </main>
                  }
                />
            </Route>
          </Routes>
        </AuthProvider> 
      </HygraphProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
