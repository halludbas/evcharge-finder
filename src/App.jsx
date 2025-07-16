import React, { useState, useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import MapView from "./components/MapView";
import StationList from "./components/StationList";
import FilterPanel from "./components/FilterPanel";
import StationDetails from "./components/StationDetails";
import RouteSelector from "./components/RouteSelector";
import { Zap, Menu, X, Filter, List, Map, Navigation } from "lucide-react";

function App() {
  const [activeTab, setActiveTab] = useState("map"); // map, list, route
  const [showFilters, setShowFilters] = useState(false);
  const [showStationDetails, setShowStationDetails] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStationSelect = (stationId) => {
    setSelectedStationId(stationId);
    setShowStationDetails(true);
  };

  const handleCloseStationDetails = () => {
    setShowStationDetails(false);
    setSelectedStationId(null);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row relative">
          {/* Mobile Tab Navigation */}
          {isMobile && (
            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "map"
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Map className="w-4 h-4 mr-1" />
                  Harita
                </button>
                <button
                  onClick={() => setActiveTab("list")}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "list"
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <List className="w-4 h-4 mr-1" />
                  Liste
                </button>
                <button
                  onClick={() => setActiveTab("route")}
                  className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "route"
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Navigation className="w-4 h-4 mr-1" />
                  Rota
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showFilters
                      ? "bg-primary-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Desktop Sidebar or Mobile Content */}
          <div
            className={`${
              isMobile
                ? "flex-1 flex flex-col"
                : "w-1/3 min-w-96 max-w-md bg-white border-r border-gray-200 flex flex-col"
            }`}
          >
            {/* Desktop Tab Navigation */}
            {!isMobile && (
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab("list")}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "list"
                        ? "bg-primary-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <List className="w-4 h-4 mr-1" />
                    İstasyonlar
                  </button>
                  <button
                    onClick={() => setActiveTab("route")}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === "route"
                        ? "bg-primary-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    Rota Planla
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      showFilters
                        ? "bg-primary-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Filters Panel */}
            {showFilters && (
              <div
                className={`${
                  isMobile ? "flex-1" : "border-b border-gray-200"
                }`}
              >
                <FilterPanel onClose={() => setShowFilters(false)} />
              </div>
            )}

            {/* Content based on active tab */}
            {!showFilters && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {activeTab === "list" && (
                  <StationList onStationSelect={handleStationSelect} />
                )}
                {activeTab === "route" && <RouteSelector />}
                {activeTab === "map" && isMobile && (
                  <div className="flex-1">
                    <MapView onStationSelect={handleStationSelect} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Map View */}
          {!isMobile && (
            <div className="flex-1 relative">
              <MapView onStationSelect={handleStationSelect} />
            </div>
          )}
        </div>

        {/* Station Details Modal */}
        {showStationDetails && selectedStationId && (
          <StationDetails
            stationId={selectedStationId}
            onClose={handleCloseStationDetails}
          />
        )}

        {/* Loading Indicator */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-primary-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">EVCharge Finder</span>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
