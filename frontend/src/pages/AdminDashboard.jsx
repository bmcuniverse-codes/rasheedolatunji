import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  LogOut,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { clearUserSession } from "../utils/storage";
import {
  getAllReports,
  updateReportStatus,
} from "../services/adminService";

import IncidentMap from "../components/IncidentMap";

function AdminDashboard() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await getAllReports();
      setReports(data);
    } catch (error) {
      console.log(error);
      alert(
        error?.response?.data?.message ||
          "Failed to load reports."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleLogout = () => {
    clearUserSession();
    localStorage.removeItem("secureme_token");
    navigate("/admin-login");
  };

  const changeStatus = async (id, status) => {
    try {
      await updateReportStatus(id, status);
      fetchReports();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Could not update report status."
      );
    }
  };

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  const investigatingReports = reports.filter(
    (r) => r.status === "Investigating"
  ).length;

  const resolvedReports = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const sosAlerts = reports.filter(
    (r) => r.category === "SOS"
  ).length;

  const highThreatReports = reports.filter(
    (r) => r.threat === "High" || r.threat === "Critical"
  ).length;

  const robberyReports = reports.filter(
    (r) => r.category === "Robbery"
  ).length;

  const accidentReports = reports.filter(
    (r) => r.category === "Accident"
  ).length;

  return (
    <div className="min-h-screen bg-dark px-5 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">
              SecureMe Administrator
            </p>

            <h1 className="text-3xl font-bold">
              Incident Control Center
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-2xl bg-card border border-gray-800 flex items-center justify-center"
          >
            <LogOut className="text-danger" size={22} />
          </button>
        </div>

        {/* Analytics */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <StatCard
            icon={<AlertTriangle />}
            title="Total Reports"
            value={totalReports}
          />

          <StatCard
            icon={<Siren />}
            title="SOS Alerts"
            value={sosAlerts}
          />

          <StatCard
            icon={<Clock />}
            title="Pending"
            value={pendingReports}
          />

          <StatCard
            icon={<CheckCircle />}
            title="Resolved"
            value={resolvedReports}
          />

          <StatCard
            icon={<ShieldAlert />}
            title="High Threat"
            value={highThreatReports}
          />

          <StatCard
            icon={<Users />}
            title="Investigating"
            value={investigatingReports}
          />

          <StatCard
            icon={<ShieldCheck />}
            title="Robbery"
            value={robberyReports}
          />

          <StatCard
            icon={<MapPin />}
            title="Accidents"
            value={accidentReports}
          />
        </div>

        {/* Map */}

        <div className="mt-8 bg-card border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Live Incident Map
          </h2>

          <IncidentMap reports={reports} />
        </div>

        {/* Reports */}

        <div className="mt-8 bg-card border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold">
            Submitted Reports
          </h2>

          {loading ? (
            <div className="py-12 text-center">
              Loading reports...
            </div>
          ) : reports.length === 0 ? (
            <div className="py-12 text-center">
              <ShieldCheck
                className="mx-auto text-danger"
                size={50}
              />

              <h3 className="mt-4 text-xl font-bold">
                No Reports Available
              </h3>
            </div>
          ) : (
            <div className="grid gap-4 mt-6">
              {reports.map((report) => (
                <div
                  key={report._id}
                  className="bg-dark border border-gray-800 rounded-2xl p-5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">
                        {report.title}
                      </h3>

                      <p className="text-gray-400 text-sm mt-1">
                        Category: {report.category}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Threat Level: {report.threat}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Submitted By:{" "}
                        {report.user?.fullName || "Unknown"}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Email:{" "}
                        {report.user?.email || "N/A"}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Phone:{" "}
                        {report.user?.phone || "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="bg-danger/10 text-danger px-4 py-2 rounded-xl text-sm">
                        {report.status}
                      </span>

                      <select
                        value={report.status}
                        onChange={(e) =>
                          changeStatus(
                            report._id,
                            e.target.value
                          )
                        }
                        className="bg-card border border-gray-700 rounded-xl px-3 py-2"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Investigating">
                          Investigating
                        </option>

                        <option value="Resolved">
                          Resolved
                        </option>
                      </select>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-300">
                    {report.description}
                  </p>

                  {report.location?.latitude && (
                    <a
                      href={`https://www.google.com/maps?q=${report.location.latitude},${report.location.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-4 bg-danger/10 text-danger px-4 py-2 rounded-xl"
                    >
                      View Location
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4">
      <div className="text-danger">{icon}</div>

      <p className="text-gray-400 text-sm mt-3">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-1">
        {value}
      </h3>
    </div>
  );
}

export default AdminDashboard;