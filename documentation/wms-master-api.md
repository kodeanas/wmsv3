# Dokumentasi API WMS - Modul Master

Ruang lingkup dokumen ini:
- Halaman Master Categories
- Halaman Master Stickers

Catatan:
- Detail endpoint menggunakan path param {id}.
- Semua contoh masih data dummy.
- Format envelope response mengikuti dokumentasi template umum.

Base URL contoh:
- /api/v1/wms

## A) Master - Categories

### 1. GET /admin/categories/summary
Tujuan:
- Ambil kartu ringkasan kategori.

Contoh request:
- GET /api/v1/wms/admin/categories/summary

Contoh response:
{
  "success": true,
  "message": "Ringkasan kategori berhasil diambil",
  "data": {
    "total_category": 10
  },
  "meta": null
}

### 2. GET /admin/categories
Tujuan:
- Ambil list kategori untuk tabel.

Query params:
- page: number (default 1)
- limit: number (default 10)
- search: string (cari nama kategori)
- status: string (Aktif/Tidak Aktif)

Contoh request:
- GET /api/v1/wms/admin/categories?page=1&limit=10&search=Liquid&status=Aktif

Contoh response:
{
  "success": true,
  "message": "List kategori berhasil diambil",
  "data": [
    {
      "id": "cat_001",
      "kategori": "Liquid",
      "discount": 10,
      "max_price": 100000,
      "stok": 150,
      "status": "Aktif",
      "created_at": "2026-03-20T10:00:00Z",
      "updated_at": "2026-03-25T08:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total_items": 1,
      "total_pages": 1
    }
  }
}

### 3. POST /admin/categories
Tujuan:
- Tambah kategori baru.

Request body:
{
  "kategori": "Aksesoris",
  "discount": 15,
  "max_price": 120000,
  "status": "Aktif"
}

Contoh response:
{
  "success": true,
  "message": "Kategori berhasil ditambahkan",
  "data": {
    "id": "cat_011",
    "kategori": "Aksesoris",
    "discount": 15,
    "max_price": 120000,
    "stok": 0,
    "status": "Aktif",
    "created_at": "2026-03-30T08:00:00Z",
    "updated_at": "2026-03-30T08:00:00Z"
  },
  "meta": null
}

### 4. GET /admin/categories/{id}
Tujuan:
- Ambil detail kategori.

Contoh request:
- GET /api/v1/wms/admin/categories/cat_001

Contoh response:
{
  "success": true,
  "message": "Detail kategori berhasil diambil",
  "data": {
    "id": "cat_001",
    "kategori": "Liquid",
    "discount": 10,
    "max_price": 100000,
    "stok": 150,
    "status": "Aktif",
    "created_at": "2026-03-20T10:00:00Z",
    "updated_at": "2026-03-28T09:00:00Z"
  },
  "meta": null
}

### 5. PUT /admin/categories/{id}
Tujuan:
- Update data kategori.

Request body:
{
  "kategori": "Liquid",
  "discount": 12,
  "max_price": 110000,
  "status": "Aktif"
}

Contoh response:
{
  "success": true,
  "message": "Kategori berhasil diupdate",
  "data": {
    "id": "cat_001",
    "kategori": "Liquid",
    "discount": 12,
    "max_price": 110000,
    "stok": 150,
    "status": "Aktif",
    "updated_at": "2026-03-30T08:30:00Z"
  },
  "meta": null
}

## B) Master - Stickers

### 1. GET /admin/stickers/summary
Tujuan:
- Ambil kartu ringkasan sticker.

Contoh request:
- GET /api/v1/wms/admin/stickers/summary

Contoh response:
{
  "success": true,
  "message": "Ringkasan sticker berhasil diambil",
  "data": {
    "total_sticker": 10
  },
  "meta": null
}

### 2. GET /admin/stickers
Tujuan:
- Ambil list sticker untuk tabel.

Query params:
- page: number (default 1)
- limit: number (default 10)
- search: string (cari nama sticker)
- status: string (Aktif/Tidak Aktif)
- type: string (Big/Small/Tiny)

Contoh request:
- GET /api/v1/wms/admin/stickers?page=1&limit=10&search=Biru&status=Aktif&type=Big

Contoh response:
{
  "success": true,
  "message": "List sticker berhasil diambil",
  "data": [
    {
      "id": "stk_001",
      "hex": "#3b82f6",
      "name": "Biru",
      "type": "Big",
      "min_price": 50000,
      "max_price": 100000,
      "fixed_price": 25000,
      "stok": 150,
      "status": "Aktif",
      "created_at": "2026-03-20T10:00:00Z",
      "updated_at": "2026-03-25T08:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total_items": 1,
      "total_pages": 1
    }
  }
}

### 3. POST /admin/stickers
Tujuan:
- Tambah sticker baru.

Request body:
{
  "hex": "#f97316",
  "name": "Oranye",
  "type": "Small",
  "min_price": 40000,
  "max_price": 90000,
  "fixed_price": 22000,
  "status": "Aktif"
}

Contoh response:
{
  "success": true,
  "message": "Sticker berhasil ditambahkan",
  "data": {
    "id": "stk_011",
    "hex": "#f97316",
    "name": "Oranye",
    "type": "Small",
    "min_price": 40000,
    "max_price": 90000,
    "fixed_price": 22000,
    "stok": 0,
    "status": "Aktif",
    "created_at": "2026-03-30T08:00:00Z",
    "updated_at": "2026-03-30T08:00:00Z"
  },
  "meta": null
}

### 4. GET /admin/stickers/{id}
Tujuan:
- Ambil detail sticker.

Contoh request:
- GET /api/v1/wms/admin/stickers/stk_001

Contoh response:
{
  "success": true,
  "message": "Detail sticker berhasil diambil",
  "data": {
    "id": "stk_001",
    "hex": "#3b82f6",
    "name": "Biru",
    "type": "Big",
    "min_price": 50000,
    "max_price": 100000,
    "fixed_price": 25000,
    "stok": 150,
    "status": "Aktif",
    "created_at": "2026-03-20T10:00:00Z",
    "updated_at": "2026-03-28T09:00:00Z"
  },
  "meta": null
}

### 5. PUT /admin/stickers/{id}
Tujuan:
- Update data sticker.

Request body:
{
  "hex": "#3b82f6",
  "name": "Biru",
  "type": "Big",
  "min_price": 55000,
  "max_price": 110000,
  "fixed_price": 26000,
  "status": "Aktif"
}

Contoh response:
{
  "success": true,
  "message": "Sticker berhasil diupdate",
  "data": {
    "id": "stk_001",
    "hex": "#3b82f6",
    "name": "Biru",
    "type": "Big",
    "min_price": 55000,
    "max_price": 110000,
    "fixed_price": 26000,
    "stok": 150,
    "status": "Aktif",
    "updated_at": "2026-03-30T08:30:00Z"
  },
  "meta": null
}

## C) Mapping Endpoint ke Halaman Master
- Halaman Categories:
  - GET /admin/categories/summary
  - GET /admin/categories
  - POST /admin/categories
  - GET /admin/categories/{id}
  - PUT /admin/categories/{id}

- Halaman Stickers:
  - GET /admin/stickers/summary
  - GET /admin/stickers
  - POST /admin/stickers
  - GET /admin/stickers/{id}
  - PUT /admin/stickers/{id}
