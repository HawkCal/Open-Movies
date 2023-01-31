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

const router = createBrowserRouter([
  {
    path: '/Open-Movies',
    element: <Root />,
    children: [
      {
        path: '/Open-Movies',
        element: <Movies />
      },
      {
        path: '/Open-Movies/:id',
        element: <MoviePage />
      },
      {
        path: '/Open-Movies/login',
        element: <Login />
      },
      {
        path: '/Open-Movies/register',
        element: <Register />
      },
      {
        path: '/Open-Movies/account',
        element: <Account />
      },
      {
        path: '/Open-Movies/resetpassword',
        element: <ResetPassword />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
