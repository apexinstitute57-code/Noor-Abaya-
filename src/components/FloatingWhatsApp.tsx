import { MessageCircle } from 'lucide-react';
import { BRAND_INFO, formatPKR, type AbayaProduct } from '../data/catalog';

interface FloatingWhatsAppProps {
  activeProduct: AbayaProduct | null;
}

export function FloatingWhatsApp({ activeProduct }: FloatingWhatsAppProps) {
  const message = activeProduct
    ? `Assalam-o-Alaikum Noor Abaya (Zafarwal), I am interested in:\n• Product: ${activeProduct.name}\n• Color: ${activeProduct.color}\n• Price: ${formatPKR(activeProduct.price)}\nPlease assist me with my order.`
    : 'Assalam-o-Alaikum Noor Abaya (Zafarwal), I would like to explore and order from your luxury abaya collections.';

  const href = `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order or chat with Noor Abaya on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-[#C6A253]/50 bg-[#145335] px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-[0_12px_32px_rgba(13,12,10,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#196943] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A253]"
    >
      <MessageCircle className="h-5 w-5 shrink-0 text-[#4ADE80]" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp Order</span>
    </a>
  );
}
