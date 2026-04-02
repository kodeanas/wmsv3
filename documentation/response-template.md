# Template Request dan Response API

Dokumen ini jadi acuan format umum untuk semua endpoint API WMS.

## 1) Header Standar
- Content-Type: application/json
- Authorization: Bearer <access_token>
- X-Request-Id: <uuid> (opsional, untuk tracing)

## 2) Response Sukses (Single Data)
Format:
- code: number (HTTP status code)
- success: boolean
- message: string
- data: object
- meta: object | null

Contoh:
{
  "code": 200,
  "success": true,
  "message": "Data berhasil diambil",
  "data": {
    "id": "usr_001",
    "name": "Anas Malik"
  },
  "meta": null
}

## 3) Response Sukses (List + Pagination)
Format:
- code: number (HTTP status code)
- success: boolean
- message: string
- data: array
- meta.pagination.page: number
- meta.pagination.limit: number
- meta.pagination.total_items: number
- meta.pagination.total_pages: number

Contoh:
{
  "code": 200,
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": "tax_001",
      "name": "PPN 11%",
      "is_active": true
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 10,
      "total_items": 35,
      "total_pages": 4
    }
  }
}

## 4) Response Error Validasi (400)
Format:
- code: number (HTTP status code)
- success: false
- message: string
- errors: array of object
  - field: string
  - message: string

Contoh:
{
  "code": 400,
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    {
      "field": "email",
      "message": "Format email tidak valid"
    },
    {
      "field": "password",
      "message": "Minimal 8 karakter"
    }
  ]
}

## 5) Response Error Umum
### 401 Unauthorized
{
  "code": 401,
  "success": false,
  "message": "Token tidak valid atau kadaluarsa",
  "errors": []
}

### 403 Forbidden
{
  "code": 403,
  "success": false,
  "message": "Akses ditolak",
  "errors": []
}

### 404 Not Found
{
  "code": 404,
  "success": false,
  "message": "Data tidak ditemukan",
  "errors": []
}

### 500 Internal Server Error
{
  "code": 500,
  "success": false,
  "message": "Terjadi kesalahan pada server",
  "errors": []
}

## 6) Template Request Body
Contoh create:
{
  "name": "Contoh Data",
  "is_active": true
}

Contoh update parsial:
{
  "name": "Contoh Data Baru"
}

## 7) Konvensi ID Endpoint Detail
Gunakan path param:
- /resource/{id}

Contoh:
- GET /admin/users/{id}
- PUT /admin/users/{id}
- GET /inventory/bkl/{id}
