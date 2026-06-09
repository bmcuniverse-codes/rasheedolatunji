import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus, MapPin } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { createReport } from "../services/reportService";

function ReportIncident() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    threat: "",
    description: "",
  });

  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    setMessage("Capturing current location...");

    if (!navigator.geolocation) {
      setMessage("Geolocation is not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setMessage("Location captured successfully.");
      },
      () => {
        setMessage("Location permission denied or unavailable.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createReport({
        ...form,
        location,
      });

      alert("Incident report submitted successfully.");
      navigate("/my-reports");
    } catch (error) {
      alert(error.response?.data?.message || "Could not submit report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-danger/20 flex items-center justify-center">
            <FilePlus className="text-danger" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Report Incident</h1>
            <p className="text-gray-400 text-sm">
              Submit a security or safety report.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-card border border-gray-800 rounded-3xl p-5"
        >
          <label className="text-sm text-gray-300">Incident Title</label>
          <input
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Example: Suspicious activity nearby"
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          />

          <label className="text-sm text-gray-300">Incident Category</label>
          <select
            required
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          >
            <option value="">Select category</option>
            <option>Robbery</option>
            <option>Assault</option>
            <option>Kidnap Threat</option>
            <option>Accident</option>
            <option>Fire Outbreak</option>
            <option>Medical Emergency</option>
            <option>Suspicious Activity</option>
            <option>Others</option>
          </select>

          <label className="text-sm text-gray-300">Threat Level</label>
          <select
            required
            name="threat"
            value={form.threat}
            onChange={handleChange}
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger"
          >
            <option value="">Select threat level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <label className="text-sm text-gray-300">Description</label>
          <textarea
            required
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe what happened..."
            className="w-full mt-2 mb-4 bg-dark border border-gray-700 rounded-2xl px-4 py-3 outline-none focus:border-danger resize-none"
          />

          <button
            type="button"
            onClick={getLocation}
            className="w-full mb-4 bg-danger/10 border border-danger/30 text-danger rounded-2xl py-3 font-semibold flex items-center justify-center gap-2"
          >
            <MapPin size={20} />
            Capture Current Location
          </button>

          {message && <p className="text-sm text-gray-400 mb-4">{message}</p>}

          {location && (
            <div className="bg-dark border border-gray-800 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-400">
                Latitude: {location.latitude}
              </p>
              <p className="text-sm text-gray-400">
                Longitude: {location.longitude}
              </p>
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-4 font-bold disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Incident Report"}
          </button>
        </form>
      </div>

      <BottomNav />
    </div>
  );
}

export default ReportIncident;