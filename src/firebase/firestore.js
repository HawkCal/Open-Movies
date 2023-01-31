import { collection, getDoc, getDocs, addDoc, setDoc, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

function addUser(email, uid, userName) {
  try {
    setDoc(doc(db, 'users', uid), {
      email: email,
      uid: uid,
      userName: userName
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function getMovies() {
  let allMovies = [];
  try {
    const response = await getDocs(collection(db, 'movies'));
    response.forEach(doc => allMovies.push({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
  }
  return allMovies;
}

async function getMovieById(id) {
  let movieData;
  try {
    const response = await getDoc(doc(db, 'movies', id));
    movieData = { ...response.data(), id: response.id };
  } catch (error) {
    console.log(error);
  }
  return movieData;
}

async function getMovieReviewsById(id) {
  let reviews = [];
  try {
    const response = await getDocs(query(collection(db, 'reviews'), where('movieId', '==', id)));
    response.forEach(doc => reviews.push({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
  }
  return reviews;
}

async function getUserReviewsById(id) {
  let reviews = [];
  try {
    const response = await getDocs(query(collection(db, 'reviews'), where('userId', '==', id)));
    response.forEach(doc => reviews.push({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
  }
  return reviews;
}

async function getUserInfoById(id) {
  let userInfo;
  try {
    const response = await getDoc(doc(db, 'users', id));
    userInfo = { ...response.data(), id: response.id };
  } catch (error) {
    console.log(error);
  }
  return userInfo;
}

function addReview(review) {
  addDoc(collection(db, 'reviews'), review);
}

function deleteReview(id) {
  deleteDoc(doc(db, 'reviews', id));
}

function updateReview(id, updatedReview) {
  updateDoc(doc(db, 'reviews', id), updatedReview);
}

async function deleteUserDoc(id) {
  try {
    const response = await getUserInfoById(id);
    deleteDoc(doc(db, 'users', response.id));
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export {
  getMovieById,
  getMovies,
  addUser,
  getMovieReviewsById,
  getUserReviewsById,
  addReview,
  deleteReview,
  updateReview,
  getUserInfoById,
  deleteUserDoc
};