import { Card } from './Card';

interface TestimonialCardProps {
  avatarUrl: string;
  name: string;
  text: string;
}

export function TestimonialCard({ avatarUrl, name, text }: TestimonialCardProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0a0a0a] border border-[#2a2a2a]">
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <p className="text-[#e5e5e5]" style={{ fontWeight: 600 }}>{name}</p>
      </div>
      <p className="text-[#a0a0a0]">{text}</p>
    </Card>
  );
}