# RemoteWork Pro - Uzaktan İş Bulma Platformu

Modern ve gelişmiş tasarıma sahip uzaktan iş bulma platformu. Bu platform, iş arayanları dünyanın dört bir yanındaki uzaktan çalışma fırsatlarıyla buluşturmayı hedefler.

![RemoteWork Pro](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400)

## 🚀 Özellikler

### 📋 Ana Özellikler
- **Modern Arayüz**: React + TypeScript ile geliştirilmiş responsive tasarım
- **Gelişmiş Arama**: Kategori, konum, maaş aralığı ve deneyim seviyesine göre filtreleme
- **İş Detayları**: Kapsamlı iş ilanı sayfaları ve şirket bilgileri
- **Kullanıcı Sistemi**: Kayıt, giriş ve profil yönetimi
- **Kayıtlı İşler**: Beğenilen işleri kaydetme ve takip etme
- **Şirket Profilleri**: Detaylı şirket sayfaları ve iş sayıları

### 🎨 Tasarım Özellikleri
- **Gradient Tasarım**: Modern renk geçişleri ve animasyonlar
- **Responsive**: Mobil, tablet ve masaüstü uyumlu
- **Dark Mode Desteği**: Karanlık tema seçeneği
- **Smooth Animasyonlar**: Framer Motion ile gelişmiş animasyonlar
- **Glassmorphism**: Modern cam efektli tasarım öğeleri

### 🛠️ Teknik Özellikler
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui
- **Routing**: Wouter (React Router alternatifi)
- **State Management**: TanStack Query (React Query)
- **Backend**: Express.js, Node.js
- **Database**: In-memory storage (geliştirme için)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

## 📂 Proje Yapısı

```
├── client/                 # Frontend uygulaması
│   ├── src/
│   │   ├── components/     # Yeniden kullanılabilir bileşenler
│   │   │   ├── ui/         # Shadcn/ui bileşenleri
│   │   │   ├── navigation.tsx
│   │   │   ├── job-card.tsx
│   │   │   ├── company-card.tsx
│   │   │   └── ...
│   │   ├── pages/          # Sayfa bileşenleri
│   │   │   ├── home.tsx
│   │   │   ├── job-detail.tsx
│   │   │   ├── companies.tsx
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   ├── register.tsx
│   │   │   ├── login.tsx
│   │   │   ├── profile.tsx
│   │   │   └── saved-jobs.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Yardımcı fonksiyonlar
│   │   └── App.tsx         # Ana uygulama bileşeni
├── server/                 # Backend uygulaması
│   ├── index.ts           # Server başlangıç dosyası
│   ├── routes.ts          # API rotaları
│   ├── storage.ts         # Veri depolama katmanı
│   └── vite.ts            # Vite entegrasyonu
├── shared/                # Paylaşılan tipler ve şemalar
│   └── schema.ts          # Drizzle ORM şemaları
└── README.md              # Bu dosya
```

## 🏃‍♂️ Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum

1. **Depoyu klonlayın**
```bash
git clone <repository-url>
cd remotework-pro
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

4. **Tarayıcınızda açın**
```
http://localhost:5000
```

## 📋 Sayfalar ve Özellikler

### 🏠 Ana Sayfa (`/`)
- Hero section ve iş arama
- Popüler kategoriler
- En son iş ilanları
- Öne çıkan şirketler
- Newsletter kayıt formu

### 💼 İş Detayları (`/jobs/:id`)
- Detaylı iş açıklaması
- Şirket bilgileri
- Gerekli yetenekler
- Başvuru ve kaydetme işlevleri
- Benzer iş önerileri

### 🏢 Şirketler (`/companies`)
- Tüm şirketlerin listesi
- Sektör ve büyüklük filtreleme
- Şirket profil kartları
- Arama işlevi

### ❤️ Kayıtlı İşler (`/saved-jobs`)
- Kaydedilen iş ilanları
- Arama ve filtreleme
- İpuçları ve öneriler

### 👤 Profil (`/profile`)
- Kişisel bilgiler
- İş deneyimi yönetimi
- Yetenekler ve diller
- Hesap ayarları

### 📝 Kayıt (`/register`)
- İş arayan / İşveren seçimi
- Kapsamlı kayıt formu
- Sosyal medya entegrasyonu
- Şartlar ve koşullar

### 🔐 Giriş (`/login`)
- E-posta ve şifre girişi
- Beni hatırla seçeneği
- Sosyal medya girişi
- Şifremi unuttum linki

### ℹ️ Hakkımızda (`/about`)
- Şirket misyonu ve vizyonu
- Takım üyeleri
- İstatistikler
- Değerler ve ilkeler

### 📞 İletişim (`/contact`)
- İletişim formu
- İletişim bilgileri
- Sık sorulan sorular
- Harita konumu

## 🔧 API Endpoints

### İş İlanları
- `GET /api/jobs` - Tüm işler (filtrelerle)
- `GET /api/jobs/:id` - Tek iş detayı
- `GET /api/jobs/featured` - Öne çıkan işler
- `POST /api/jobs` - Yeni iş oluştur

### Şirketler
- `GET /api/companies` - Tüm şirketler
- `GET /api/companies/:id` - Şirket detayı

### Kategoriler
- `GET /api/categories` - İş kategorileri

### Başvurular
- `POST /api/applications` - Başvuru yap
- `GET /api/applications/user/:userId` - Kullanıcı başvuruları

### Kayıtlı İşler
- `POST /api/saved-jobs` - İş kaydet
- `DELETE /api/saved-jobs` - İş kaydını kaldır
- `GET /api/saved-jobs/user/:userId` - Kullanıcının kayıtlı işleri

### Newsletter
- `POST /api/newsletter` - Newsletter'a abone ol

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Indigo (#6366F1)
- **Secondary**: Purple (#8B5CF6) 
- **Accent**: Cyan (#06B6D4)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Error**: Red (#EF4444)

### Tipografi
- **Font Family**: Inter
- **Başlıklar**: Semibold (600)
- **Metin**: Regular (400)
- **Vurgu**: Medium (500)

### Bileşenler
- **Button**: Primary, Secondary, Outline, Ghost varyantları
- **Card**: Hover efektleri ve gölgelendirme
- **Input**: Focus states ve validation
- **Badge**: Çeşitli renkler ve boyutlar

## 🚀 Deployment

### Replit Deployment
Bu proje Replit platformunda çalışacak şekilde optimize edilmiştir.

1. **Replit'te aç**
2. **Run butonuna bas**
3. **Deploy et**

### Manuel Deployment

1. **Production build**
```bash
npm run build
```

2. **Sunucuyu başlat**
```bash
npm start
```

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📞 Destek

Herhangi bir sorunuz veya öneriniz varsa:

- **E-posta**: hello@remoteworkpro.com
- **GitHub Issues**: [Issues sayfası](link)
- **Discord**: [Community server](link)

## 🎯 Gelecek Özellikler

- [ ] Gerçek veritabanı entegrasyonu
- [ ] E-posta bildirim sistemi
- [ ] Gelişmiş filtreleme seçenekleri
- [ ] Şirket dashboard'u
- [ ] CV upload ve parsing
- [ ] Chat/messaging sistemi
- [ ] Mobile uygulama

---

**RemoteWork Pro** ile uzaktan çalışma serüveninize başlayın! 🚀

Made with ❤️ by the RemoteWork Pro team
