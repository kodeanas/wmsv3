# Query Params - Quick Reference

## Implementasi Cepat

### Tanpa Tab / Tanpa Prefix
```tsx
<DataTable
  data={data}
  columns={[...]}
  searchableKeys={["name", "email"]}
  filters={[...]}
  dateFilter={{ show: true, accessor: "date" }}
/>
// URL: ?search=xxx&filter_class=Gold&dateFilter=2026-01-01&page=2
```

### Dengan Tab / Dengan Prefix
```tsx
<DataTable
  data={data}
  queryParamPrefix="inbound"  // <-- Add this
/>
// URL: ?inbound_search=xxx&inbound_filter_class=Gold&inbound_page=2
```

---

## URL Format

| Feature | Parameter | Example |
|---------|-----------|---------|
| Search | `search` | `?search=john` |
| Filter | `filter_<fieldName>` | `?filter_class=Gold` |
| Date | `dateFilter` | `?dateFilter=2026-01-01` |
| Page | `page` | `?page=2` |
| Multiple | Combined | `?search=john&filter_class=Gold&dateFilter=2026-01-01&page=2` |

### Dengan Prefix
| Feature | Parameter | Example |
|---------|-----------|---------|
| Search | `<prefix>_search` | `?inbound_search=john` |
| Filter | `<prefix>_filter_<fieldName>` | `?inbound_filter_status=done` |
| Date | `<prefix>_dateFilter` | `?inbound_dateFilter=2026-01-01` |
| Page | `<prefix>_page` | `?inbound_page=2` |

---

## Checklist Config DataTable

```tsx
<DataTable
  data={data}                    // ✅ Required
  columns={[...]}                // ✅ Required
  
  searchableKeys={["name"]}      // Optional: add to enable search
  filters={[...]}                // Optional: add to enable filters
  dateFilter={{                  // Optional: add to enable date filter
    show: true,
    accessor: "date"
  }}
  
  queryParamPrefix="tab1"        // Optional: add for tabs/multiple tables
  pageSize={10}                  // Optional: default 10
/>
```

---

## Contoh Real: Tab 1, Tab 2, Tab 3

```tsx
const [activeTab, setActiveTab] = useState("tab1");

return (
  <>
    <button onClick={() => setActiveTab("tab1")}>Tab 1</button>
    <button onClick={() => setActiveTab("tab2")}>Tab 2</button>
    <button onClick={() => setActiveTab("tab3")}>Tab 3</button>

    {activeTab === "tab1" && (
      <DataTable data={data1} queryParamPrefix="tab1" />
    )}
    {activeTab === "tab2" && (
      <DataTable data={data2} queryParamPrefix="tab2" />
    )}
    {activeTab === "tab3" && (
      <DataTable data={data3} queryParamPrefix="tab3" />
    )}
  </>
);
```

---

## Test Minimal

1. Type search → URL berubah ✅
2. Select filter → URL berubah ✅
3. Pick date → URL berubah ✅
4. Click page 2 → URL berubah ✅
5. Reload → semua state tetap ✅
6. Back button → state kembali ✅

---

## Troubleshooting

| Problem | Check |
|---------|-------|
| URL tidak berubah | Inspect browser DevTools > Application |
| Filter hilang saat reload | URL punya params? |
| Multiple tabs conflict | Each punya unique prefix? |
| Search tidak debounce | Ketik lambat, URL update setelah berhenti |
| **Search tercampur antar tab** | ⚠️ **[Lihat TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md)** |

---

## Common Issues & Solutions

**Issue: Search term masih nyangkut di tab lain?**  
→ Solusi lengkap: [TROUBLESHOOTING_SEARCH_MIXED_TABS.md](./TROUBLESHOOTING_SEARCH_MIXED_TABS.md)

Key Point: Pastikan setiap tab punya `queryParamPrefix` yang UNIK!
```tsx
{activeTab === "bag" && <DataTable queryParamPrefix="bag" />}
{activeTab === "produk" && <DataTable queryParamPrefix="produk" />}
// ✅ Prefix "bag" dan "produk" berbeda → tidak tercampur
```

---

## Next: Advanced Hook Usage

Jika perlu custom state management tanpa DataTable:

```tsx
import { useDataTableQueryParams } from "@/hooks";

const { search, filters, page, handleSearchChange, handleFilterChange, handlePageChange } = 
  useDataTableQueryParams({ paramPrefix: "custom" });
```

---

**Docs lengkap:** [`DATATABLE_QUERY_PARAMS.md`](./DATATABLE_QUERY_PARAMS.md)

**Examples:** [`DATATABLE_QUERY_PARAMS_EXAMPLE.md`](./DATATABLE_QUERY_PARAMS_EXAMPLE.md) | [`DATATABLE_TABS_EXAMPLE.md`](./DATATABLE_TABS_EXAMPLE.md)
