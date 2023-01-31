import { auth } from './firebase';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, deleteUser } from 'firebase/auth';
import { addUser, deleteUserDoc } from './firestore';

async function registerUserWithEmailAndPassword(email, password, userName) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    addUser(response.user.email, response.user.uid, userName);
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function logInWithEmailAndPassword(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

function signUserOut() {
  signOut(auth);
}

async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

async function deleteAccount() {
  try {
    const currentUser = auth.currentUser;
    await deleteUser(currentUser);
    deleteUserDoc(currentUser.uid);
  } catch (error) {
    console.log(error);
    return error.message;
  }
}

export {
  registerUserWithEmailAndPassword,
  logInWithEmailAndPassword,
  signUserOut,
  resetPassword,
  deleteAccount
};