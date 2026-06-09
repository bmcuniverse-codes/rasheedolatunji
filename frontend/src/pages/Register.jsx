import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { registerUser } from "../services/authService";
import { saveUserSession } from "../utils/storage";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await registerUser({
        ...form,
        role: "user",
      });

      localStorage.setItem("secureme_token", data.token);
      saveUserSession(data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark px-5 py-8">
      <div className="max-w-md mx-auto">
        <div className="mb-7">
          <div className="w-16 h-16 rounded-2xl bg-danger/20 border border-danger/40 flex items-center justify-center">
            <UserPlus size={32} className="text-danger" />
          </div>

          <h1 className="text-3xl font-bold mt-5">Create Account</h1>
          <p className="text-gray-400 text-sm mt-2">
            Register to use SecureMe emergency reporting services.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-card border border-gray-800 rounded-3xl p-5"
        >
          {error && (
            <p className="bg-danger/10 text-danger text-sm rounded-2xl p-3 mb-4">
              {error}
            </p>
          )}

          <label className="text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            required
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <label className="text-sm text-gray-300">Email Address</label>
          <input
            type="email"
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <label className="text-sm text-gray-300">Phone Number</label>
          <input
            type="tel"
            required
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            required
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create password"
            className="w-full mt-2 mb-5 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <button
            disabled={loading}
            className="w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-5">
            Already registered?{" "}
            <Link to="/login" className="text-danger font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;