import { useNavigate } from "react-router-dom";
import data from "../database/hotels.json";
import "./Hotels.css";
import { getLoggedInUser } from "../utils/auth";

const hotels = data.hotels;

const Hotels = () => {
  const navigate = useNavigate();

  const handleBookNow = (hotel) => {
    const user = getLoggedInUser();

    if (!user) {
      alert("Please login to book a hotel");
      navigate("/login");
      return;
    }

    navigate("/bookings", { state: { hotel } });
  };

  return (
    <div className="hotel-container">
      <h1 className="page-title">Explore Hotels</h1>

      <div className="hotel-list">
        {hotels.map((h) => (
          <div className="hotel-card" key={h.id}>
            <div className="image-box">
              <img src={h.image} alt={h.name} />
            </div>

            <div className="hotel-info">
              <h3>{h.name}</h3>
              <p className="city">📍 {h.city}</p>

              <div className="price-row">
                <span className="price">₹{h.price}</span>
                <span className="night">/ night</span>
              </div>

              <button onClick={() => handleBookNow(h)}>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotels;
