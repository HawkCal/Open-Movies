import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { deleteAccount, signUserOut } from '../firebase/auth';
import { auth } from '../firebase/firebase';
import { getUserReviewsById, getUserInfoById } from '../firebase/firestore';
import ReviewsList from '../components/ReviewsList';
import '../styles/AccountStyle.css';

export default function Account() {
  const [ user, loading, error ] = useAuthState(auth);
  const [ userData, setUserData ] = useState({});
  const [ reviews, setReviews ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate(-1);
    if (user && !loading) {
      getUserReviewsById(user.uid)
        .then(res => setReviews(res));

      getUserInfoById(user.uid)
        .then(res => setUserData(res));
    }
  }, [ user, loading ]);

  function reviewClickHandler(movieId) {
    navigate(`/${movieId}`);
  }

  async function handleDelete() {
    const response = await deleteAccount();
    if (!response) return;
    if (response.includes('login')) {
      alert('Log out and then log back in to delete account');
    }
  }

  return (
    <div>
      {
        user ?
          <div id='account'>
            <div id='accountInfo'>
              <h2>{userData.userName}</h2>
              <p>{userData.email}</p>
              {
                userData.isAdmin
                  ?
                  <div>
                    <Link to='/addmovie'>Add Movie</Link>
                    <br></br>
                    <Link to='/deletemovie'>Delete Movie</Link>
                  </div>
                  :
                  null
              }
              <button className='baseBtn' onClick={signUserOut}>Sign Out</button>
              <Link to='/resetpassword'>Reset Password</Link>
              <button className='baseBtn' onClick={handleDelete}>Delete Account</button>
            </div>
            <h3>Reviews</h3>
            <div id='reviewsContainer'>
              <ReviewsList reviews={reviews} reviewClickHandler={reviewClickHandler} />
            </div>
          </div>
          :
          ''
      }
    </div>
  );
};