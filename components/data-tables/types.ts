// components/globals/DataTable/types.ts
export interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  key: string;
}

export interface CustomAction<T> {
  label: string;
  icon: React.ReactNode;
  color: "blue" | "red" | "amber" | "emerald" | "slate"; // Pilihan warna biar konsisten
  onClick?: (item: T) => void;
  href?: (item: T) => string;
  show?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  title?: string;
  searchableKeys?: (keyof T)[];
  showSearch?: boolean;
  // Konfigurasi Filter
  filters?: {
    label: string;
    accessor: keyof T;
    options: { label: string; value: string }[];
    show?: boolean;
  }[];
  dateFilter?: {
    show?: boolean;
    accessor: keyof T;
  };
  // Konfigurasi Tombol Aksi per Baris
  actions?: {
    showDetail?: boolean;
    detailHref?: (item: T) => string;
    showEdit?: boolean;
    editHref?: (item: T) => string;
    onEdit?: (item: T) => void;
    showDelete?: boolean;
    onDelete?: (item: T) => void;
    customActions?: CustomAction<T>[]; // Tambahkan ini
  };
  // Tombol di Atas (Tambah/Export)
  topButton?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    show?: boolean;
  };
  exportConfig?: {
    show?: boolean;
    onExport?: (data: T[]) => void;
  };
  // Query Params support untuk pages dengan tab/detail
  queryParamPrefix?: string;
}