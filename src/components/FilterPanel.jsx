import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, RotateCcw, Check } from 'lucide-react';
import { operators, connectorTypes, powerLevels, amenityIcons } from '../data/mockData';

const FilterPanel = ({ onClose }) => {
  const { filters, updateFilter, clearFilters } = useApp();
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    Object.keys(tempFilters).forEach(key => {
      updateFilter(key, tempFilters[key]);
    });
    onClose();
  };

  const handleResetFilters = () => {
    clearFilters();
    setTempFilters({
      status: 'all',
      operator: 'all',
      connectorType: 'all',
      powerLevel: 'all',
      priceRange: [0, 25],
      amenities: [],
      fastChargingOnly: false
    });
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = tempFilters.amenities || [];
    const newAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...tempFilters.priceRange];
    newRange[index] = parseFloat(value);
    handleFilterChange('priceRange', newRange);
  };

  const availableAmenities = [
    'wifi', 'cafe', 'restroom', 'shopping', 'restaurant', 'hotel', 
    'valet', 'university', 'library', 'cinema', 'port', 'museum',
    'ferry', 'sea_view', 'airport', 'duty_free', 'metro', 'bus', 'tourist_area'
  ];

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Filtreler</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleResetFilters}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Filtreleri Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            İstasyon Durumu
          </label>
          <div className="space-y-2">
            {[
              { value: 'all', label: 'Tümü', count: 8 },
              { value: 'available', label: 'Müsait', count: 4 },
              { value: 'occupied', label: 'Dolu', count: 2 },
              { value: 'unavailable', label: 'Kullanım Dışı', count: 1 },
              { value: 'maintenance', label: 'Bakımda', count: 1 }
            ].map(({ value, label, count }) => (
              <label key={value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={value}
                  checked={tempFilters.status === value}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 flex-1">{label}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  {count}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Operator Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Operatör
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="operator"
                value="all"
                checked={tempFilters.operator === 'all'}
                onChange={(e) => handleFilterChange('operator', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Tümü</span>
            </label>
            {operators.map((operator) => (
              <label key={operator.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="operator"
                  value={operator.name.toLowerCase()}
                  checked={tempFilters.operator === operator.name.toLowerCase()}
                  onChange={(e) => handleFilterChange('operator', e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2 flex-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: operator.color }}
                  />
                  <span className="text-sm text-gray-700">{operator.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Connector Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Konnektör Tipi
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="connectorType"
                value="all"
                checked={tempFilters.connectorType === 'all'}
                onChange={(e) => handleFilterChange('connectorType', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Tümü</span>
            </label>
            {connectorTypes.map((type) => (
              <label key={type.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="connectorType"
                  value={type.id}
                  checked={tempFilters.connectorType === type.id}
                  onChange={(e) => handleFilterChange('connectorType', e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 flex items-center space-x-2">
                  <span>{type.icon}</span>
                  <span>{type.name}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Power Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Güç Seviyesi
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="powerLevel"
                value="all"
                checked={tempFilters.powerLevel === 'all'}
                onChange={(e) => handleFilterChange('powerLevel', e.target.value)}
                className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Tümü</span>
            </label>
            {powerLevels.map((level) => (
              <label key={level.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="powerLevel"
                  value={level.id}
                  checked={tempFilters.powerLevel === level.id}
                  onChange={(e) => handleFilterChange('powerLevel', e.target.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">{level.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Fiyat Aralığı (₺/kWh)
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={tempFilters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.5"
                  value={tempFilters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              ₺{tempFilters.priceRange[0]} - ₺{tempFilters.priceRange[1]} / kWh
            </div>
          </div>
        </div>

        {/* Fast Charging Only */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={tempFilters.fastChargingOnly}
              onChange={(e) => handleFilterChange('fastChargingOnly', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-900">
              Sadece Hızlı Şarj (22kW+)
            </span>
          </label>
        </div>

        {/* Amenities Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Olanaklar
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempFilters.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-xs text-gray-700 flex items-center space-x-1">
                  <span>{amenityIcons[amenity] || '•'}</span>
                  <span className="capitalize">{amenity.replace('_', ' ')}</span>
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4 space-y-3">
        <button
          onClick={handleApplyFilters}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Filtreleri Uygula</span>
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          İptal
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;