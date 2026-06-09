import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Database,
  MapPin,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

function Intro() {
  return (
    <div className="min-h-screen bg-dark px-5 py-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-dangerDark to-dark rounded-3xl p-6 border border-red-900/50 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
            <ShieldCheck size={34} className="text-white" />
          </div>

          <p className="text-danger text-sm font-semibold mt-6">
            Final Year Project System
          </p>

          <h1 className="text-3xl font-bold mt-2 leading-tight">
            SecureMe: Personal Safety and Security Incident Reporting System
          </h1>

          <p className="text-gray-300 mt-4 text-sm leading-6">
            SecureMe is a web-based safety platform designed to help users report
            security incidents, send emergency SOS alerts, and share their
            real-time location with administrators for faster monitoring and
            response.
          </p>
        </div>

        <section className="mt-6 bg-card border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold">About the Project</h2>

          <p className="text-gray-400 text-sm leading-6 mt-3">
            The system addresses the need for a quick, reliable, and digital
            method of reporting personal safety threats. In emergency situations,
            victims may not have enough time to describe their location clearly.
            SecureMe solves this by capturing the user’s current location and
            attaching it to incident or SOS reports.
          </p>

          <p className="text-gray-400 text-sm leading-6 mt-3">
            It supports both regular users and administrators. Users can submit
            reports, save emergency contacts, monitor report status, and trigger
            emergency alerts. Administrators can view submitted reports, track
            locations on a map, and update the progress of each incident.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-bold mb-4">Core System Features</h2>

          <div className="grid gap-4">
            <Feature
              icon={<Siren className="text-danger" />}
              title="One-Tap SOS Alert"
              text="Allows users to send an emergency alert instantly when they are in danger."
            />

            <Feature
              icon={<MapPin className="text-danger" />}
              title="Real-Time Location Sharing"
              text="Captures latitude and longitude and attaches the location to reports for admin monitoring."
            />

            <Feature
              icon={<AlertTriangle className="text-danger" />}
              title="Security Incident Reporting"
              text="Users can report robbery, assault, accidents, fire outbreaks, medical emergencies, suspicious activities, and other threats."
            />

            <Feature
              icon={<Users className="text-danger" />}
              title="Emergency Contact Management"
              text="Users can save trusted contacts such as parents, guardians, friends, or security contacts."
            />

            <Feature
              icon={<Database className="text-danger" />}
              title="Admin Monitoring Dashboard"
              text="Administrators can view reports, monitor incident locations, analyze threats, and update report status."
            />
          </div>
        </section>

        <section className="mt-6 bg-card border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold">How SecureMe Works</h2>

          <div className="mt-4 space-y-4">
            <Step
              number="01"
              title="User Registers or Logs In"
              text="Each user has a personal account where reports and emergency contacts are securely managed."
            />

            <Step
              number="02"
              title="User Reports an Incident"
              text="The user selects the incident category, threat level, writes a description, and captures current location."
            />

            <Step
              number="03"
              title="SOS Alert is Triggered"
              text="During urgent danger, the SOS button captures the user’s live location and sends an emergency alert."
            />

            <Step
              number="04"
              title="Admin Reviews the Report"
              text="The administrator sees reports from all users, views incident locations, and updates the report status."
            />
          </div>
        </section>

        <section className="mt-6 bg-gradient-to-br from-card to-dark border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold">Project Objective</h2>

          <p className="text-gray-400 text-sm leading-6 mt-3">
            The main objective of SecureMe is to design and implement a
            responsive web-based system that improves personal safety reporting
            through real-time location sharing, emergency alerting, incident
            monitoring, and administrative response management.
          </p>
        </section>

        <section className="mt-6 bg-card border border-gray-800 rounded-3xl p-5">
          <h2 className="text-xl font-bold">Student Information</h2>

          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <p>
              <span className="text-gray-200 font-semibold">Student Name:</span>{" "}
              Adebanjo Olatunji AbdulRasheed
            </p>

            <p>
              <span className="text-gray-200 font-semibold">Project Name:</span>{" "}
              SecureMe
            </p>

            <p>
              <span className="text-gray-200 font-semibold">Project Title:</span>{" "}
              Design and Implementation of a Web-Based Personal Safety and
              Security Incident Reporting System with Real-Time Location Sharing
            </p>
          </div>
        </section>

        <Link
          to="/login"
          className="mt-8 w-full bg-danger hover:bg-dangerDark transition rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
        >
          Proceed to SecureMe
          <ArrowRight size={20} />
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

function Step({ number, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 rounded-xl bg-danger/10 text-danger flex items-center justify-center font-bold shrink-0">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 leading-5">{text}</p>
      </div>
    </div>
  );
}

export default Intro;