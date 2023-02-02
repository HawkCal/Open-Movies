import { useState, useEffect } from 'react';
import { getMovies } from '../firebase/firestore';
import MovieCard from "../components/MovieCard";
import '../styles/MoviesRouteStyle.css';

export default function Movies() {
  let [ movies, setMovies ] = useState([]);
  const moviesPerPage = 27;
  const [ page, setPage ] = useState(1);
  const [ filteredMovies, setFilteredMovies ] = useState([]);
  const [ displayGenre, setDisplayGenre ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');

  useEffect(() => {
    getMovies()
      .then(res => {
        const splitMovies = splitMoviesByPage(res);
        setMovies(res);
        setFilteredMovies(splitMovies);
      });
  }, []);

  useEffect(() => {
    const filteredByGenre = movies.filter(movie => [ '', ...movie.genres ].includes(displayGenre));
    const filteredByTitle = filteredByGenre.filter(movie => movie.title.toLowerCase().includes(searchValue.toLowerCase()));
    setFilteredMovies(splitMoviesByPage(filteredByTitle));
  }, [ searchValue, displayGenre ]);

  function splitMoviesByPage(moviesList) {
    let splitMovies = [];
    let pages = Math.ceil(moviesList.length / moviesPerPage);
    for (let i = 0; i < pages; i++) {
      splitMovies.push(moviesList.slice((i) * moviesPerPage, moviesPerPage * (i + 1)));
    }

    return splitMovies;
  }

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
          filteredMovies.length > 0 ?
            filteredMovies[ page - 1 ].map(movie => <MovieCard key={movie.id} data={movie} />)
            :
            ''
        }
      </ul>
      <ul id='pagesList'>
        {filteredMovies.map((arr, index) => <li className='pageDisplay' id={page === index + 1 ? 'activePage' : ''} key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>)}
      </ul>
    </div>
  );
}