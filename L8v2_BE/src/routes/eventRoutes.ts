import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { Event } from '../models/Event';

const router = Router();
const eventRepository = AppDataSource.getRepository(Event);

interface EventParams {
  id: string;
}

// Get all events
const getAllEvents: RequestHandler = async (_req, res) => {
  try {
    const events = await eventRepository.find({
      relations: ['venue', 'artists']
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};

// Get event by ID
const getEventById: RequestHandler<EventParams> = async (req, res) => {
  try {
    const event = await eventRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['venue', 'artists']
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event' });
  }
};

// Create event
const createEvent: RequestHandler = async (req, res) => {
  try {
    const event = eventRepository.create(req.body);
    const result = await eventRepository.save(event);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
};

// Update event
const updateEvent: RequestHandler<EventParams> = async (req, res) => {
  try {
    const event = await eventRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['venue', 'artists']
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    eventRepository.merge(event, req.body);
    const result = await eventRepository.save(event);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
};

// Delete event
const deleteEvent: RequestHandler<EventParams> = async (req, res) => {
  try {
    const event = await eventRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['venue', 'artists']
    });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }
    await eventRepository.remove(event);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
};

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router; 