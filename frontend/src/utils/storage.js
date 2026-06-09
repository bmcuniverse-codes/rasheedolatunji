export const getReports = () => {
  return JSON.parse(localStorage.getItem("secureme_reports")) || [];
};

export const saveReport = (report) => {
  const reports = getReports();
  const updatedReports = [report, ...reports];
  localStorage.setItem("secureme_reports", JSON.stringify(updatedReports));
};

export const updateReportStatus = (id, status) => {
  const reports = getReports();

  const updatedReports = reports.map((report) =>
    report.id === id ? { ...report, status } : report
  );

  localStorage.setItem("secureme_reports", JSON.stringify(updatedReports));
  return updatedReports;
};

export const getEmergencyContacts = () => {
  return JSON.parse(localStorage.getItem("secureme_contacts")) || [];
};

export const saveEmergencyContact = (contact) => {
  const contacts = getEmergencyContacts();
  const updatedContacts = [contact, ...contacts];
  localStorage.setItem("secureme_contacts", JSON.stringify(updatedContacts));
};

export const deleteEmergencyContact = (id) => {
  const contacts = getEmergencyContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  localStorage.setItem("secureme_contacts", JSON.stringify(updatedContacts));
  return updatedContacts;
};

export const saveUserSession = (user) => {
  localStorage.setItem("secureme_user", JSON.stringify(user));
};

export const getUserSession = () => {
  return JSON.parse(localStorage.getItem("secureme_user")) || null;
};

export const clearUserSession = () => {
  localStorage.removeItem("secureme_user");
};