# 💊 E-Pharmacy Admin Dashboard

Eczane yönetimi için geliştirilmiş tam kapsamlı (full-stack) bir yönetim paneli. Yönetici; ürünleri, tedarikçileri, müşterileri ve siparişleri tek bir arayüzden takip edip yönetebilir. Dashboard sayfasında gelir/gider ve genel istatistikler özetlenir.

## ✨ Özellikler

- 🔐 **Kimlik doğrulama** — JWT tabanlı login/logout, korumalı (private) rotalar
- 📊 **Dashboard** — ürün/tedarikçi/müşteri sayıları, son müşteriler, gelir/gider listesi
- 📦 **Ürünler** — listeleme, ada/kategoriye göre filtreleme, ekleme, düzenleme, silme (modal)
- 🚚 **Tedarikçiler** — listeleme, filtreleme, ekleme, düzenleme (modal)
- 👥 **Müşteriler** — listeleme, filtreleme, sayfalama (pagination)
- 🧾 **Siparişler** — listeleme, kullanıcı adına göre filtreleme
- 📱 **Responsive** — mobil (375px+), tablet (768px+), masaüstü (1440px+)

## 🛠️ Kullanılan Teknolojiler

### Frontend
- React 19 + TypeScript
- Vite (bundler)
- React Router DOM (routing)
- React Hook Form + Yup (form & doğrulama)
- Axios (HTTP istekleri)
- CSS Modules (stil)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (kimlik doğrulama)
- bcryptjs (şifre hashleme)

## 📁 Proje Yapısı

```
e-pharmacy-admin/
├── frontend/   # React + TypeScript + Vite uygulaması
└── backend/    # Express + MongoDB REST API
```

## 🚀 Kurulum

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # değerleri doldurun
npm run seed           # veritabanını örnek veriyle doldurur
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

## 🔑 Demo Giriş Bilgileri

```
E-posta: vendor@gmail.com
Şifre:   vendor123
```

## 🔗 Bağlantılar

- **Tasarım (Figma):** https://www.figma.com/file/z1JklHHxX8kTGo3zWvlzat/Admin-dashboard
- **API dokümantasyonu:** [backend/README.md](./backend/README.md)

## 📜 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.
