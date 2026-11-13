import { MapPin, MessageCircle, Phone, User } from 'lucide-react';
import { BRAND_INFO } from '../data/catalog';

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-[#C6A253]/25 bg-[#0D0C0A] py-20 text-[#FAF7F2] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.24em] text-[#E2C886]">Contact Us</p>
            <h2
              className="mt-3 font-serif text-3xl font-medium leading-tight sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Personal Styling &amp; Direct Boutique Orders
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#FAF7F2]/75 sm:text-base">
              Need custom length guidance, bridal party abaya inquiries, or assistance with your
              delivery? Connect directly with our Zafarwal boutique by phone or WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="inline-flex min-h-[48px] items-center gap-2.5 border border-[#C6A253] bg-[#C6A253] px-7 py-3 text-xs font-semibold tracking-[0.18em] text-[#0D0C0A] transition-colors hover:bg-[#E2C886]"
              >
                <Phone className="h-4 w-4" />
                <span>CALL {BRAND_INFO.phone}</span>
              </a>

              <a
                href={`${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Assalam-o-Alaikum Noor Abaya (Zafarwal), I would like to inquire about your abaya collections.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 border border-[#25D366]/60 bg-[#1B4332]/40 px-7 py-3 text-xs font-semibold tracking-[0.18em] text-[#FAF7F2] transition-colors hover:bg-[#1E6B47]"
              >
                <MessageCircle className="h-4 w-4 text-[#4ADE80]" />
                <span>WHATSAPP BOUTIQUE</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-4 border border-[#C6A253]/25 bg-[#151310] p-6 sm:grid-cols-3 sm:p-8">
              <div className="space-y-2 border-b border-white/10 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                <User className="h-4 w-4 text-[#C6A253]" />
                <p className="text-xs tracking-[0.16em] text-[#FAF7F2]/60">Owner</p>
                <p className="font-serif text-xl font-medium text-[#FAF7F2]">{BRAND_INFO.owner}</p>
              </div>

              <div className="space-y-2 border-b border-white/10 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">
                <MapPin className="h-4 w-4 text-[#C6A253]" />
                <p className="text-xs tracking-[0.16em] text-[#FAF7F2]/60">Location</p>
                <p className="font-serif text-xl font-medium text-[#FAF7F2]">
                  {BRAND_INFO.location}
                </p>
              </div>

              <div className="space-y-2">
                <Phone className="h-4 w-4 text-[#C6A253]" />
                <p className="text-xs tracking-[0.16em] text-[#FAF7F2]/60">Phone</p>
                <a
                  href={`tel:${BRAND_INFO.phone}`}
                  className="block font-serif text-xl font-medium tabular-nums text-[#E2C886] transition-colors hover:text-white"
                >
                  {BRAND_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
