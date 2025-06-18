import { Router, Request, Response, NextFunction } from 'express';
const router = Router();

// Get all artists
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ message: 'Get all artists' });
  } catch (error) {
    next(error);
  }
});

// Get artist by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ message: `Get artist ${id}` });
  } catch (error) {
    next(error);
  }
});

// Create new artist
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const artistData = req.body;
    res.status(201).json({ message: 'Artist created', data: artistData });
  } catch (error) {
    next(error);
  }
});

// Update artist
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const artistData = req.body;
    res.json({ message: `Update artist ${id}`, data: artistData });
  } catch (error) {
    next(error);
  }
});

// Delete artist
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    res.json({ message: `Delete artist ${id}` });
  } catch (error) {
    next(error);
  }
});

export default router; 