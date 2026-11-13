import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { ABAYA_PRODUCTS } from './src/data/catalog.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

function getSupabaseServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  const key = serviceRoleKey || anonKey;

  if (!supabaseUrl || !key) {
    return null;
  }

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

interface OrderPayload {
  customerName?: unknown;
  deliveryAddress?: unknown;
  contactNumber?: unknown;
  productId?: unknown;
  size?: unknown;
  quantity?: unknown;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    const supabaseConfigured = Boolean(
      process.env.SUPABASE_URL?.trim() &&
        (process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || process.env.SUPABASE_ANON_KEY?.trim())
    );
    res.json({ ok: true, databaseConfigured: supabaseConfigured });
  });

  app.post('/api/orders', async (req, res) => {
    const body = (req.body || {}) as OrderPayload;

    const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : '';
    const deliveryAddress =
      typeof body.deliveryAddress === 'string' ? body.deliveryAddress.trim() : '';
    const contactNumber = typeof body.contactNumber === 'string' ? body.contactNumber.trim() : '';
    const productId = typeof body.productId === 'string' ? body.productId.trim() : '';
    const size = typeof body.size === 'string' ? body.size.trim() : '';
    const quantity = typeof body.quantity === 'number' ? Math.floor(body.quantity) : Number(body.quantity);

    if (customerName.length < 2 || customerName.length > 120) {
      return res.status(400).json({ error: 'Please enter a valid full name (2 to 120 characters).' });
    }
    if (deliveryAddress.length < 5 || deliveryAddress.length > 500) {
      return res
        .status(400)
        .json({ error: 'Please enter your complete delivery address (at least 5 characters).' });
    }
    if (!/^[0-9+\-\s()]{7,25}$/.test(contactNumber)) {
      return res.status(400).json({ error: 'Please enter a valid contact phone number.' });
    }

    const product = ABAYA_PRODUCTS.find((item) => item.id === productId);
    if (!product) {
      return res.status(400).json({ error: 'Selected abaya product could not be verified.' });
    }
    if (!product.sizes.includes(size as (typeof product.sizes)[number])) {
      return res.status(400).json({ error: 'Selected size is not available for this abaya.' });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return res.status(400).json({ error: 'Quantity must be between 1 and 20.' });
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return res.status(503).json({
        error:
          'Unable to save order to database: Supabase connection credentials (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not configured on the server yet.',
      });
    }

    const totalPrice = product.price * quantity;
    const orderDate = new Date().toISOString();

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            customer_name: customerName,
            delivery_address: deliveryAddress,
            contact_number: contactNumber,
            product_name: product.name,
            color: product.color,
            size,
            quantity,
            price: totalPrice,
            order_date: orderDate,
          },
        ])
        .select('id, order_date')
        .single();

      if (error || !data) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({
          error:
            'Your order could not be saved in the database right now. Please try again or complete your order via WhatsApp.',
        });
      }

      return res.status(201).json({
        orderId: data.id,
        orderDate: data.order_date,
        productName: product.name,
        color: product.color,
        size,
        quantity,
        totalPrice,
      });
    } catch (err) {
      console.error('Unexpected order submission error:', err);
      return res.status(500).json({
        error:
          'An unexpected database error occurred while saving your order. Please try again or reach us on WhatsApp.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Noor Abaya server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
