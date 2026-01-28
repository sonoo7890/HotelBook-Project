import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isUserExists, saveUser } from "../utils/auth";
import "./Auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Contact → only numbers allowed
    if (name === "contact") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setForm({ ...form, [name]: value });
    setError("");
  };

  const isStrongPassword = (password) => {
     const hasLetter = /[a-zA-Z]/.test(password);
     const hasNumber = /[0-9]/.test(password);
    // at least 1 letter + 1 number, min 6 chars
   return password.length >= 6 && hasLetter && hasNumber;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.contact.length !== 10) {
      setError("Only 10 digit mobile number allowed");
      return;
    }

    if (!isStrongPassword(form.password)) {
      setError("Password must be at least 6 characters with letters & numbers");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Password and Confirm Password must be same");
      return;
    }

    if (isUserExists(form.email)) {
      alert("User already exists, please login");
      navigate("/login");
      return;
    }

    saveUser(form);
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="contact"
          placeholder="Mobile Number"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
