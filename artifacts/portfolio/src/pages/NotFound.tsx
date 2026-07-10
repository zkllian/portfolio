import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '16px',
    }}>
      <motion.span
        style={{ fontSize: '12px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        // 404
      </motion.span>

      <motion.span
        style={{ fontSize: '15px', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}
        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, delay: 0.08 }}
      >
        halaman tidak ditemukan
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.16 }}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '13px' }}
        >
          ← kembali ke beranda
        </Button>
      </motion.div>
    </div>
  );
}
