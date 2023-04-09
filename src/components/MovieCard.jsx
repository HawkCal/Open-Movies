import { useNavigate } from "react-router-dom";

export default function MovieCard({ data }) {
  const navigate = useNavigate();
  return (
    <div className='movieCard' onClick={() => navigate(`/${data.id}`)}>
      <picture>
        <source srcSet={data.posterWebp} />
        <source srcSet={data.posterJpg} />
        <img src={data.posterJpg} alt={data.title + ' poster'} />
      </picture>
      <div>
        <h3>{data.title}</h3>
        <p>{data.releaseDate}</p>
        <p>{data.length}</p>
      </div>
    </div>
  );
}