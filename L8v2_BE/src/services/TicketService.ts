import { Ticket } from '../models/Ticket';
import { TicketRepository } from '../repositories/TicketRepository';

export class TicketService {
  private ticketRepository: TicketRepository;

  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketRepository.findAll();
  }

  async getTicketById(id: number): Promise<Ticket | null> {
    return this.ticketRepository.findById(id);
  }

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    return this.ticketRepository.create(ticketData);
  }

  async updateTicket(id: number, ticketData: Partial<Ticket>): Promise<Ticket | null> {
    return this.ticketRepository.update(id, ticketData);
  }

  async deleteTicket(id: number): Promise<void> {
    return this.ticketRepository.delete(id);
  }

  async findTicketsByEvent(eventId: number): Promise<Ticket[]> {
    return this.ticketRepository.findByEvent(eventId);
  }

  async findTicketsByUser(userId: number): Promise<Ticket[]> {
    return this.ticketRepository.findByUser(userId);
  }

  async findTicketByNumber(ticketNumber: string): Promise<Ticket | null> {
    return this.ticketRepository.findByTicketNumber(ticketNumber);
  }

  async findUnusedTickets(): Promise<Ticket[]> {
    return this.ticketRepository.findUnusedTickets();
  }

  async findTicketsByPriceRange(minPrice: number, maxPrice: number): Promise<Ticket[]> {
    return this.ticketRepository.findTicketsByPriceRange(minPrice, maxPrice);
  }

  async updateTicketQuantity(id: number, quantity: number): Promise<Ticket | null> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) return null;

    if (quantity < ticket.sold) {
      throw new Error('Cannot set quantity less than sold tickets');
    }

    return this.ticketRepository.update(id, { quantity });
  }

  async updateSoldTickets(id: number, amount: number): Promise<Ticket | null> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) return null;

    if (!ticket.quantity) {
      throw new Error('Ticket quantity is not set');
    }

    if (ticket.sold + amount > ticket.quantity) {
      throw new Error('Cannot sell more tickets than available');
    }

    return this.ticketRepository.update(id, { sold: ticket.sold + amount });
  }

  async updateSaleDates(id: number, startDate: Date, endDate: Date): Promise<Ticket | null> {
    return this.ticketRepository.update(id, { saleStartDate: startDate, saleEndDate: endDate });
  }

  async activateTicket(id: number): Promise<Ticket | null> {
    return this.ticketRepository.update(id, { isActive: true });
  }

  async deactivateTicket(id: number): Promise<Ticket | null> {
    return this.ticketRepository.update(id, { isActive: false });
  }
} 