// === src/app/[locale]/(dashboard)/tickets/page.tsx ===
'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Ticket, Filter } from 'lucide-react';
import PriorityBadge from '@/components/dashboard/PriorityBadge';
import { inkRevealVariants } from '@/lib/animations/variants';
const mockTickets = [
  { id: 'T001', title: 'System Critical Error', priority: 'P1', status: 'In Progress', assignee: 'Nguyễn Văn An', slaRemaining: '2h' },
  { id: 'T002', title: 'Database Performance Issue', priority: 'P2', status: 'Open', assignee: 'Trần Thị Bình', slaRemaining: '6h' },
  { id: 'T003', title: 'UI Bug in Dashboard', priority: 'P3', status: 'Resolved', assignee: 'Lê Hoàng Cường', slaRemaining: '1d' },
  { id: 'T004', title: 'Feature Request: Export', priority: 'P4', status: 'Open', assignee: 'Phạm Minh Đức', slaRemaining: '3d' },
  { id: 'T005', title: 'API Rate Limiting', priority: 'P2', status: 'In Progress', assignee: 'Đỗ Thị Eve', slaRemaining: '4h' },
  { id: 'T006', title: 'Security Vulnerability', priority: 'P1', status: 'Open', assignee: 'Vũ Văn Fab', slaRemaining: '1h' },
  { id: 'T007', title: 'Documentation Update', priority: 'P4', status: 'Resolved', assignee: 'Bùi Thị Grace', slaRemaining: '5d' },
  { id: 'T008', title: 'Server Migration', priority: 'P2', status: 'In Progress', assignee: 'Hoàng Văn Hugo', slaRemaining: '8h' },
];
const statusColors: Record<string, string> = {
  'Open': 'text-xianxia-silver',
  'In Progress': 'text-xianxia-gold',
  'Resolved': 'text-xianxia-jade',
};
export default function TicketsPage() {
  const t = useTranslations('tickets');
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Ticket className="text-xianxia-gold w-8 h-8" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-xianxia-gold xianxia-text-glow">
              {t('title')}
            </h1>
            <p className="text-sm text-xianxia-silver">8 linh vụ đang xử lý</p>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 xianxia-card-hover text-sm">
          <Filter size={16} />
          <span>Lọc</span>
        </button>
      </div>
      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'P1 Critical', value: '2', color: 'text-xianxia-crimson' },
          { label: 'P2 High', value: '3', color: 'text-orange-500' },
          { label: 'P3 Medium', value: '1', color: 'text-xianxia-gold' },
          { label: 'P4 Low', value: '2', color: 'text-xianxia-silver' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="xianxia-card p-4 text-center"
            variants={inkRevealVariants}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-xianxia-silver mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      {/* Tickets Table */}
      <div className="xianxia-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-xianxia-parchment-light border-b border-xianxia-bronze">
            <tr>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">ID</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('description')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('priority')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('status')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">{t('assignee')}</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wider text-xianxia-silver">SLA</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <motion.tr
                key={ticket.id}
                className="border-b border-xianxia-bronze/30 hover:bg-xianxia-gold/5 transition-colors cursor-pointer"
                variants={inkRevealVariants}
              >
                <td className="px-4 py-4 text-xianxia-gold font-mono text-sm">{ticket.id}</td>
                <td className="px-4 py-4 text-xianxia-paper-text font-medium">{ticket.title}</td>
                <td className="px-4 py-4"><PriorityBadge priority={ticket.priority as 'P1' | 'P2' | 'P3' | 'P4'} /></td>
                <td className={`px-4 py-4 text-sm font-medium ${statusColors[ticket.status]}`}>{ticket.status}</td>
                <td className="px-4 py-4 text-xianxia-paper-text text-sm">{ticket.assignee}</td>
                <td className="px-4 py-4">
                  <span className={ticket.slaRemaining.includes('h') ? 'text-xianxia-crimson' : 'text-xianxia-jade'}>
                    {ticket.slaRemaining}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
