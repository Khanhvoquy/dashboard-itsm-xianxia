// === src/app/[locale]/(dashboard)/kb/page.tsx ===
'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Heart, MessageSquare, Search } from 'lucide-react';
import { inkRevealVariants } from '@/lib/animations/variants';
const mockArticles = [
  { id: 'KB001', title: 'Hướng Dẫn Troubleshoot System Errors', author: 'Nguyễn Văn An', views: 245, likes: 32, comments: 8, category: 'Technical' },
  { id: 'KB002', title: 'Database Optimization Best Practices', author: 'Trần Thị Bình', views: 189, likes: 28, comments: 5, category: 'Database' },
  { id: 'KB003', title: 'API Security Guidelines', author: 'Lê Hoàng Cường', views: 312, likes: 45, comments: 12, category: 'Security' },
  { id: 'KB004', title: 'Frontend Performance Tips', author: 'Phạm Minh Đức', views: 156, likes: 22, comments: 3, category: 'Frontend' },
  { id: 'KB005', title: 'DevOps Deployment Checklist', author: 'Hoàng Văn Hugo', views: 278, likes: 38, comments: 9, category: 'DevOps' },
  { id: 'KB006', title: 'QA Testing Framework', author: 'Vũ Văn Fab', views: 201, likes: 30, comments: 7, category: 'QA' },
];
export default function KBPage() {
  const t = useTranslations('kb');
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
          <BookOpen className="text-xianxia-gold w-8 h-8" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-xianxia-gold xianxia-text-glow">
              {t('title')}
            </h1>
            <p className="text-sm text-xianxia-silver">40 bài viết tri thức</p>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-10 pr-4 py-2 xianxia-card text-sm focus:outline-none focus:ring-1 focus:ring-xianxia-gold"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-xianxia-silver w-4 h-4" />
        </div>
      </div>
      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Technical', 'Database', 'Security', 'Frontend', 'DevOps', 'QA'].map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 xianxia-card-hover text-sm"
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockArticles.map((article, index) => (
          <motion.article
            key={article.id}
            className="xianxia-card-hover p-5 cursor-pointer"
            variants={inkRevealVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs px-2 py-1 bg-xianxia-bronze/30 text-xianxia-gold rounded">
                {article.category}
              </span>
              <BookOpen className="text-xianxia-gold w-5 h-5" />
            </div>
            
            <h3 className="text-lg font-semibold text-xianxia-paper-text mb-2 line-clamp-2">
              {article.title}
            </h3>
            
            <p className="text-sm text-xianxia-silver mb-4">
              {t('author')}: <span className="text-xianxia-gold">{article.author}</span>
            </p>
            
            <div className="flex items-center gap-4 text-xs text-xianxia-paper-text-muted">
              <span className="flex items-center gap-1">
                <Eye size={14} /> {article.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart size={14} /> {article.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={14} /> {article.comments}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
