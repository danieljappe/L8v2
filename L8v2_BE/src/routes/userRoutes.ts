import { Router, Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

interface UserParams {
  id: string;
}

// Get all users
const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get user by ID
const getUserById: RequestHandler<UserParams> = async (req, res) => {
  try {
    const user = await userRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Create user
const createUser: RequestHandler = async (req, res) => {
  try {
    const user = userRepository.create(req.body);
    const result = await userRepository.save(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Update user
const updateUser: RequestHandler<UserParams> = async (req, res) => {
  try {
    const user = await userRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    userRepository.merge(user, req.body);
    const result = await userRepository.save(user);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user
const deleteUser: RequestHandler<UserParams> = async (req, res) => {
  try {
    const user = await userRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await userRepository.remove(user);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router; 