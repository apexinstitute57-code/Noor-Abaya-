import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  Sparkles,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  BRAND_INFO,
  formatPKR,
  type AbayaProduct,
  type AbayaSize,
} from '../data/catalog';

interface ProductOrderModalProps {
  product: AbayaProduct | null;
  onClose: () => void;
}

type ModalStep = 'details' | 'order-form' | 'success';

interface SavedOrderReceipt {
  orderId: string;
  orderDate: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  totalPrice: number;
}

export function ProductOrderModal({ product, onClose }: ProductOrderModalProps) {
  const prefersReducedMotion = useReducedMotion();

  const [step, setStep] = useState<ModalStep>('details');
  const [selectedSize, setSelectedSize] = useState<AbayaSize>('54');
  const [quantity, setQuantity] = useState<number>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Order Form fields (ONLY the 3 requested fields)
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<SavedOrderReceipt | null>(null);

  useEffect(() => {
    if (!product) return;
    setStep('details');
    setSelectedSize(product.sizes.includes('54') ? '54' : product.sizes[0]);
    setQuantity(1);
    setIsZoomed(false);
    setImageError(false);
    setSubmitError(null);
    setReceipt(null);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  const totalPrice = product.price * quantity;

  const buildWhatsAppHref = (includeCustomerDetails: boolean, orderId?: string) => {
    const lines = [
      `Assalam-o-Alaikum Noor Abaya (Zafarwal), I would like to place an order:`,
      `• Product: ${product.name}`,
      `• Color: ${product.color}`,
      `• Size: ${selectedSize}`,
      `• Quantity: ${quantity}`,
      `• Total Price: ${formatPKR(totalPrice)}`,
    ];

    if (includeCustomerDetails && customerName.trim()) {
      lines.push(`• Customer Name: ${customerName.trim()}`);
    }
    if (includeCustomerDetails && deliveryAddress.trim()) {
      lines.push(`• Delivery Address: ${deliveryAddress.trim()}`);
    }
    if (includeCustomerDetails && contactNumber.trim()) {
      lines.push(`• Contact Number: ${contactNumber.trim()}`);
    }
    if (orderId) {
      lines.push(`• Order Reference: ${orderId}`);
    }

    return `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const handleSubmitOrder = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    const trimmedName = customerName.trim();
    const trimmedAddress = deliveryAddress.trim();
    const trimmedContact = contactNumber.trim();

    if (trimmedName.length < 2) {
      setSubmitError('Please enter your full name.');
      return;
    }
    if (trimmedAddress.length < 5) {
      setSubmitError('Please enter your complete delivery address.');
      return;
    }
    if (!/^[0-9+\-\s()]{7,25}$/.test(trimmedContact)) {
      setSubmitError('Please enter a valid contact phone number (e.g., 03086421306).');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: trimmedName,
          deliveryAddress: trimmedAddress,
          contactNumber: trimmedContact,
          productId: product.id,
          size: selectedSize,
          quantity,
        }),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok || !payload?.orderId) {
        setSubmitError(
          payload?.error ||
            'Could not save your order to the database. Please try again or complete your order via WhatsApp.'
        );
        return;
      }

      setReceipt(payload as SavedOrderReceipt);
      setStep('success');
    } catch {
      setSubmitError(
        'Network error while saving your order. Please check your connection and try again, or order via WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0D0C0A]/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex max-h-[92svh] w-full max-w-4xl flex-col overflow-hidden border border-[#C6A253]/35 bg-[#FAF7F2] text-[#141210] shadow-2xl lg:flex-row"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product dialog"
            className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center border border-[#141210]/15 bg-white/90 text-[#141210] transition-colors hover:border-[#C6A253] hover:bg-[#0D0C0A] hover:text-[#FAF7F2] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Column: Product Photograph */}
          <div className="relative h-72 w-full shrink-0 overflow-hidden bg-[#E9E1D4] sm:h-96 lg:h-auto lg:w-[46%]">
            {!imageError ? (
              <img
                src={product.image}
                alt={`${product.name} in ${product.color}`}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                onClick={() => setIsZoomed((prev) => !prev)}
                className={`h-full w-full cursor-zoom-in object-cover object-top transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-135 cursor-zoom-out' : 'scale-100'
                }`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#F2EBE0] to-[#DFD3BF] p-8 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-[#9C7A32]" />
                <p className="font-serif text-xl font-medium">{product.name}</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsZoomed((prev) => !prev)}
              aria-label={isZoomed ? 'Reset image zoom' : 'Zoom in on abaya image'}
              className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 border border-white/25 bg-[#0D0C0A]/75 px-3 py-1.5 text-xs font-medium text-[#FAF7F2] backdrop-blur-sm transition-colors hover:bg-[#0D0C0A] cursor-pointer"
            >
              {isZoomed ? <ZoomOut className="h-3.5 w-3.5" /> : <ZoomIn className="h-3.5 w-3.5" />}
              <span>{isZoomed ? 'Reset Zoom' : 'Zoom Fabric'}</span>
            </button>
          </div>

          {/* Right Column: Details / Order Form / Success */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            {step === 'details' && (
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C5449]">
                    <span>{product.style}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.secondaryStyle}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.fabric}</span>
                  </div>

                  <h2
                    id="modal-product-title"
                    className="mt-2 pr-10 font-serif text-3xl font-medium leading-tight text-[#141210]"
                  >
                    {product.name}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4 border-y border-[#141210]/10 py-3">
                    <div>
                      <span className="text-xs text-[#5C5449]">Price</span>
                      <p className="text-2xl font-semibold tabular-nums text-[#9C7A32]">
                        {formatPKR(product.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#5C5449]">Selected Color</span>
                      <p className="text-sm font-semibold text-[#141210]">{product.color}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[#464038]">
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold tracking-[0.12em] text-[#141210]">
                        Select Size (Length in Inches)
                      </span>
                      <span className="tabular-nums text-[#5C5449]">Size {selectedSize}</span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {product.sizes.map((size) => {
                        const active = selectedSize === size;
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`min-h-[42px] min-w-[52px] border px-3 text-sm font-medium tabular-nums transition-colors cursor-pointer ${
                              active
                                ? 'border-[#0D0C0A] bg-[#0D0C0A] text-[#E2C886]'
                                : 'border-[#141210]/20 bg-white text-[#141210] hover:border-[#C6A253]'
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-semibold tracking-[0.12em] text-[#141210]">
                        Quantity
                      </span>
                      <span className="text-xs tabular-nums text-[#5C5449]">
                        Subtotal: <strong className="text-[#141210]">{formatPKR(totalPrice)}</strong>
                      </span>
                    </div>

                    <div className="inline-flex items-center border border-[#141210]/20 bg-white">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="inline-flex h-11 w-11 items-center justify-center text-[#141210] transition-colors hover:bg-[#F2EBE0] cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[44px] text-center text-sm font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                        className="inline-flex h-11 w-11 items-center justify-center text-[#141210] transition-colors hover:bg-[#F2EBE0] cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="mt-8 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('order-form')}
                    className="min-h-[48px] w-full border border-[#0D0C0A] bg-[#0D0C0A] px-6 py-3.5 text-xs font-semibold tracking-[0.22em] text-[#E2C886] transition-all duration-200 hover:border-[#C6A253] hover:bg-[#C6A253] hover:text-[#0D0C0A] cursor-pointer"
                  >
                    ORDER NOW
                  </button>

                  <a
                    href={buildWhatsAppHref(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#1E6B47]/40 bg-white px-5 py-3 text-xs font-semibold tracking-[0.14em] text-[#145335] transition-colors hover:bg-[#1E6B47] hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>SEND ORDER ON WHATSAPP</span>
                  </a>
                </div>
              </div>
            )}

            {step === 'order-form' && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError(null);
                    setStep('details');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C5449] transition-colors hover:text-[#141210] cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back to Abaya Details</span>
                </button>

                <h2
                  id="modal-product-title"
                  className="mt-3 font-serif text-3xl font-medium text-[#141210]"
                >
                  Complete Your Order
                </h2>
                <p className="mt-1 text-xs text-[#5C5449]">
                  Fast direct checkout — no account or email required.
                </p>

                {/* Automatic Order Summary */}
                <div className="mt-4 border border-[#C6A253]/35 bg-[#F2EBE0] p-4 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-[#141210]">{product.name}</p>
                      <p className="mt-1 text-[#5C5449]">
                        Color: {product.color} · Size: {selectedSize} · Qty: {quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold tabular-nums text-[#9C7A32]">
                      {formatPKR(totalPrice)}
                    </p>
                  </div>
                </div>

                {/* Error Feedback */}
                {submitError && (
                  <div
                    role="alert"
                    className="mt-4 border border-[#8E1B22]/35 bg-[#FDF2F2] p-3.5 text-xs text-[#7F1D1D]"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#991B1B]" />
                      <div className="space-y-2">
                        <p className="font-medium leading-relaxed">{submitError}</p>
                        <a
                          href={buildWhatsAppHref(true)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-[#145335] underline underline-offset-2"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Send this order directly on WhatsApp instead</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* ONLY the 3 Requested Fields */}
                <form onSubmit={handleSubmitOrder} className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="order-customer-name"
                      className="block text-xs font-semibold tracking-[0.1em] text-[#141210]"
                    >
                      Customer Name
                    </label>
                    <input
                      id="order-customer-name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={120}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1.5 w-full border border-[#141210]/20 bg-white px-3.5 py-2.5 text-sm text-[#141210] placeholder:text-[#8A8072] focus:border-[#C6A253] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="order-delivery-address"
                      className="block text-xs font-semibold tracking-[0.1em] text-[#141210]"
                    >
                      Complete Delivery Address
                    </label>
                    <textarea
                      id="order-delivery-address"
                      required
                      minLength={5}
                      maxLength={500}
                      rows={3}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House / Street, Mohalla / Sector, City (e.g. Zafarwal, Narowal)"
                      className="mt-1.5 w-full border border-[#141210]/20 bg-white px-3.5 py-2.5 text-sm text-[#141210] placeholder:text-[#8A8072] focus:border-[#C6A253] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="order-contact-number"
                      className="block text-xs font-semibold tracking-[0.1em] text-[#141210]"
                    >
                      Contact Number
                    </label>
                    <input
                      id="order-contact-number"
                      type="tel"
                      required
                      minLength={7}
                      maxLength={25}
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="mt-1.5 w-full border border-[#141210]/20 bg-white px-3.5 py-2.5 text-sm tabular-nums text-[#141210] placeholder:text-[#8A8072] focus:border-[#C6A253] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 inline-flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#0D0C0A] bg-[#0D0C0A] px-6 py-3.5 text-xs font-semibold tracking-[0.22em] text-[#E2C886] transition-all duration-200 hover:border-[#C6A253] hover:bg-[#C6A253] hover:text-[#0D0C0A] disabled:cursor-not-allowed disabled:opacity-65 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>SAVING ORDER...</span>
                      </>
                    ) : (
                      <span>SUBMIT ORDER</span>
                    )}
                  </button>
                </form>
              </div>
            )}

            {step === 'success' && receipt && (
              <div className="flex h-full flex-col justify-center py-4">
                <div className="inline-flex h-12 w-12 items-center justify-center border border-[#1E6B47]/30 bg-[#1E6B47]/10 text-[#1E6B47]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <h2
                  id="modal-product-title"
                  className="mt-4 font-serif text-3xl font-medium text-[#141210]"
                >
                  Order Confirmed
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#464038]">
                  Thank you, <strong className="text-[#141210]">{customerName}</strong>. Your order
                  has been saved in our system and received by Fiza at Noor Abaya – Zafarwal.
                </p>

                <div className="mt-5 space-y-2 border border-[#C6A253]/35 bg-[#F2EBE0] p-4 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#5C5449]">Order Reference</span>
                    <span className="font-mono font-medium text-[#141210]">
                      {receipt.orderId.slice(0, 8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#5C5449]">Abaya</span>
                    <span className="font-medium text-[#141210]">{receipt.productName}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#5C5449]">Color &amp; Size</span>
                    <span className="font-medium text-[#141210]">
                      {receipt.color} · Size {receipt.size}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#5C5449]">Quantity</span>
                    <span className="font-medium tabular-nums text-[#141210]">
                      {receipt.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-[#141210]/10 pt-2">
                    <span className="font-semibold text-[#141210]">Total Amount</span>
                    <span className="font-semibold tabular-nums text-[#9C7A32]">
                      {formatPKR(receipt.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={buildWhatsAppHref(true, receipt.orderId.slice(0, 8).toUpperCase())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#1E6B47] px-5 py-3 text-xs font-semibold tracking-[0.16em] text-white transition-colors hover:bg-[#165236]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>SHARE ORDER ON WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[44px] w-full border border-[#141210]/20 bg-white px-5 py-3 text-xs font-semibold tracking-[0.18em] text-[#141210] transition-colors hover:border-[#141210] cursor-pointer"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
