# Dokumentasi API WMS - Modul Admin

Ruang lingkup dokumen ini:
- Halaman Admin Tax
- Halaman Admin Users

Catatan:
- Detail endpoint menggunakan path param {id}.
- Semua contoh masih data dummy.
- Format envelope response mengikuti dokumentasi template umum.

Base URL contoh:
- /api/v1/wms

## A) Admin - Tax

### 1. GET /admin/taxes
Tujuan:
- Ambil list tax untuk tabel.

Query params:
- page: number (default 1)
- limit: number (default 10)
- search: string (cari nama tax)
- is_active: boolean (true/false)

Contoh request:
- GET /api/v1/wms/admin/taxes?page=1&limit=10&search=PPN&is_active=true

Contoh response:
{
  "success": true,
  "message": "List tax berhasil diambil",
  "data": [
    {
      "id": "tax_001",
      "tax": "PPN 11%",
      "is_active": true,
      "created_at": "2026-03-20T10:00:00Z",
      "updated_at": "2026-03-20T10:00:00Z"
    },
    {
      "id": "tax_002",
      "tax": "PPnBM 20%",
      "is_active": true,
      "created_at": "2026-03-21T10:00:00Z",
      "updated_at": "2026-03-21T10:00:00Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total_items": 2,
      "total_pages": 1
    }
  }
}

### 2. POST /admin/taxes
Tujuan:
- Tambah tax baru.

Request body:
{
  "tax": "PPN 12%"
}

Contoh response:
{
  "success": true,
  "message": "Tax berhasil ditambahkan",
  "data": {
    "id": "tax_003",
    "tax": "PPN 12%",
    "is_active": true,
    "created_at": "2026-03-29T08:00:00Z",
    "updated_at": "2026-03-29T08:00:00Z"
  },
  "meta": null
}

### 3. GET /admin/taxes/{id}
Tujuan:
- Ambil detail 1 tax.

Contoh request:
- GET /api/v1/wms/admin/taxes/tax_001

Contoh response:
{
  "success": true,
  "message": "Detail tax berhasil diambil",
  "data": {
    "id": "tax_001",
    "tax": "PPN 11%",
    "is_active": true,
    "created_at": "2026-03-20T10:00:00Z",
    "updated_at": "2026-03-28T09:12:00Z"
  },
  "meta": null
}

### 4. PUT /admin/taxes/{id}
Tujuan:
- Update nama tax dan status aktif.

Request body:
{
  "tax": "PPN 11%",
  "is_active": false
}

Contoh response:
{
  "success": true,
  "message": "Tax berhasil diupdate",
  "data": {
    "id": "tax_001",
    "tax": "PPN 11%",
    "is_active": false,
    "updated_at": "2026-03-29T08:30:00Z"
  },
  "meta": null
}

## B) Admin - Users

### 1. GET /admin/users/summary
Tujuan:
- Ambil kartu ringkasan user.

Contoh request:
- GET /api/v1/wms/admin/users/summary

Contoh response:
{
  "success": true,
  "message": "Ringkasan user berhasil diambil",
  "data": {
    "total_user": 24,
    "total_login_user": 18
  },
  "meta": null
}

### 2. GET /admin/users
Tujuan:
- Ambil list user untuk tabel.

Query params:
- page: number (default 1)
- limit: number (default 10)
- search: string (nama/email/role)
- role: string (Admin/Manager/Staff/Cashier)
- status: string (active/inactive)

Contoh request:
- GET /api/v1/wms/admin/users?page=1&limit=10&search=anas&role=Admin&status=active

Contoh response:
{
  "success": true,
  "message": "List user berhasil diambil",
  "data": [
    {
      "id": "usr_001",
      "nama": "Anas Malik",
      "email": "anas@wms.com",
      "phone": "081234567890",
      "role": "Admin",
      "status": "active",
      "last_login_at": "2026-03-29T07:00:00Z",
      "created_at": "2026-01-10T09:00:00Z",
      "updated_at": "2026-03-29T07:00:00Z"
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

### 3. POST /admin/users
Tujuan:
- Tambah user baru.

Request body:
{
  "nama": "Rina Putri",
  "email": "rina@wms.com",
  "phone": "081311112222",
  "password": "Rina@12345",
  "role": "Staff"
}

Contoh response:
{
  "success": true,
  "message": "User berhasil ditambahkan",
  "data": {
    "id": "usr_025",
    "nama": "Rina Putri",
    "email": "rina@wms.com",
    "phone": "081311112222",
    "role": "Staff",
    "status": "active",
    "created_at": "2026-03-29T08:00:00Z",
    "updated_at": "2026-03-29T08:00:00Z"
  },
  "meta": null
}

### 4. GET /admin/users/{id}
Tujuan:
- Ambil detail user.

Contoh request:
- GET /api/v1/wms/admin/users/usr_001

Contoh response:
{
  "success": true,
  "message": "Detail user berhasil diambil",
  "data": {
    "id": "usr_001",
    "nama": "Anas Malik",
    "email": "anas@wms.com",
    "phone": "081234567890",
    "role": "Admin",
    "status": "active",
    "created_at": "2026-01-10T09:00:00Z",
    "updated_at": "2026-03-29T07:00:00Z"
  },
  "meta": null
}

### 5. PUT /admin/users/{id}
Tujuan:
- Edit data user.

Request body (password opsional):
{
  "nama": "Anas Malik",
  "email": "anas@wms.com",
  "phone": "081234567890",
  "password": "",
  "role": "Manager",
  "status": "active"
}

Contoh response:
{
  "success": true,
  "message": "User berhasil diupdate",
  "data": {
    "id": "usr_001",
    "nama": "Anas Malik",
    "email": "anas@wms.com",
    "phone": "081234567890",
    "role": "Manager",
    "status": "active",
    "updated_at": "2026-03-29T08:15:00Z"
  },
  "meta": null
}

### 6. GET /admin/users/{id}/scan-summary
Tujuan:
- Ambil ringkasan scan user (modal Summary).

Contoh request:
- GET /api/v1/wms/admin/users/usr_001/scan-summary

Contoh response:
{
  "success": true,
  "message": "Summary scan user berhasil diambil",
  "data": {
    "user_id": "usr_001",
    "total_scan": 312,
    "active_days": 28,
    "today_scan": 14,
    "avg_scan_per_active_day": 11.1
  },
  "meta": null
}

## C) Mapping Endpoint ke Halaman Admin
- Halaman Tax:
  - GET /admin/taxes
  - POST /admin/taxes
  - GET /admin/taxes/{id}
  - PUT /admin/taxes/{id}

- Halaman Users:
  - GET /admin/users/summary
  - GET /admin/users
  - POST /admin/users
  - GET /admin/users/{id}
  - PUT /admin/users/{id}
  - GET /admin/users/{id}/scan-summary
