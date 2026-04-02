# 🔧 Troubleshooting: Search Term Tercampur Antar Tab

## Masalah
```
User search "kotak" di tab Bag
Switch ke tab Produk
❌ Search input masih menampilkan "kotak" padahal di tab Produk belum ada search
```

---

## Root Cause

Ada 2 kemungkinan penyebab:

### ❌ Cause 1: Render Semua DataTable Bersamaan
```tsx
const [activeTab, setActiveTab] = useState("bag");

return (
  <>
    {/* ❌ SALAH: Keduanya di-render di DOM */}
    {activeTab === "bag" && (
      <DataTable data={bagData} queryParamPrefix="bag" />
    )}
    {activeTab === "produk" && (
      <DataTable data={produkData} queryParamPrefix="produk" />
    )}
  </>
);

// Sebenarnya conditional render ini sudah benar!
// Masalahnya mungkin di level yang lebih tinggi
```

### ❌ Cause 2: Tidak Ada Prefix / Prefix Sama
```tsx
// ❌ SALAH: Tidak ada prefix
{activeTab === "bag" && (
  <DataTable data={bagData} />  // Tanpa queryParamPrefix
)}
{activeTab === "produk" && (
  <DataTable data={produkData} />  // Tanpa queryParamPrefix
)}
// Hasil: Kedua tab share URL param yang sama → search tercampur!

// ❌ SALAH: Prefix sama
{activeTab === "bag" && (
  <DataTable data={bagData} queryParamPrefix="table" />
)}
{activeTab === "produk" && (
  <DataTable data={produkData} queryParamPrefix="table" />
)}
// Hasil: Kedua tab read/write ke ?table_search=xxx → tercampur!
```

### ⚠️ Cause 3: Custom Input Value Tidak Sync dengan URL
```tsx
// ❌ SALAH: Input value hardcoded atau dari component state
const [searchLocal, setSearchLocal] = useState("");

<input
  value={searchLocal}  // ❌ Bukan dari hook!
  onChange={(e) => setSearchLocal(e.target.value)}
/>

// Input ini tidak sync dengan URL, hanya local state
```

---

## ✅ Solusi

### Fix 1: Pastikan Setiap Tab Punya Prefix Unik
```tsx
const [activeTab, setActiveTab] = useState("bag");

return (
  <>
    {activeTab === "bag" && (
      <DataTable
        data={bagData}
        queryParamPrefix="bag"  // ✅ Unique prefix
        // URL: ?bag_search=kotak
      />
    )}
    {activeTab === "produk" && (
      <DataTable
        data={produkData}
        queryParamPrefix="produk"  // ✅ Different prefix
        // URL: ?produk_search=xxx
      />
    )}
  </>
);

// Sekarang:
// - Tab bag punya URL: ?bag_search=kotak
// - Tab produk punya URL: ?produk_search=
// - Terpisah dengan sempurna!
```

### Fix 2: Update DataTable untuk Handle Input Value
**Check:** Apakah DataTable sudah menggunakan value dari hook?

```tsx
// Di DataTable.tsx, input harus punya:
<input
  value={searchTerm}  // ✅ Dari hook
  onChange={(e) => handleSearchChange(e.target.value)}  // ✅ Via hook handler
/>
```

Jika sudah begini, seharusnya sudah benar.

### Fix 3: Pastikan Conditional Render, Bukan Hidden
```tsx
// ✅ BENAR: Conditional render
{activeTab === "bag" && <DataTable ... />}
{activeTab === "produk" && <DataTable ... />}

// ❌ SALAH: Hidden tapi masih di DOM
<div style={{ display: activeTab === "bag" ? "block" : "none" }}>
  <DataTable queryParamPrefix="bag" />
</div>
<div style={{ display: activeTab === "produk" ? "block" : "none" }}>
  <DataTable queryParamPrefix="produk" />
</div>
// Kedua DataTable masih di DOM, mungkin state tercampur
```

---

## 🧪 Test untuk Verify

```
1. Buka tab "bag"
   → URL: /inventory
   → Search input: kosong ✅

2. Type "kotak" di search input (tab bag)
   → URL: /inventory?bag_search=kotak ✅
   → Search input: "kotak" ✅

3. Switch ke tab "produk"
   → URL: /inventory?bag_search=kotak
      (bag_search masih di URL, tapi tidak digunakan oleh produk tab)
   → Search input di tab produk: KOSONG ✅
      (karena ?produk_search=undefined)

4. Type "baju" di search input (tab produk)
   → URL: /inventory?bag_search=kotak&produk_search=baju ✅
   → Search input di tab produk: "baju" ✅

5. Switch kembali ke tab "bag"
   → URL: /inventory?bag_search=kotak&produk_search=baju
   → Search input di tab bag: "kotak" ✅
      (restore dari ?bag_search=kotak)

6. Klik tab produk lagi
   → URL: /inventory?bag_search=kotak&produk_search=baju
   → Search input di tab produk: "baju" ✅
```

Jika test di atas SEMUA PASS, search tidak tercampur! ✅

---

## 🔍 Debugging

Jika masih tercampur, check ini:

### 1. Check URL di Address Bar
```
Tab bag, search "kotak"
→ URL harus: ?bag_search=kotak

Switch ke tab produk
→ URL harus: ?bag_search=kotak (masih ada, tapi tidak dipakai)
→ Search input harus KOSONG (bukan "kotak")

Jika search input masih "kotak", ada bug!
```

### 2. Check Browser Console
```javascript
// Di browser console (F12)
new URLSearchParams(window.location.search).get('bag_search')
// → "kotak" (jika user search di bag tab)

new URLSearchParams(window.location.search).get('produk_search')
// → null (jika user belum search di produk tab)
```

### 3. Check DataTable Props
```tsx
// Inspect DataTable yang render saat ini
<DataTable
  data={activeTab === "bag" ? bagData : produkData}
  queryParamPrefix={activeTab === "bag" ? "bag" : "produk"}  // ✅ Ini harus change sesuai activeTab
/>

// Jika prefix tidak change saat tab switch, itu masalahnya!
```

### 4. Check Input Element
```tsx
// Di browser DevTools (F12), inspect search input element
// Value attribute harus change saat tab switch

// Tab bag:
<input value="kotak" />

// Tab produk:
<input value="" />  // Harus kosong!
```

---

## 📋 Checklist Fix

- [ ] Setiap DataTable punya `queryParamPrefix` yang UNIK
- [ ] Prefix di-update saat `activeTab` berubah
- [ ] DataTable di-render CONDITIONAL (bukan hidden)
- [ ] Input element punya `value={searchTerm}` dari hook
- [ ] Input element onChange gunakan `handleSearchChange`
- [ ] Test: Type search di tab 1 → Switch tab 2 → Input kosong ✅
- [ ] Test: Type search di tab 1 → Switch tab 2 → Type search → Switch tab 1 → Lama search tetap ✅

---

## 💡 Pro Tip: Debugging Component

Untuk debugging, tambahkan ini sementara:

```tsx
const [activeTab, setActiveTab] = useState<TabType>("bag");

// Debug: Log current state
console.log("Active Tab:", activeTab);
console.log("Current Prefix:", activeTab);
console.log("URL:", window.location.search);

return (
  <>
    {/* Tab indicator */}
    <div className="text-xs text-slate-500">
      Debug: Tab={activeTab}, URL={window.location.search}
    </div>

    {activeTab === "bag" && (
      <DataTable
        data={bagData}
        queryParamPrefix="bag"
        // Check console, should log "bag"
      />
    )}
    {activeTab === "produk" && (
      <DataTable
        data={produkData}
        queryParamPrefix="produk"
        // Check console, should log "produk"
      />
    )}
  </>
);
```

---

## ✅ Real Example: Benar

```tsx
"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables";

type TabType = "bag" | "produk" | "palet";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("bag");

  const bagData = [
    { id: "BAG-001", name: "Kantong Putih", qty: 100 },
    { id: "BAG-002", name: "Kantong Hitam", qty: 50 },
  ];

  const produkData = [
    { sku: "PROD-001", name: "Sepatu Kets", qty: 30 },
    { sku: "PROD-002", name: "Kaos Putih", qty: 80 },
  ];

  const paletData = [
    { id: "PALET-001", name: "Kayu 1.2x1.2", qty: 200 },
    { id: "PALET-002", name: "Kayu 1.2x1.0", qty: 150 },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="flex gap-2">
        {(["bag", "produk", "palet"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === tab
                ? "bg-blue-400 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content: Conditional Render */}
      {activeTab === "bag" && (
        <DataTable
          data={bagData}
          columns={[
            { key: "id", header: "ID", accessor: "id" },
            { key: "name", header: "Name", accessor: "name" },
            { key: "qty", header: "Qty", accessor: "qty" },
          ]}
          searchableKeys={["id", "name"]}
          queryParamPrefix="bag"  // ✅ Unik untuk tab ini
        />
      )}

      {activeTab === "produk" && (
        <DataTable
          data={produkData}
          columns={[
            { key: "sku", header: "SKU", accessor: "sku" },
            { key: "name", header: "Name", accessor: "name" },
            { key: "qty", header: "Qty", accessor: "qty" },
          ]}
          searchableKeys={["sku", "name"]}
          queryParamPrefix="produk"  // ✅ Unik untuk tab ini
        />
      )}

      {activeTab === "palet" && (
        <DataTable
          data={paletData}
          columns={[
            { key: "id", header: "ID", accessor: "id" },
            { key: "name", header: "Name", accessor: "name" },
            { key: "qty", header: "Qty", accessor: "qty" },
          ]}
          searchableKeys={["id", "name"]}
          queryParamPrefix="palet"  // ✅ Unik untuk tab ini
        />
      )}
    </div>
  );
}

/**
 * Test Flow:
 * 1. Type "kantong" di bag tab → URL: ?bag_search=kantong
 * 2. Switch to produk tab → URL: ?bag_search=kantong (masih ada tapi tidak dipakai)
 * 3. Search input di produk: KOSONG (bukan "kantong") ✅
 * 4. Type "sepatu" di produk tab → URL: ?bag_search=kantong&produk_search=sepatu
 * 5. Switch to palet tab → URL: ?bag_search=kantong&produk_search=sepatu (masih ada)
 * 6. Search input di palet: KOSONG ✅
 * 7. Switch back to bag → Search input: "kantong" ✅
 * 8. Switch to produk → Search input: "sepatu" ✅
 */
```

---

## 🎯 Summary

| Scenario | Penyebab | Solusi |
|----------|----------|--------|
| Search tercampur | Tidak ada prefix | Tambah queryParamPrefix unik |
| Search tercampur | Prefix sama | Buat prefix berbeda per tab |
| Search tidak update | Input value hardcoded | Gunakan value dari hook |
| Search tidak clear | Render semua tab | Gunakan conditional render |

**Key Takeaway:** Setiap tab mesti punya `queryParamPrefix` yang berbeda! 🔑

---

Generated: April 1, 2026
