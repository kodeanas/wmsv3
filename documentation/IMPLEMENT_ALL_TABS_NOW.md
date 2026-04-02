# ✅ SEMUA Halaman dengan Tabs - Complete Implementation

## 🎯 TL;DR

Ada **11+ halaman** di aplikasi yang sudah punya Tabs component. 

**Cara implement query params untuk semuanya:**

1. **Baca template** → [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md)
2. **Lihat daftar lengkap** → [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md)
3. **Apply ke masing-masing halaman** dengan checklist
4. **Test dengan flow** yang disediakan

---

## 📋 Daftar Semua Halaman (11 Halaman)

### ✅ Status: Need Implementation

| # | Halaman | Path | Tabs | Doc |
|---|---------|------|------|-----|
| 1 | **Stores** | `/stores` | Toko, Crew | [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md) |
| 2 | BKL List | `/inventory/bkl` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 3 | BKL Detail | `/inventory/bkl/detail-produk` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 4 | Display List | `/inventory/display` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 5 | Display Detail | `/inventory/display/detail-produk` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 6 | Regular Staging | `/inventory/staging/reguler-staging` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 7 | Regular Staging Detail | `/inventory/staging/reguler-staging/detail-produk` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 8 | Sticker Staging | `/inventory/staging/sticker-staging` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 9 | Sticker Staging Detail | `/inventory/staging/sticker-staging/detail-produk` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 10 | BAST Detail | `/Inbound/ScanIn/bast/detail-bast` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| 11 | Testing | `/testing` | ? | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |

---

## 🔧 Implementation Pattern (Copy-Paste untuk Semua)

Semua halaman follow pola yang SAMA. Hanya replace nama tab-nya.

### Step-by-Step dalam 3 Menit

#### Sebelum (Tanpa Query Params)
```tsx
export default function Page() {
  const [activeTab, setActiveTab] = useState("tab1");
  
  const tabs = [
    { id: "tab1", label: "Tab 1", content: <DataTable ... /> },
    { id: "tab2", label: "Tab 2", content: <DataTable ... /> },
  ];

  return (
    <>
      {tabs.map(tab => (
        <button onClick={() => setActiveTab(tab.id)}>  {/* ❌ Tidak sync dengan URL */}
          {tab.label}
        </button>
      ))}
      {tabs.find(t => t.id === activeTab)?.content}
    </>
  );
}
```

#### Sesudah (Dengan Query Params)
```tsx
import { useRouter, useSearchParams } from "next/navigation";  // ✅ Add import
import { useEffect } from "react";  // ✅ Add import

export default function Page() {
  const [activeTab, setActiveTab] = useState("tab1");
  const router = useRouter();  // ✅ Add
  const searchParams = useSearchParams();  // ✅ Add

  // ✅ Add: Initialize dari URL
  useEffect(() => {
    const tab = searchParams.get("tab") || "tab1";
    setActiveTab(tab);
  }, [searchParams]);

  // ✅ Add: Handler untuk sync dengan URL
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`);
  };
  
  const tabs = [
    { 
      id: "tab1", 
      label: "Tab 1", 
      content: (
        <DataTable 
          ... 
          queryParamPrefix="tab1"  // ✅ Add this
        /> 
      ) 
    },
    { 
      id: "tab2", 
      label: "Tab 2", 
      content: (
        <DataTable 
          ... 
          queryParamPrefix="tab2"  // ✅ Add this
        /> 
      ) 
    },
  ];

  return (
    <>
      {tabs.map(tab => (
        <button onClick={() => handleTabChange(tab.id)}>  {/* ✅ Change this */}
          {tab.label}
        </button>
      ))}
      {tabs.find(t => t.id === activeTab)?.content}
    </>
  );
}
```

**That's it!** Hanya 4 perubahan:
1. Add 2 import
2. Add `useRouter` + `useSearchParams`
3. Add `useEffect` untuk initialize
4. Add `handleTabChange` + update onClick
5. Add `queryParamPrefix` ke DataTable

---

## ⚡ Quick Checklist (Copy untuk setiap halaman)

```
Halaman: ________________

- [ ] Import: useRouter, useSearchParams, useEffect
- [ ] Add: const router = useRouter()
- [ ] Add: const searchParams = useSearchParams()
- [ ] Add: useEffect {...} untuk initialize activeTab
- [ ] Add: handleTabChange function
- [ ] Update: Tab buttons onClick
- [ ] Add: queryParamPrefix ke DataTable
- [ ] Test: Type search → switch tab → search kosong?
- [ ] Test: Share URL → reload → state sama?
- [ ] Done! ✅
```

---

## 🚀 Recommended Order

**Do this in sequence:**

### Week 1: Core Pages
- [ ] 1. `/stores` (paling penting, banyak digunakan)
- [ ] 4. `/inventory/display` 
- [ ] 2. `/inventory/bkl`

### Week 2: Staging Pages
- [ ] 6. `/inventory/staging/reguler-staging`
- [ ] 8. `/inventory/staging/sticker-staging`

### Week 3: Details + Others
- [ ] 10. `/Inbound/ScanIn/bast/detail-bast`
- [ ] 3,5,7,9. Detail pages
- [ ] 11. `/testing`

---

## 📊 Expected Results

### Before Implementation
```
/stores
/stores (switch tab → filter hilang)
/inventory/bkl
/inventory/display
```

### After Implementation
```
/stores?tab=toko&toko_search=jakarta&toko_page=1
/stores?tab=crew&crew_search=ahmad&crew_page=1
/inventory/bkl?tab=bkl1&bkl1_search=xxx
/inventory/display?tab=display1&display1_filter_status=active
```

✅ Semua state tersimpan di URL, dapat di-share, persist saat reload!

---

## 🧪 Testing untuk Semua Halaman

Test yang SAMA untuk setiap halaman:

```
1. Buka halaman → URL: /halaman (tanpa ?tab=)
2. Click tab 2 → URL: /halaman?tab=tab2
3. Type search "xxx" → URL: /halaman?tab=tab2&tab2_search=xxx
4. Switch tab 1 → URL: /halaman?tab=tab1 (tab1_search kosong)
5. Type search "yyy" → URL: /halaman?tab=tab1&tab1_search=yyy&tab2_search=xxx
6. Switch tab 2 → Search input: "xxx" restore ✅
7. Reload → State tetap sama ✅
8. Copy URL → Paste di tab baru → Exact sama state ✅
```

Jika semua PASS → halaman itu DONE ✅

---

## 📚 Dokumentasi Reference

| Butuh | Ke |
|------|-----|
| Template lengkap | [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md) |
| Contoh dari stores | [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md) |
| Daftar semua halaman | [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) |
| Solusi untuk search tercampur | [FAQ_SEARCH_MIXED_TABS.md](./FAQ_SEARCH_MIXED_TABS.md) |
| Debugging | [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md) |

---

## 💡 Key Points

1. **Same pattern untuk semua 11 halaman** - tidak perlu design baru
2. **Copy-paste langsung** - hanya ganti nama tab
3. **4-5 perubahan per halaman** - cepat
4. **Test yang sama** - predictable results

---

## ✅ Tracking Progress

Untuk track progress implementasi:

```markdown
## Implementation Progress

### Week 1: Core
- [x] /stores
- [ ] /inventory/display
- [ ] /inventory/bkl

### Week 2: Staging
- [ ] /inventory/staging/reguler-staging
- [ ] /inventory/staging/sticker-staging

### Week 3: Details
- [ ] /inventory/bkl/detail-produk
- [ ] /inventory/display/detail-produk
- [ ] /inventory/staging/reguler-staging/detail-produk
- [ ] /inventory/staging/sticker-staging/detail-produk
- [ ] /Inbound/ScanIn/bast/detail-bast
- [ ] /testing

Total: 11/11 halaman ✅
```

---

## 🎯 Mulai dari Mana?

**Recommended:**
1. Buka [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md) → Copy contoh stores
2. Go to `/stores` page, apply perubahan
3. Test dengan checklist di atas
4. Repeat untuk halaman lain

**Atau:**
1. Lihat [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md)
2. Choose halaman yang mau di-implement
3. Apply template
4. Test
5. Lanjut halaman berikutnya

---

## 🎉 Selesai!

Setelah 11 halaman di-implement:

✅ Semua halaman dengan tabs sync dengan URL  
✅ Dapat share URL dengan state  
✅ Reload page, state tetap  
✅ Browser back/forward bekerja  
✅ Professional UX  

**Estimated time:** 2-3 jam untuk semua halaman (atau 1 jam per 3-4 halaman)

---

Generated: April 1, 2026

Pertanyaan? → Check [ALL_TABS_PAGES.md](./ALL_TABS_PAGES.md) untuk detail lengkap!
