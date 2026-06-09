import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { loginUser } from "../services/authService";
import { saveUserSession } from "../utils/storage";

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({
        ...form,
        role: "admin",
      });

      localStorage.setItem("secureme_token", data.token);
      saveUserSession(data.user);

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Admin login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark px-5 py-8 flex items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-danger/20 border border-danger/40 flex items-center justify-center">
            <ShieldCheck size={38} className="text-danger" />
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Admin <span className="text-danger">Login</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Secure access for incident monitoring and response management.
          </p>
        </div>

        <form
          onSubmit={handleAdminLogin}
          className="bg-card border border-gray-800 rounded-3xl p-5"
        >
          {error && (
            <p className="bg-danger/10 text-danger text-sm rounded-2xl p-3 mb-4">
              {error}
            </p>
          )}

          <label className="text-sm text-gray-300">Admin Email</label>
          <input
            type="email"
            required
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter admin email"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            required
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full mt-2 mb-5 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <button
            disabled={loading}
            className="w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

          <Link
            to="/login"
            className="block text-center text-sm text-gray-400 mt-5"
          >
            Back to user login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;