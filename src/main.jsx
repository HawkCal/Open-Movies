import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './routes/Root';
import Movies from './routes/Movies';
import MoviePage from './routes/MoviePage';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import Account from './routes/Account';
import ResetPassword from './routes/ResetPassword';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/Open-Movies' >
      <Routes>
        <Route path='/' element={<Root />}>
          <Route path='/' element={<Movies />} />
          <Route path='/:id' element={<MoviePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<Account />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
