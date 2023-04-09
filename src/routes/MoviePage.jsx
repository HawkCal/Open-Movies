import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { query, collection, where } from 'firebase/firestore';
import { getMovieById } from '../firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import ReviewsList from '../components/ReviewsList';
import '../styles/MoviePageStyle.css';

export default function MoviePage() {
  const { id } = useParams();
  const [ data, setData ] = useState(null);
  const [ snapshot, loading, error ] = useCollection(query(collection(db, 'reviews'), where('movieId', '==', id)));

  useEffect(() => {
    getMovieById(id)
      .then(res => setData(res));
  }, []);

  return (
    <>
      <div id='moviePage'>
        {
          data &&
          <>
            <div id='movieContainer'>
              <h1>{data.title}</h1>
              <div id='videoContainer'>
                <iframe
                  width="560"
                  height="315"
                  src={data.url}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen={true}>
                </iframe>
              </div>
              <div id='movieInfoContainer'>
                <picture>
                  <source srcSet={data.posterWebp} />
                  <source srcSet={data.posterJpg} />
                  <img src={data.posterJpg} alt='poster'></img>
                </picture>
                <div id='movieInfo'>
                  <div id='movieInfoHeader'>
                    <p>{data.releaseDate}</p>
                    <p>{data.length.slice(0, 2)} {data.length.slice(2)}</p>
                  </div>
                  <ul id='genreList'>
                    {data.genres.map((genre, index) => <li key={genre}>{genre}{index === data.genres.length - 1 ? '' : ','}</li>)}
                  </ul>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
            <div id='reviewsContainer'>
              <h1>Reviews</h1>
              <ReviewsList
                reviews={snapshot ? snapshot.docs.map(item => { return { ...item.data(), id: item.id }; }) : []}
                movieId={data.id}
                reviewsLoading={loading}
                movieTitle={data.title}
              />
            </div>
          </>
        }
      </div>
    </>
  );
}