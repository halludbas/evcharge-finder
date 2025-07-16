import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useApp } from "../context/AppContext";
import L from "leaflet";
import { Zap, Clock, Battery, Star, Navigation, Phone } from "lucide-react";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons for different station statuses
const createCustomIcon = (status, isSelected = false) => {
  const colors = {
    available: "#10b981",
    occupied: "#f59e0b",
    unavailable: "#ef4444",
    maintenance: "#6b7280",
  };

  const size = isSelected ? 40 : 30;
  const color = colors[status] || colors.available;

  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${isSelected ? "transform: scale(1.2);" : ""}
      ">
        <span style="color: white; font-size: ${size * 0.4}px;">⚡</span>
      </div>
    `,
    className: "custom-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Component to handle map center changes
const MapController = () => {
  const map = useMap();
  const { mapCenter, mapZoom, selectedStation } = useApp();

  useEffect(() => {
    if (mapCenter) {
      map.setView(mapCenter, mapZoom);
    }
  }, [map, mapCenter, mapZoom]);

  useEffect(() => {
    if (selectedStation) {
      map.setView(selectedStation.coordinates, 16);
    }
  }, [map, selectedStation]);

  return null;
};

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    available: { text: "Müsait", class: "bg-electric-500 text-white" },
    occupied: { text: "Dolu", class: "bg-yellow-500 text-white" },
    unavailable: { text: "Kullanım Dışı", class: "bg-red-500 text-white" },
    maintenance: { text: "Bakımda", class: "bg-gray-500 text-white" },
  };

  const config = statusConfig[status] || statusConfig.available;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.class}`}
    >
      {config.text}
    </span>
  );
};

const MapView = ({ onStationSelect }) => {
  const {
    filteredStations,
    selectedStation,
    userLocation,
    mapCenter,
    mapZoom,
    setSelectedStation,
    favorites,
    toggleFavorite,
  } = useApp();

  const mapRef = useRef();

  const handleMarkerClick = (station) => {
    setSelectedStation(station);
    if (onStationSelect) {
      onStationSelect(station.id);
    }
  };

  const handleDirections = (station) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates[0]},${station.coordinates[1]}&travelmode=driving`;
    window.open(url, "_blank");
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="w-3 h-3 fill-yellow-400 text-yellow-400"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="h-full w-full relative">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        className="z-10"
      >
        <MapController />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={L.divIcon({
              html: `
                <div style="
                  width: 20px;
                  height: 20px;
                  background-color: #3b82f6;
                  border: 3px solid white;
                  border-radius: 50%;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  animation: pulse 2s ease-in-out infinite;
                "></div>
              `,
              className: "user-location-marker",
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            })}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">Konumunuz</h3>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Charging Station Markers */}
        {filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={station.coordinates}
            icon={createCustomIcon(
              station.status,
              selectedStation?.id === station.id
            )}
            eventHandlers={{
              click: () => handleMarkerClick(station),
            }}
          >
            <Popup maxWidth={320} closeButton={false}>
              <div className="p-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {station.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {station.operator}
                    </p>
                    <StatusBadge status={station.status} />
                  </div>
                  <button
                    onClick={() => toggleFavorite(station.id)}
                    className={`p-1 rounded ${
                      favorites.includes(station.id)
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        favorites.includes(station.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-primary-600" />
                    <span>
                      {station.connectorType} • {station.power}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Battery className="w-3 h-3 text-electric-600" />
                    <span>
                      {station.availableConnectors}/{station.totalConnectors}{" "}
                      konnektör müsait
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-gray-600" />
                    <span>{station.operatingHours}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {renderStarRating(station.rating)}
                    </div>
                    <span className="text-gray-600">
                      {station.rating} ({station.reviews} değerlendirme)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">
                      ₺{station.pricePerKwh}/kWh
                    </span>
                    <span className="text-xs text-gray-500">
                      Son güncelleme: {station.lastUpdated}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleDirections(station)}
                    className="flex-1 bg-primary-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Yol Tarifi</span>
                  </button>
                  <button
                    onClick={() =>
                      onStationSelect && onStationSelect(station.id)
                    }
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-200 transition-colors"
                  >
                    Detaylar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-20">
        <h4 className="text-xs font-medium text-gray-900 mb-2">Durum</h4>
        <div className="space-y-1">
          {[
            { status: "available", label: "Müsait" },
            { status: "occupied", label: "Dolu" },
            { status: "unavailable", label: "Kullanım Dışı" },
            { status: "maintenance", label: "Bakımda" },
          ].map(({ status, label }) => (
            <div key={status} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full border border-white"
                style={{
                  backgroundColor: {
                    available: "#10b981",
                    occupied: "#f59e0b",
                    unavailable: "#ef4444",
                    maintenance: "#6b7280",
                  }[status],
                }}
              />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Station Count */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 z-20">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-gray-900">
            {filteredStations.length} istasyon görüntüleniyor
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
