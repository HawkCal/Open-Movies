import { Outlet } from 'react-router-dom';
import '../styles/RootStyle.css';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';

export default function Root() {
  let prevScrollPos = window.pageYOffset;

  function handleScroll() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      document.querySelector('.navBar').classList.remove('hidden');
    } else {
      document.querySelector('.navBar').classList.add('hidden');
    }
    prevScrollPos = currentScrollPos;
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}