import { storage } from './firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const BUCKET_URL = 'gs://classic-movies-d3b9a.appspot.com/posters';

async function uploadPoster(image) {
  const bucket = `${BUCKET_URL}/${image.name}`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}

function deletePoster(imageName) {
  const storageRef = ref(storage, `${BUCKET_URL}/${imageName}.jpg`);
  deleteObject(storageRef);
}

export {
  uploadPoster,
  deletePoster,
};