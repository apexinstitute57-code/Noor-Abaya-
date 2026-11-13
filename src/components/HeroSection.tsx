import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';
import { BRAND_INFO, COLOR_COLLECTIONS, type AbayaColor } from '../data/catalog';

interface HeroSectionProps {
  onShopNowClick: () => void;
  onJumpToColor: (color: AbayaColor) => void;
}

export function HeroSection({ onShopNowClick, onJumpToColor }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative overflow-hidden bg-[#0D0C0A] text-[#FAF7F2]"
    >
      {/* Full-Screen Parallax Fashion Canvas */}
      <div className="relative min-h-[86svh] w-full flex items-center">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: imageY, scale: imageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={BRAND_INFO.heroImage}
            alt="Model wearing a flowing black silk Dubai abaya with antique gold embroidery by Noor Abaya Zafarwal"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-[65%_20%] sm:object-center"
          />
        </motion.div>

        {/* Measured Luxury Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0D0C0A]/88 via-[#0D0C0A]/58 to-[#0D0C0A]/20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-[#0D0C0A]/30"
        />

        {/* Floating Fabric Light Veil Effects (3D Atmospheric Depth) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-12 h-[420px] w-[420px] rounded-full bg-[#C6A253]/12 blur-3xl animate-float-fabric"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-12 h-[320px] w-[320px] rounded-full bg-[#FAF7F2]/8 blur-3xl animate-float-fabric"
          style={{ animationDelay: '-3.5s' }}
        />

        {/* Editorial Hero Content */}
        <motion.div
          style={prefersReducedMotion ? undefined : { y: textY, opacity: textOpacity }}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="max-w-2xl">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-xs font-medium tracking-[0.26em] text-[#E2C886]"
            >
              Zafarwal, Pakistan · Couture Modest Wear by Fiza
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-[#FAF7F2] sm:text-6xl lg:text-[4.25rem]"
              style={{ textWrap: 'balance' }}
            >
              NOOR ABAYA – Elegance in Every Style
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-[#FAF7F2]/85 sm:text-xl"
            >
              Discover Your Beauty, Discover Your Elegance.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              <button
                type="button"
                onClick={onShopNowClick}
                className="group relative inline-flex items-center gap-3 overflow-hidden border border-[#C6A253] bg-[#C6A253] px-8 py-4 text-xs font-semibold tracking-[0.22em] text-[#0D0C0A] shadow-[0_14px_40px_rgba(198,162,83,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E2C886] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2C886] cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/35 blur-sm -translate-x-full animate-sheen"
                />
                <span className="relative">SHOP NOW</span>
                <ArrowDownRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Seven Signature Color Index Bar */}
      <div className="relative z-10 border-t border-[#C6A253]/25 bg-[#14120F]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-xs font-medium tracking-[0.2em] text-[#E2C886]">
            Seven Signature Hues
          </span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {COLOR_COLLECTIONS.map((col) => (
              <button
                key={col.color}
                type="button"
                onClick={() => onJumpToColor(col.color)}
                className="inline-flex items-center gap-2 border border-white/12 bg-white/5 px-3.5 py-2 text-xs font-medium text-[#FAF7F2]/90 transition-all duration-150 hover:border-[#C6A253] hover:bg-[#C6A253]/15 hover:text-[#E2C886] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full border border-white/40"
                  style={{ backgroundColor: col.swatchHex }}
                />
                <span>{col.color}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
