interface BundleCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export function BundleCard({ title, subtitle, imageUrl }: BundleCardProps) {
  return (
    <div
      className="p-5 rounded-xl flex flex-col gap-5 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#00D9FF]/50 transition-all duration-300 group"
      style={{
        boxShadow: '0 8px 24px rgba(0, 217, 255, 0.1)'
      }}
    >
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#0a0a0a] relative">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-[#e5e5e5]">{title}</h4>
        <p className="text-[#a0a0a0]" style={{ fontSize: '14px', lineHeight: '20px' }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}