import { useState } from 'react';
import { deleteReview } from '../firebase/firestore';
import Review from './Review';
import ReviewInput from './ReviewInput';

export default function UserReview({ data }) {
  const [ isEditing, setIsEditing ] = useState(false);

  return (
    <div id='userReview'>
      {
        isEditing ?
          <ReviewInput
            movieId={data.movieId}
            movieTitle={data.movieTitle}
            userId={data.userId}
            userName={data.userName}
            previousText={data.text}
            previousRating={data.rating}
            reviewId={data.id}
            setIsEditing={setIsEditing}
          />
          :
          <Review data={data} />
      }
      <div id='userReviewControls'>
        <button className='baseBtn' onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button>
        <button className='baseBtn' onClick={() => deleteReview(data.id)}>Delete</button>
      </div>
    </div>
  );
}