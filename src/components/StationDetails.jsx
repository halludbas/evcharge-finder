import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Star, 
  Heart, 
  Navigation, 
  Phone, 
  Clock, 
  Zap, 
  Battery, 
  MapPin,
  Info,
  DollarSign,
  Share2,
  Camera,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { amenityIcons } from '../data/mockData';

const StationDetails = ({ stationId, onClose }) => {
  const { stations, favorites, toggleFavorite, setMapCenter, setMapZoom } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // overview, amenities, reviews, photos
  const [showFullDescription, setShowFullDescription] = useState(false);

  const station = stations.find(s => s.id === stationId);

  if (!station) {
    return null;
  }

  const isFavorite = favorites.includes(station.id);

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.coordinates[0]},${station.coordinates[1]}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    // In a real app, this would have the station's phone number
    window.open('tel:+905001234567');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: station.name,
        text: `${station.name} şarj istasyonu - ${station.address}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${station.name} - ${station.address}`);
      alert('Bağlantı panoya kopyalandı!');
    }
  };

  const handleShowOnMap = () => {
    setMapCenter(station.coordinates);
    setMapZoom(16);
    onClose();
  };

  const statusConfig = {
    available: { text: 'Müsait', class: 'bg-electric-500 text-white', icon: '✓' },
    occupied: { text: 'Dolu', class: 'bg-yellow-500 text-white', icon: '⏳' },
    unavailable: { text: 'Kullanım Dışı', class: 'bg-red-500 text-white', icon: '✗' },
    maintenance: { text: 'Bakımda', class: 'bg-gray-500 text-white', icon: '🔧' }
  };

  const status = statusConfig[station.status] || statusConfig.available;

  const renderStarRating = (rating, size = 'sm') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className={`${sizeClass} fill-yellow-400 text-yellow-400`} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className={`${sizeClass} text-gray-300`} />);
    }

    return stars;
  };

  const mockReviews = [
    {
      id: 1,
      user: 'Ahmet K.',
      rating: 5,
      date: '2 gün önce',
      comment: 'Çok temiz ve hızlı şarj. Park yeri de bol, çok memnun kaldım.',
      helpful: 12
    },
    {
      id: 2,
      user: 'Zeynep M.',
      rating: 4,
      date: '1 hafta önce',
      comment: 'Güzel bir lokasyon, alışveriş yapabiliyorsunuz şarj olurken. Sadece biraz pahalı.',
      helpful: 8
    },
    {
      id: 3,
      user: 'Mehmet S.',
      rating: 5,
      date: '2 hafta önce',
      comment: 'Her zaman çalışıyor ve güvenilir. Favorim haline geldi.',
      helpful: 15
    }
  ];

  const mockPhotos = [
    'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=400',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=400'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{station.name}</h2>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${status.class}`}>
                  <span className="mr-1">{status.icon}</span>
                  {status.text}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{station.operator}</p>
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {renderStarRating(station.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {station.rating} ({station.reviews} değerlendirme)
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleFavorite(station.id)}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite
                    ? 'text-red-500 hover:text-red-600 bg-red-50'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-6">
              {[
                { key: 'overview', label: 'Genel Bilgi', icon: Info },
                { key: 'amenities', label: 'Olanaklar', icon: MapPin },
                { key: 'reviews', label: 'Yorumlar', icon: MessageCircle },
                { key: 'photos', label: 'Fotoğraflar', icon: Camera }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Konum</h3>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-700">{station.address}</p>
                      <button
                        onClick={handleShowOnMap}
                        className="text-sm text-primary-600 hover:text-primary-700 mt-1"
                      >
                        Haritada göster
                      </button>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Teknik Bilgiler</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Zap className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="text-xs text-gray-500">Konnektör Tipi</p>
                        <p className="text-sm font-medium text-gray-900">{station.connectorType}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Battery className="w-5 h-5 text-electric-600" />
                      <div>
                        <p className="text-xs text-gray-500">Güç</p>
                        <p className="text-sm font-medium text-gray-900">{station.power}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-500">Çalışma Saatleri</p>
                        <p className="text-sm font-medium text-gray-900">{station.operatingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Fiyat</p>
                        <p className="text-sm font-medium text-gray-900">₺{station.pricePerKwh}/kWh</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Müsaitlik</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Konnektör Durumu</span>
                      <span className="text-sm font-medium text-gray-900">
                        {station.availableConnectors}/{station.totalConnectors} müsait
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      {Array.from({ length: station.totalConnectors }).map((_, index) => (
                        <div
                          key={index}
                          className={`flex-1 h-3 rounded-full ${
                            index < station.availableConnectors
                              ? 'bg-electric-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleDirections}
                    className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-5 h-5" />
                    <span>Yol Tarifi Al</span>
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Ara</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mevcut Olanaklar</h3>
                {station.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {station.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-xl">{amenityIcons[amenity] || '•'}</span>
                        <span className="text-sm text-gray-700 capitalize">
                          {amenity.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">Bu istasyonda ek olanak bilgisi bulunmamaktadır.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Kullanıcı Yorumları</h3>
                  <button className="text-sm text-primary-600 hover:text-primary-700">
                    Yorum Yaz
                  </button>
                </div>

                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {renderStarRating(review.rating, 'sm')}
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                      <div className="flex items-center space-x-4">
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          👍 Faydalı ({review.helpful})
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          Yanıtla
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fotoğraflar</h3>
                <div className="grid grid-cols-2 gap-3">
                  {mockPhotos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={photo}
                        alt={`${station.name} fotoğraf ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Daha Fazla Fotoğraf Gör
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Last Updated */}
        <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Son güncelleme: {station.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;