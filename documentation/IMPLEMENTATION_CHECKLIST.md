# DataTable Query Params - Implementation Checklist

## ✅ Yang Sudah Selesai

### Files yang Dibuat:
- ✅ `/hooks/useDataTableQueryParams.ts` - Custom hook untuk query params syncing
- ✅ `/hooks/index.ts` - Export hook untuk kemudahan import
- ✅ Updated `/components/data-tables/DataTable.tsx` - Terintegrasi dengan hook
- ✅ Updated `/components/data-tables/types.ts` - Tambah queryParamPrefix prop
- ✅ `/documentation/DATATABLE_QUERY_PARAMS.md` - Dokumentasi lengkap
- ✅ `/documentation/DATATABLE_QUERY_PARAMS_EXAMPLE.md` - Contoh implementasi basic
- ✅ `/documentation/DATATABLE_TABS_EXAMPLE.md` - Contoh implementasi dengan tabs

### Fitur yang Sudah Implementasi:
- ✅ Query params sync untuk search input
- ✅ Query params sync untuk filter dropdowns
- ✅ Query params sync untuk date filter
- ✅ Query params sync untuk pagination
- ✅ Debouncing untuk search (500ms)
- ✅ Auto reset ke page 1 saat search/filter berubah
- ✅ Support untuk multiple DataTable via queryParamPrefix
- ✅ Support untuk tabs dengan filter state terpisah
- ✅ Support untuk detail pages dengan multiple DataTable

---

## 📝 Langkah Implementasi di Halaman Anda

### Option 1: Halaman Sederhana (1 DataTable)
Tidak perlu perubahan besar!
```tsx
<DataTable
  data={data}
  columns={[...]}
  searchableKeys={["name", "email"]}
  filters={[...]}
  dateFilter={{ show: true, accessor: "date" }}
  // ❌ Jangan tambah queryParamPrefix di sini
  // Query params otomatis ter-generate
/>
```

### Option 2: Halaman dengan Tabs
Tambah queryParamPrefix untuk setiap DataTable:
```tsx
{activeTab === "tab1" && (
  <DataTable
    data={data}
    queryParamPrefix="tab1"  // ✅ Tambah ini
  />
)}

{activeTab === "tab2" && (
  <DataTable
    data={data}
    queryParamPrefix="tab2"  // ✅ Tambah ini
  />
)}
```

### Option 3: Halaman Detail dengan Multiple DataTable
Tambah queryParamPrefix untuk setiap section:
```tsx
<DataTable
  data={relatedOrders}
  queryParamPrefix="orders"     // ✅ Tambah ini
/>

<DataTable
  data={relatedPayments}
  queryParamPrefix="payments"   // ✅ Tambah ini
/>

<DataTable
  data={relatedReturns}
  queryParamPrefix="returns"    // ✅ Tambah ini
/>
```

---

## 🧪 Testing Checklist

Setelah implementasi, test ini untuk memastikan semuanya bekerja:

### Test Search
- [ ] Type nama di search input
- [ ] Lihat URL berubah ke: `?search=xxx`
- [ ] Reload halaman → search term masih ada
- [ ] Hapus search term → URL kembali normal

### Test Filters
- [ ] Select filter option
- [ ] Lihat URL berubah ke: `?filter_fieldName=value`
- [ ] Select filter lain → URL berisi semua filter
- [ ] Reload halaman → filter masih aktif

### Test Date Filter
- [ ] Pick date dari date input
- [ ] Lihat URL berubah ke: `?dateFilter=YYYY-MM-DD`
- [ ] Change date → URL berubah
- [ ] Reload halaman → date filter masih ada

### Test Pagination
- [ ] Click next page button
- [ ] Lihat URL berubah ke: `?page=2`
- [ ] Click page 3 → URL berubah ke: `?page=3`
- [ ] Click prev → URL kembali
- [ ] Reload di page 3 → masih di page 3

### Test Combined
- [ ] Search "anas" + Filter "Gold" + Pick date + Go to page 2
- [ ] URL harusnya: `?search=anas&filter_class_name=Gold&dateFilter=2026-01-01&page=2`
- [ ] Reload → semua state tetap
- [ ] Browser back button → kembali ke step sebelumnya

### Test Tabs (jika applicable)
- [ ] Open tab 1 dan set filter A
- [ ] Switch ke tab 2 dan set filter B
- [ ] Switch kembali ke tab 1 → filter A masih ada
- [ ] URL berisi: `?tab1_filter=A&tab2_filter=B`
- [ ] Reload → tab 1 load dengan filter A
- [ ] Share URL → orang lain lihat sama state

### Test Browser Navigation
- [ ] Lakukan beberapa filter changes
- [ ] Click browser back button beberapa kali → setiap step ter-restore
- [ ] Click browser forward button → state kembali maju

### Test URL Sharing
- [ ] Set filter: search + filter + date + page 2
- [ ] Copy URL lengkap
- [ ] Open di tab/browser lain
- [ ] ✅ Harus menampilkan exact sama data yang difilter

---

## 🔍 Troubleshooting

### Masalah: Query params tidak muncul di URL
**Solusi:**
- Pastikan page punya `"use client"` directive
- Check browser console untuk error
- Pastikan searchableKeys, filters, atau dateFilter config benar

### Masalah: Filter state hilang saat reload
**Solusi:**
- Check URL - params sudah ter-save?
- Pastikan hook di-initialize dengan benar
- Cek network tab - ada error dari server?

### Masalah: Multiple DataTable conflict (di tabs)
**Solusi:**
- Pastikan setiap DataTable punya unique `queryParamPrefix`
- Contoh: "tab1", "tab2" bukan "filter", "filter"
- Check URL apakah prefix benar: `?tab1_search=xxx&tab2_filter=yyy`
- **Detailed guide:** [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md)

### Masalah: Back button tidak bekerja
**Solusi:**
- Browser back hanya bekerja jika URL berubah
- Pastikan state change → URL update (cek dev tools)
- Coba bersihkan browser cache: Ctrl+Shift+Delete → cache history

---

## 📚 Referensi File

Jika lupa implementasi, check file ini:

| File | Fungsi | Lihat Saat |
|------|--------|-----------|
| `/hooks/useDataTableQueryParams.ts` | Hook logic | Perlu customize debounce |
| `/components/data-tables/DataTable.tsx` | Component | Debugging render issues |
| `/components/data-tables/types.ts` | TypeScript types | Perlu tambah prop baru |
| `/documentation/DATATABLE_QUERY_PARAMS.md` | Docs lengkap | General reference |
| `/documentation/DATATABLE_QUERY_PARAMS_EXAMPLE.md` | Contoh basic | Setup halaman simple |
| `/documentation/DATATABLE_TABS_EXAMPLE.md` | Contoh tabs | Setup halaman dengan tabs |

---

## 🚀 Next Steps

1. **Implementasi ke halaman utama terlebih dahulu** (e.g., `/buyers`, `/categories`)
2. **Test dengan checklist** di atas
3. **Implementasi ke halaman tabs** (e.g., `/inventory` dengan multiple tabs)
4. **Implementasi ke halaman detail** (e.g., `/buyers/:id` dengan related items)
5. **Test URL sharing** dengan rekan tim

---

## 💡 Tips

- **Gunakan browser dev tools** (F12) → Network tab untuk lihat URL changes
- **Gunakan query string visualizer** untuk debugging
- **Test di incognito window** untuk fresh state
- **Share feedback** jika ada UX improvement ideas

---

## 📞 Support

Jika ada yang tidak clear, check examples di:
- `DATATABLE_QUERY_PARAMS_EXAMPLE.md` untuk implementasi basic
- `DATATABLE_TABS_EXAMPLE.md` untuk implementasi advanced

Good luck! 🎉
