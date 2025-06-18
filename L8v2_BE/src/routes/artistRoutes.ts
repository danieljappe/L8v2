import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { Artist } from '../models/Artist';

const router = Router();
const artistRepository = AppDataSource.getRepository(Artist);

interface ArtistParams {
  id: string;
}

// Get all artists
const getAllArtists: RequestHandler = async (_req, res) => {
  try {
    const artists = await artistRepository.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artists' });
  }
};

// Get artist by ID
const getArtistById: RequestHandler<ArtistParams> = async (req, res) => {
  try {
    const artist = await artistRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching artist' });
  }
};

// Create artist
const createArtist: RequestHandler = async (req, res) => {
  try {
    const artist = artistRepository.create(req.body);
    const result = await artistRepository.save(artist);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating artist' });
  }
};

// Update artist
const updateArtist: RequestHandler<ArtistParams> = async (req, res) => {
  try {
    const artist = await artistRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    artistRepository.merge(artist, req.body);
    const result = await artistRepository.save(artist);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating artist' });
  }
};

// Delete artist
const deleteArtist: RequestHandler<ArtistParams> = async (req, res) => {
  try {
    const artist = await artistRepository.findOne({ where: { id: parseInt(req.params.id) } });
    if (!artist) {
      res.status(404).json({ message: 'Artist not found' });
      return;
    }
    await artistRepository.remove(artist);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting artist' });
  }
};

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

export default router; 