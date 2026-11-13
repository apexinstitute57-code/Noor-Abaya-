export type AbayaColor =
  | 'Black'
  | 'Blue'
  | 'Maroon'
  | 'Green'
  | 'Brown'
  | 'Purple'
  | 'Grey';

export type AbayaStyle =
  | 'Dubai Abaya'
  | 'Butterfly Abaya'
  | 'Open Abaya'
  | 'Closed Abaya'
  | 'Embroidered Abaya'
  | 'Party Wear Abaya'
  | 'Daily Wear Abaya'
  | 'Luxury Abaya'
  | 'Fancy Abaya';

export type AbayaSize = '50' | '52' | '54' | '56' | '58';

export interface AbayaProduct {
  id: string;
  name: string;
  color: AbayaColor;
  style: AbayaStyle;
  secondaryStyle: AbayaStyle;
  price: number;
  sizes: AbayaSize[];
  fabric: string;
  description: string;
  image: string;
}

export interface ColorCollectionMeta {
  color: AbayaColor;
  slug: string;
  heading: string;
  indexLabel: string;
  tagline: string;
  swatchHex: string;
  accentBgClass: string;
  featuredProductId: string;
}

export const BRAND_INFO = {
  brandName: 'Noor Abaya',
  owner: 'Fiza',
  location: 'Zafarwal, Pakistan',
  phone: '03086421306',
  whatsappUrl: 'https://wa.me/923086421306',
  heroImage: '/src/assets/images/hero_noor_abaya_1794548565583.jpg',
} as const;

export const ABAYA_STYLES: AbayaStyle[] = [
  'Dubai Abaya',
  'Butterfly Abaya',
  'Open Abaya',
  'Closed Abaya',
  'Embroidered Abaya',
  'Party Wear Abaya',
  'Daily Wear Abaya',
  'Luxury Abaya',
  'Fancy Abaya',
];

export const COLOR_COLLECTIONS: ColorCollectionMeta[] = [
  {
    color: 'Black',
    slug: 'black',
    heading: 'BLACK ABAYA COLLECTION',
    indexLabel: '01',
    tagline:
      'Timeless midnight silhouettes crafted in breathable Korean Nidha and flowing silk crepe with antique gold accents.',
    swatchHex: '#121110',
    accentBgClass: 'bg-[#121110]',
    featuredProductId: 'black-sovereign-dubai',
  },
  {
    color: 'Blue',
    slug: 'blue',
    heading: 'BLUE ABAYA COLLECTION',
    indexLabel: '02',
    tagline:
      'Deep sapphire luxury drapes and serene slate-blue pleated cuts tailored for poised daytime and evening grace.',
    swatchHex: '#1E3A5F',
    accentBgClass: 'bg-[#1E3A5F]',
    featuredProductId: 'blue-sapphire-luxury',
  },
  {
    color: 'Maroon',
    slug: 'maroon',
    heading: 'MAROON ABAYA COLLECTION',
    indexLabel: '03',
    tagline:
      'Regal crimson and oxblood velvet-trimmed couture abayas enriched with heritage zardozi and floral threadwork.',
    swatchHex: '#5C1624',
    accentBgClass: 'bg-[#5C1624]',
    featuredProductId: 'maroon-shahi-party',
  },
  {
    color: 'Green',
    slug: 'green',
    heading: 'GREEN ABAYA COLLECTION',
    indexLabel: '04',
    tagline:
      'Emerald cape overlays with champagne piping alongside effortless olive linen-crepe open robes.',
    swatchHex: '#1B4332',
    accentBgClass: 'bg-[#1B4332]',
    featuredProductId: 'green-zamarrud-fancy',
  },
  {
    color: 'Brown',
    slug: 'brown',
    heading: 'BROWN ABAYA COLLECTION',
    indexLabel: '05',
    tagline:
      'Warm espresso satin kimono drapes and soft mocha daily-wear pieces inspired by sunlit desert stone.',
    swatchHex: '#4E3424',
    accentBgClass: 'bg-[#4E3424]',
    featuredProductId: 'brown-espresso-luxury',
  },
  {
    color: 'Purple',
    slug: 'purple',
    heading: 'PURPLE ABAYA COLLECTION',
    indexLabel: '06',
    tagline:
      'Sovereign plum georgette layers with pearl-beaded cuffs and pleated aubergine butterfly wings.',
    swatchHex: '#48234E',
    accentBgClass: 'bg-[#48234E]',
    featuredProductId: 'purple-royal-plum-fancy',
  },
  {
    color: 'Grey',
    slug: 'grey',
    heading: 'GREY ABAYA COLLECTION',
    indexLabel: '07',
    tagline:
      'Architectural charcoal geometric embroidery and dove-grey accordion pleats for understated sophistication.',
    swatchHex: '#5A5E63',
    accentBgClass: 'bg-[#5A5E63]',
    featuredProductId: 'grey-charcoal-embroidered',
  },
];

export const ABAYA_PRODUCTS: AbayaProduct[] = [
  {
    id: 'black-sovereign-dubai',
    name: 'Noor Sovereign Dubai Open Abaya',
    color: 'Black',
    style: 'Dubai Abaya',
    secondaryStyle: 'Open Abaya',
    price: 18500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Premium Korean Nidha Crepe',
    description:
      'Flowing full-length Dubai open abaya finished with delicate antique gold zari embroidery along the front lapel and flared cuffs. Includes matching black sheila scarf.',
    image: '/src/assets/images/black_dubai_abaya_1794548565366.jpg',
  },
  {
    id: 'black-midnight-butterfly',
    name: 'Midnight Noir Silk Butterfly Abaya',
    color: 'Black',
    style: 'Butterfly Abaya',
    secondaryStyle: 'Luxury Abaya',
    price: 21000,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Fluid Silk-Touch Georgette',
    description:
      'Generous batwing butterfly silhouette adorned with tonal jet-black hand beadwork across the shoulder drape and wide kimono sleeves for effortless movement.',
    image: '/src/assets/images/black_butterfly_abaya_1794548565031.jpg',
  },
  {
    id: 'blue-sapphire-luxury',
    name: 'Sapphire Crown Satin Luxury Abaya',
    color: 'Blue',
    style: 'Luxury Abaya',
    secondaryStyle: 'Party Wear Abaya',
    price: 23500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Satin-Lined Royal Chiffon',
    description:
      'Deep royal navy luxury abaya featuring structured champagne-gold brocade cuffs and front placket detailing. Designed for formal gatherings and evening occasions.',
    image: '/src/assets/images/blue_luxury_abaya_1794548565961.jpg',
  },
  {
    id: 'blue-cerulean-daily',
    name: 'Cerulean Mist Pleated Daily Abaya',
    color: 'Blue',
    style: 'Daily Wear Abaya',
    secondaryStyle: 'Closed Abaya',
    price: 14500,
    sizes: ['50', '52', '54', '56', '58'],
    fabric: 'Breathable Matte Medinah Crepe',
    description:
      'Clean closed-front daily wear abaya in serene slate blue with crisp vertical knife pleats and tailored accordion cuffs for comfortable all-day elegance.',
    image: '/src/assets/images/blue_daily_abaya_1794548564946.jpg',
  },
  {
    id: 'maroon-shahi-party',
    name: 'Shahi Zardozi Velvet Party Abaya',
    color: 'Maroon',
    style: 'Party Wear Abaya',
    secondaryStyle: 'Fancy Abaya',
    price: 27500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Rich Silk-Velvet & Organza Lining',
    description:
      'Showstopping deep maroon party wear abaya showcasing ornate antique gold zardozi embroidery over the bodice and bell sleeves with a sweeping flared skirt.',
    image: '/src/assets/images/maroon_party_abaya_1794548566842.jpg',
  },
  {
    id: 'maroon-crimson-embroidered',
    name: 'Crimson Gul Floral Embroidered Abaya',
    color: 'Maroon',
    style: 'Embroidered Abaya',
    secondaryStyle: 'Dubai Abaya',
    price: 22000,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Pure Silk-Crepe Blend',
    description:
      'Oxblood maroon Dubai-cut abaya embellished with artisanal botanical gold-and-blush threadwork along the center opening, sleeves, and sweeping hem.',
    image: '/src/assets/images/maroon_embroidered_abaya_1794548566708.jpg',
  },
  {
    id: 'green-zamarrud-fancy',
    name: 'Zamarrud Layered Cape Fancy Abaya',
    color: 'Green',
    style: 'Fancy Abaya',
    secondaryStyle: 'Luxury Abaya',
    price: 24500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Double-Layer Georgette Chiffon',
    description:
      'Forest emerald fancy abaya designed with a dramatic floating cape overlay, mandarin collar, and delicate champagne-gold piping along every seam.',
    image: '/src/assets/images/green_fancy_abaya_1794548566327.jpg',
  },
  {
    id: 'green-olive-open',
    name: 'Olive Meadow Belted Open Abaya',
    color: 'Green',
    style: 'Open Abaya',
    secondaryStyle: 'Daily Wear Abaya',
    price: 15800,
    sizes: ['50', '52', '54', '56', '58'],
    fabric: 'Textured Linen-Crepe',
    description:
      'Breathable deep olive-green open abaya paired with a coordinated inner slip dress and removable waist tie for versatile modest styling.',
    image: '/src/assets/images/green_open_abaya_1794548567443.jpg',
  },
  {
    id: 'brown-espresso-luxury',
    name: 'Espresso Silk Kimono Luxury Abaya',
    color: 'Brown',
    style: 'Luxury Abaya',
    secondaryStyle: 'Open Abaya',
    price: 22800,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Lustrous Silk-Satin',
    description:
      'Rich chocolate espresso silk-satin abaya featuring softly draped kimono sleeves, tonal bronze bead embroidery at the neckline, and a matching waist belt.',
    image: '/src/assets/images/brown_luxury_abaya_1794548567476.jpg',
  },
  {
    id: 'brown-mocha-closed',
    name: 'Mocha Grace Closed Daily Abaya',
    color: 'Brown',
    style: 'Closed Abaya',
    secondaryStyle: 'Daily Wear Abaya',
    price: 13900,
    sizes: ['50', '52', '54', '56', '58'],
    fabric: 'Soft Matte Nidha',
    description:
      'Tailored warm mocha-brown closed abaya with subtle A-line side pleats and refined button cuffs crafted for graceful everyday wear.',
    image: '/src/assets/images/brown_daily_abaya_1794548566588.jpg',
  },
  {
    id: 'purple-royal-plum-fancy',
    name: 'Royal Plum Pearl Cuff Fancy Abaya',
    color: 'Purple',
    style: 'Fancy Abaya',
    secondaryStyle: 'Party Wear Abaya',
    price: 25000,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Draped Silk Georgette',
    description:
      'Regal plum-purple fancy abaya with cascading front chiffon folds and hand-stitched champagne pearl cuffs that elevate festive and wedding ensembles.',
    image: '/src/assets/images/purple_fancy_abaya_1794548568302.jpg',
  },
  {
    id: 'purple-aubergine-butterfly',
    name: 'Aubergine Pleated Butterfly Abaya',
    color: 'Purple',
    style: 'Butterfly Abaya',
    secondaryStyle: 'Embroidered Abaya',
    price: 19500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Micro-Pleated Shimmer Chiffon',
    description:
      'Aubergine purple butterfly abaya with luminous pleated cape sleeves and fluid A-line under-dress for weightless, sculptural drape.',
    image: '/src/assets/images/purple_butterfly_abaya_1794548568208.jpg',
  },
  {
    id: 'grey-charcoal-embroidered',
    name: 'Charcoal Noor Geometric Embroidered Abaya',
    color: 'Grey',
    style: 'Embroidered Abaya',
    secondaryStyle: 'Luxury Abaya',
    price: 21500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Heavyweight Korean Crepe',
    description:
      'Sophisticated charcoal-grey embroidered abaya accented with silver-champagne architectural threadwork along the collar, wide cuffs, and hemline.',
    image: '/src/assets/images/grey_embroidered_abaya_1794548568280.jpg',
  },
  {
    id: 'grey-dove-dubai',
    name: 'Dove Mist Pleated Dubai Abaya',
    color: 'Grey',
    style: 'Dubai Abaya',
    secondaryStyle: 'Open Abaya',
    price: 17500,
    sizes: ['52', '54', '56', '58'],
    fabric: 'Accordion Pleated Chiffon & Crepe',
    description:
      'Dove-grey Dubai open abaya featuring full-length vertical pleating, delicate silver-pearl trim along the lapel, and a matching flowing sheila.',
    image: '/src/assets/images/grey_dubai_abaya_1794548569205.jpg',
  },
];

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}
