import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

// Get all gallery images
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Get all gallery images' });
  } catch (error) {
    next(error);
  }
});

// Get gallery image by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ message: `Get gallery image ${id}` });
  } catch (error) {
    next(error);
  }
});

// Upload new gallery image
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageData = req.body;
    res.status(201).json({ message: 'Gallery image uploaded', data: imageData });
  } catch (error) {
    next(error);
  }
});

// Update gallery image
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const imageData = req.body;
    res.json({ message: `Update gallery image ${id}`, data: imageData });
  } catch (error) {
    next(error);
  }
});

// Delete gallery image
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ message: `Delete gallery image ${id}` });
  } catch (error) {
    next(error);
  }
});

// Get gallery images for an event
router.get('/event/:eventId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { eventId } = req.params;
    res.json({ message: `Get gallery images for event ${eventId}` });
  } catch (error) {
    next(error);
  }
});

export default router; 