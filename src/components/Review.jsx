export default function Review({ data }) {
  const date = new Date(0);
  date.setUTCSeconds(data.dateCreated.seconds);
  const formattedDate = date.toLocaleString();

  return (
    <div className='review'>
      <div className='reviewHeader'>
        <p>{data.rating}/5</p>
        <p>{data.userName}</p>
        <p>{formattedDate.slice(0, 9)}</p>
      </div>
      <p>{data.text}</p>
    </div>
  );
}