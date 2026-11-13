import { ABAYA_STYLES, BRAND_INFO } from '../data/catalog';

export function AboutSection() {
  return (
    <section id="about" className="border-t border-[#C6A253]/25 bg-[#F2EBE0] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Editorial Lookbook Frame */}
          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[400px] overflow-hidden border border-[#C6A253]/30 bg-[#0D0C0A]">
              <img
                src="/src/assets/images/maroon_embroidered_abaya_1794548566708.jpg"
                alt="Hand-embroidered luxury abaya crafted for Noor Abaya Zafarwal"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 left-5 right-5 text-[#FAF7F2]">
                <p className="text-xs tracking-[0.2em] text-[#E2C886]">Curated by {BRAND_INFO.owner}</p>
                <p className="mt-1 font-serif text-2xl">{BRAND_INFO.location}</p>
              </div>
            </div>
          </div>

          {/* Story & Craftsmanship */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.24em] text-[#9C7A32]">About Us</p>
            <h2
              className="mt-3 font-serif text-3xl font-medium leading-tight text-[#141210] sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Crafted for Grace, Rooted in Zafarwal
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#3F3931] sm:text-lg">
              Noor Abaya is a luxury modest fashion brand in Zafarwal, owned by{' '}
              <strong className="font-semibold text-[#141210]">{BRAND_INFO.owner}</strong>,
              offering beautiful and elegant abayas. Every piece is thoughtfully tailored from
              breathable Korean Nidha, silk chiffon, and fine crepe so women feel poised for
              everyday wear as well as cherished family celebrations.
            </p>

            {/* Nine Signature Abaya Styles */}
            <div className="mt-8 border-t border-[#141210]/12 pt-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#9C7A32]">
                Signature Silhouettes
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#3F3931]">
                {ABAYA_STYLES.map((style, index) => (
                  <span key={style} className="inline-flex items-center gap-4">
                    <span>{style}</span>
                    {index < ABAYA_STYLES.length - 1 && (
                      <span aria-hidden="true" className="text-[#C6A253]">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Brand Values Row */}
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#141210]/12 pt-6 sm:grid-cols-3">
              <div>
                <p className="font-serif text-2xl font-medium text-[#141210]">7 Hues</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5C5449]">
                  Curated exclusively in Black, Blue, Maroon, Green, Brown, Purple, and Grey.
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-medium text-[#141210]">Fine Drape</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5C5449]">
                  Korean Nidha, silk georgette, velvet trim, and intricate hand zardozi detail.
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-medium text-[#141210]">Direct Care</p>
                <p className="mt-1 text-xs leading-relaxed text-[#5C5449]">
                  Personal sizing guidance and nationwide delivery directly from Zafarwal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
