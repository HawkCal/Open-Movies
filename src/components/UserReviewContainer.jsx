import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfoById } from '../firebase/firestore';
import UserReview from './UserReview';
import ReviewInput from './ReviewInput';

export default function UserReviewContainer({
  reviewsLoading,
  user,
  userReview,
  movieId,
  movieTitle,
  previousPathName
}) {
  const [ userInfo, setUserInfo ] = useState(null);

  useEffect(() => {
    if (user) {
      getUserInfoById(user.uid)
        .then(res => setUserInfo(res));
    }
  }, []);

  return (
    <div id='userReviewContainer'>
      {
        reviewsLoading ?
          ''
          :
          user ?
            userReview ?
              <UserReview data={userReview} />
              :
              <ReviewInput movieId={movieId} movieTitle={movieTitle} userId={user.uid} userName={userInfo ? userInfo.userName : ''} />
            :
            <Link
              to='/Open-Movies/login'
              state={{ previousRoute: [ '/Open-Movies/login', '/Open-Movies/register' ].includes(previousPathName) ? '/Open-Movies' : previousPathName }}
            >Log in or register to leave a review
            </Link>
      }
    </div>
  );
}