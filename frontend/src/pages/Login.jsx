import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { loginUser } from "../services/authService";
import { saveUserSession } from "../utils/storage";

function Login() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({
        ...form,
        role: "user",
      });

      localStorage.setItem("secureme_token", data.token);
      saveUserSession(data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark px-5 py-8 flex items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-danger/20 border border-danger/40 flex items-center justify-center">
            <ShieldAlert size={38} className="text-danger" />
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Secure<span className="text-danger">Me</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Login to access your safety dashboard
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card border border-gray-800 rounded-3xl p-5"
        >
          {error && (
            <p className="bg-danger/10 text-danger text-sm rounded-2xl p-3 mb-4">
              {error}
            </p>
          )}

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

          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            required
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <button
            disabled={loading}
            className="w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-5">
            No account?{" "}
            <Link to="/register" className="text-danger font-semibold">
              Create one
            </Link>
          </p>

          <p className="text-center text-sm text-gray-500 mt-4">
            Administrator?{" "}
            <Link to="/admin-login" className="text-danger font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;