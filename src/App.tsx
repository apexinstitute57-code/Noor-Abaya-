import { useMemo, useState } from 'react';
import {
  ABAYA_PRODUCTS,
  ABAYA_STYLES,
  COLOR_COLLECTIONS,
  type AbayaColor,
  type AbayaProduct,
  type AbayaStyle,
} from './data/catalog';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ColorCollectionSection } from './components/ColorCollectionSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductOrderModal } from './components/ProductOrderModal';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<AbayaProduct | null>(null);
  const [activeStyle, setActiveStyle] = useState<'All' | AbayaStyle>('All');

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const jumpToColorCollection = (color: AbayaColor) => {
    setActiveStyle('All');
    requestAnimationFrame(() => {
      const target = document.getElementById(`collection-${color.toLowerCase()}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  const collectionsWithProducts = useMemo(() => {
    return COLOR_COLLECTIONS.map((col) => {
      const matching = ABAYA_PRODUCTS.filter((product) => {
        if (product.color !== col.color) return false;
        if (activeStyle === 'All') return true;
        return product.style === activeStyle || product.secondaryStyle === activeStyle;
      });
      return { collection: col, products: matching };
    });
  }, [activeStyle]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#141210]">
      <Navbar
        onShopNowClick={scrollToCollections}
        onJumpToColor={jumpToColorCollection}
      />

      <main>
        <HeroSection
          onShopNowClick={scrollToCollections}
          onJumpToColor={jumpToColorCollection}
        />

        {/* Collections Header & Style Filter Bar */}
        <section
          id="collections"
          className="border-t border-[#C6A253]/20 bg-[#FAF7F2] py-14 sm:py-16"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-medium tracking-[0.24em] text-[#9C7A32]">
                  Curated Lookbook
                </p>
                <h2
                  className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#141210] sm:text-5xl"
                  style={{ textWrap: 'balance' }}
                >
                  Seven Signature Color Collections
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[#5C5449]">
                Explore exclusive designs across Black, Blue, Maroon, Green, Brown, Purple, and
                Grey — tailored in Dubai, Butterfly, Open, Closed, Embroidered, Party Wear, Daily
                Wear, Luxury, and Fancy silhouettes.
              </p>
            </div>

            {/* Interactive Abaya Style Filter */}
            <div
              role="tablist"
              aria-label="Filter abayas by style"
              className="mt-8 flex flex-wrap items-center gap-2 border-t border-[#141210]/10 pt-6"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeStyle === 'All'}
                onClick={() => setActiveStyle('All')}
                className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeStyle === 'All'
                    ? 'border-[#0D0C0A] bg-[#0D0C0A] text-[#E2C886]'
                    : 'border-[#141210]/15 bg-white text-[#464038] hover:border-[#C6A253] hover:text-[#141210]'
                }`}
              >
                All Styles
              </button>

              {ABAYA_STYLES.map((style) => {
                const selected = activeStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveStyle(style)}
                    className={`min-h-[40px] border px-4 py-2 text-xs font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selected
                        ? 'border-[#0D0C0A] bg-[#0D0C0A] text-[#E2C886]'
                        : 'border-[#141210]/15 bg-white text-[#464038] hover:border-[#C6A253] hover:text-[#141210]'
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Seven Separate Color Collection Sections */}
        {collectionsWithProducts.map(({ collection, products }, index) => (
          <ColorCollectionSection
            key={collection.color}
            collection={collection}
            products={products}
            sectionIndex={index}
            onShopNow={(product) => setSelectedProduct(product)}
          />
        ))}

        <AboutSection />
        <ContactSection />
      </main>

      <Footer onJumpToColor={jumpToColorCollection} />

      <FloatingWhatsApp activeProduct={selectedProduct} />

      <ProductOrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
