# 🎯 Query Params dengan Existing Tabs Component

## Overview

Jika halaman Anda sudah punya custom Tabs component (seperti di `stores` atau halaman lain), berikut cara integrate query params ke dalamnya.

---

## Pattern yang Sudah Ada

### Struktur Tabs di Stores Page
```tsx
const [activeTab, setActiveTab] = React.useState("toko");

const tabs = [
  {
    id: "toko",
    label: "Toko",
    content: (
      <DataTable ... />
    ),
  },
  {
    id: "crew",
    label: "Crew",
    content: (
      <DataTable ... />
    ),
  },
];
```

---

## 📝 Implementasi dengan Query Params

### Step 1: Import Hook
```tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
```

### Step 2: Sync Tab dengan URL
```tsx
const [activeTab, setActiveTab] = React.useState("toko");
const router = useRouter();
const searchParams = useSearchParams();

// ✅ Initialize activeTab dari URL
useEffect(() => {
  const tab = searchParams.get("tab") || "toko";
  setActiveTab(tab);
}, [searchParams]);

// ✅ Update URL saat tab berubah
const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  router.push(`?tab=${tabId}`);
};
```

### Step 3: Update Tab Buttons
```tsx
{/* Tab Buttons */}
{tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => handleTabChange(tab.id)}  // ✅ Use handler instead of setActiveTab
    className={`px-4 py-2 rounded ${
      activeTab === tab.id ? "bg-blue-400 text-white" : "bg-gray-100"
    }`}
  >
    {tab.label}
  </button>
))}

{/* Tab Content */}
{tabs.find((t) => t.id === activeTab)?.content}
```

### Step 4: Add queryParamPrefix to DataTable
```tsx
{
  id: "toko",
  label: "Toko",
  content: (
    <DataTable
      data={tokoData}
      queryParamPrefix="toko"  // ✅ Add this
      // Now URL becomes: ?tab=toko&toko_search=xxx&toko_page=2
    />
  ),
},
{
  id: "crew",
  label: "Crew",
  content: (
    <DataTable
      data={crewData}
      queryParamPrefix="crew"  // ✅ Add this
      // Now URL becomes: ?tab=crew&crew_search=xxx&crew_page=2
    />
  ),
},
```

---

## 🔄 Complete Example: Stores Page dengan Query Params

```tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DataTable from "@/components/data-tables";
import { PackagePlus } from "lucide-react";

const tokoData = [
  { id: 1, name: "Toko Pusat Jakarta", phone: "081234567890", status: "Aktif" },
  // ... more data
];

const crewData = [
  { id: 1, name: "Ahmad Rijali", phone: "081234567890", status: "Aktif" },
  // ... more data
];

export default function StoresPage() {
  const [activeTab, setActiveTab] = React.useState("toko");
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Initialize activeTab dari URL
  useEffect(() => {
    const tab = searchParams.get("tab") || "toko";
    setActiveTab(tab);
  }, [searchParams]);

  // ✅ Handler untuk tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`?tab=${tabId}`);
    // URL akan menjadi: ?tab=toko atau ?tab=crew
  };

  const tabs = [
    {
      id: "toko",
      label: "Toko",
      content: (
        <DataTable
          data={tokoData}
          searchableKeys={["name"]}
          columns={[
            {
              key: "name",
              header: "Nama Toko",
              accessor: (item) => <span className="font-bold">{item.name}</span>,
            },
            {
              key: "phone",
              header: "No Telp",
              accessor: (item) => item.phone,
            },
            {
              key: "status",
              header: "Status",
              accessor: (item) => (
                <span
                  className={item.status === "Aktif" ? "text-green-500" : "text-red-500"}
                >
                  {item.status}
                </span>
              ),
            },
          ]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Aktif", value: "Aktif" },
                { label: "Tidak Aktif", value: "Tidak Aktif" },
              ],
            },
          ]}
          queryParamPrefix="toko"  // ✅ Add this
          // URL: ?tab=toko&toko_search=xxx&toko_filter_status=Aktif&toko_page=2
          pageSize={10}
        />
      ),
    },
    {
      id: "crew",
      label: "Crew",
      content: (
        <DataTable
          data={crewData}
          searchableKeys={["name"]}
          columns={[
            {
              key: "name",
              header: "Nama",
              accessor: (item) => <span className="font-bold">{item.name}</span>,
            },
            {
              key: "phone",
              header: "No Telp",
              accessor: (item) => item.phone,
            },
            {
              key: "status",
              header: "Status",
              accessor: (item) => (
                <span
                  className={item.status === "Aktif" ? "text-green-500" : "text-red-500"}
                >
                  {item.status}
                </span>
              ),
            },
          ]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Aktif", value: "Aktif" },
                { label: "Tidak Aktif", value: "Tidak Aktif" },
              ],
            },
          ]}
          queryParamPrefix="crew"  // ✅ Add this
          // URL: ?tab=crew&crew_search=xxx&crew_filter_status=Aktif&crew_page=2
          pageSize={10}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stores Management</h1>

      {/* Tab Buttons */}
      <div className="flex gap-2 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}  // ✅ Use handler
            className={`px-4 py-3 font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-blue-400 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-800"
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

/**
 * URL Examples:
 *
 * 1. User buka halaman pertama:
 *    /stores
 *    → Default tab "toko" muncul
 *
 * 2. User search "jakarta" di toko tab:
 *    /stores?tab=toko&toko_search=jakarta
 *    → URL punya tab + prefix + search term
 *
 * 3. User filter status "aktif" di toko tab:
 *    /stores?tab=toko&toko_search=jakarta&toko_filter_status=Aktif
 *    → URL punya semua filter
 *
 * 4. User switch ke crew tab:
 *    /stores?tab=crew
 *    → Tab change, semua toko filter tetap di URL tapi tidak dipakai
 *    → Search input di crew: kosong ✅
 *
 * 5. User search "ahmad" di crew tab:
 *    /stores?tab=crew&crew_search=ahmad
 *    → Sekarang URL punya crew_search
 *    → Toko filter masih di URL tapi tidak dipakai
 *
 * 6. User kembali ke toko tab:
 *    /stores?tab=toko&toko_search=jakarta&toko_filter_status=Aktif&crew_search=ahmad
 *    → Toko filter "jakarta" + "Aktif" restore ✅
 *    → Crew search tidak dipakai (hanya untuk toko) ✅
 *
 * 7. User reload halaman:
 *    /stores?tab=toko&toko_search=jakarta&toko_filter_status=Aktif&crew_search=ahmad
 *    → Tab toko load dengan search "jakarta" + filter "Aktif" ✅
 *
 * 8. User share URL ke rekan:
 *    /stores?tab=toko&toko_search=jakarta&toko_filter_status=Aktif&crew_search=ahmad
 *    → Rekan lihat exact sama state: toko tab dengan jakarta + aktif ✅
 */
```

---

## 🔧 Integrasi ke Halaman Existing

Jika sudah punya halaman dengan Tabs (seperti stores, inventory, dll):

### Before (Tanpa Query Params)
```tsx
const [activeTab, setActiveTab] = useState("toko");

return (
  <>
    {tabs.map((tab) => (
      <button onClick={() => setActiveTab(tab.id)}>
        {tab.label}
      </button>
    ))}
    {tabs.find(t => t.id === activeTab)?.content}
  </>
);
```

### After (Dengan Query Params)
```tsx
const [activeTab, setActiveTab] = useState("toko");
const router = useRouter();
const searchParams = useSearchParams();

// ✅ Add: Initialize dari URL
useEffect(() => {
  const tab = searchParams.get("tab") || "toko";
  setActiveTab(tab);
}, [searchParams]);

// ✅ Add: Handler untuk sync dengan URL
const handleTabChange = (tabId: string) => {
  setActiveTab(tabId);
  router.push(`?tab=${tabId}`);
};

return (
  <>
    {tabs.map((tab) => (
      <button 
        onClick={() => handleTabChange(tab.id)}  // ✅ Change this
        // ... rest of props
      >
        {tab.label}
      </button>
    ))}
    {tabs.find(t => t.id === activeTab)?.content}
  </>
);
```

### Dalam DataTable Components
```tsx
{
  id: "toko",
  label: "Toko",
  content: (
    <DataTable
      data={tokoData}
      // ... columns, filters, etc
      queryParamPrefix="toko"  // ✅ Add this
    />
  ),
}
```

---

## 📋 Checklist untuk Setiap Halaman dengan Tabs

- [ ] Import `useRouter` dan `useSearchParams` dari `next/navigation`
- [ ] Buat `useState` untuk `activeTab`
- [ ] Buat `useEffect` untuk initialize `activeTab` dari URL
- [ ] Buat `handleTabChange` untuk sync activeTab ke URL
- [ ] Update tab button onClick dari `setActiveTab` ke `handleTabChange`
- [ ] Add `queryParamPrefix` ke setiap DataTable dengan nama tab-nya
- [ ] Test: Type search di tab 1 → Switch tab 2 → Input kosong? ✅

---

## 🎯 Halaman yang Perlu Update

Berdasarkan struktur project, halaman yang kemungkinan punya tabs:

1. **`/stores`** ← Punya tabs "toko" dan "crew"
2. **`/inventory`** ← Kemungkinan punya tabs untuk inbound/outbound/stock
3. **`/repair-station`** ← Mungkin punya multiple tabs untuk berbagai jenis perbaikan
4. Halaman lain dengan list + related items

---

## 🚀 Tips Implementasi

1. **Identifikasi semua halaman dengan tabs** di project
2. **Apply pattern yang sama** untuk setiap halaman
3. **Test setiap halaman** dengan checklist di atas
4. **Share URL** antar browser untuk verify state consistency

---

## 📚 Referensi

| Dokumen | Untuk |
|---------|--------|
| [DATATABLE_QUERY_PARAMS.md](./DATATABLE_QUERY_PARAMS.md) | Full guide query params |
| [DATATABLE_TABS_EXAMPLE.md](./DATATABLE_TABS_EXAMPLE.md) | Contoh conditional render tabs |
| [FAQ_SEARCH_MIXED_TABS.md](./FAQ_SEARCH_MIXED_TABS.md) | Jawab: search tercampur? |
| [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md) | Debugging detailed |

---

**Key Point:** Pattern-nya sama untuk semua halaman dengan tabs:
1. Sync `activeTab` dengan URL param `?tab=xxx`
2. Add unique `queryParamPrefix` ke setiap DataTable
3. Selesai! ✅

---

Generated: April 1, 2026
