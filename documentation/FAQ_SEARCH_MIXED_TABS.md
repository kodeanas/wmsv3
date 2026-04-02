# ❓ Pertanyaan Umum - Jawaban Cepat

## Q: "Search di tab bag nanti masih nyangkut di tab produk, gimana?"

### A: Error yang sering terjadi adalah...

#### ❌ Salah 1: Tidak ada prefix
```tsx
{activeTab === "bag" && <DataTable data={bagData} />}
{activeTab === "produk" && <DataTable data={produkData} />}
// ❌ Kedua tab share URL param yang sama → search tercampur!
```

#### ❌ Salah 2: Prefix yang sama
```tsx
{activeTab === "bag" && <DataTable queryParamPrefix="table" />}
{activeTab === "produk" && <DataTable queryParamPrefix="table" />}
// ❌ Kedua tab update param yang sama → search tercampur!
```

#### ✅ BENAR: Prefix yang berbeda
```tsx
{activeTab === "bag" && <DataTable queryParamPrefix="bag" />}
{activeTab === "produk" && <DataTable queryParamPrefix="produk" />}
// ✅ Tab bag: ?bag_search=xxx
// ✅ Tab produk: ?produk_search=yyy
// ✅ Terpisah dengan sempurna!
```

---

## Q: Bagaimana cara test kalau sudah benar?

**Test Flow:**
```
1. Di tab "bag", type "kotak" di search
   → URL harus: ?bag_search=kotak ✅
   → Search input: "kotak" ✅

2. Switch ke tab "produk"
   → URL harus tetap: ?bag_search=kotak (masih ada di URL)
   → TAPI search input di produk HARUS KOSONG ❌ Jika masih "kotak" = error!

3. Type "baju" di tab produk search
   → URL: ?bag_search=kotak&produk_search=baju ✅
   → Search input di produk: "baju" ✅

4. Switch kembali ke tab "bag"
   → Search input di bag: "kotak" kembali ✅
   → (Restore dari URL ?bag_search=kotak)

5. Klik produk lagi
   → Search input di produk: "baju" ✅
   → (Restore dari URL ?produk_search=baju)
```

Jika semua test PASS → implementasi sudah BENAR! ✅

---

## Q: Search input masih menampilkan "kotak" di tab produk, apa yang salah?

**Kemungkinan penyebab:**

| Penyebab | Cek Ini | Fix |
|----------|---------|-----|
| Prefix sama | URL ada `?table_search=kotak` untuk kedua tab | Gunakan prefix unik: `bag`, `produk` |
| Tidak ada prefix | URL tidak ada prefix sama sekali | Tambah `queryParamPrefix="nama_tab"` |
| Input value hardcoded | Input value diambil dari `useState` lokal, bukan dari hook | Gunakan `value={searchTerm}` dari hook |
| Render semua bersamaan | Kedua DataTable di-render (hidden tapi di DOM) | Gunakan conditional: `{activeTab === "bag" && <DataTable />}` |

---

## Q: Kode mana yang salah?

```tsx
// ❌ SALAH
<DataTable
  data={bagData}
  // Lupa tambah queryParamPrefix!
/>

<DataTable
  data={produkData}
  // Juga lupa!
/>
```

**Fix:**
```tsx
// ✅ BENAR
<DataTable
  data={bagData}
  queryParamPrefix="bag"  // <-- Tambah ini
/>

<DataTable
  data={produkData}
  queryParamPrefix="produk"  // <-- Dan ini
/>
```

---

## Q: Bagaimana kalau ada lebih dari 2 tabs?

```tsx
const [activeTab, setActiveTab] = useState("bag");

// 3 tabs
{activeTab === "bag" && <DataTable queryParamPrefix="bag" />}
{activeTab === "produk" && <DataTable queryParamPrefix="produk" />}
{activeTab === "palet" && <DataTable queryParamPrefix="palet" />}

// URL akan menjadi:
// ?bag_search=kotak&produk_search=baju&palet_search=papan
// (Setiap tab punya search terpisah)
```

Prinsipnya sama: **setiap tab harus punya prefix yang UNIK!** 🔑

---

## Q: Prefix harus nama apa?

**Tidak ada aturan ketat.** Asalkan:
- ✅ Unik per tab
- ✅ Tidak ada whitespace
- ✅ Snake case atau camelCase

**Contoh yang valid:**
```tsx
queryParamPrefix="bag"           ✅
queryParamPrefix="bag_items"     ✅
queryParamPrefix="bagTab"        ✅
queryParamPrefix="tab_1_bag"     ✅

queryParamPrefix="Bag"           ⚠️  OK tapi inconsistent
queryParamPrefix="bag items"     ❌  Whitespace tidak diizinkan
queryParamPrefix="BAG_ITEMS"     ⚠️  OK tapi tidak convention
```

**Best practice:** Gunakan nama tab dalam snake_case
```tsx
queryParamPrefix="inbound"
queryParamPrefix="outbound"
queryParamPrefix="stock"
```

---

## Q: Apakah URL akan jadi panjang kalau banyak tabs?

Ya, tapi tidak masalah.

**Example:**
```
/inventory?bag_search=kotak&bag_page=2&produk_search=baju&produk_page=1&palet_search=papan

Panjang: ~100 chars
Browser limit: ~2000 chars

✅ Aman!
```

---

## Q: Dokumentasi yang lebih detail ada dimana?

→ **[TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md)**

Di sini ada:
- Contoh yang benar vs yang salah
- Debugging tips
- Checklist lengkap
- Real example dengan test flow

---

## 🎯 TL;DR

**Untuk prevent search tercampur antar tab:**

1. ✅ Setiap tab DataTable punya prefix yang **BERBEDA**
2. ✅ Prefix berupa kata sederhana: "bag", "produk", "palet"
3. ✅ Test: type search di tab 1 → switch tab 2 → input harus kosong
4. ✅ Jika masih tercampur → check documentation untuk debugging

```tsx
// ✅ Template yang benar
{activeTab === "tab_name" && (
  <DataTable
    data={data}
    queryParamPrefix="tab_name"  // <-- PENTING!
  />
)}
```

**That's it!** 🎉

---

## 📚 Referensi

| Butuh | Ke Mana |
|------|---------|
| Contoh lengkap | [DATATABLE_TABS_EXAMPLE.md](./DATATABLE_TABS_EXAMPLE.md) |
| Troubleshooting | [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md) |
| Testing | [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) |
| Overview | [README.md](./README.md) |

---

Generated: April 1, 2026
