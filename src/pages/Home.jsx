import { useNavigate } from "react-router-dom";
import { useState } from "react";

const hotels = [
  {
    name: "Taj Palace",
    price: "₹5499 / night",
    img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  },
  {
    name: "The Oberoi",
    price: "₹6999 / night",
    img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d1",
  },
  {
    name: "ITC Grand",
    price: "₹5999 / night",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {
    if (!city || !checkIn || !checkOut) {
      alert("Please fill all fields");
      return;
    }
    navigate(`/hotels?city=${city}&checkin=${checkIn}&checkout=${checkOut}`);
  };

  return (
    <div className="w-full pt-20 overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center">
        <img
          src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a"
          className="absolute inset-0 w-full h-full object-cover scale-110 animate-[zoom_12s_ease-in-out_infinite]"
          alt="hotel"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-white animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Luxury stays.<br />
            <span className="text-blue-400">Best prices.</span>
          </h1>

          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Discover premium hotels & resorts across India.
          </p>

          {/* SEARCH */}
          <div className="mt-10 bg-white rounded-2xl p-6 shadow-2xl max-w-4xl animate-slideUp">
            <div className="grid md:grid-cols-4 gap-4">
              <input
                className="p-4 rounded-xl border text-black placeholder-gray-500"
                placeholder="City or Hotel"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="date"
                className="p-4 rounded-xl border text-black"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <input
                type="date"
                className="p-4 rounded-xl border text-black"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 hover:scale-105 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="py-24 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-16">
          Featured Hotels
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 px-6">
          {hotels.map((hotel, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3"
            >
              <div className="overflow-hidden rounded-t-3xl">
                <img
                  src={hotel.img}
                  alt={hotel.name}
                  className="h-60 w-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">{hotel.name}</h3>
                <p className="text-gray-500 mt-1">{hotel.price}</p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-4 animate-fadeInUp">
          Ready to book your next stay?
        </h2>
        <button
          onClick={() => navigate("/hotels")}
          className="mt-6 bg-blue-600 px-12 py-4 rounded-full text-lg hover:bg-blue-700 hover:scale-105 transition"
        >
          Explore Hotels
        </button>
      </section>
    </div>
  );
};

export default Home;
