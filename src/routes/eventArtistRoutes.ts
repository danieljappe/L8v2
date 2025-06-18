import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

// Get all event-artist relationships
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Get all event-artist relationships' });
  } catch (error) {
    next(error);
  }
});

// Get artists for a specific event
router.get('/event/:eventId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params;
    res.json({ message: `Get artists for event ${eventId}` });
  } catch (error) {
    next(error);
  }
});

// Get events for a specific artist
router.get('/artist/:artistId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { artistId } = req.params;
    res.json({ message: `Get events for artist ${artistId}` });
  } catch (error) {
    next(error);
  }
});

// Add artist to event
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, artistId } = req.body;
    res.status(201).json({ message: 'Artist added to event', data: { eventId, artistId } });
  } catch (error) {
    next(error);
  }
});

// Remove artist from event
router.delete('/:eventId/:artistId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId, artistId } = req.params;
    res.json({ message: `Remove artist ${artistId} from event ${eventId}` });
  } catch (error) {
    next(error);
  }
});

export default router; 