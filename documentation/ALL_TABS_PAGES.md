# 📋 Semua Halaman dengan Tabs - Implementation Guide

## 📊 Daftar Lengkap Halaman dengan Tabs

Berikut adalah semua halaman di aplikasi yang sudah menggunakan Tabs component:

### 1. Master Section
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **Stores** | `/stores` | Toko, Crew |

### 2. Inventory > BKL Section  
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **BKL List** | `/inventory/bkl` | ? (lihat code) |
| **BKL Detail** | `/inventory/bkl/detail-produk` | ? (lihat code) |

### 3. Inventory > Display Section
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **Display List** | `/inventory/display` | ? (lihat code) |
| **Display Detail** | `/inventory/display/detail-produk` | ? (lihat code) |

### 4. Inventory > Staging Section
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **Regular Staging** | `/inventory/staging/reguler-staging` | ? (lihat code) |
| **Regular Staging Detail** | `/inventory/staging/reguler-staging/detail-produk` | ? (lihat code) |
| **Sticker Staging** | `/inventory/staging/sticker-staging` | ? (lihat code) |
| **Sticker Staging Detail** | `/inventory/staging/sticker-staging/detail-produk` | ? (lihat code) |

### 5. Inbound Section
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **BAST Detail** | `/Inbound/ScanIn/bast/detail-bast` | ? (lihat code) |

### 6. Testing
| Halaman | Path | Tab-nya |
|---------|------|---------|
| **Testing Page** | `/testing` | ? (lihat code) |

---

## 🎯 Implementation Pattern (Sama untuk Semua Halaman)

Semua halaman follow pattern yang sama. Berikut template yang bisa di-copy:

```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DataTable from "@/components/data-tables";

export default function YourTabsPage() {
  // ✅ 1. Define initial tab
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  
  // ✅ 2. Setup router & searchParams
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ 3. Sync activeTab dari URL
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "tab1" || tab === "tab2") {
      setActiveTab(tab as "tab1" | "tab2");
    }
  }, [searchParams]);

  // ✅ 4. Handler untuk tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as "tab1" | "tab2");
    router.push(`?tab=${tabId}`);
  };

  // Your data
  const data1 = [/* ... */];
  const data2 = [/* ... */];

  // ✅ 5. Define tabs array
  const tabs = [
    {
      id: "tab1",
      label: "Tab 1 Label",
      content: (
        <DataTable
          data={data1}
          columns={[/* ... */]}
          queryParamPrefix="tab1"  // ✅ IMPORTANT: Unique prefix per tab
        />
      ),
    },
    {
      id: "tab2",
      label: "Tab 2 Label",
      content: (
        <DataTable
          data={data2}
          columns={[/* ... */]}
          queryParamPrefix="tab2"  // ✅ IMPORTANT: Unique prefix per tab
        />
      ),
    },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}  // ✅ Use handler
            className={`px-4 py-2 ${
              activeTab === tab.id ? "border-b-2 border-blue-400" : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {tabs.find((t) => t.id === activeTab)?.content}
      </div>
    </div>
  );
}
```

---

## 📝 Step-by-Step untuk Setiap Halaman

### Step 1: Cek halaman saat ini
Open halaman yang punya Tabs (e.g., `/stores`)

### Step 2: Identify tab IDs
Lihat dalam variable `tabs` array, apa field `id` dari masing-masing tab

### Step 3: Apply template
Copy template di atas dan adapt untuk halaman tersebut

### Step 4: Add imports
```tsx
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
```

### Step 5: Add URL sync logic
```tsx
const router = useRouter();
const searchParams = useSearchParams();

useEffect(() => {
  const tab = searchParams.get("tab");
  if (tab) {
    setActiveTab(tab);  // Adjust based on tab IDs
  }
}, [searchParams]);

const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  router.push(`?tab=${tabId}`);
};
```

### Step 6: Update tab buttons
Change dari:
```tsx
onClick={() => setActiveTab(tab.id)}
```

Menjadi:
```tsx
onClick={() => handleTabChange(tab.id)}
```

### Step 7: Add queryParamPrefix to DataTable
Add ke setiap DataTable dalam tab content:
```tsx
queryParamPrefix={tab.id}
// or
queryParamPrefix="tab1"  // if tab.id is "tab1"
```

### Step 8: Test
Test flow:
1. Open halaman → URL tidak punya `?tab=`
2. Click tab 2 → URL berubah ke `?tab=tab2`
3. Type search di tab 2 → URL: `?tab=tab2&tab2_search=xxx`
4. Switch ke tab 1 → URL: `?tab=tab1&tab2_search=xxx` (tab2 search masih di URL tapi tidak aktif)
5. Type search di tab 1 → URL: `?tab=tab1&tab1_search=yyy&tab2_search=xxx`
6. Reload → Halaman load dengan tab 1 + search "yyy" ✅

---

## 🎯 Quick Checklist (Apply untuk Semua 11 Halaman)

- [ ] **1. /stores** 
  - [ ] Add imports (useRouter, useSearchParams, useEffect)
  - [ ] Add URL sync logic
  - [ ] Update tab buttons
  - [ ] Add queryParamPrefix="toko" & "crew"
  - [ ] Test

- [ ] **2. /inventory/bkl**
  - [ ] Add imports
  - [ ] Add URL sync logic
  - [ ] Update tab buttons
  - [ ] Add queryParamPrefix untuk setiap tab
  - [ ] Test

- [ ] **3. /inventory/bkl/detail-produk**
  - [ ] Add imports
  - [ ] Add URL sync logic
  - [ ] Update tab buttons
  - [ ] Add queryParamPrefix untuk setiap tab
  - [ ] Test

- [ ] **4. /inventory/display**
  - [ ] ...same as above

- [ ] **5. /inventory/display/detail-produk**
  - [ ] ...same as above

- [ ] **6. /inventory/staging/reguler-staging**
  - [ ] ...same as above

- [ ] **7. /inventory/staging/reguler-staging/detail-produk**
  - [ ] ...same as above

- [ ] **8. /inventory/staging/sticker-staging**
  - [ ] ...same as above

- [ ] **9. /inventory/staging/sticker-staging/detail-produk**
  - [ ] ...same as above

- [ ] **10. /Inbound/ScanIn/bast/detail-bast**
  - [ ] ...same as above

- [ ] **11. /testing**
  - [ ] ...same as above

---

## 📌 Important Notes

### Tab ID vs Tab Label
Pastikan pakai **tab ID** untuk URL, bukan label:
```tsx
// ❌ WRONG: Label bisa berubah, ada special chars
router.push(`?tab=${tab.label}`);

// ✅ RIGHT: ID konsisten, simple
router.push(`?tab=${tab.id}`);
```

### queryParamPrefix Harus Unik
Setiap DataTable dalam tab harus punya prefix yang berbeda:
```tsx
{
  id: "toko",
  label: "Toko",
  content: <DataTable queryParamPrefix="toko" />  // ✅ "toko"
},
{
  id: "crew",
  label: "Crew", 
  content: <DataTable queryParamPrefix="crew" />  // ✅ "crew" (berbeda!)
}
```

### URL Format
Setelah implementasi, URL akan jadi:
```
/stores?tab=toko&toko_search=xxx&toko_page=2
/stores?tab=crew&crew_search=xxx&crew_page=1
```

---

## 🚀 Recommended Implementation Order

Implementasi urut dari yang paling penting:

1. **Priority 1 (Implement ASAP):**
   - `/stores` - Master page, banyak digunakan

2. **Priority 2 (Next):**
   - `/inventory/bkl` - Core inventory feature
   - `/inventory/display` - Core inventory feature

3. **Priority 3 (Then):**
   - `/inventory/staging/reguler-staging`
   - `/inventory/staging/sticker-staging`
   - `/Inbound/ScanIn/bast/detail-bast`

4. **Priority 4 (Last):**
   - Detail pages (detail-produk variations)
   - `/testing`

---

## 📚 Support Docs

| Dokumen | Gunakan Untuk |
|---------|--------|
| [TABS_EXISTING_PAGES.md](./TABS_EXISTING_PAGES.md) | Detail guide + complete example |
| [FAQ_SEARCH_MIXED_TABS.md](./FAQ_SEARCH_MIXED_TABS.md) | Jawab pertanyaan umum |
| [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md) | Debug jika ada issue |

---

## 💡 Pro Tips

1. **Copy dari stores page** jika sudah implement, lebih cepat
2. **Test saat implementation**, jangan tunggu semua selesai
3. **Share URL** dengan tim untuk verify
4. **Check browser console** untuk error

---

## ✅ Verification

Setelah implement semua halaman, test ini:

1. Open `/stores?tab=toko&toko_search=jakarta`
   → Harus langsung tampil hasil search "jakarta" ✅

2. Switch ke crew tab → URL berubah jadi `/stores?tab=crew`
   → Search input di crew harus kosong ✅

3. Search "ahmad" di crew → URL: `/stores?tab=crew&crew_search=ahmad` ✅

4. Copy URL, paste di tab baru
   → Harus tampil exactly sama crew tab + search "ahmad" ✅

5. Browser back button
   → Harus kembali ke tab toko dengan search "jakarta" ✅

Jika semua PASS → implementasi COMPLETE! 🎉

---

**Status:** Template dan guide ready to use  
**Next:** Apply template untuk setiap halaman

---

Generated: April 1, 2026
