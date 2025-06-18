import { EventArtist } from '../models/EventArtist';
import { EventArtistRepository } from '../repositories/EventArtistRepository';

export class EventArtistService {
  private eventArtistRepository: EventArtistRepository;

  constructor() {
    this.eventArtistRepository = new EventArtistRepository();
  }

  async getAllEventArtists(): Promise<EventArtist[]> {
    return this.eventArtistRepository.findAll();
  }

  async getEventArtistById(id: number): Promise<EventArtist | null> {
    return this.eventArtistRepository.findById(id);
  }

  async createEventArtist(eventArtistData: Partial<EventArtist>): Promise<EventArtist> {
    return this.eventArtistRepository.create(eventArtistData);
  }

  async updateEventArtist(id: number, eventArtistData: Partial<EventArtist>): Promise<EventArtist | null> {
    return this.eventArtistRepository.update(id, eventArtistData);
  }

  async deleteEventArtist(id: number): Promise<void> {
    return this.eventArtistRepository.delete(id);
  }

  async findEventArtistsByEvent(eventId: number): Promise<EventArtist[]> {
    return this.eventArtistRepository.findByEvent(eventId);
  }

  async findEventArtistsByArtist(artistId: number): Promise<EventArtist[]> {
    return this.eventArtistRepository.findByArtist(artistId);
  }

  async findEventArtistByEventAndArtist(eventId: number, artistId: number): Promise<EventArtist | null> {
    return this.eventArtistRepository.findByEventAndArtist(eventId, artistId);
  }

  async findArtistsByPerformanceOrder(eventId: number): Promise<EventArtist[]> {
    return this.eventArtistRepository.findArtistsByPerformanceOrder(eventId);
  }

  async findArtistsByPerformanceTime(eventId: number): Promise<EventArtist[]> {
    return this.eventArtistRepository.findArtistsByPerformanceTime(eventId);
  }

  async updatePerformanceOrder(eventId: number, artistId: number, order: number): Promise<EventArtist | null> {
    const eventArtist = await this.eventArtistRepository.findByEventAndArtist(eventId, artistId);
    if (!eventArtist) return null;

    return this.eventArtistRepository.update(eventArtist.id, { performanceOrder: order });
  }

  async updatePerformanceTime(eventId: number, artistId: number, time: string): Promise<EventArtist | null> {
    const eventArtist = await this.eventArtistRepository.findByEventAndArtist(eventId, artistId);
    if (!eventArtist) return null;

    return this.eventArtistRepository.update(eventArtist.id, { performanceTime: time });
  }

  async updateSetDuration(eventId: number, artistId: number, duration: number): Promise<EventArtist | null> {
    const eventArtist = await this.eventArtistRepository.findByEventAndArtist(eventId, artistId);
    if (!eventArtist) return null;

    return this.eventArtistRepository.update(eventArtist.id, { setDuration: duration });
  }

  async updateArtistFee(eventId: number, artistId: number, fee: number): Promise<EventArtist | null> {
    const eventArtist = await this.eventArtistRepository.findByEventAndArtist(eventId, artistId);
    if (!eventArtist) return null;

    return this.eventArtistRepository.update(eventArtist.id, { fee });
  }
} 