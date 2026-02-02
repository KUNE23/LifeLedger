# 🚀 LifeLedger API Documentation

Dokumentasi ini berisi daftar endpoint API untuk aplikasi **LifeLedger**.
**Base URL:** `http://localhost:3000/api`

---

## 🔐 Authentication
Semua endpoint kecuali Register & Login memerlukan Header:
`Authorization: Bearer <your_access_token>`

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | `{"username", "email", "password"}` | Daftar user baru |
| POST | `/auth/login` | `{"email", "password"}` | Login & Get Tokens |
| POST | `/auth/refresh` | `{"refreshToken"}` | Generate Access Token baru |

---

## 💰 Finance & Categories
Manajemen pemasukan, pengeluaran, dan kategori.

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| GET | `/categories` | - | List kategori (Filter: `?type=income`) |
| POST | `/categories` | `{"name", "type", "icon"}` | Buat kategori baru |
| GET | `/finance` | - | Riwayat transaksi (Include Category) |
| POST | `/finance` | `{"amount", "type", "category_id", "note"}` | Mencatat transaksi baru |

---

## 📈 Trading Journal
Jurnal trading dengan kalkulasi Profit/Loss (PnL) otomatis.

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| POST | `/trading` | `{"ticker", "quantity", "entry_price", "stop_loss", "take_profit", "setup_id", "status"}` | Buka posisi baru |
| PUT | `/trading/:id` | `{"exit_price", "status"}` | Tutup posisi & Hitung PnL |

---

## 🎯 Yearly Goals
Tracking target pencapaian tahunan.

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| GET | `/goals` | - | Ambil semua target tahunan |
| POST | `/goals` | `{"title", "target_amount", "deadline"}` | Buat target baru |
| PATCH | `/goals/:id/progress` | `{"current_amount"}` | Update progress nominal |

---

## 📂 Projects & Todo List
Manajemen tugas berdasarkan proyek tertentu.

| Method | Endpoint | Request Body | Description |
| :--- | :--- | :--- | :--- |
| GET | `/projects` | - | List proyek beserta Todo-nya |
| POST | `/projects` | `{"name", "description"}` | Buat proyek baru |
| POST | `/projects/todo` | `{"project_id", "task", "priority", "due_date"}` | Tambah tugas ke proyek |
| PATCH | `/projects/todo/:id` | `{"is_done"}` | Tandai tugas selesai/belum |

---

## ⚠️ Response Codes
- `200 OK`: Request berhasil.
- `201 Created`: Data berhasil dibuat.
- `400 Bad Request`: Validasi input gagal.
- `401 Unauthorized`: Token hilang atau expired.
- `500 Internal Server Error`: Masalah pada server/database.