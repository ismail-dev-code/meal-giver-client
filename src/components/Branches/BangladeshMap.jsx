
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 12); 
  return null;
};

const BangladeshMap = ({ serviceCenters, selectedLocation }) => {
  return (
    <div className="mt-10 opacity-90 rounded overflow-hidden shadow">
      <MapContainer
        center={[23.685, 90.3563]} 
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      
        {selectedLocation && (
          <>
            <ChangeView center={[selectedLocation.latitude, selectedLocation.longitude]} />
            <Marker position={[selectedLocation.latitude, selectedLocation.longitude]}>
              <Popup>
                <div>
                  <h2 className="font-bold">{selectedLocation.district}</h2>
                  <p>Covered: {selectedLocation.covered_area.join(", ")}</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

      
        {!selectedLocation &&
          serviceCenters.map((branch, index) => (
            <Marker
              key={index}
              position={[branch.latitude, branch.longitude]}
            >
              <Popup>
                <div>
                  <h2 className="font-bold">{branch.district}</h2>
                  <p>Covered: {branch.covered_area.join(", ")}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;