import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function IncidentMap({ reports }) {
  const reportsWithLocation = reports.filter((report) => report.location);

  const defaultPosition =
    reportsWithLocation.length > 0
      ? [
          reportsWithLocation[0].location.latitude,
          reportsWithLocation[0].location.longitude,
        ]
      : [6.5244, 3.3792];

  return (
    <div className="h-72 rounded-2xl overflow-hidden border border-gray-800">
      <MapContainer
        center={defaultPosition}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reportsWithLocation.map((report) => (
          <Marker
            key={report.id}
            position={[report.location.latitude, report.location.longitude]}
          >
            <Popup>
              <strong>{report.title}</strong>
              <br />
              Category: {report.category}
              <br />
              Threat: {report.threat}
              <br />
              Status: {report.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default IncidentMap;