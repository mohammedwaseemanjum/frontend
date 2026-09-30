import { mergeClass } from '@/utils/tailwind';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  popUpContainerClass?: string;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children, popUpContainerClass }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={mergeClass("relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl", popUpContainerClass)}
          >
            { children }
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};