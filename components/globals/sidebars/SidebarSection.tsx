// components/globals/sidebars/SidebarSection.tsx
interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => (
  <div className="mb-6">
    <h3 className="px-4 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
      {title}
    </h3>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);