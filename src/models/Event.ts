import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Venue } from './Venue';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  startTime: string;

  @Column({ nullable: true })
  endTime: string;

  @Column({ nullable: true, type: 'decimal' })
  ticketPrice: number;

  @Column({ nullable: true })
  totalTickets: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Venue, venue => venue.events)
  venue: Venue;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 