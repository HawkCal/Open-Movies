import { storage } from './firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const BUCKET_URL = 'gs://classic-movies-d3b9a.appspot.com/posters';

async function uploadPoster(image) {
  const bucket = `${BUCKET_URL}/${image.name}`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}

export {
  uploadPoster,
};