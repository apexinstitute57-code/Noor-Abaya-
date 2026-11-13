import { ArrowRight } from 'lucide-react';
import type { AbayaProduct, ColorCollectionMeta } from '../data/catalog';
import { ProductCard3D } from './ProductCard3D';

interface ColorCollectionSectionProps {
  collection: ColorCollectionMeta;
  products: AbayaProduct[];
  sectionIndex: number;
  onShopNow: (product: AbayaProduct) => void;
}

export function ColorCollectionSection({
  collection,
  products,
  sectionIndex,
  onShopNow,
}: ColorCollectionSectionProps) {
  if (products.length === 0) return null;

  const isDark = collection.color === 'Black' || collection.color === 'Purple';
  const isAlabaster = collection.color === 'Green';
  const isWhite = collection.color === 'Maroon' || collection.color === 'Grey';

  const sectionBgClass = isDark
    ? 'bg-[#0F0E0C] text-[#FAF7F2]'
    : isAlabaster
      ? 'bg-[#F2EBE0] text-[#141210]'
      : isWhite
        ? 'bg-white text-[#141210]'
        : 'bg-[#FAF7F2] text-[#141210]';

  const subTextClass = isDark ? 'text-[#FAF7F2]/75' : 'text-[#5C5449]';
  const featuredProduct =
    products.find((p) => p.id === collection.featuredProductId) || products[0];

  return (
    <section
      id={`collection-${collection.slug}`}
      aria-labelledby={`heading-${collection.slug}`}
      className={`border-t border-[#C6A253]/20 py-16 sm:py-24 ${sectionBgClass}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-current/12 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-[#C6A253]">
              <span
                className="h-3 w-3 rounded-full border border-[#C6A253]/60"
                style={{ backgroundColor: collection.swatchHex }}
              />
              <span>
                {collection.indexLabel}. {collection.color} Palette
              </span>
            </div>

            <h2
              id={`heading-${collection.slug}`}
              className="mt-3 font-serif text-3xl font-medium tracking-tight sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              {collection.heading}
            </h2>

            <p className={`mt-3 text-sm leading-relaxed sm:text-base ${subTextClass}`}>
              {collection.tagline}
            </p>
          </div>

          {/* Separate Collection-Level SHOP NOW CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onShopNow(featuredProduct)}
              className={`inline-flex min-h-[44px] items-center gap-2.5 border px-6 py-3 text-xs font-semibold tracking-[0.18em] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'border-[#C6A253] text-[#E2C886] hover:bg-[#C6A253] hover:text-[#0D0C0A]'
                  : 'border-[#141210] text-[#141210] hover:bg-[#141210] hover:text-[#FAF7F2]'
              }`}
            >
              <span>SHOP NOW — {collection.color.toUpperCase()}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          className={`mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 ${
            sectionIndex % 2 === 1 ? 'lg:gap-10' : 'lg:gap-8'
          }`}
        >
          {products.map((product) => (
            <ProductCard3D
              key={product.id}
              product={product}
              darkSurface={isDark}
              onShopNow={onShopNow}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
