import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import Review from './Review';
import UserReviewContainer from './UserReviewContainer';

export default function ReviewsList({
  reviews,
  movieId,
  movieTitle,
  reviewsLoading,
  reviewClickHandler
}) {
  const [ user, loading, error ] = useAuthState(auth);
  const location = useLocation();
  const [ sorterValue, setSorterValue ] = useState('dateCreatedDescending');
  const userReview = user ? reviews.find(review => review.movieId === movieId && review.userId === user.uid) : null;

  function sortReviews(unsortedReviews) {
    let sortedReviews = [ ...unsortedReviews ];

    if (sorterValue === 'dateCreatedDescending') sortedReviews.sort((a, b) => b.dateCreated - a.dateCreated);
    else if (sorterValue === 'dateCreatedAscending') sortedReviews.sort((a, b) => a.dateCreated - b.dateCreated);
    else if (sorterValue === 'ratingDescending') sortedReviews.sort((a, b) => b.rating - a.rating);
    else if (sorterValue === 'ratingAscending') sortedReviews.sort((a, b) => a.rating - b.rating);

    return sortedReviews;
  }

  function handleChange(e) {
    if (e.target.id === 'selectSorterValue') setSorterValue(e.target.value);
  }

  const reviewsList = sortReviews(reviews).map(review => {
    return (
      (userReview) && (review.id === userReview.id)
        ?
        null
        :
        <li onClick={() => reviewClickHandler ? reviewClickHandler(review.movieId) : null} key={review.id}><Review data={review} /></li>
    );
  });

  return (
    <div id='reviewsList'>
      {
        location.pathname === '/account'
          ?
          null
          :
          <UserReviewContainer
            reviewsLoading={reviewsLoading}
            user={user}
            userReview={userReview}
            movieId={movieId}
            movieTitle={movieTitle}
            previousPathName={location.pathname}
          />
      }
      <div>
        <div style={{ display: reviews.length > 0 ? 'block' : 'none' }}>
          <select id='selectSorterValue' onChange={(e) => handleChange(e)}>
            <option value='dateCreatedDescending'>Date Descending</option>
            <option value='dateCreatedAscending'>Date Ascending</option>
            <option value='ratingDescending'>Rating Descending</option>
            <option value='ratingAscending'>Rating Ascending</option>
          </select>
        </div>
        <ul>
          {reviewsList}
        </ul>
      </div>
    </div>
  );
}