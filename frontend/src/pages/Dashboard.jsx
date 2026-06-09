import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  LogOut,
  MapPin,
  ShieldCheck,
  Siren,
  FilePlus,
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { clearUserSession, getUserSession } from "../utils/storage";
import { getMyReports } from "../services/reportService";

function Dashboard() {
  const navigate = useNavigate();
  const user = getUserSession();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await getMyReports();
      setReports(data);
    } catch (error) {
      console.log(error.response?.data?.message || "Could not load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const handleLogout = () => {
    clearUserSession();
    localStorage.removeItem("secureme_token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold">
              {user?.fullName || "SecureMe User"}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-2xl bg-card border border-gray-800 flex items-center justify-center"
          >
            <LogOut className="text-danger" size={22} />
          </button>
        </div>

        <div className="mt-6 bg-gradient-to-br from-dangerDark to-card border border-red-900/50 rounded-3xl p-5">
          <p className="text-sm text-gray-200">Emergency Mode</p>
          <h2 className="text-2xl font-bold mt-2">Need urgent help?</h2>
          <p className="text-sm text-gray-300 mt-2">
            Send an SOS alert with your current location instantly.
          </p>

          <Link
            to="/sos"
            className="mt-5 inline-flex items-center gap-2 bg-white text-dangerDark px-5 py-3 rounded-2xl font-bold"
          >
            <Siren size={20} />
            Send SOS
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-5">
          <Stat
            title="My Reports"
            value={loading ? "..." : reports.length}
          />
          <Stat
            title="Pending"
            value={loading ? "..." : pendingReports}
          />
        </div>

        <div className="mt-6 grid gap-4">
          <Action
            to="/report"
            icon={<FilePlus className="text-danger" />}
            title="Report Incident"
            text="Submit robbery, assault, accident, fire, or suspicious activity."
          />

          <Action
            to="/my-reports"
            icon={<AlertTriangle className="text-danger" />}
            title="My Reports"
            text="View only your own submitted incidents and emergency alerts."
          />

          <div className="bg-card border border-gray-800 rounded-2xl p-4">
            <div className="flex gap-3">
              <MapPin className="text-danger shrink-0" />
              <div>
                <h3 className="font-semibold">Location Service</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Location is captured only when sending SOS or reporting an
                  incident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function Action({ to, icon, title, text }) {
  return (
    <Link
      to={to}
      className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 leading-5">{text}</p>
      </div>
    </Link>
  );
}

export default Dashboard;