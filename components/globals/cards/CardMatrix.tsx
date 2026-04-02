import React from "react";

interface MatrixCardProps {
  title?: string; // Jadi opsional
  icon?: React.ReactNode;
  verticalKeys: string[];
  horizontalKeys: string[];
  renderValue: (vKey: string, hKey: string) => React.ReactNode;
  actionLabel?: string; // Jadi opsional
  onActionClick?: () => void;
}

const CardMatrix = ({
  title,
  icon,
  verticalKeys,
  horizontalKeys,
  renderValue,
  actionLabel,
  onActionClick,
}: MatrixCardProps) => {
  // Cek apakah header harus muncul
  const showHeader = title || actionLabel;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-400/50">
      
      {/* Header - Hanya render kalau title atau actionLabel ada */}
      {showHeader && (
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
          <div className="flex items-center gap-3">
            {title && (
              <>
                {icon && <div className="text-blue-400">{icon}</div>}
                <h3 className="font-semibold text-slate-700">{title}</h3>
              </>
            )}
          </div>
          
          {actionLabel && (
            <button
              type="button"
              onClick={onActionClick}
              className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 transition-colors hover:bg-blue-200 active:scale-95"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}

      {/* Matrix Area */}
      <div className="flex-1 overflow-x-auto p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              {horizontalKeys.map((hKey) => (
                <th
                  key={hKey}
                  className="p-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  {hKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {verticalKeys.map((vKey) => (
              <tr key={vKey} className="border-b border-slate-50 last:border-0">
                <td className="p-2 text-sm font-medium text-slate-500 bg-slate-50/30 rounded-l-lg whitespace-nowrap">
                  {vKey}
                </td>
                
                {horizontalKeys.map((hKey) => (
                  <td key={`${vKey}-${hKey}`} className="p-2 text-center">
                    <div className="inline-flex min-w-[44px] flex-col items-center justify-center rounded-lg bg-slate-50 p-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-500">
                      {renderValue(vKey, hKey)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardMatrix;