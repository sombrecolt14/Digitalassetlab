import { Card } from './Card';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        <div className="text-5xl">{icon}</div>
        <h3 className="text-[#e5e5e5]">{title}</h3>
        <p className="text-[#a0a0a0]">{description}</p>
      </div>
    </Card>
  );
}