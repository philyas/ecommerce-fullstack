/**
 * Application Entry Point.
 * Konfiguriert und startet den Express-Server.
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import itemsRouter from './routes/items.js';
import { errorHandler } from './middleware/errorHandler.js';
import { config } from './config/index.js';

const app = express();

// ============================================================================
// Middleware
// ============================================================================

app.use(cors());
app.use(express.json());

// ============================================================================
// Routes
// ============================================================================

app.use('/items', itemsRouter);

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
