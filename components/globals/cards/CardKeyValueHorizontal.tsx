import React from "react";
import Link from "next/link";

interface DataItem {
  label: string;
  value: string | number | React.ReactNode;
}

interface ActionProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // Untuk custom warna badge
}

interface DataCardProps {
  title: string;
  items: DataItem[];
  icon?: React.ReactNode;
  action?: ActionProps; // Prop baru buat handle button/badge
}

const CardKeyValueHorizontal = ({ title, items, icon, action }: DataCardProps) => {
  // Base style untuk badge button
  const badgeBaseStyle = `px-3 py-1 text-xs font-bold rounded-md transition-all active:scale-95 uppercase tracking-wider`;
  // Default color kalau kamu gak kirim className di action
  const badgeColor = action?.className || "bg-blue-100 text-blue-500 hover:bg-blue-200";

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-400/50">
      {/* Header Card */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-400">{icon}</div>}
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>

        {/* Action Badge/Button */}
        {action && (
          <>
            {action.href ? (
              <Link href={action.href} className={`${badgeBaseStyle} ${badgeColor}`}>
                {action.label}
              </Link>
            ) : (
              <button
                type={action.type || "button"}
                onClick={action.onClick}
                className={`${badgeBaseStyle} ${badgeColor}`}
              >
                {action.label}
              </button>
            )}
          </>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5">
        <dl className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between gap-4 border-b border-slate-50 pb-3 last:border-0 last:pb-0"
            >
              <dt className="shrink-0 text-sm font-medium text-slate-400">
                {item.label}
              </dt>
              <dd className="text-right text-sm font-semibold text-slate-600 break-words">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default CardKeyValueHorizontal;