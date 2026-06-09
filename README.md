# SecureMe

## Personal Safety and Security Incident Reporting System with Real-Time Location Sharing

### Project Overview

SecureMe is a web-based personal safety and security incident reporting system designed to help users report emergencies, submit security incidents, and share their real-time location with administrators during critical situations.

The platform enables users to quickly report incidents such as robbery, assault, accidents, fire outbreaks, suspicious activities, and other emergencies. It also provides an SOS emergency alert feature that captures the user's current geographical location and sends it to the administrative monitoring dashboard.

Administrators can monitor incidents in real time, visualize incident locations on an interactive map, manage reports, and update investigation statuses.

---

## Features

### User Features

* User Registration and Authentication
* Secure Login System
* Incident Reporting
* Emergency SOS Alerts
* Real-Time Location Capture
* Personal Dashboard
* Emergency Contact Management
* Profile Management
* Report Tracking
* Status Monitoring

### Administrator Features

* Administrative Authentication
* Centralized Incident Dashboard
* Real-Time Incident Map
* Report Monitoring
* User Information Tracking
* Status Updates
* Incident Analytics
* SOS Alert Monitoring

---

## Technologies Used

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Leaflet
* Leaflet Maps
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose ODM
* JWT Authentication
* BcryptJS

---

## System Modules

### Authentication Module

Handles registration, login, authorization, and role-based access control.

### Incident Reporting Module

Allows users to submit security and emergency incidents with detailed descriptions and threat levels.

### SOS Emergency Module

Captures user location and transmits emergency alerts to administrators.

### Emergency Contact Module

Stores trusted contacts for emergency notification purposes.

### Administrative Monitoring Module

Provides administrators with comprehensive monitoring capabilities and report management functions.

### Mapping Module

Displays incident locations on an interactive map using OpenStreetMap and React Leaflet.

---

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Project Structure

```text
secureme/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

## Future Improvements

* SMS Notifications
* Email Notifications
* Push Notifications
* Media Upload Support
* AI-Based Threat Classification
* Emergency Service Integration
* Mobile Application Development

---

## Author

**Adebanjo Olatunji AbdulRasheed**

Department of Computer Science

Lagos State University of Science and Technology (LASUSTECH)

---

## Project Title

**Design and Implementation of a Personal Safety and Security Incident Reporting System with Real-Time Location Sharing**
