import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import Movies from './routes/Movies';
import MoviePage from './routes/MoviePage';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Account from './routes/Account';
import ResetPassword from './routes/ResetPassword';
import AddMovie from './routes/AddMovie';
import DeleteMovie from './routes/DeleteMovie';
import LandingPage from './routes/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/movies/:genre',
        element: <Movies />
      },
      {
        path: '/:id',
        element: <MoviePage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/account',
        element: <Account />
      },
      {
        path: '/resetpassword',
        element: <ResetPassword />
      },
      {
        path: '/addmovie',
        element: <AddMovie />
      },
      {
        path: '/deletemovie',
        element: <DeleteMovie />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
