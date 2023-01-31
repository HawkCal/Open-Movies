import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import '../styles/NavBarStyle.css';

export default function NavBar() {
  const [ user, loading, error ] = useAuthState(auth);
  const location = useLocation();

  return (
    <ul className='navBar'>
      <li className='navItem'>
        <Link to='/'>Movies</Link>
      </li>
      <li className='navItem'>
        {
          user ?
            <Link to='/account'>Account</Link>
            :
            <Link
              to='/login'
              state={{ previousRoute: [ '/login', '/register' ].includes(location.pathname) ? '/' : location.pathname }}
            >Log In
            </Link>
        }
      </li>
    </ul>
  );
}