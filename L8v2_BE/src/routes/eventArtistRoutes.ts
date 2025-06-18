import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { EventArtist } from '../models/EventArtist';

const router = Router();
const eventArtistRepository = AppDataSource.getRepository(EventArtist);

interface EventArtistParams {
  id: string;
}

// Get all event artists
const getAllEventArtists: RequestHandler = async (_req, res) => {
  try {
    const eventArtists = await eventArtistRepository.find({
      relations: ['event', 'artist']
    });
    res.json(eventArtists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event artists' });
  }
};

// Get event artist by ID
const getEventArtistById: RequestHandler<EventArtistParams> = async (req, res) => {
  try {
    const eventArtist = await eventArtistRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'artist']
    });
    if (!eventArtist) {
      res.status(404).json({ message: 'Event artist not found' });
      return;
    }
    res.json(eventArtist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event artist' });
  }
};

// Create event artist
const createEventArtist: RequestHandler = async (req, res) => {
  try {
    const eventArtist = eventArtistRepository.create(req.body);
    const result = await eventArtistRepository.save(eventArtist);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event artist' });
  }
};

// Update event artist
const updateEventArtist: RequestHandler<EventArtistParams> = async (req, res) => {
  try {
    const eventArtist = await eventArtistRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'artist']
    });
    if (!eventArtist) {
      res.status(404).json({ message: 'Event artist not found' });
      return;
    }
    eventArtistRepository.merge(eventArtist, req.body);
    const result = await eventArtistRepository.save(eventArtist);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event artist' });
  }
};

// Delete event artist
const deleteEventArtist: RequestHandler<EventArtistParams> = async (req, res) => {
  try {
    const eventArtist = await eventArtistRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'artist']
    });
    if (!eventArtist) {
      res.status(404).json({ message: 'Event artist not found' });
      return;
    }
    await eventArtistRepository.remove(eventArtist);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event artist' });
  }
};

router.get('/', getAllEventArtists);
router.get('/:id', getEventArtistById);
router.post('/', createEventArtist);
router.put('/:id', updateEventArtist);
router.delete('/:id', deleteEventArtist);

export default router; 