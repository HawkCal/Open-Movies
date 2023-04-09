import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserInfoById } from '../firebase/firestore';
import { getAllMovies } from '../firebase/firestore';
import DeleteMovieCard from '../components/DeleteMovieCard';
import '../styles/DeleteMovieStyle.css';

export default function DeleteMovie() {
  const [ user, loading, error ] = useAuthState(auth);
  const [ movies, setMovies ] = useState([]);
  const [ moviesToggle, setMoviesToggle ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate(-1);
    if (user) {
      getUserInfoById(user.uid)
        .then(res => {
          if (!res.isAdmin) navigate(-1);
          else setIsAdmin(true);
        });
    }
  }, [ user, loading ]);

  useEffect(() => {
    getAllMovies()
      .then(res => setMovies(res));
  }, [ moviesToggle ]);

  return (
    <>
      <div id='deleteMovieContainer'>
        {
          !isAdmin
            ?
            ''
            :
            <>
              <h1>Delete Movies</h1>
              <ul id='deleteMovieList'>
                {movies ? movies.map(movie => <DeleteMovieCard key={movie.id} movieData={movie} moviesToggle={moviesToggle} setMoviesToggle={setMoviesToggle} />) : ''}
              </ul>
            </>
        }
      </div>
    </>
  );
}