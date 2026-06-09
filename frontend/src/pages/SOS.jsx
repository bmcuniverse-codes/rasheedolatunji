import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, PhoneCall, ShieldAlert, Siren } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { sendSOSAlert } from "../services/reportService";
import { getEmergencyContacts } from "../utils/storage";

function SOS() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const contacts = getEmergencyContacts();

  const sendSOS = () => {
    setStatus("Getting your current location...");
    setLoading(true);

    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on this device.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        try {
          await sendSOSAlert(currentLocation);

          setLocation(currentLocation);
          setStatus(
            `SOS alert sent successfully. Location captured. ${contacts.length} emergency contact(s) prepared for notification.`
          );

          setTimeout(() => {
            navigate("/my-reports");
          }, 1500);
        } catch (error) {
          setStatus(error.response?.data?.message || "Could not send SOS alert.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setStatus("Unable to get location. Please allow location permission.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold">Emergency SOS</h1>
        <p className="text-gray-400 text-sm mt-2">
          Use this button only when you need urgent safety assistance.
        </p>

        <div className="mt-8 bg-card border border-red-900/50 rounded-3xl p-6 text-center">
          <div className="mx-auto w-28 h-28 rounded-full bg-danger/20 border border-danger/50 flex items-center justify-center animate-pulse">
            <Siren size={54} className="text-danger" />
          </div>

          <h2 className="text-2xl font-bold mt-6">Send Emergency Alert</h2>
          <p className="text-gray-400 text-sm mt-2">
            Your current location will be attached to the SOS alert.
          </p>

          <button
            onClick={sendSOS}
            disabled={loading}
            className="mt-7 w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-4 font-bold text-lg disabled:opacity-60"
          >
            {loading ? "SENDING..." : "SEND SOS NOW"}
          </button>

          {status && (
            <p className="mt-5 text-sm text-gray-300 bg-dark rounded-2xl p-4">
              {status}
            </p>
          )}
        </div>

        {location && (
          <div className="mt-5 bg-card border border-gray-800 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="text-danger" />
              <h3 className="font-semibold">Captured Location</h3>
            </div>

            <p className="text-sm text-gray-400">
              Latitude: {location.latitude}
            </p>
            <p className="text-sm text-gray-400">
              Longitude: {location.longitude}
            </p>

            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 text-center bg-danger/10 text-danger rounded-xl py-3 font-semibold"
            >
              View on Google Maps
            </a>
          </div>
        )}

        <div className="mt-5 grid gap-3">
          <EmergencyCard icon={<PhoneCall />} title="Police Emergency" number="112" />
          <EmergencyCard icon={<ShieldAlert />} title="Security Help Line" number="767" />
        </div>

        <Link to="/dashboard" className="block text-center text-gray-400 text-sm mt-6">
          Return to Dashboard
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}

function EmergencyCard({ icon, title, number }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-danger">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm">Tap to call</p>
        </div>
      </div>

      <a href={`tel:${number}`} className="bg-danger px-4 py-2 rounded-xl font-bold">
        {number}
      </a>
    </div>
  );
}

export default SOS;