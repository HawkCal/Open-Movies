import { collection, getDoc, getDocs, addDoc, setDoc, query, where, deleteDoc, doc, updateDoc, limit, startAfter, orderBy } from 'firebase/firestore';
import { db } from './firebase';

function addMovie(movieData) {
  try {
    addDoc(collection(db, 'movies'), movieData);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

async function getNextMovies(prevPage = false) {
  let movies = [];
  if (!prevPage) {
    try {
      const response = await getDocs(query(collection(db, "movies"), orderBy("title"), limit(15)));
      response.forEach(doc => movies.push({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log(error);
    }
  }
  else {
    try {
      const response = await getDocs(query(collection(db, "movies"), orderBy("title"), startAfter(prevPage.title), limit(15)));
      response.forEach(doc => movies.push({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log(error);
    }
  }
  return movies;
}

async function getMoviesByGenre(genre, prevPage = false) {
  let movies = [];
  if (!prevPage) {
    try {
      const response = await getDocs(query(collection(db, "movies"), where("genres", "array-contains", genre), orderBy("title"), limit(15)));
      response.forEach(doc => movies.push({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log(error);
    }
  }
  else {
    try {
      const response = await getDocs(query(collection(db, "movies"), where("genres", "array-contains", genre), orderBy("title"), startAfter(prevPage.title), limit(15)));
      response.forEach(doc => movies.push({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log(error);
    }
  }
  return movies;
}

async function getAllMovies() {
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

function deleteMovie(id) {
  try {
    deleteDoc(doc(db, 'movies', id));
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

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

function deleteUserDoc(id) {
  try {
    deleteDoc(doc(db, 'users', id));
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

function addReview(review) {
  addDoc(collection(db, 'reviews'), review);
}

function deleteReview(id) {
  try {
    deleteDoc(doc(db, 'reviews', id));
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

function updateReview(id, updatedReview) {
  updateDoc(doc(db, 'reviews', id), updatedReview);
}

export {
  addMovie,
  getMovieById,
  getNextMovies,
  getAllMovies,
  getMoviesByGenre,
  getMovieReviewsById,
  deleteMovie,
  addUser,
  getUserReviewsById,
  addReview,
  deleteReview,
  updateReview,
  getUserInfoById,
  deleteUserDoc,
};