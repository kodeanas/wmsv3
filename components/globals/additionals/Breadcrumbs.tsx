"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();
  
  // Pisah pathname jadi array, filter string kosong
  const pathSegments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex">
      <ol className="flex items-center space-x-2 text-sm font-medium text-slate-500">
        {/* Link ke Dashboard/Home */}
        <li className="flex items-center">
          <Link
            href="/dashboard"
            className="flex items-center transition-colors hover:text-blue-400"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          // Format teks: ganti dash (-) jadi spasi & capitalize
          const label = segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <li key={href} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              
              {isLast ? (
                // Kalau halaman aktif, kasih warna Blue 400 & gak usah jadi link
                <span className="font-semibold text-blue-400 truncate max-w-[150px] md:max-w-none">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="transition-colors hover:text-blue-400"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;