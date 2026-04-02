// components/globals/DataTable/DataTable.tsx
"use client";

import React, { Suspense, useMemo } from "react";
import {
  Search,
  FileDown,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useDataTableQueryParams } from "@/hooks/useDataTableQueryParams";
import { DataTableProps } from "./types";

const DataTableContent = <T extends Record<string, any>>({
  data,
  columns,
  searchableKeys = [],
  showSearch = true,
  filters = [],
  title,
  dateFilter,
  actions,
  topButton,
  exportConfig,
  pageSize = 10,
  queryParamPrefix,
}: DataTableProps<T>) => {
  const {
    search: searchTerm,
    filters: activeFilters,
    dateFilter: activeDate,
    page: currentPage,
    isMounted,
    handleSearchChange,
    handleFilterChange,
    handleDateFilterChange,
    handlePageChange,
  } = useDataTableQueryParams({
    pageSize,
    paramPrefix: queryParamPrefix,
  });

  // Logic Filtering yang Efisien
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        searchableKeys.some((key) =>
          String(item[key] || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
      const matchesDirect = Object.entries(activeFilters).every(
        ([key, value]) => !value || String(item[key]) === value,
      );
      const matchesDate =
        !activeDate ||
        !dateFilter?.accessor ||
        String(item[dateFilter.accessor as string]).includes(activeDate);

      return matchesSearch && matchesDirect && matchesDate;
    });
  }, [data, searchTerm, activeFilters, activeDate, searchableKeys, dateFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const currentItems = useMemo(() => {
    return filteredData.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  }, [filteredData, currentPage, pageSize]); // Bungkus useMemo agar lebih optimal

  if (!isMounted)
    return <div className="w-full h-96 bg-slate-50 animate-pulse rounded-md" />;

  return (
    <div className="w-full space-y-4">
      {/* 1. Toolbar (Search & Filter) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-5 rounded-md border border-slate-200 shadow-sm">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {showSearch ? (
            <div className="relative min-w-[280px]">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari..."
                value={searchTerm}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-blue-400 outline-none"
                onChange={(e) => {
                  handleSearchChange(e.target.value);
                }}
              />
            </div>
          ) : (
            // Jika search tidak aktif, tampilkan Title
            title && (
              <h2 className="text-lg font-bold text-slate-700 mr-4">
                {title}
              </h2>
            )
          )}

          {/* Filter Dropdowns tetap muncul di sampingnya jika ada */}
          {filters.map(
            (f, i) =>
              f.show !== false && (
                <select
                  key={i}
                  value={activeFilters[f.accessor as string] || ""}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none"
                  onChange={(e) => {
                    handleFilterChange({
                      ...activeFilters,
                      [f.accessor as string]: e.target.value,
                    });
                  }}
                >
                  <option value="">{f.label}</option>
                  {f.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ),
          )}
          {dateFilter?.show && (
            <input
              type="date"
              value={activeDate}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none"
              onChange={(e) => {
                handleDateFilterChange(e.target.value);
              }}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          {exportConfig?.show && (
            <button
              onClick={() => exportConfig.onExport?.(filteredData)}
              className="p-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              <FileDown size={20} />
            </button>
          )}
          {topButton?.show !== false && topButton && (
            <Link
              href={topButton.href || "#"}
              onClick={topButton.onClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-400 text-sm font-bold text-white hover:bg-blue-500 shadow-lg shadow-blue-400/20 active:scale-95 transition-all"
            >
              {topButton.icon || <Plus size={18} />} {topButton.label}
            </Link>
          )}
        </div>
      </div>

      {/* 2. Table */}
      <div className="bg-white rounded-md border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-4">
                    {col.header}
                  </th>
                ))}
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-blue-50/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm font-medium text-slate-600"
                    >
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : item[col.accessor as string]}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 ">
                      {actions?.showDetail && actions.detailHref && (
                        <Link
                          href={actions.detailHref(item)}
                          className="p-2 rounded-lg text-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <Eye size={18} />
                        </Link>
                      )}
                      {actions?.showEdit &&
                        (actions.editHref ? (
                          <Link
                            href={actions.editHref(item)}
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                          >
                            <Edit size={18} />
                          </Link>
                        ) : (
                          <button
                            onClick={() => actions.onEdit?.(item)}
                            suppressHydrationWarning
                            className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-all"
                          >
                            <Edit size={18} />
                          </button>
                        ))}
                      {actions?.showDelete && (
                        <button
                          onClick={() => actions.onDelete?.(item)}
                          suppressHydrationWarning
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}

                      {/* --- CUSTOM ACTIONS START --- */}
                      {actions?.customActions?.map((action, i) => {
                        if (action.show === false) return null;

                        const colorClasses = {
                          blue: "text-blue-500 hover:bg-blue-50",
                          red: "text-red-500 hover:bg-red-50",
                          amber: "text-amber-500 hover:bg-amber-50",
                          emerald: "text-emerald-500 hover:bg-emerald-50",
                          slate: "text-slate-500 hover:bg-slate-100",
                        };

                        const baseClass = `hover:cursor-pointer p-2 rounded-lg transition-all ${colorClasses[action.color || "slate"]}`;

                        if (action.href) {
                          return (
                            <Link
                              key={i}
                              href={action.href(item)}
                              title={action.label}
                              className={baseClass}
                            >
                              {action.icon}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={i}
                            onClick={() => action.onClick?.(item)}
                            title={action.label}
                            suppressHydrationWarning
                            className={baseClass}
                          >
                            {action.icon}
                          </button>
                        );
                      })}
                      {/* --- CUSTOM ACTIONS END --- */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-slate-50/20">
          <p className="text-xs font-semibold text-slate-400">
            {filteredData.length} data ditemukan
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-blue-400 bg-blue-50 px-3 py-1.5 rounded-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataTable = <T extends Record<string, any>>(props: DataTableProps<T>) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-96 bg-slate-50 animate-pulse rounded-md" />
      }
    >
      <DataTableContent {...props} />
    </Suspense>
  );
};

export default DataTable;
