import { EventArtist } from '../models/EventArtist';
import { BaseRepository } from './BaseRepository';
import { FindOptionsWhere } from 'typeorm';

export class EventArtistRepository extends BaseRepository<EventArtist> {
  constructor() {
    super(EventArtist);
  }

  async findByEvent(eventId: number): Promise<EventArtist[]> {
    return this.repository.findBy({
      event: { id: eventId }
    } as FindOptionsWhere<EventArtist>);
  }

  async findByArtist(artistId: number): Promise<EventArtist[]> {
    return this.repository.findBy({
      artist: { id: artistId }
    } as FindOptionsWhere<EventArtist>);
  }

  async findByEventAndArtist(eventId: number, artistId: number): Promise<EventArtist | null> {
    return this.repository.findOneBy({
      event: { id: eventId },
      artist: { id: artistId }
    } as FindOptionsWhere<EventArtist>);
  }

  async findArtistsByPerformanceOrder(eventId: number): Promise<EventArtist[]> {
    return this.repository.find({
      where: {
        event: { id: eventId }
      },
      order: {
        performanceOrder: 'ASC'
      }
    });
  }

  async findArtistsByPerformanceTime(eventId: number): Promise<EventArtist[]> {
    return this.repository.find({
      where: {
        event: { id: eventId }
      },
      order: {
        performanceTime: 'ASC'
      }
    });
  }
} 