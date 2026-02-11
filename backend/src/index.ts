/**
 * Application Entry Point.
 * Konfiguriert und startet den Express-Server.
 */
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routes/items.js';
import shopifyRouter from './routes/shopify.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/index.js';

const app = express();

// ============================================================================
// Middleware
// ============================================================================

app.use(cors());
app.use(express.json());

// Erlaubt Shopify Admin, die App in einem iframe zu laden (für eingebettete App)
app.use((_req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors https://admin.shopify.com https://*.admin.shopify.com"
  );
  next();
});

// ============================================================================
// Routes
// ============================================================================

app.use('/items', itemsRouter);
app.use('/shopify', shopifyRouter);

// Root – nach Shopify-OAuth Redirect hierher
app.get('/', (req, res) => {
  if (req.query.installed === '1') {
    res.json({
      message: 'Shopify App installiert.',
      shop: req.query.shop ?? '',
      next: `GET /shopify/products?shop=${encodeURIComponent(String(req.query.shop || ''))}`,
    });
    return;
  }
  res.json({
    message: 'Backend läuft',
    health: '/health',
    shopify: '/shopify/auth?shop=DEIN-SHOP.myshopify.com',
  });
});

// Health Check Endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// Global Error Handler (nach allen Routes)
// ============================================================================

app.use(errorHandler);

// ============================================================================
// Server Lifecycle
// ============================================================================

async function startServer(): Promise<void> {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(config.database.uri);
    console.log('Connected to MongoDB successfully');

    app.listen(config.server.port, () => {
      console.log(`Server is running on port ${config.server.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function shutdown(): Promise<void> {
  console.log('Shutting down gracefully...');
  await mongoose.connection.close();
  process.exit(0);
}

// Graceful Shutdown Handler
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
