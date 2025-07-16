import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Clock, 
  Battery, 
  Star, 
  Navigation, 
  Heart,
  MapPin,
  Filter,
  SortAsc,
  SortDesc,
  Loader
} from 'lucide-react';
import { amenityIcons } from '../data/mockData';

const StationCard = ({ station, onSelect, onToggleFavorite, isFavorite }) => {
  const handleDirections = (e) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates[0]},${station.coordinates[1]}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(station.id);
  };

  const statusConfig = {
    available: { text: 'Müsait', class: 'bg-electric-500 text-white' },
    occupied: { text: 'Dolu', class: 'bg-yellow-500 text-white' },
    unavailable: { text: 'Kullanım Dışı', class: 'bg-red-500 text-white' },
    maintenance: { text: 'Bakımda', class: 'bg-gray-500 text-white' }
  };

  const status = statusConfig[station.status] || statusConfig.available;

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect(station.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 pr-2">
            {station.name}
          </h3>
          <p className="text-xs text-gray-600 mb-2">{station.operator}</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.class}`}>
            {status.text}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleFavorite}
            className={`p-1.5 rounded-full transition-colors ${
              isFavorite
                ? 'text-red-500 hover:text-red-600 bg-red-50'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleDirections}
            className="p-1.5 rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start space-x-2 mb-3">
        <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-600 line-clamp-2">{station.address}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-3 h-3 text-primary-600" />
          <span className="text-xs text-gray-700">{station.connectorType}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Battery className="w-3 h-3 text-electric-600" />
          <span className="text-xs text-gray-700">{station.power}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3 text-gray-600" />
          <span className="text-xs text-gray-700">{station.operatingHours}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-900">
            ₺{station.pricePerKwh}/kWh
          </span>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {Array.from({ length: station.totalConnectors }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index < station.availableConnectors
                    ? 'bg-electric-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {station.availableConnectors}/{station.totalConnectors} müsait
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex">
            {renderStarRating(station.rating)}
          </div>
          <span className="text-xs text-gray-600">
            {station.rating} ({station.reviews})
          </span>
        </div>
      </div>

      {/* Amenities */}
      {station.amenities.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {station.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
            >
              {amenityIcons[amenity] || '•'} {amenity}
            </span>
          ))}
          {station.amenities.length > 4 && (
            <span className="text-xs text-gray-500">
              +{station.amenities.length - 4} daha
            </span>
          )}
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-2 text-xs text-gray-500">
        Son güncelleme: {station.lastUpdated}
      </div>
    </div>
  );
};

const StationList = ({ onStationSelect }) => {
  const { 
    filteredStations, 
    favorites, 
    toggleFavorite, 
    isLoading,
    searchQuery 
  } = useApp();

  const [sortBy, setSortBy] = useState('distance'); // distance, rating, price, name
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Sort stations
  const sortedStations = React.useMemo(() => {
    let stations = [...filteredStations];

    if (showOnlyFavorites) {
      stations = stations.filter(station => favorites.includes(station.id));
    }

    stations.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'price':
          comparison = a.pricePerKwh - b.pricePerKwh;
          break;
        case 'distance':
          // Mock distance calculation - in real app would use user location
          comparison = a.id - b.id;
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return stations;
  }, [filteredStations, favorites, showOnlyFavorites, sortBy, sortOrder]);

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Şarj istasyonları yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Controls */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Şarj İstasyonları
          </h2>
          <span className="text-sm text-gray-600">
            {sortedStations.length} istasyon
          </span>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-gray-600">Sırala:</span>
          {[
            { key: 'distance', label: 'Mesafe' },
            { key: 'rating', label: 'Puan' },
            { key: 'price', label: 'Fiyat' },
            { key: 'name', label: 'İsim' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm transition-colors ${
                sortBy === key
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>{label}</span>
              {sortBy === key && (
                sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
              )}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-sm transition-colors ${
              showOnlyFavorites
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-3 h-3 ${showOnlyFavorites ? 'fill-current' : ''}`} />
            <span>Favoriler</span>
          </button>
        </div>
      </div>

      {/* Station List */}
      <div className="flex-1 overflow-y-auto">
        {sortedStations.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Zap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {showOnlyFavorites ? 'Favori istasyon bulunamadı' : 'İstasyon bulunamadı'}
              </h3>
              <p className="text-gray-600 max-w-sm">
                {showOnlyFavorites 
                  ? 'Henüz favori istasyonunuz yok. İstasyonları favorilere eklemek için kalp simgesine tıklayın.'
                  : searchQuery 
                    ? 'Arama kriterlerinize uygun istasyon bulunamadı. Filtreleri değiştirmeyi deneyin.'
                    : 'Bu bölgede henüz şarj istasyonu bulunmuyor.'
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {sortedStations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
                onSelect={onStationSelect}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(station.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StationList;