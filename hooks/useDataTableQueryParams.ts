// hooks/useDataTableQueryParams.ts
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface QueryParamsState {
  search: string;
  filters: Record<string, string>;
  dateFilter: string;
  page: number;
}

interface UseDataTableQueryParamsProps {
  pageSize?: number;
  debounceMs?: number;
  // Optional: untuk pages dengan tab atau custom prefix
  paramPrefix?: string;
}

export const useDataTableQueryParams = ({
  pageSize = 10,
  debounceMs = 500,
  paramPrefix = "",
}: UseDataTableQueryParamsProps = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<QueryParamsState>({
    search: "",
    filters: {},
    dateFilter: "",
    page: 1,
  });

  const [isMounted, setIsMounted] = useState(false);

  // Initialize state dari URL params
  useEffect(() => {
    const prefix = paramPrefix ? `${paramPrefix}_` : "";

    const search = searchParams.get(`${prefix}search`) || "";
    const page = parseInt(searchParams.get(`${prefix}page`) || "1", 10);
    const dateFilter = searchParams.get(`${prefix}dateFilter`) || "";

    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith(`${prefix}filter_`)) {
        const filterKey = key.replace(`${prefix}filter_`, "");
        filters[filterKey] = value;
      }
    });

    setState({
      search,
      filters,
      dateFilter,
      page,
    });

    setIsMounted(true);
  }, [searchParams, paramPrefix]);

  // Debounce timer untuk search
  let searchDebounceTimer: NodeJS.Timeout;

  // Update URL params ketika state berubah
  const updateQueryParams = useCallback(
    (newState: Partial<QueryParamsState>) => {
      const prefix = paramPrefix ? `${paramPrefix}_` : "";
      const params = new URLSearchParams(searchParams);

      // Update search
      if ("search" in newState) {
        const search = newState.search || "";
        if (search) {
          params.set(`${prefix}search`, search);
        } else {
          params.delete(`${prefix}search`);
        }
        // Reset ke halaman 1 saat search berubah
        params.set(`${prefix}page`, "1");
      }

      // Update filters
      if ("filters" in newState) {
        const filters = newState.filters || {};
        // Clear existing filters
        Array.from(params.keys()).forEach((key) => {
          if (key.startsWith(`${prefix}filter_`)) {
            params.delete(key);
          }
        });
        // Set new filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params.set(`${prefix}filter_${key}`, value);
          }
        });
        // Reset ke halaman 1 saat filter berubah
        params.set(`${prefix}page`, "1");
      }

      // Update date filter
      if ("dateFilter" in newState) {
        const dateFilter = newState.dateFilter || "";
        if (dateFilter) {
          params.set(`${prefix}dateFilter`, dateFilter);
        } else {
          params.delete(`${prefix}dateFilter`);
        }
        // Reset ke halaman 1 saat date filter berubah
        params.set(`${prefix}page`, "1");
      }

      // Update page
      if ("page" in newState) {
        const page = newState.page || 1;
        if (page > 1) {
          params.set(`${prefix}page`, String(page));
        } else {
          params.delete(`${prefix}page`);
        }
      }

      // Update URL
      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.push(newUrl);
    },
    [router, searchParams, paramPrefix],
  );

  // Handle search change (dengan debounce)
  const handleSearchChange = useCallback(
    (value: string) => {
      setState((prev) => ({ ...prev, search: value }));

      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        updateQueryParams({
          search: value,
          filters: state.filters,
          dateFilter: state.dateFilter,
          page: 1,
        });
      }, debounceMs);
    },
    [state.filters, state.dateFilter, updateQueryParams, debounceMs],
  );

  // Handle filter change
  const handleFilterChange = useCallback(
    (filters: Record<string, string>) => {
      setState((prev) => ({ ...prev, filters }));
      updateQueryParams({
        search: state.search,
        filters,
        dateFilter: state.dateFilter,
        page: 1,
      });
    },
    [state.search, state.dateFilter, updateQueryParams],
  );

  // Handle date filter change
  const handleDateFilterChange = useCallback(
    (dateFilter: string) => {
      setState((prev) => ({ ...prev, dateFilter }));
      updateQueryParams({
        search: state.search,
        filters: state.filters,
        dateFilter,
        page: 1,
      });
    },
    [state.search, state.filters, updateQueryParams],
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      setState((prev) => ({ ...prev, page }));
      updateQueryParams({
        search: state.search,
        filters: state.filters,
        dateFilter: state.dateFilter,
        page,
      });
    },
    [state.search, state.filters, state.dateFilter, updateQueryParams],
  );

  return {
    // State
    search: state.search,
    filters: state.filters,
    dateFilter: state.dateFilter,
    page: state.page,
    isMounted,

    // Handlers
    handleSearchChange,
    handleFilterChange,
    handleDateFilterChange,
    handlePageChange,
  };
};
