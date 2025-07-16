import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  MapPin,
  Zap,
  Clock,
  Battery,
  Navigation,
  Plus,
  X,
  ChevronRight,
  Car,
  Loader,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { chargingStations } from "../data/mockData";

const RouteSelector = () => {
  const { setMapCenter, setMapZoom } = useApp();
  const [routeData, setRouteData] = useState({
    origin: "",
    destination: "",
    vehicleRange: 300, // km
    currentBattery: 80, // %
    preferredStops: 2,
    avoidTolls: false,
    fastChargingOnly: true,
  });
  const [plannedRoute, setPlannedRoute] = useState(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleInputChange = (field, value) => {
    setRouteData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlanRoute = async () => {
    if (!routeData.origin || !routeData.destination) {
      alert("Lütfen başlangıç ve hedef noktalarını girin");
      return;
    }

    setIsPlanning(true);

    // Simulate API call delay
    setTimeout(() => {
      // Mock route planning result
      const mockRoute = {
        totalDistance: 485,
        totalTime: "5 saat 20 dakika",
        recommendedStations: [
          {
            station: chargingStations[0],
            arrivalTime: "10:30",
            chargingTime: "45 dakika",
            batteryBefore: 25,
            batteryAfter: 85,
            distance: 180,
          },
          {
            station: chargingStations[4],
            arrivalTime: "13:45",
            chargingTime: "30 dakika",
            batteryBefore: 20,
            batteryAfter: 80,
            distance: 305,
          },
        ],
        alternatives: [
          {
            id: 1,
            name: "Hızlı Rota",
            time: "5 saat 20 dakika",
            distance: 485,
            stops: 2,
            cost: "₺85",
          },
          {
            id: 2,
            name: "Ekonomik Rota",
            time: "5 saat 45 dakika",
            distance: 495,
            stops: 3,
            cost: "₺72",
          },
          {
            id: 3,
            name: "Konforlu Rota",
            time: "6 saat 10 dakika",
            distance: 510,
            stops: 2,
            cost: "₺90",
          },
        ],
      };

      setPlannedRoute(mockRoute);
      setSelectedRoute(mockRoute.alternatives[0]);
      setIsPlanning(false);
    }, 2000);
  };

  const handleStationSelect = (station) => {
    setMapCenter(station.coordinates);
    setMapZoom(16);
  };

  const handleStartNavigation = () => {
    if (plannedRoute && selectedRoute) {
      const firstStation = plannedRoute.recommendedStations[0];
      if (firstStation) {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${routeData.origin}&destination=${firstStation.station.coordinates[0]},${firstStation.station.coordinates[1]}&travelmode=driving`;
        window.open(url, "_blank");
      }
    }
  };

  const getBatteryColor = (percentage) => {
    if (percentage > 50) return "text-electric-600";
    if (percentage > 20) return "text-yellow-600";
    return "text-red-600";
  };

  const popularDestinations = [
    { name: "İstanbul", coordinates: [41.0082, 28.9784] },
    { name: "Ankara", coordinates: [39.9334, 32.8597] },
    { name: "İzmir", coordinates: [38.4237, 27.1428] },
    { name: "Antalya", coordinates: [36.8969, 30.7133] },
    { name: "Bursa", coordinates: [40.1826, 29.0665] },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Rota Planlayıcı
        </h2>
        <p className="text-sm text-gray-600">
          Elektrikli aracınız için optimal rota ve şarj noktalarını planlayın
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Route Form */}
        <div className="space-y-4">
          {/* Origin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Başlangıç Noktası
            </label>
            <input
              type="text"
              value={routeData.origin}
              onChange={(e) => handleInputChange("origin", e.target.value)}
              placeholder="Başlangıç noktasını girin"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Navigation className="w-4 h-4 inline mr-1" />
              Hedef
            </label>
            <input
              type="text"
              value={routeData.destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              placeholder="Hedef noktasını girin"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />

            {/* Popular Destinations */}
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">Popüler hedefler:</p>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest.name}
                    onClick={() => handleInputChange("destination", dest.name)}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                  >
                    {dest.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Car className="w-4 h-4 inline mr-1" />
                Menzil (km)
              </label>
              <input
                type="number"
                value={routeData.vehicleRange}
                onChange={(e) =>
                  handleInputChange("vehicleRange", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Battery className="w-4 h-4 inline mr-1" />
                Mevcut Şarj (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={routeData.currentBattery}
                onChange={(e) =>
                  handleInputChange("currentBattery", parseInt(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Tercihler</h3>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="fastCharging"
                checked={routeData.fastChargingOnly}
                onChange={(e) =>
                  handleInputChange("fastChargingOnly", e.target.checked)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="fastCharging" className="text-sm text-gray-700">
                Sadece hızlı şarj istasyonları (22kW+)
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="avoidTolls"
                checked={routeData.avoidTolls}
                onChange={(e) =>
                  handleInputChange("avoidTolls", e.target.checked)
                }
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="avoidTolls" className="text-sm text-gray-700">
                Ücretli yollardan kaçın
              </label>
            </div>
          </div>

          {/* Plan Button */}
          <button
            onClick={handlePlanRoute}
            disabled={isPlanning || !routeData.origin || !routeData.destination}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isPlanning ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Rota planlanıyor...</span>
              </>
            ) : (
              <>
                <Navigation className="w-5 h-5" />
                <span>Rota Planla</span>
              </>
            )}
          </button>
        </div>

        {/* Planned Route Results */}
        {plannedRoute && (
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Planlanan Rota
              </h3>

              {/* Route Alternatives */}
              <div className="space-y-2 mb-4">
                {plannedRoute.alternatives.map((route) => (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRoute?.id === route.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {route.name}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {route.time}
                          </span>
                          <span className="text-sm text-gray-600">
                            <Navigation className="w-3 h-3 inline mr-1" />
                            {route.distance} km
                          </span>
                          <span className="text-sm text-gray-600">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {route.stops} durak
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {route.cost}
                        </div>
                        <div className="text-sm text-gray-500">Toplam</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charging Stops */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">
                  Önerilen Şarj Durakları
                </h4>

                {plannedRoute.recommendedStations.map((stop, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">
                          {stop.station.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {stop.station.operator}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-600">
                            <Clock className="w-3 h-3 inline mr-1" />
                            Varış: {stop.arrivalTime}
                          </span>
                          <span className="text-sm text-gray-600">
                            <Zap className="w-3 h-3 inline mr-1" />
                            {stop.chargingTime}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStationSelect(stop.station)}
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Haritada Gör
                      </button>
                    </div>

                    {/* Battery Status */}
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Batarya Durumu
                        </span>
                        <span className="text-sm text-gray-600">
                          {stop.distance} km'de
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Varışta</span>
                            <span
                              className={`font-medium ${getBatteryColor(
                                stop.batteryBefore
                              )}`}
                            >
                              %{stop.batteryBefore}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                stop.batteryBefore > 50
                                  ? "bg-electric-500"
                                  : stop.batteryBefore > 20
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${stop.batteryBefore}%` }}
                            />
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Ayrılışta</span>
                            <span
                              className={`font-medium ${getBatteryColor(
                                stop.batteryAfter
                              )}`}
                            >
                              %{stop.batteryAfter}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-electric-500 h-2 rounded-full"
                              style={{ width: `${stop.batteryAfter}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Start Navigation */}
              <button
                onClick={handleStartNavigation}
                className="w-full bg-electric-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-electric-700 transition-colors flex items-center justify-center space-x-2 mt-4"
              >
                <Navigation className="w-5 h-5" />
                <span>Navigasyonu Başlat</span>
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            İpuçları
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • Seyahat öncesi aracınızın %80-100 şarjlı olmasını sağlayın
            </li>
            <li>
              • Yoğun saatlerde şarj istasyonlarında bekleme olabileceğini
              unutmayın
            </li>
            <li>• Hızlı şarj istasyonları genellikle daha pahalı olabilir</li>
            <li>• Alternatif rotaları da değerlendirin</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RouteSelector;
