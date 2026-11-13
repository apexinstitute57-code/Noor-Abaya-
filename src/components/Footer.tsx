import { BRAND_INFO, COLOR_COLLECTIONS, type AbayaColor } from '../data/catalog';

interface FooterProps {
  onJumpToColor: (color: AbayaColor) => void;
}

export function Footer({ onJumpToColor }: FooterProps) {
  return (
    <footer className="border-t border-[#C6A253]/25 bg-[#090807] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <a
              href="#home"
              className="font-serif text-2xl font-semibold tracking-[0.22em] text-[#E2C886]"
            >
              NOOR ABAYA
            </a>
            <p className="mt-3 text-sm leading-relaxed text-[#FAF7F2]/70">
              Luxury modest fashion boutique in Zafarwal, Pakistan, curated with timeless grace by{' '}
              {BRAND_INFO.owner}.
            </p>
          </div>

          {/* Seven Color Collections */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C6A253]">
              Color Collections
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-[#FAF7F2]/80">
              {COLOR_COLLECTIONS.map((col) => (
                <li key={col.color}>
                  <button
                    type="button"
                    onClick={() => onJumpToColor(col.color)}
                    className="inline-flex items-center gap-2 text-left transition-colors hover:text-[#E2C886] cursor-pointer"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full border border-white/30"
                      style={{ backgroundColor: col.swatchHex }}
                    />
                    <span>{col.color} Abaya</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C6A253]">Quick Links</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>
                <a href="#home" className="transition-colors hover:text-[#E2C886]">
                  Home
                </a>
              </li>
              <li>
                <a href="#collections" className="transition-colors hover:text-[#E2C886]">
                  Collections
                </a>
              </li>
              <li>
                <a href="#about" className="transition-colors hover:text-[#E2C886]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-[#E2C886]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#C6A253]">Boutique Info</p>
            <ul className="mt-4 space-y-2.5 text-sm text-[#FAF7F2]/80">
              <li>Owner: {BRAND_INFO.owner}</li>
              <li>Location: {BRAND_INFO.location}</li>
              <li>
                Phone:{' '}
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="tabular-nums text-[#E2C886] hover:underline"
                >
                  {BRAND_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={BRAND_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E2C886] hover:underline"
                >
                  WhatsApp Direct Order
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[#FAF7F2]/60 sm:flex sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 Noor Abaya. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Zafarwal, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
