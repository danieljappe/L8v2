import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { Venue } from '../models/Venue';

const router = Router();
const venueRepository = AppDataSource.getRepository(Venue);

interface VenueParams {
  id: string;
}

// Get all venues
const getAllVenues: RequestHandler = async (_req, res) => {
  try {
    const venues = await venueRepository.find({
      relations: ['events']
    });
    res.json(venues);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venues' });
  }
};

// Get venue by ID
const getVenueById: RequestHandler<VenueParams> = async (req, res) => {
  try {
    const venue = await venueRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['events']
    });
    if (!venue) {
      res.status(404).json({ message: 'Venue not found' });
      return;
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching venue' });
  }
};

// Create venue
const createVenue: RequestHandler = async (req, res) => {
  try {
    const venue = venueRepository.create(req.body);
    const result = await venueRepository.save(venue);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating venue' });
  }
};

// Update venue
const updateVenue: RequestHandler<VenueParams> = async (req, res) => {
  try {
    const venue = await venueRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['events']
    });
    if (!venue) {
      res.status(404).json({ message: 'Venue not found' });
      return;
    }
    venueRepository.merge(venue, req.body);
    const result = await venueRepository.save(venue);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating venue' });
  }
};

// Delete venue
const deleteVenue: RequestHandler<VenueParams> = async (req, res) => {
  try {
    const venue = await venueRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['events']
    });
    if (!venue) {
      res.status(404).json({ message: 'Venue not found' });
      return;
    }
    await venueRepository.remove(venue);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting venue' });
  }
};

router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', createVenue);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

export default router; 