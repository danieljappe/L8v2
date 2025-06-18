import { Router, RequestHandler } from 'express';
import { AppDataSource } from '../config/database';
import { GalleryImage } from '../models/GalleryImage';

const router = Router();
const galleryImageRepository = AppDataSource.getRepository(GalleryImage);

interface GalleryImageParams {
  id: string;
}

// Get all gallery images
const getAllGalleryImages: RequestHandler = async (_req, res) => {
  try {
    const galleryImages = await galleryImageRepository.find({
      relations: ['event']
    });
    res.json(galleryImages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery images' });
  }
};

// Get gallery image by ID
const getGalleryImageById: RequestHandler<GalleryImageParams> = async (req, res) => {
  try {
    const galleryImage = await galleryImageRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event']
    });
    if (!galleryImage) {
      res.status(404).json({ message: 'Gallery image not found' });
      return;
    }
    res.json(galleryImage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery image' });
  }
};

// Create gallery image
const createGalleryImage: RequestHandler = async (req, res) => {
  try {
    const galleryImage = galleryImageRepository.create(req.body);
    const result = await galleryImageRepository.save(galleryImage);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating gallery image' });
  }
};

// Update gallery image
const updateGalleryImage: RequestHandler<GalleryImageParams> = async (req, res) => {
  try {
    const galleryImage = await galleryImageRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event']
    });
    if (!galleryImage) {
      res.status(404).json({ message: 'Gallery image not found' });
      return;
    }
    galleryImageRepository.merge(galleryImage, req.body);
    const result = await galleryImageRepository.save(galleryImage);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery image' });
  }
};

// Delete gallery image
const deleteGalleryImage: RequestHandler<GalleryImageParams> = async (req, res) => {
  try {
    const galleryImage = await galleryImageRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['event']
    });
    if (!galleryImage) {
      res.status(404).json({ message: 'Gallery image not found' });
      return;
    }
    await galleryImageRepository.remove(galleryImage);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery image' });
  }
};

router.get('/', getAllGalleryImages);
router.get('/:id', getGalleryImageById);
router.post('/', createGalleryImage);
router.put('/:id', updateGalleryImage);
router.delete('/:id', deleteGalleryImage);

export default router; 