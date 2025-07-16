import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Zap, Bell, User, Menu, MapPin, Settings } from 'lucide-react';

const Header = () => {
  const { searchQuery, setSearchQuery, filteredStations, userLocation, setUserLocation } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          alert('Konum bilgisi alınamadı. Lütfen tarayıcı ayarlarından konum iznini etkinleştirin.');
        }
      );
    } else {
      alert('Tarayıcınız konum bilgisi almayı desteklemiyor.');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EVCharge</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Şarj İstasyonu Bulucu</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="İstasyon, şehir veya operatör ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="absolute right-3 inset-y-0 flex items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {filteredStations.length} sonuç
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Location Button */}
            <button
              onClick={handleLocationRequest}
              className={`p-2 rounded-lg transition-colors ${
                userLocation
                  ? 'bg-electric-100 text-electric-700 hover:bg-electric-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Konumumu bul"
            >
              <MapPin className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors relative"
              title="Bildirimler"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Kullanıcı menüsü"
              >
                <User className="h-5 w-5" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Kullanıcı</p>
                    <p className="text-xs text-gray-500">user@example.com</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profil</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Zap className="h-4 w-4" />
                    <span>Şarj Geçmişi</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Ayarlar</span>
                  </button>
                  <div className="border-t border-gray-200 mt-1">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Results Preview */}
      {searchQuery && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50 px-4 py-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{filteredStations.length}</span> istasyon bulundu
          </p>
        </div>
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;