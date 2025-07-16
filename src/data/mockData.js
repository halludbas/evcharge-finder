// Mock şarj istasyonu verileri
export const chargingStations = [
  {
    id: 1,
    name: "Optimum AVM Şarj İstasyonu",
    operator: "Voltrun",
    address: "Levent Mahallesi, Nispetiye Cad. No:1, Beşiktaş/İstanbul",
    coordinates: [41.0858, 29.0150],
    status: "available", // available, occupied, unavailable, maintenance
    connectorType: "Type 2",
    power: "22 kW",
    pricePerKwh: 12.50,
    availableConnectors: 3,
    totalConnectors: 4,
    amenities: ["wifi", "cafe", "restroom", "shopping"],
    operatingHours: "24/7",
    lastUpdated: "2 dakika önce",
    rating: 4.5,
    reviews: 127,
    fastCharging: true
  },
  {
    id: 2,
    name: "İstinye Park Şarj Merkezi",
    operator: "Eşarj",
    address: "İstinye Bayırı Cad. İstinye Park AVM, Sarıyer/İstanbul",
    coordinates: [41.1086, 29.0253],
    status: "occupied",
    connectorType: "CCS",
    power: "50 kW",
    pricePerKwh: 15.75,
    availableConnectors: 1,
    totalConnectors: 6,
    amenities: ["restaurant", "shopping", "valet"],
    operatingHours: "10:00 - 22:00",
    lastUpdated: "5 dakika önce",
    rating: 4.7,
    reviews: 203,
    fastCharging: true
  },
  {
    id: 3,
    name: "Boğaziçi Üniversitesi Şarj Noktası",
    operator: "Aksa Şarj",
    address: "Bebek, 34342 Beşiktaş/İstanbul",
    coordinates: [41.0847, 29.0435],
    status: "available",
    connectorType: "Type 2",
    power: "11 kW",
    pricePerKwh: 8.90,
    availableConnectors: 2,
    totalConnectors: 2,
    amenities: ["university", "library"],
    operatingHours: "08:00 - 18:00",
    lastUpdated: "1 dakika önce",
    rating: 4.2,
    reviews: 89,
    fastCharging: false
  },
  {
    id: 4,
    name: "Zorlu Center Şarj Merkezi",
    operator: "Sharz",
    address: "Levazım Mah. Koru Sok. No:2, Beşiktaş/İstanbul",
    coordinates: [41.0689, 29.0109],
    status: "maintenance",
    connectorType: "CCS & Type 2",
    power: "150 kW",
    pricePerKwh: 18.25,
    availableConnectors: 0,
    totalConnectors: 8,
    amenities: ["shopping", "cinema", "restaurant", "hotel"],
    operatingHours: "24/7",
    lastUpdated: "30 dakika önce",
    rating: 4.8,
    reviews: 456,
    fastCharging: true
  },
  {
    id: 5,
    name: "Galataport Şarj İstasyonu",
    operator: "Beefull",
    address: "Kemankeş Karamustafa Paşa Mah. Rıhtım Cad., Beyoğlu/İstanbul",
    coordinates: [41.0255, 28.9742],
    status: "available",
    connectorType: "Type 2",
    power: "22 kW",
    pricePerKwh: 13.40,
    availableConnectors: 4,
    totalConnectors: 6,
    amenities: ["port", "restaurant", "museum", "hotel"],
    operatingHours: "24/7",
    lastUpdated: "şimdi",
    rating: 4.6,
    reviews: 178,
    fastCharging: true
  },
  {
    id: 6,
    name: "Kadıköy Pier Şarj Noktası",
    operator: "Voltrun",
    address: "Hasanpaşa Mah. Rıhtım Cad. No:16, Kadıköy/İstanbul",
    coordinates: [40.9673, 29.0233],
    status: "occupied",
    connectorType: "Type 2",
    power: "11 kW",
    pricePerKwh: 10.80,
    availableConnectors: 0,
    totalConnectors: 3,
    amenities: ["ferry", "cafe", "sea_view"],
    operatingHours: "06:00 - 24:00",
    lastUpdated: "7 dakika önce",
    rating: 4.3,
    reviews: 94,
    fastCharging: false
  },
  {
    id: 7,
    name: "Atatürk Havalimanı Şarj Merkezi",
    operator: "TAV",
    address: "Yeşilköy Mah. Havalimanı Cad., Bakırköy/İstanbul",
    coordinates: [40.9769, 28.8169],
    status: "available",
    connectorType: "CCS & CHAdeMO",
    power: "100 kW",
    pricePerKwh: 16.90,
    availableConnectors: 6,
    totalConnectors: 12,
    amenities: ["airport", "hotel", "restaurant", "duty_free"],
    operatingHours: "24/7",
    lastUpdated: "3 dakika önce",
    rating: 4.4,
    reviews: 312,
    fastCharging: true
  },
  {
    id: 8,
    name: "Taksim Meydanı Şarj İstasyonu",
    operator: "İBB",
    address: "Gümüşsuyu Mah. Taksim Meydanı, Beyoğlu/İstanbul",
    coordinates: [41.0369, 28.9850],
    status: "unavailable",
    connectorType: "Type 2",
    power: "22 kW",
    pricePerKwh: 9.50,
    availableConnectors: 0,
    totalConnectors: 4,
    amenities: ["metro", "bus", "tourist_area"],
    operatingHours: "24/7",
    lastUpdated: "15 dakika önce",
    rating: 3.9,
    reviews: 156,
    fastCharging: true
  }
];

// Operatör verileri
export const operators = [
  { id: "voltrun", name: "Voltrun", color: "#0ea5e9" },
  { id: "esarj", name: "Eşarj", color: "#10b981" },
  { id: "aksa", name: "Aksa Şarj", color: "#f59e0b" },
  { id: "sharz", name: "Sharz", color: "#8b5cf6" },
  { id: "beefull", name: "Beefull", color: "#ef4444" },
  { id: "tav", name: "TAV", color: "#06b6d4" },
  { id: "ibb", name: "İBB", color: "#84cc16" }
];

// Konnektör tipleri
export const connectorTypes = [
  { id: "type2", name: "Type 2", icon: "🔌" },
  { id: "ccs", name: "CCS", icon: "⚡" },
  { id: "chademo", name: "CHAdeMO", icon: "🔋" }
];

// Güç seviyeleri
export const powerLevels = [
  { id: "slow", name: "Yavaş (3-11 kW)", min: 3, max: 11 },
  { id: "fast", name: "Hızlı (22-50 kW)", min: 22, max: 50 },
  { id: "rapid", name: "Süper Hızlı (100+ kW)", min: 100, max: 350 }
];

// Kullanıcı favorileri (localStorage'dan gelecek)
export const userFavorites = [1, 3, 5];

// Son kullanılan istasyonlar
export const recentStations = [
  { stationId: 1, usedAt: "2024-01-15T10:30:00" },
  { stationId: 2, usedAt: "2024-01-10T16:45:00" },
  { stationId: 5, usedAt: "2024-01-08T14:20:00" }
];

// Seyahat rotası örneği
export const exampleRoute = {
  origin: { name: "İstanbul Merkez", coordinates: [41.0082, 28.9784] },
  destination: { name: "Ankara", coordinates: [39.9334, 32.8597] },
  recommendedStations: [
    { stationId: 7, estimatedArrival: "11:30", chargingTime: "45 min" },
    { stationId: 4, estimatedArrival: "13:15", chargingTime: "30 min" }
  ]
};

// Amenity icons
export const amenityIcons = {
  wifi: "📶",
  cafe: "☕",
  restroom: "🚻",
  shopping: "🛍️",
  restaurant: "🍽️",
  hotel: "🏨",
  valet: "🅿️",
  university: "🎓",
  library: "📚",
  cinema: "🎬",
  port: "⚓",
  museum: "🏛️",
  ferry: "⛴️",
  sea_view: "🌊",
  airport: "✈️",
  duty_free: "🛒",
  metro: "🚇",
  bus: "🚌",
  tourist_area: "📸"
};