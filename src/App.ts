import express, { Application, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

// Import routes
import userRoutes from './routes/userRoutes';
import artistRoutes from './routes/artistRoutes';
import eventRoutes from './routes/eventRoutes';
import venueRoutes from './routes/venueRoutes';
import eventArtistRoutes from './routes/eventArtistRoutes';
import ticketRoutes from './routes/ticketRoutes';
import galleryImageRoutes from './routes/galleryImageRoutes';
import contactMessageRoutes from './routes/contactMessageRoutes';

const app: Application = express();

// Connect to PostgreSQL
connectDB();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/event-artists', eventArtistRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/gallery', galleryImageRoutes);
app.use('/api/contact', contactMessageRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 