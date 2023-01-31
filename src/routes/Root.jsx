import { Outlet } from 'react-router-dom';
import '../styles/RootStyle.css';
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}