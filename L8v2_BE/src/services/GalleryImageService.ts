import { GalleryImage, GalleryCategory } from '../models/GalleryImage';
import { GalleryImageRepository } from '../repositories/GalleryImageRepository';

export class GalleryImageService {
  private galleryImageRepository: GalleryImageRepository;

  constructor() {
    this.galleryImageRepository = new GalleryImageRepository();
  }

  async getAllImages(): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findAll();
  }

  async getImageById(id: number): Promise<GalleryImage | null> {
    return this.galleryImageRepository.findById(id);
  }

  async createImage(imageData: Partial<GalleryImage>): Promise<GalleryImage> {
    return this.galleryImageRepository.create(imageData);
  }

  async updateImage(id: number, imageData: Partial<GalleryImage>): Promise<GalleryImage | null> {
    return this.galleryImageRepository.update(id, imageData);
  }

  async deleteImage(id: number): Promise<void> {
    return this.galleryImageRepository.delete(id);
  }

  async findImagesByEvent(eventId: number): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findByEvent(eventId);
  }

  async findImagesByPhotographer(photographer: string): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findByPhotographer(photographer);
  }

  async findImagesByCaption(caption: string): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findByCaption(caption);
  }

  async findImagesByCategory(category: GalleryCategory): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findByCategory(category);
  }

  async findImagesByTags(tags: string[]): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findByTags(tags);
  }

  async findPublishedImages(): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findPublishedImages();
  }

  async findImagesByDateRange(startDate: Date, endDate: Date): Promise<GalleryImage[]> {
    return this.galleryImageRepository.findImagesByDateRange(startDate, endDate);
  }

  async publishImage(id: number): Promise<GalleryImage | null> {
    return this.galleryImageRepository.update(id, { isPublished: true });
  }

  async unpublishImage(id: number): Promise<GalleryImage | null> {
    return this.galleryImageRepository.update(id, { isPublished: false });
  }

  async updateImageOrder(id: number, orderIndex: number): Promise<GalleryImage | null> {
    return this.galleryImageRepository.update(id, { orderIndex });
  }

  async updateImageTags(id: number, tags: string[]): Promise<GalleryImage | null> {
    const image = await this.galleryImageRepository.findById(id);
    if (!image) return null;

    return this.galleryImageRepository.update(id, { tags });
  }

  async updateImageUrls(id: number, urls: { thumbnailUrl?: string; mediumUrl?: string; largeUrl?: string }): Promise<GalleryImage | null> {
    return this.galleryImageRepository.update(id, urls);
  }
} 