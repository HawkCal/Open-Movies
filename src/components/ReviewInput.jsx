import { useState } from 'react';
import { addReview, updateReview } from '../firebase/firestore';

export default function ReviewInput({
  movieId,
  movieTitle,
  userId,
  userName,
  reviewId,
  setIsEditing,
  previousText = null,
  previousRating = null
}) {
  const [ reviewText, setReviewText ] = useState(previousText || '');
  const [ reviewClassName, setReviewClassName ] = useState(null);
  const [ reviewErrorText, setReviewErrorText ] = useState('');
  const [ ratingValue, setRatingValue ] = useState(previousRating || 0);

  function handleChange(e) {
    e.preventDefault();
    if (e.target.id === 'reviewText') setReviewText(e.target.value);
    else if (e.target.id === 'ratingSelect') setRatingValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (reviewText.replace(/\s+/g, '').length === 0) {
      setReviewClassName('error');
      setReviewErrorText('Review can\'t be empty');
      return;
    }
    else {
      setReviewClassName(null);
      setReviewErrorText('');
    }

    if (previousText) {
      updateReview(reviewId, { text: reviewText, rating: ratingValue });
      setReviewText('');
      setRatingValue('');
      setIsEditing(false);
    }
    else {
      addReview({
        text: reviewText,
        rating: ratingValue,
        movieId: movieId,
        movieTitle: movieTitle,
        userId: userId,
        userName: userName,
        dateCreated: new Date()
      });
      setReviewText('');
      setRatingValue('');
    }
  }

  return (
    <form id='reviewInputForm' onSubmit={e => handleSubmit(e)}>
      <label>
        Rating:
        <select id='ratingSelect' value={ratingValue} onChange={e => handleChange(e)}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <textarea
        type='text'
        id='reviewText'
        className={reviewClassName}
        placeholder='Leave a review'
        value={reviewText}
        onChange={e => handleChange(e)}
      ></textarea>
      <p style={{ display: reviewErrorText ? 'block' : 'none', color: 'red' }}>{reviewErrorText}</p>
      <input id='submitReviewBtn' className='baseBtn' type='submit' value='Submit'></input>
    </form>
  );
}