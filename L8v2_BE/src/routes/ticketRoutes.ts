import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { Ticket } from '../models/Ticket';

const router = Router();
const ticketRepository = AppDataSource.getRepository(Ticket);

interface TicketParams {
  id: string;
}

// Get all tickets
const getAllTickets: RequestHandler = async (_req, res) => {
  try {
    const tickets = await ticketRepository.find({
      relations: ['event', 'user']
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

// Get ticket by ID
const getTicketById: RequestHandler<TicketParams> = async (req, res) => {
  try {
    const ticket = await ticketRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'user']
    });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ticket' });
  }
};

// Create ticket
const createTicket: RequestHandler = async (req, res) => {
  try {
    const ticket = ticketRepository.create(req.body);
    const result = await ticketRepository.save(ticket);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket' });
  }
};

// Update ticket
const updateTicket: RequestHandler<TicketParams> = async (req, res) => {
  try {
    const ticket = await ticketRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'user']
    });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    ticketRepository.merge(ticket, req.body);
    const result = await ticketRepository.save(ticket);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket' });
  }
};

// Delete ticket
const deleteTicket: RequestHandler<TicketParams> = async (req, res) => {
  try {
    const ticket = await ticketRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event', 'user']
    });
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found' });
      return;
    }
    await ticketRepository.remove(ticket);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ticket' });
  }
};

router.get('/', getAllTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router; 