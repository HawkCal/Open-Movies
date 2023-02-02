import { deleteMovie } from '../firebase/firestore';
import { deletePoster } from '../firebase/storage';

export default function DeleteMovieCard({ movieData, moviesToggle, setMoviesToggle }) {
  function handleClick() {
    deletePoster(movieData.title.toLowerCase());
    deleteMovie(movieData.id);
    setMoviesToggle(!moviesToggle);
  }

  return (
    <li className='deleteMovieCard'>
      {movieData.title}
      <button className='baseBtn' onClick={() => handleClick()}>X</button>
    </li>
  );
}