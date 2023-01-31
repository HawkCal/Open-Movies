import { useState, useEffect } from 'react';
import { getMovies } from '../firebase/firestore';
import MovieCard from "../components/MovieCard";
import '../styles/MoviesRouteStyle.css';

export default function Movies() {
  let [ movies, setMovies ] = useState([]);
  const [ displayMovies, setDisplayMovies ] = useState([]);
  const [ displayGenre, setDisplayGenre ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');

  useEffect(() => {
    getMovies()
      .then(res => {
        setMovies(res);
        setDisplayMovies(res);
      });
  }, []);

  useEffect(() => {
    let filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()));
    setDisplayMovies(filteredMovies);
  }, [ searchValue ]);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.id === 'genreSelect') setDisplayGenre(e.target.value);
    else if (e.target.id === 'movieSearch') setSearchValue(e.target.value);
  }

  return (
    <div>
      <div id='moviesListControls'>
        <select id='genreSelect' onChange={e => handleChange(e)}>
          <option value=''>All</option>
          <option value='Horror'>Horror</option>
          <option value='Thriller'>Thriller</option>
          <option value='Mystery'>Mystery</option>
          <option value='Crime'>Crime</option>
          <option value='Sci-Fi'>Sci-Fi</option>
          <option value='Film-Noir'>Film-Noir</option>
          <option value='Drama'>Drama</option>
          <option value='Romance'>Romance</option>
        </select>
        <input
          type='text'
          id='movieSearch'
          value={searchValue}
          onChange={e => handleChange(e)}
          placeholder='Search'
        ></input>
      </div>
      <ul className='moviesList'>
        {
          displayMovies.length > 0 ?
            displayMovies.map(movie => {
              return [ ...movie.genres, '' ].includes(displayGenre) ?
                <MovieCard key={movie.id} data={movie} />
                :
                null;
            })
            :
            ''
        }
      </ul>
    </div>
  );
}