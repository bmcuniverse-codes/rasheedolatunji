import { getMyReports } from "./reportService";
import { getContacts } from "./contactService";

export const getProfileStats = async () => {
  const reports = await getMyReports();
  const contacts = await getContacts();

  const pendingReports = reports.filter(
    (r) => r.status === "Pending"
  ).length;

  const resolvedReports = reports.filter(
    (r) => r.status === "Resolved"
  ).length;

  const sosAlerts = reports.filter(
    (r) => r.category === "SOS"
  ).length;

  const safetyScore = Math.max(
    50,
    100 - pendingReports * 5 + resolvedReports * 2
  );

  return {
    reports,
    contacts,
    pendingReports,
    resolvedReports,
    sosAlerts,
    safetyScore,
  };
};