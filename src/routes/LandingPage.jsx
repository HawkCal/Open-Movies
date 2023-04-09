import landingImage from '/landingImage.jpg';
import horrorImage from '/horror.jpg';
import filmNoirImage from '/filmNoir.jpg';
import mysteryImage from '/mystery.jpg';
import sciFiImage from '/sciFi.jpg';
import crimeImage from '/crime.jpg';
import actionImage from '/action.jpg';
import '../styles/LandingPageStyle.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div id='landingPage'>
      <div id='landingHeader'>
        <img id='landingImage' src={landingImage} alt="landing image" />
      </div>
      <div id='landingLinks'>
        <div className='landingLink'>
          <img className='genreImage' src={horrorImage} alt='horror' />
          <Link to={'/movies/Horror'}>Horror</Link>
        </div>
        <div className='landingLink'>
          <img className='genreImage' src={filmNoirImage} alt='film noir' />
          <Link to={'/movies/Film-Noir'}>Film-Noir</Link>
        </div>
        <div className='landingLink'>
          <img className='genreImage' src={mysteryImage} alt='mystery' />
          <Link to={'/movies/Mystery'}>Mystery</Link>
        </div>
        <div className='landingLink'>
          <img className='genreImage' src={sciFiImage} alt='sci-fi' />
          <Link to={'/movies/Sci-Fi'}>Sci-Fi</Link>
        </div>
        <div className='landingLink'>
          <img className='genreImage' src={crimeImage} alt='crime' />
          <Link to={'/movies/Crime'}>Crime</Link>
        </div>
        <div className='landingLink'>
          <img className='genreImage' src={actionImage} alt='action' />
          <Link to={'/movies/Action'}>Action</Link>
        </div>
      </div>
    </div>
  );
}