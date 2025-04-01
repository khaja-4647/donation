import { useState, useRef, useEffect } from 'react';
import { Map, Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const INDIA_BOUNDS = [
  [68.1, 6.7],  // Southwest
  [97.4, 35.7]  // Northeast
];

const MapComponent = ({ location, setLocation, donors = [] }) => {
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4.5
  });
  const [searchInput, setSearchInput] = useState('');
  const [show3D, setShow3D] = useState(false);
  const [hoveredDonor, setHoveredDonor] = useState(null);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
  if (!apiKey) {
    return <div style={{ padding: 20, color: 'red' }}>MapTiler API key is missing</div>;
  }

  const mapStyle = show3D
    ? `https://api.maptiler.com/maps/hybrid/style.json?key=${apiKey}`
    : `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`;

  useEffect(() => {
    if (location?.lat && location?.lng) {
      setViewport({
        longitude: location.lng,
        latitude: location.lat,
        zoom: 12
      });
    }
  }, [location]);

  const getBloodTypeColor = (bloodType) => {
    const colors = {
      'A+': '#FF5252',
      'A-': '#FF4081',
      'B+': '#536DFE',
      'B-': '#7C4DFF',
      'O+': '#FFD740',
      'O-': '#FFAB40',
      'AB+': '#69F0AE',
      'AB-': '#B2FF59',
    };
    return colors[bloodType] || '#9E9E9E';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchInput);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', margin: '20px 0' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search location"
          style={{ padding: '8px', width: '70%', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Search
        </button>
        <button type="button" onClick={() => setShow3D(!show3D)} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {show3D ? 'Disable 3D' : 'Enable 3D'}
        </button>
      </form>
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
        maxBounds={INDIA_BOUNDS}
        minZoom={3.5}
      >
        {donors.map((donor) => (
          <Marker
            key={donor.id}
            longitude={donor.location.lng}
            latitude={donor.location.lat}
            color={getBloodTypeColor(donor.bloodType)}
            onMouseEnter={() => setHoveredDonor(donor)}
            onMouseLeave={() => setHoveredDonor(null)}
          />
        ))}

        {hoveredDonor && (
          <Popup
            longitude={hoveredDonor.location.lng}
            latitude={hoveredDonor.location.lat}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
          >
            <div style={{ padding: '8px', maxWidth: '250px' }}>
              <div style={{ fontWeight: 'bold', color: getBloodTypeColor(hoveredDonor.bloodType), marginBottom: '4px' }}>
                {hoveredDonor.bloodType} Donor
              </div>
              <div style={{ marginBottom: '4px' }}>{hoveredDonor.fullName}</div>
              <div style={{ fontSize: '0.9em', marginBottom: '4px' }}>
                Available: {hoveredDonor.availabilityStart} - {hoveredDonor.availabilityEnd}
              </div>
              <div style={{ fontSize: '0.9em', marginBottom: '4px' }}>
                Contact: {hoveredDonor.contactNumber}
              </div>
              <div style={{ fontSize: '0.8em', color: '#666' }}>
                {hoveredDonor.location.lat.toFixed(4)}, {hoveredDonor.location.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        )}

        <NavigationControl position="bottom-right" />
      </Map>
    </div>
  );
};

export default MapComponent;
