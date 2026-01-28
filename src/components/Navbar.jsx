import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">HotelBook</div>

      <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/hotels">Hotels</NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <div className="auth">
        <NavLink to="/login" className="btn login">Login</NavLink>
        <NavLink to="/signup" className="btn signup">Sign Up</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;