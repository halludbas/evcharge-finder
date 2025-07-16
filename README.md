# EVCharge Finder - Elektrikli Araç Şarj İstasyonu Bulucu

**VOLTLA benzeri** kapsamlı elektrikli araç şarj istasyonu bulucu uygulaması. Modern tasarım, kullanıcı dostu arayüz ve gelişmiş özelliklerle elektrikli araç sahipleri için optimal şarj deneyimi sağlar.

## 🚗 Özellikler

### 🗺️ Harita ve Konum
- **Interaktif Harita**: OpenStreetMap tabanlı detaylı harita görünümü
- **Gerçek Zamanlı Konum**: GPS ile mevcut konumu otomatik tespit
- **Şarj İstasyonu Gösterimi**: Farklı durumlar için renkli marker'lar
- **Popup Bilgiler**: İstasyon detayları ve hızlı işlemler
- **Navigasyon Entegrasyonu**: Google Maps ile yol tarifi

### 🔍 Gelişmiş Arama ve Filtreleme
- **Akıllı Arama**: İstasyon adı, operatör ve adres arama
- **Çoklu Filtre Seçenekleri**:
  - İstasyon durumu (Müsait, Dolu, Kullanım Dışı, Bakımda)
  - Operatör seçimi (Voltrun, Eşarj, Aksa Şarj, vb.)
  - Konnektör tipi (Type 2, CCS, CHAdeMO)
  - Güç seviyesi (Yavaş, Hızlı, Süper Hızlı)
  - Fiyat aralığı
  - Olanaklar (WiFi, Kafe, Tuvalet, AVM, vb.)
  - Sadece hızlı şarj seçeneği

### 📱 Kullanıcı Deneyimi
- **Responsive Tasarım**: Mobil ve desktop uyumlu
- **Tab Navigasyon**: Harita, Liste ve Rota sekmeler
- **Favori Sistem**: İstasyonları favorilere ekleme
- **Sıralama Seçenekleri**: Mesafe, puan, fiyat, isim
- **Durum Badge'leri**: Görsel durum göstergeleri

### 🛣️ Akıllı Rota Planlama
- **Çoklu Rota Alternatifi**: Hızlı, Ekonomik, Konforlu rotalar
- **Batarya Hesaplama**: Gerçekçi batarya durumu simülasyonu
- **Şarj Durakları**: Optimal şarj noktaları önerisi
- **Seyahat Süresi**: Detaylı zaman hesaplaması
- **Maliyet Analizi**: Toplam şarj maliyeti tahmini

### 📊 İstasyon Detayları
- **Kapsamlı Bilgiler**: Teknik özellikler, çalışma saatleri, fiyatlar
- **Kullanıcı Değerlendirmeleri**: Yıldız puanı ve yorumlar
- **Fotoğraf Galerisi**: İstasyon görseleri
- **Olanaklar Listesi**: Mevcut hizmetler ve imkanlar
- **Gerçek Zamanlı Durum**: Son güncelleme bilgisi

### ⚡ Teknik Özellikler
- **Modern Stack**: React 18 + Vite + Tailwind CSS
- **Harita**: React-Leaflet + OpenStreetMap
- **İkonlar**: Lucide React
- **Animasyonlar**: CSS transitions ve hover efektleri
- **State Management**: React Context API
- **Responsive Grid**: Mobil-first tasarım

## 🛠️ Kurulum

### Gereksinimler
- Node.js 16.0 veya üzeri
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd evcharge-finder
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Header.jsx       # Ana header ve arama
│   ├── MapView.jsx      # Harita görünümü
│   ├── StationList.jsx  # İstasyon listesi
│   ├── FilterPanel.jsx  # Filtre paneli
│   ├── StationDetails.jsx # İstasyon detay modal
│   └── RouteSelector.jsx # Rota planlayıcı
├── context/
│   └── AppContext.jsx   # Global state yönetimi
├── data/
│   └── mockData.js      # Test verileri
├── App.jsx              # Ana uygulama
├── main.jsx            # Entry point
└── index.css           # Global stiller
```

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Mavi tonları (#0ea5e9)
- **Electric**: Yeşil tonları (#10b981)
- **Status Colors**: 
  - Müsait: Yeşil (#10b981)
  - Dolu: Sarı (#f59e0b)
  - Kullanım Dışı: Kırmızı (#ef4444)
  - Bakımda: Gri (#6b7280)

### Tipografi
- **Font**: Inter (sistem fontları ile fallback)
- **Boyutlar**: Responsive text sizing
- **Ağırlıklar**: Normal, Medium, Semibold, Bold

## 🚀 Kullanım

### Temel Kullanım
1. **Arama**: Üst kısımdaki arama çubuğundan istasyon, şehir veya operatör arayın
2. **Filtreleme**: Sol paneldeki filtreleri kullanarak sonuçları daraltın
3. **Harita Görünümü**: İstasyonları harita üzerinde görüntüleyin
4. **Detay Görünümü**: İstasyona tıklayarak detaylı bilgileri açın

### Rota Planlama
1. **Rota Sekmesi**: "Rota Planla" sekmesine geçin
2. **Konum Girişi**: Başlangıç ve hedef noktalarını girin
3. **Araç Bilgileri**: Aracınızın menzil ve şarj durumunu belirtin
4. **Plan Oluştur**: Sistem size optimal rotayı önerecek

### Favoriler
- İstasyon kartlarındaki kalp simgesine tıklayarak favorilere ekleyin
- "Favoriler" filtresini kullanarak sadece favori istasyonları görüntüleyin

## 🔧 Geliştirme

### Available Scripts
```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
```

### Özelleştirme
- **Renkler**: `tailwind.config.js` dosyasından renk paletini değiştirin
- **Veriler**: `src/data/mockData.js` dosyasından test verilerini güncelleyin
- **Harita**: MapView bileşeninde harita sağlayıcısını değiştirin

## 🌟 VOLTLA Benzeri Özellikler

Bu uygulama, Türkiye'nin popüler elektrikli araç şarj istasyonu bulucu uygulaması VOLTLA'dan ilham alınarak geliştirilmiştir:

- ✅ **Kapsamlı İstasyon Listesi**: Tüm büyük operatörlerin istasyonları
- ✅ **Gerçek Zamanlı Durum**: İstasyon müsaitlik bilgisi
- ✅ **Akıllı Filtreleme**: Çoklu kriterlere göre filtreleme
- ✅ **Rota Optimizasyonu**: Batarya durumuna göre şarj planlama
- ✅ **Kullanıcı Yorumları**: Deneyim paylaşımı
- ✅ **Favori Sistem**: Kişisel istasyon listesi
- ✅ **Navigasyon Entegrasyonu**: Harici harita uygulamaları
- ✅ **Premium Özellikler**: Gelişmiş planlama araçları

## 📱 Mobil Uyumluluk

- **Tab Navigasyon**: Mobilde tab tabanlı navigasyon
- **Touch Optimized**: Dokunmatik ekranlar için optimize edilmiş
- **Responsive Layout**: Tüm ekran boyutlarında mükemmel görünüm
- **Fast Loading**: Hızlı yükleme ve smooth animasyonlar

## 🗺️ Mock Veri

Uygulama İstanbul merkezli 8 adet örnek şarj istasyonu içerir:
- **Optimum AVM** (Voltrun)
- **İstinye Park** (Eşarj)
- **Boğaziçi Üniversitesi** (Aksa Şarj)
- **Zorlu Center** (Sharz)
- **Galataport** (Beefull)
- **Kadıköy Pier** (Voltrun)
- **Atatürk Havalimanı** (TAV)
- **Taksim Meydanı** (İBB)

## 🚧 Geliştirilecek Özellikler

- [ ] Gerçek API entegrasyonu
- [ ] Kullanıcı hesap sistemi
- [ ] Push bildirimleri
- [ ] Offline çalışma modu
- [ ] Sosyal medya paylaşım
- [ ] QR kod şarj başlatma
- [ ] Ödeme entegrasyonu
- [ ] Şarj geçmişi takibi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📧 İletişim

Proje hakkında sorularınız için:
- GitHub Issues
- Email: [email@example.com]

---

**Not**: Bu uygulama eğitim amaçlı geliştirilmiştir ve VOLTLA uygulamasının resmi bir kopyası değildir. Gerçek şarj istasyonu verileri için resmi VOLTLA uygulamasını kullanın.
