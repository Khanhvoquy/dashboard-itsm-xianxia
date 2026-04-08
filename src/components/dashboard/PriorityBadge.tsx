import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'P1' | 'P2' | 'P3' | 'P4';
}

const priorityStyles = {
  P1: 'bg-xianxia-crimson text-white shadow-glow-crimson',
  P2: 'bg-orange-700 text-white',
  P3: 'bg-xianxia-gold text-xianxia-ink',
  P4: 'bg-xianxia-silver text-xianxia-ink',
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide',
        priorityStyles[priority]
      )}
    >
      {priority}
    </span>
  );
}
