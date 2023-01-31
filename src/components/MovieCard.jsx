import { useNavigate } from "react-router-dom";

export default function MovieCard({ data }) {
  const navigate = useNavigate();
  return (
    <div className='movieCard' onClick={() => navigate(`/Open-Movies/${data.id}`)}>
      <img src={data.posterUrl} alt={data.title + ' poster'} />
      <div>
        <h3>{data.title}</h3>
        <p>{data.releaseDate}</p>
        <p>{data.length}</p>
      </div>
    </div>
  );
}