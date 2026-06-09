import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./pages/Loading";
import Intro from "./pages/Intro";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EmergencyContacts from "./pages/EmergencyContacts";
import Settings from "./pages/Settings";
import SOS from "./pages/SOS";
import ReportIncident from "./pages/ReportIncident";
import MyReports from "./pages/MyReports";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;