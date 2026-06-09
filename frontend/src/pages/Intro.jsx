import { Link } from "react-router-dom";
import { MapPin, ShieldCheck, Siren, Users } from "lucide-react";

function Intro() {
  return (
    <div className="min-h-screen bg-dark px-5 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-dangerDark to-dark rounded-3xl p-6 border border-red-900/50 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <ShieldCheck size={34} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold mt-6 leading-tight">
            Your personal safety companion in emergency situations.
          </h1>

          <p className="text-gray-300 mt-4 text-sm leading-6">
            SecureMe helps users report security incidents, send SOS alerts, and
            share their real-time location with emergency contacts and response
            administrators.
          </p>
        </div>

        <div className="grid gap-4 mt-6">
          <Feature
            icon={<Siren className="text-danger" />}
            title="One-Tap SOS Alert"
            text="Send emergency alerts instantly when you are in danger."
          />

          <Feature
            icon={<MapPin className="text-danger" />}
            title="Real-Time Location Sharing"
            text="Capture and share your current location during emergencies."
          />

          <Feature
            icon={<Users className="text-danger" />}
            title="Incident Response Dashboard"
            text="Administrators can monitor reports and update response status."
          />
        </div>

        <Link
          to="/login"
          className="block w-full text-center mt-8 bg-danger hover:bg-dangerDark transition rounded-2xl py-4 font-semibold"
        >
          Proceed to SecureMe
        </Link>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-card border border-gray-800 rounded-2xl p-4 flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-danger/10 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 leading-5">{text}</p>
      </div>
    </div>
  );
}

export default Intro;