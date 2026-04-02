# DataTable Query Params Implementation Guide

## Overview
DataTable sekarang otomatis mensinkronisasi search, filter, date filter, dan pagination dengan URL query parameters. Ini memungkinkan:
- Users dapat membagikan link dengan state yang sama
- Back/forward button browser bekerja dengan sempurna
- Reload page mempertahankan filter state

## Implementasi Dasar

Untuk sebagian besar kasus, cukup gunakan DataTable seperti biasa - hook sudah handle query params secara otomatis:

```tsx
"use client";

import DataTable from "@/components/data-tables";

export default function BuyersPage() {
  const buyerData = [
    // data...
  ];

  return (
    <DataTable
      data={buyerData}
      columns={[
        { key: "name", header: "Nama", accessor: "name" },
        { key: "email", header: "Email", accessor: "email" },
      ]}
      searchableKeys={["name", "email"]}
      filters={[
        {
          label: "Kelas",
          accessor: "class_name",
          options: [
            { label: "Gold", value: "Gold" },
            { label: "Silver", value: "Silver" },
          ],
        },
      ]}
      dateFilter={{ show: true, accessor: "join_date" }}
      pageSize={10}
      // ✅ Query params akan otomatis di-generate
      // URL akan berubah ke: ?search=john&filter_class_name=Gold&dateFilter=2026-01-01&page=2
    />
  );
}
```

### Generated Query Params:
- `?search=john` - Dari search input
- `?filter_<accessor>=value` - Dari filter selects
- `?dateFilter=2026-01-01` - Dari date input
- `?page=2` - Dari pagination

---

## Pages dengan Tabs

Jika page punya multiple tabs dengan DataTable masing-masing, gunakan `queryParamPrefix` untuk membedakan state:

```tsx
"use client";

import { useState } from "react";
import DataTable from "@/components/data-tables";

const TABS = ["inbound", "outbound", "stock"];

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("inbound");

  const inboundData = [/* ... */];
  const outboundData = [/* ... */];
  const stockData = [/* ... */];

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? "bg-blue-400 text-white" : "bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Inbound Tab */}
      {activeTab === "inbound" && (
        <DataTable
          data={inboundData}
          columns={[
            { key: "id", header: "ID", accessor: "id" },
            { key: "status", header: "Status", accessor: "status" },
          ]}
          searchableKeys={["id", "status"]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Pending", value: "pending" },
                { label: "Done", value: "done" },
              ],
            },
          ]}
          queryParamPrefix="inbound"
          // ✅ Query params: ?inbound_search=xxx&inbound_filter_status=pending&inbound_page=1
        />
      )}

      {/* Outbound Tab */}
      {activeTab === "outbound" && (
        <DataTable
          data={outboundData}
          columns={[
            { key: "id", header: "ID", accessor: "id" },
            { key: "type", header: "Type", accessor: "type" },
          ]}
          searchableKeys={["id", "type"]}
          queryParamPrefix="outbound"
          // ✅ Query params: ?outbound_search=xxx&outbound_filter_type=cargo&outbound_page=1
        />
      )}

      {/* Stock Tab */}
      {activeTab === "stock" && (
        <DataTable
          data={stockData}
          columns={[
            { key: "sku", header: "SKU", accessor: "sku" },
            { key: "qty", header: "Qty", accessor: "qty" },
          ]}
          searchableKeys={["sku"]}
          queryParamPrefix="stock"
          // ✅ Query params: ?stock_search=xxx&stock_page=1
        />
      )}
    </div>
  );
}
```

### URL Examples:
- Tab 1: `?inbound_search=bkl&inbound_page=2`
- Tab 2: `?outbound_filter_type=cargo&outbound_page=1`
- Dapat switch tabs sambil mempertahankan filter masing-masing!

---

## Detail Pages dengan DataTable

Jika detail page punya multiple DataTable (e.g., related items), gunakan prefix untuk masing-masing:

```tsx
"use client";

import { useParams } from "next/navigation";
import DataTable from "@/components/data-tables";

export default function BuyerDetailPage() {
  const params = useParams();
  const buyerId = params.id;

  const buyer = {
    id: buyerId,
    name: "Anas Syihabuddin",
  };

  const ordersData = [/* ... */];
  const paymentsData = [/* ... */];
  const returnsData = [/* ... */];

  return (
    <div className="space-y-8">
      {/* Detail Header */}
      <div>
        <h1>{buyer.name}</h1>
      </div>

      {/* Orders Section */}
      <div>
        <h2>Orders</h2>
        <DataTable
          data={ordersData}
          columns={[
            { key: "order_id", header: "Order ID", accessor: "order_id" },
            { key: "amount", header: "Amount", accessor: "amount" },
            { key: "date", header: "Date", accessor: "date" },
          ]}
          searchableKeys={["order_id"]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Pending", value: "pending" },
                { label: "Done", value: "done" },
              ],
            },
          ]}
          queryParamPrefix="orders"
          // ✅ Query params: ?orders_search=xxx&orders_filter_status=pending&orders_page=1
          pageSize={5}
        />
      </div>

      {/* Payments Section */}
      <div>
        <h2>Payments</h2>
        <DataTable
          data={paymentsData}
          columns={[
            { key: "payment_id", header: "Payment ID", accessor: "payment_id" },
            { key: "amount", header: "Amount", accessor: "amount" },
            { key: "method", header: "Method", accessor: "method" },
            { key: "date", header: "Date", accessor: "date" },
          ]}
          searchableKeys={["payment_id", "method"]}
          filters={[
            {
              label: "Status",
              accessor: "status",
              options: [
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
              ],
            },
          ]}
          queryParamPrefix="payments"
          // ✅ Query params: ?payments_search=xxx&payments_filter_status=success&payments_page=1
          pageSize={5}
        />
      </div>

      {/* Returns Section */}
      <div>
        <h2>Returns</h2>
        <DataTable
          data={returnsData}
          columns={[
            { key: "return_id", header: "Return ID", accessor: "return_id" },
            { key: "reason", header: "Reason", accessor: "reason" },
            { key: "date", header: "Date", accessor: "date" },
          ]}
          searchableKeys={["return_id", "reason"]}
          queryParamPrefix="returns"
          // ✅ Query params: ?returns_search=xxx&returns_page=2
          pageSize={5}
        />
      </div>
    </div>
  );
}
```

### URL Example:
```
/buyers/buyer-uuid-001?orders_search=ORD&orders_page=2&payments_filter_status=success&returns_search=RET
```

Setiap DataTable punya filter state terpisah!

---

## Advanced: Direct Hook Usage

Jika tidak pakai DataTable tapi perlu query params sync (custom table/list), gunakan hook langsung:

```tsx
"use client";

import { useDataTableQueryParams } from "@/hooks/useDataTableQueryParams";

export default function CustomListPage() {
  const {
    search,
    filters,
    dateFilter,
    page,
    isMounted,
    handleSearchChange,
    handleFilterChange,
    handleDateFilterChange,
    handlePageChange,
  } = useDataTableQueryParams({
    pageSize: 20,
    paramPrefix: "custom", // Optional
  });

  if (!isMounted) return <div>Loading...</div>;

  return (
    <div>
      <input
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search..."
      />

      <select
        value={filters.status || ""}
        onChange={(e) =>
          handleFilterChange({ ...filters, status: e.target.value })
        }
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button onClick={() => handlePageChange(page - 1)}>Prev</button>
      <span>{page}</span>
      <button onClick={() => handlePageChange(page + 1)}>Next</button>
    </div>
  );
}
```

---

## Notes

### Debouncing
- Search diberi debounce 500ms untuk menghindari URL update setiap keystroke
- Filter, date filter, dan pagination update langsung
- Dapat dipasang via hook parameter: `debounceMs`

### Reset Behavior
- Setiap search, filter, atau date berubah → otomatis reset ke page 1
- Ini mencegah empty pages setelah filter

### Browser Navigation
- Back/forward button bekerja sempurna
- Semua state disimpan di URL, tidak di component state saja

### Sharing Links
- Users dapat copy URL dan share dengan orang lain
- Orang lain akan melihat exactly sama state (search, filters, page)

---

## Tips

1. **Gunakan prefix yang bermakna** untuk DataTable di tabs/detail pages
2. **Test dengan browser back/forward** untuk pastikan semuanya berfungsi
3. **Share URL dengan orang** untuk test bahwa state terpersist
4. **Check browser console** tidak ada error saat filter/search
