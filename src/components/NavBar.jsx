import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import '../styles/NavBarStyle.css';

export default function NavBar() {
  const [ user, loading, error ] = useAuthState(auth);
  const { genre } = useParams();
  const location = useLocation();
  const navigate = useNavigate();



  function handleChange(e) {
    navigate(`/movies/${e.target.value}`);
  }

  const genreSelect = <div id='moviesListControls'>
    <select id='genreSelect' value={genre} onChange={e => handleChange(e)}>
      <option value='All'>All</option>
      <option value='Horror'>Horror</option>
      <option value='Thriller'>Thriller</option>
      <option value='Mystery'>Mystery</option>
      <option value='Crime'>Crime</option>
      <option value='Sci-Fi'>Sci-Fi</option>
      <option value='Film-Noir'>Film-Noir</option>
      <option value='Drama'>Drama</option>
      <option value='Action'>Action</option>
    </select>
  </div>;

  return (
    <div id='navContainer'>
      <ul className='navBar'>
        <li className='navItem'>
          <Link to='/'>Home</Link>
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
        <li className='navItem'>
          <Link to='/movies/All'>Movies</Link>
        </li>
        {
          location.pathname.includes('movies') && genreSelect
        }
      </ul>
    </div>
  );
}