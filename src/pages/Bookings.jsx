import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Bookings.css";
import { getLoggedInUser } from "../utils/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Bookings = () => {

  const navigate = useNavigate();
 const { state } = useLocation();
  const hotel = state?.hotel;

  useEffect(() => {
  const user = getLoggedInUser();
  if (!user) {
    alert("Please login first");
    navigate("/login");
  }
}, [navigate]);


  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [success, setSuccess] = useState(false);

  if (!hotel) {
   return <h2 style={{ textAlign: "center" }}>
    Please login to view your bookings
  </h2>;
  }

  // ✅ Manual safe date parse (NO browser bug)
  const parseDate = (value) => {
    const [year, month, day] = value.split("-");
    return new Date(year, month - 1, day);
  };

  const getNights = () => {
    if (!checkIn || !checkOut) return 1;

    const start = parseDate(checkIn);
    const end = parseDate(checkOut);

    const diff =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    return diff <= 0 ? 1 : Math.ceil(diff);
  };

  const nights = getNights();

  // ✅ Guests included
  const totalPrice = nights * hotel.price * guests;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select both dates");
      return;
    }

    setSuccess(true);
  };

 if (success) {
  return (
    <div className="booking-page">
      <div className="booking-success-card">
        <h2 className="success-heading">Booking Confirmed</h2>
        <p className="success-text">
          Your reservation has been successfully completed.
        </p>

        <div className="divider"></div>

        <div className="booking-details">
          <div>
            <span>Hotel</span>
            <strong>{hotel.name}</strong>
          </div>

          <div>
            <span>City</span>
            <strong>{hotel.city}</strong>
          </div>

          <div>
            <span>Nights</span>
            <strong>{nights}</strong>
          </div>

          <div>
            <span>Guests</span>
            <strong>{guests}</strong>
          </div>
        </div>

        <div className="total-amount">
          Total Amount: ₹{totalPrice}
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/hotels")}>
            Back to Hotels
          </button>
          <button
            className="outline"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}



  return (
    <div className="booking-container">
      <div className="booking-card">
        <img src={hotel.image} alt={hotel.name} />

        <div className="booking-info">
          <h2>{hotel.name}</h2>
          <p>📍 {hotel.city}</p>

          <form onSubmit={handleSubmit} className="booking-form">
            <label>Check-in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <label>Check-out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <label>Guests</label>
            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />

            <p className="price">
              {nights} nights · {guests} guests · ₹{totalPrice}
            </p>

            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
