import { useState, useEffect } from 'react';
import { getUserInfoById } from '../firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import AddMovieForm from '../components/AddMovieForm';

export default function AddMovie() {
  const [ user, loading, error ] = useAuthState(auth);
  const [ isAdmin, setIsAdmin ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate(-1);
    if (user) {
      getUserInfoById(user.uid)
        .then(res => {
          if (!res.isAdmin) navigate(-1);
          else setIsAdmin(true);
        });
    }
  }, [ user, loading ]);

  return (
    <div>
      {
        !isAdmin
          ?
          ''
          :
          <AddMovieForm />
      }
    </div>
  );
}