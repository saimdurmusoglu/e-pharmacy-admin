# E-Pharmacy Admin — Backend

Node.js + Express + MongoDB REST API

## 🚀 Kurulum

```bash
npm install
```

## ⚙️ Environment Variables

`.env.example` dosyasını `.env` olarak kopyalayın ve doldurun:

```bash
cp .env.example .env
```

```env
PORT=3001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/e-pharmacy
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

## 🌱 Seed (Veritabanını Doldur)

```bash
npm run seed
```

Admin kullanıcı oluşturulur: `vendor@gmail.com` / `vendor123`

## 🔧 Geliştirme

```bash
npm run dev
```

## 📦 Production

```bash
npm start
```

## 📡 API Endpoints

### Auth
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/api/user/login` | Giriş yap |
| GET | `/api/user/logout` | Çıkış yap |
| GET | `/api/user/user-info` | Kullanıcı bilgisi |

### Dashboard
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/dashboard` | İstatistikler + son müşteriler + gelir/gider |

### Orders
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/orders` | Tüm siparişler (filter: name, status) |

### Products
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/products` | Tüm ürünler (filter: name, category) |
| POST | `/api/products` | Yeni ürün ekle |
| PUT | `/api/products/:productId` | Ürün güncelle |
| DELETE | `/api/products/:productId` | Ürün sil |

### Suppliers
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/suppliers` | Tüm tedarikçiler (filter: name, status) |
| POST | `/api/suppliers` | Yeni tedarikçi ekle |
| PUT | `/api/suppliers/:supplierId` | Tedarikçi güncelle |

### Customers
| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/api/customers` | Tüm müşteriler (filter: name) |
| GET | `/api/customers/:customerId` | Müşteri detayı |

## 🌐 Deploy (Render)

1. Render.com'da yeni Web Service oluştur
2. Repository'yi bağla
3. Environment variables ekle
4. Build command: `npm install`
5. Start command: `npm start`
