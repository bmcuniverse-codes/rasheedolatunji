import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Bell,
  Settings,
  ShieldCheck,
  User,
  Users,
  AlertTriangle,
  CheckCircle,
  Siren,
} from "lucide-react";

import BottomNav from "../components/BottomNav";

import { getUserSession } from "../utils/storage";

import { getProfileStats } from "../services/profileService";

function Profile() {
  const user = getUserSession();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    reports: [],
    contacts: [],
    pendingReports: 0,
    resolvedReports: 0,
    sosAlerts: 0,
    safetyScore: 100,
  });

  const fetchStats = async () => {
    try {
      const data = await getProfileStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-dark px-5 pt-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Header */}

        <div className="bg-gradient-to-br from-dangerDark to-card border border-red-900/50 rounded-3xl p-6 text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-danger/20 border border-danger/40 flex items-center justify-center">
            <User className="text-white" size={42} />
          </div>

          <h1 className="text-2xl font-bold mt-4">
            {user?.fullName || "SecureMe User"}
          </h1>

          <p className="text-gray-300 text-sm mt-1">
            {user?.email}
          </p>

          <p className="text-gray-400 text-xs mt-1">
            {user?.phone}
          </p>

          <div className="mt-5 bg-dark/60 rounded-2xl p-4">
            <p className="text-gray-400 text-sm">
              Personal Safety Score
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {loading ? "..." : `${stats.safetyScore}%`}
            </h2>
          </div>
        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 gap-4 mt-5">
          <StatCard
            title="Reports"
            value={
              loading ? "..." : stats.reports.length
            }
          />

          <StatCard
            title="Contacts"
            value={
              loading ? "..." : stats.contacts.length
            }
          />

          <StatCard
            title="Pending"
            value={
              loading ? "..." : stats.pendingReports
            }
          />

          <StatCard
            title="Resolved"
            value={
              loading ? "..." : stats.resolvedReports
            }
          />
        </div>

        {/* Quick Analytics */}

        <div className="grid gap-4 mt-5">
          <AnalyticsCard
            icon={<AlertTriangle />}
            title="Active Cases"
            value={stats.pendingReports}
          />

          <AnalyticsCard
            icon={<CheckCircle />}
            title="Resolved Cases"
            value={stats.resolvedReports}
          />

          <AnalyticsCard
            icon={<Siren />}
            title="SOS Alerts Sent"
            value={stats.sosAlerts}
          />
        </div>

        {/* Navigation */}

        <div className="grid gap-4 mt-6">
          <ProfileLink
            to="/emergency-contacts"
            icon={<Users className="text-danger" />}
            title="Emergency Contacts"
            text="Manage trusted contacts for emergency alerts."
          />

          <ProfileLink
            to="/settings"
            icon={<Settings className="text-danger" />}
            title="Settings"
            text="Manage account settings and preferences."
          />

          <div className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
              <ShieldCheck className="text-danger" />
            </div>

            <div>
              <h3 className="font-semibold">
                Protection Status
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Location monitoring and emergency
                reporting are active.
              </p>
            </div>
          </div>

          <div className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
              <Bell className="text-danger" />
            </div>

            <div>
              <h3 className="font-semibold">
                Alert System
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Emergency notification service is
                configured and ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-1">
        {value}
      </h3>
    </div>
  );
}

function AnalyticsCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileLink({
  to,
  icon,
  title,
  text,
}) {
  return (
    <Link
      to={to}
      className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {text}
        </p>
      </div>
    </Link>
  );
}

export default Profile;