import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COLOR_COLLECTIONS, type AbayaColor } from '../data/catalog';

interface NavbarProps {
  onShopNowClick: () => void;
  onJumpToColor: (color: AbayaColor) => void;
}

export function Navbar({ onShopNowClick, onJumpToColor }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  const handleMobileShopNow = () => {
    closeMenu();
    onShopNowClick();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#C6A253]/20 bg-[#0D0C0A]/95 text-[#FAF7F2] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-serif text-xl font-semibold tracking-[0.22em] text-[#E2C886] transition-colors hover:text-[#FAF7F2] whitespace-nowrap shrink-0 sm:text-2xl"
        >
          NOOR ABAYA
        </a>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#FAF7F2]/85"
        >
          <a
            href="#home"
            className="relative py-1 transition-colors hover:text-[#E2C886] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C6A253] after:transition-all after:duration-200 hover:after:w-full"
          >
            Home
          </a>
          <a
            href="#collections"
            className="relative py-1 transition-colors hover:text-[#E2C886] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C6A253] after:transition-all after:duration-200 hover:after:w-full"
          >
            Collections
          </a>
          <a
            href="#about"
            className="relative py-1 transition-colors hover:text-[#E2C886] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C6A253] after:transition-all after:duration-200 hover:after:w-full"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="relative py-1 transition-colors hover:text-[#E2C886] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#C6A253] after:transition-all after:duration-200 hover:after:w-full"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onShopNowClick}
            className="hidden sm:inline-flex items-center justify-center border border-[#C6A253] bg-[#C6A253] px-5 py-2 text-xs font-semibold tracking-[0.16em] text-[#0D0C0A] transition-all duration-200 hover:bg-[#E2C886] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2C886] whitespace-nowrap shrink-0 cursor-pointer"
          >
            SHOP NOW
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center border border-[#C6A253]/35 text-[#FAF7F2] transition-colors hover:border-[#E2C886] hover:text-[#E2C886] md:hidden cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#C6A253]/20 bg-[#0D0C0A] px-4 py-6 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4">
            <a
              href="#home"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-[#FAF7F2] transition-colors hover:text-[#E2C886]"
            >
              Home
            </a>
            <a
              href="#collections"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-[#FAF7F2] transition-colors hover:text-[#E2C886]"
            >
              Collections
            </a>
            <a
              href="#about"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-[#FAF7F2] transition-colors hover:text-[#E2C886]"
            >
              About Us
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="py-2 text-base font-medium text-[#FAF7F2] transition-colors hover:text-[#E2C886]"
            >
              Contact
            </a>

            <div className="mt-2 border-t border-white/10 pt-4">
              <p className="mb-3 text-xs tracking-[0.14em] text-[#C6A253]">
                Seven Color Collections
              </p>
              <div className="grid grid-cols-2 gap-2">
                {COLOR_COLLECTIONS.map((col) => (
                  <button
                    key={col.color}
                    type="button"
                    onClick={() => {
                      closeMenu();
                      onJumpToColor(col.color);
                    }}
                    className="flex items-center gap-2.5 border border-white/10 px-3 py-2 text-left text-sm text-[#FAF7F2]/90 transition-colors hover:border-[#C6A253] cursor-pointer"
                  >
                    <span
                      className="h-3 w-3 shrink-0 rounded-full border border-white/30"
                      style={{ backgroundColor: col.swatchHex }}
                    />
                    <span>{col.color}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleMobileShopNow}
              className="mt-3 w-full bg-[#C6A253] py-3.5 text-center text-xs font-semibold tracking-[0.18em] text-[#0D0C0A] transition-colors hover:bg-[#E2C886] cursor-pointer"
            >
              SHOP NOW
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
