import { Clock, MapPin, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import { getMyReports } from "../services/reportService";

function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const data = await getMyReports();
      setReports(data);
    } catch (error) {
      alert(error.response?.data?.message || "Could not fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold">My Reports</h1>
        <p className="text-gray-400 text-sm mt-2">
          Track your submitted incidents and emergency alerts.
        </p>

        {loading ? (
          <p className="text-gray-400 mt-8">Loading reports...</p>
        ) : reports.length === 0 ? (
          <div className="mt-10 bg-card border border-gray-800 rounded-3xl p-6 text-center">
            <ShieldAlert className="text-danger mx-auto" size={42} />
            <h2 className="text-xl font-bold mt-4">No reports yet</h2>
            <p className="text-gray-400 text-sm mt-2">
              Submitted incidents and SOS alerts will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-card border border-gray-800 rounded-3xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-lg">{report.title}</h2>
                    <p className="text-gray-400 text-sm">{report.category}</p>
                  </div>

                  <span className="text-xs bg-danger/10 text-danger px-3 py-1 rounded-full">
                    {report.status}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mt-3 leading-5">
                  {report.description}
                </p>

                <div className="mt-4 space-y-2">
                  <Info
                    icon={<ShieldAlert size={17} />}
                    text={`Threat Level: ${report.threat}`}
                  />

                  {report.location?.latitude ? (
                    <Info
                      icon={<MapPin size={17} />}
                      text={`Lat: ${report.location.latitude}, Lng: ${report.location.longitude}`}
                    />
                  ) : (
                    <Info icon={<MapPin size={17} />} text="No location attached" />
                  )}

                  <Info
                    icon={<Clock size={17} />}
                    text={new Date(report.createdAt).toLocaleString()}
                  />
                </div>

                {report.location?.latitude && (
                  <a
                    href={`https://www.google.com/maps?q=${report.location.latitude},${report.location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-4 text-center bg-danger/10 text-danger rounded-xl py-3 font-semibold"
                  >
                    View Location
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function Info({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400">
      <span className="text-danger">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default MyReports;