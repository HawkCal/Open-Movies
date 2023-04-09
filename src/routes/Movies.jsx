import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getNextMovies, getMoviesByGenre } from '../firebase/firestore';
import MovieCard from "../components/MovieCard";
import '../styles/MoviesRouteStyle.css';

export default function Movies() {
  const { genre } = useParams();
  const firstMount = useRef(true);
  let [ movies, setMovies ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (firstMount.current || loading) return;

    const getResults = async () => {
      setLoading(true);
      if (genre === 'All') {
        const results = await getNextMovies(movies[ movies.length - 1 ]);
        setMovies(prevMovies => [ ...prevMovies, ...results ]);
      }
      else {
        const results = await getMoviesByGenre(genre, movies[ movies.length - 1 ]);
        setMovies(prevMovies => [ ...prevMovies, ...results ]);
      }

      setLoading(false);
    };
    getResults();
  }, [ page ]);

  useEffect(() => {
    if (firstMount.current || loading) return;
    setLoading(true);
    async function getResults() {
      if (firstMount.current || loading) return;
      if (genre === 'All') {
        const results = await getNextMovies();
        setMovies(results);
      }
      else {
        const results = await getMoviesByGenre(genre);
        setMovies(results);
      }
      setLoading(false);
    }

    getResults();
  }, [ genre ]);

  useEffect(() => {
    firstMount.current = false;
    window.addEventListener('scroll', handleScroll);

    getNextMovies()
      .then(res => setMovies(res));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (
      document.documentElement.scrollHeight - window.innerHeight <=
      document.documentElement.scrollTop + 50
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }

  return (
    <>
      <div id='main'>
        <ul className='moviesList'>
          {
            movies.length > 0 && movies.map(movie => <MovieCard key={movie.id} data={movie} />)
          }
        </ul>
        <div className='loadingContainer'>
          <span className='loader' style={{ display: loading ? 'inline-block' : 'none' }}></span>
        </div>
      </div>
    </>
  );
}