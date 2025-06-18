import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { ContactMessage } from '../models/ContactMessage';

const router = Router();
const contactMessageRepository = AppDataSource.getRepository(ContactMessage);

interface ContactMessageParams {
  id: string;
}

// Get all contact messages
const getAllContactMessages: RequestHandler = async (_req, res) => {
  try {
    const contactMessages = await contactMessageRepository.find();
    res.json(contactMessages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact messages' });
  }
};

// Get contact message by ID
const getContactMessageById: RequestHandler<ContactMessageParams> = async (req, res) => {
  try {
    const contactMessage = await contactMessageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    if (!contactMessage) {
      res.status(404).json({ message: 'Contact message not found' });
      return;
    }
    res.json(contactMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact message' });
  }
};

// Create contact message
const createContactMessage: RequestHandler = async (req, res) => {
  try {
    const contactMessage = contactMessageRepository.create(req.body);
    const result = await contactMessageRepository.save(contactMessage);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact message' });
  }
};

// Update contact message
const updateContactMessage: RequestHandler<ContactMessageParams> = async (req, res) => {
  try {
    const contactMessage = await contactMessageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    if (!contactMessage) {
      res.status(404).json({ message: 'Contact message not found' });
      return;
    }
    contactMessageRepository.merge(contactMessage, req.body);
    const result = await contactMessageRepository.save(contactMessage);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact message' });
  }
};

// Delete contact message
const deleteContactMessage: RequestHandler<ContactMessageParams> = async (req, res) => {
  try {
    const contactMessage = await contactMessageRepository.findOne({
      where: { id: parseInt(req.params.id) }
    });
    if (!contactMessage) {
      res.status(404).json({ message: 'Contact message not found' });
      return;
    }
    await contactMessageRepository.remove(contactMessage);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact message' });
  }
};

router.get('/', getAllContactMessages);
router.get('/:id', getContactMessageById);
router.post('/', createContactMessage);
router.put('/:id', updateContactMessage);
router.delete('/:id', deleteContactMessage);

export default router; 