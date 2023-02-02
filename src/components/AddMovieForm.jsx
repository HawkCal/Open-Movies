import { useState } from 'react';
import { addMovie } from '../firebase/firestore';
import { uploadPoster } from '../firebase/storage';
import InputContainer from './InputContainer';

export default function AddMovieForm() {
  const [ title, setTitle ] = useState('');
  const [ releaseDate, setReleaseDate ] = useState('');
  const [ length, setLength ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ poster, setPoster ] = useState('');
  const [ url, setUrl ] = useState('');
  const [ genres, setGenres ] = useState('');

  function handleChange(e) {
    e.preventDefault();
    if (e.target.id === 'title') setTitle(e.target.value);
    else if (e.target.id === 'releaseDate') setReleaseDate(e.target.value);
    else if (e.target.id === 'length') setLength(e.target.value);
    else if (e.target.id === 'description') setDescription(e.target.value);
    else if (e.target.id === 'url') setUrl(e.target.value);
    else if (e.target.id === 'genres') setGenres(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const genresList = genres.split(' ');
    const posterUrl = await uploadPoster(poster);
    addMovie({
      title: title,
      releaseDate: releaseDate,
      length: length,
      description: description,
      posterUrl: posterUrl,
      url: url,
      genres: genresList
    });
    setTitle('');
    setReleaseDate('');
    setLength('');
    setDescription('');
    setPoster('');
    setUrl('');
    setGenres('');
  }

  function handleInput(e) {
    setPoster(e.target.files[ 0 ]);
  }

  return (
    <div id='loginFormContainer'>
      <h1>Add Movie</h1>
      <form id='loginForm' onSubmit={e => handleSubmit(e)}>
        <InputContainer
          type='text'
          id='title'
          inputClassName=''
          placeHolder='Title'
          value={title}
          handleChange={handleChange}
          errorText={null}
        />
        <InputContainer
          type='text'
          id='releaseDate'
          inputClassName=''
          placeHolder='Release Date'
          value={releaseDate}
          handleChange={handleChange}
          errorText={null}
        />
        <InputContainer
          type='text'
          id='length'
          inputClassName=''
          placeHolder='Length'
          value={length}
          handleChange={handleChange}
          errorText={null}
        />
        <InputContainer
          type='text'
          id='description'
          inputClassName=''
          placeHolder='Description'
          value={description}
          handleChange={handleChange}
          errorText={null}
        />
        <InputContainer
          type='text'
          id='url'
          inputClassName=''
          placeHolder='Url'
          value={url}
          handleChange={handleChange}
          errorText={null}
        />
        <input type='file' onInput={e => handleInput(e)}></input>
        <textarea id='genres' placeholder='Genres' value={genres} onChange={e => handleChange(e)}></textarea>
        <div className='inputContainer'>
          <input id='submitBtn' type='submit' value='Submit' />
        </div>
      </form>
    </div>
  );
}