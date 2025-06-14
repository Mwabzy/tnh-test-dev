// src/pages/ClinicListing.tsx
import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Fix for Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define interfaces
interface Clinic {
  id: string;
  name: string;
  address: {
    building: string;
    street: string;
    city: string;
    zip: string;
  };
  contact: {
    email: string;
    phone: string[];
  };
  coordinates: [number, number]; // [lat, lng]
}

// Clinic data for Nairobi outpatient centers
const clinics: Clinic[] = [
  {
    id: '1',
    name: 'Galleria Mall Outpatient Clinic',
    address: {
      building: 'Galleria Shopping Mall, 2nd Floor',
      street: 'Lang’ata Road, opposite Bomas of Kenya',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254703073000', '+254719155496'],
    },
    coordinates: [-1.3574, 36.7375],
  },
  {
    id: '2',
    name: 'Rosslyn Outpatient Clinic',
    address: {
      building: 'Rosslyn Riviera Mall, 3rd Floor',
      street: 'Limuru Road, near Runda',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254780355766'],
    },
    coordinates: [-1.2270, 36.8060],
  },
  {
    id: '3',
    name: 'Warwick Outpatient Clinic',
    address: {
      building: 'Warwick Centre, United Nations Avenue',
      street: 'Gigiri, opposite the UN',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254703072000', '+254729110203', '+254729110202'],
    },
    coordinates: [-1.2320, 36.8150],
  },
  {
    id: '4',
    name: 'Capital Centre Outpatient Clinic',
    address: {
      building: 'Capital Centre, 1st Floor above Diamond Trust Bank',
      street: 'Mombasa Road',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254723976587', '+254723976571'],
    },
    coordinates: [-1.3260, 36.8580],
  },
  {
    id: '5',
    name: 'Southfield Outpatient Clinic',
    address: {
      building: 'Southfield Mall, 2nd Floor',
      street: 'North Airport Road, Embakasi',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254702433433', '+254709628000'],
    },
    coordinates: [-1.3310, 36.8900],
  },
  {
    id: '6',
    name: 'Kiambu Outpatient Clinic',
    address: {
      building: 'Kiambu Mall, 2nd Floor',
      street: 'Kiambu Road, 200m from Kiambu District Hospital',
      city: 'Nairobi',
      zip: '00100',
    },
    contact: {
      email: 'hosp@nbihosp.org',
      phone: ['+254701442277', '+254715442277'],
    },
    coordinates: [-1.1720, 36.8300],
  },
];

const ClinicListing: React.FC = () => {
  // State for search and selected clinic
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  // Filter clinics based on search query
  const filteredClinics = useMemo(
    () =>
      clinics.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.address.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
          clinic.address.street.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  // Map center (Nairobi city center or selected clinic)
  const mapCenter: LatLngExpression = selectedClinic
    ? selectedClinic.coordinates
    : [-1.2864, 36.8172]; // Nairobi city center

  // Map zoom level
  const zoomLevel = selectedClinic ? 15 : 12;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Outpatient Clinics in Nairobi
        </h1>

        {/* Search and Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search and Clinic List */}
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by clinic name, city, building, or street"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Clinic List */}
            <ScrollArea className="bg-white shadow rounded-lg p-6 h-[500px]">
              {filteredClinics.length > 0 ? (
                filteredClinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedClinic?.id === clinic.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedClinic(clinic)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{clinic.name}</h3>
                    <p className="text-sm text-gray-600">{clinic.address.building}</p>
                    <p className="text-sm text-gray-600">
                      {clinic.address.street}, {clinic.address.city}, {clinic.address.zip}
                    </p>
                    <p className="text-sm text-gray-600">Email: {clinic.contact.email}</p>
                    <p className="text-sm text-gray-600">
                      Phone: {clinic.contact.phone.join(', ')}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No clinics found</p>
              )}
            </ScrollArea>
          </div>

          {/* Map Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <MapContainer
              center={mapCenter}
              zoom={zoomLevel}
              style={{ height: '550px', width: '100%' }}
              className="rounded-md z-10"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                className=''
              />
              {filteredClinics.map((clinic) => (
                <Marker key={clinic.id} position={clinic.coordinates}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{clinic.name}</h3>
                      <p>{clinic.address.building}</p>
                      <p>
                        {clinic.address.street}, {clinic.address.city}, {clinic.address.zip}
                      </p>
                      <p>Email: {clinic.contact.email}</p>
                      <p>Phone: {clinic.contact.phone.join(', ')}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicListing;