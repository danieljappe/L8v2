import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { AppDataSource } from './config/database';
import userRoutes from './routes/userRoutes';
import artistRoutes from './routes/artistRoutes';
import eventRoutes from './routes/eventRoutes';
import venueRoutes from './routes/venueRoutes';
import eventArtistRoutes from './routes/eventArtistRoutes';
import ticketRoutes from './routes/ticketRoutes';
import galleryImageRoutes from './routes/galleryImageRoutes';
import contactMessageRoutes from './routes/contactMessageRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);
app.use('/api/event-artists', eventArtistRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/gallery', galleryImageRoutes);
app.use('/api/contact', contactMessageRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 