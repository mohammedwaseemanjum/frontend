import { useLoaderStore } from "@/stores/loader";
import { useShallow } from 'zustand/react/shallow';

const Loader = ({ 
  size = 90, 
  color = '#2563eb', 
  strokeWidth = 3, 
  overlayOpacity = 0.5, 
  isOverlay = true, 
  className = '',
}) => {
    const { pendingRequest } = useLoaderStore(
        useShallow((state) => ({
            pendingRequest: state.pendingRequest,
        }))
    )

    const spinnerSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle',
        animation: 'spin 0.8s linear infinite'
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity="0.2"
      />
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );

  if (!isOverlay) return spinnerSvg;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: pendingRequest > 0 ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: `rgba(255, 255, 255, ${overlayOpacity})`, 
        backdropFilter: 'blur(2px)', 
        zIndex: 50,
        borderRadius: 'inherit'
      }}
    >
      {spinnerSvg}
    </div>
  );
}

export default Loader