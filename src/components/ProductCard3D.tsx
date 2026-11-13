import { useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { formatPKR, type AbayaProduct } from '../data/catalog';

interface ProductCard3DProps {
  product: AbayaProduct;
  darkSurface?: boolean;
  onShopNow: (product: AbayaProduct) => void;
}

export function ProductCard3D({ product, darkSurface = false, onShopNow }: ProductCard3DProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width - 0.5;
    const yPct = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardSurfaceClasses = darkSurface
    ? 'bg-[#191714] border-[#C6A253]/22 text-[#FAF7F2]'
    : 'bg-white border-[#141210]/10 text-[#141210]';

  const mutedTextClasses = darkSurface ? 'text-[#FAF7F2]/65' : 'text-[#5C5449]';

  return (
    <div style={{ perspective: 1100 }}>
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className={`group relative flex h-full flex-col border transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(13,12,10,0.16)] ${cardSurfaceClasses}`}
      >
        {/* Product Image Container (Zoom + Fallback) */}
        <div
          onClick={() => onShopNow(product)}
          className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-[#ECE5D9]"
        >
          {!imageError ? (
            <img
              src={product.image}
              alt={`${product.name} in ${product.color} by Noor Abaya`}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-106"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F2EBE0] to-[#DFD3BF] p-6 text-center text-[#141210]">
              <Sparkles className="mb-3 h-7 w-7 text-[#9C7A32]" />
              <p className="font-serif text-lg font-medium">{product.name}</p>
              <p className="mt-1 text-xs text-[#5C5449]">{product.color} Edition</p>
            </div>
          )}

          {/* Subtle luxury light sheen on hover */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Unboxed Clean Metadata */}
            <div className={`flex flex-wrap items-center gap-2 text-xs ${mutedTextClasses}`}>
              <span>{product.style}</span>
              <span aria-hidden="true">·</span>
              <span>{product.secondaryStyle}</span>
            </div>

            <h3 className="mt-2 font-serif text-2xl font-medium leading-snug tracking-tight">
              {product.name}
            </h3>

            <p className={`mt-2 line-clamp-2 text-sm leading-relaxed ${mutedTextClasses}`}>
              {product.description}
            </p>
          </div>

          <div className="mt-5 border-t border-current/10 pt-4">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-lg font-semibold tabular-nums text-[#C6A253]">
                {formatPKR(product.price)}
              </span>
              <span className={`text-xs ${mutedTextClasses}`}>
                Color: <strong className="font-medium text-current">{product.color}</strong>
              </span>
            </div>

            <p className={`mt-2 text-xs tabular-nums ${mutedTextClasses}`}>
              Available Sizes: <span className="text-current">{product.sizes.join(' · ')}</span>
            </p>

            <button
              type="button"
              onClick={() => onShopNow(product)}
              className={`mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.2em] transition-all duration-200 cursor-pointer ${
                darkSurface
                  ? 'border-[#C6A253] bg-[#C6A253] text-[#0D0C0A] hover:bg-[#E2C886]'
                  : 'border-[#141210] bg-[#141210] text-[#FAF7F2] hover:border-[#C6A253] hover:bg-[#C6A253] hover:text-[#0D0C0A]'
              }`}
            >
              <span>SHOP NOW</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
