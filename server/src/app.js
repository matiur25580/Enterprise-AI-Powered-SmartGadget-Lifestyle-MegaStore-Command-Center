const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('./docs/openapi');

const app = express();
const allowedOrigins = new Set([
  'https://enterprise-ai-powered-smart-gadget-neon.vercel.app',
  ...(process.env.CLIENT_URL || 'http://localhost:5173').split(',').map(origin => origin.trim()).filter(Boolean),
]);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    callback(new Error('Origin not allowed'));
  },
}));
app.use(express.json({ limit: '1mb' }));

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  skip: () => process.env.NODE_ENV === 'test',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please try again later.' },
}));
app.use('/api/auth', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skip: () => process.env.NODE_ENV === 'test',
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many authentication attempts. Please try again later.' },
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec, { explorer: true }));
app.use('/api/upload', require('./routes/upload'));
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => res.json({ message: 'MegaStore Enterprise API Running', version: '2.0' }));
app.get('/health', (req, res) => res.json({ success: true, message: 'Health check successful', uptime: process.uptime() }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime(), db: require('mongoose').connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/products', require('./routes/product'));
app.use('/api/order', require('./routes/order'));
app.use('/api/orders', require('./routes/order'));
app.use('/api/extra', require('./routes/extra'));
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use(require('./middleware/errorHandler'));

module.exports = app;
