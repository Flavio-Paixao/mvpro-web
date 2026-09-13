import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface BotaoProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  variante?: 'principal' | 'contorno';
}

export default function Botao({ children, type = 'button', onClick, disabled, variante = 'principal' }: BotaoProps) {
  const baseClasses = 'w-full font-bold py-3 rounded-lg uppercase text-sm tracking-wider disabled:opacity-50 outline-none';
  const varianteClasses = variante === 'principal'
    ? 'bg-orange text-bg'
    : 'bg-transparent border border-border text-white';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial={{ boxShadow: '0 0 0px 0px rgba(249,115,22,0)' }}
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px 6px rgba(249,115,22,0.7)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      style={{ WebkitAppearance: 'none', appearance: 'none' }}
      className={baseClasses + ' ' + varianteClasses}
    >
      {children}
    </motion.button>
  );
}
