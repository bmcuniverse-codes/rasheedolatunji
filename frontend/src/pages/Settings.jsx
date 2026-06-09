import { useNavigate } from "react-router-dom";
import { Bell, LogOut, MapPin, Shield, Smartphone } from "lucide-react";
import BottomNav from "../components/BottomNav";
import { clearUserSession } from "../utils/storage";

function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    clearUserSession();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm mt-2">
          Manage SecureMe safety preferences.
        </p>

        <div className="mt-6 grid gap-4">
          <SettingCard
            icon={<Shield />}
            title="Security Theme"
            text="Red-dark emergency interface enabled."
          />

          <SettingCard
            icon={<MapPin />}
            title="Location Permission"
            text="Location is requested only during SOS and incident reporting."
          />

          <SettingCard
            icon={<Bell />}
            title="Notifications"
            text="Emergency notification support will be activated with backend services."
          />

          <SettingCard
            icon={<Smartphone />}
            title="Mobile-First Mode"
            text="SecureMe is optimized for mobile safety usage."
          />
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-4 font-bold flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function SettingCard({ icon, title, text }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4">
      <div className="w-12 h-12 rounded-xl bg-danger/10 text-danger flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 leading-5">{text}</p>
      </div>
    </div>
  );
}

export default Settings;