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
        <Link to='/Open-Movies'>Movies</Link>
      </li>
      <li className='navItem'>
        {
          user ?
            <Link to='/Open-Movies/account'>Account</Link>
            :
            <Link
              to='/Open-Movies/login'
              state={{ previousRoute: [ '/Open-Movies/login', '/Open-Movies/register' ].includes(location.pathname) ? '/Open-Movies' : location.pathname }}
            >Log In
            </Link>
        }
      </li>
    </ul>
  );
}