import React from "react";
import Link from "next/link";

interface DataItem {
  label: string;
  value: string | number | React.ReactNode;
  labelClassName?: string; // Custom warna/style label per item
  valueClassName?: string; // Custom warna/style value per item
}

interface FooterAction {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string; // Buat ganti warna button (misal: bg-blue-400 atau text-red-500)
  icon?: React.ReactNode;
}

interface HeaderAction {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

interface DataCardProps {
  title: string;
  items: DataItem[];
  icon?: React.ReactNode;
  action?: HeaderAction;
  footerActions?: FooterAction[]; // Array of buttons/links
}

const CardKeyValueVertical = ({ title, items, icon, action, footerActions }: DataCardProps) => {
  const badgeBaseStyle =
    "px-3 py-1 text-xs font-bold rounded-md transition-all active:scale-95 uppercase tracking-wider";
  const badgeColor = action?.className || "bg-blue-100 text-blue-500 hover:bg-blue-200";

  return (
    /* Ganti h-full jadi h-fit supaya tingginya cuma sebatas kontennya saja */
    <div className="flex h-fit flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-400/50">
      
      {/* Header Card */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/50 p-4">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-400">{icon}</div>}
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>

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
                className={`hover:cursor-pointer ${badgeBaseStyle} ${badgeColor}`}
              >
                {action.label}
              </button>
            )}
          </>
        )}
      </div>

      {/* Content Area */}
      {/* flex-1 dihapus atau dibiarkan tidak masalah jika pakai h-fit, 
          tapi biar lebih clean kita biarkan default agar tidak memaksa expand */}
      <div className="p-4"> 
        <dl className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col border-b border-slate-50 pb-2 last:border-0 last:pb-0">
              <dt className={`text-xs font-medium uppercase tracking-wider ${item.labelClassName || "text-slate-400"}`}>
                {item.label}
              </dt>
              <dd className={`mt-1 text-sm font-semibold ${item.valueClassName || "text-slate-600"}`}>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Footer Area */}
      {footerActions && footerActions.length > 0 && (
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/30 p-3">
          {footerActions.map((action, idx) => {
            const className = `inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              action.className || "bg-blue-400 text-white hover:bg-blue-500"
            }`;

            if (action.href) {
              return (
                <a key={idx} href={action.href} className={className}>
                  {action.icon}
                  {action.label}
                </a>
              );
            }

            return (
              <button key={idx} type="button" onClick={action.onClick} className={className}>
                {action.icon}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardKeyValueVertical;