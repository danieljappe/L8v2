import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './Venue';
import { EventArtist } from './EventArtist';
import { Ticket } from './Ticket';
import { GalleryImage } from './GalleryImage';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column()
  date!: Date;

  @Column()
  startTime!: string;

  @Column()
  endTime!: string;

  @Column()
  ticketPrice!: number;

  @Column()
  totalTickets!: number;

  @Column({ default: 0 })
  soldTickets!: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: 'draft' })
  status!: string;

  @Column({ nullable: true })
  capacity?: number;

  @Column({ default: 0 })
  currentAttendees!: number;

  @ManyToOne(() => Venue, venue => venue.events)
  @JoinColumn()
  venue!: Venue;

  @OneToMany(() => EventArtist, eventArtist => eventArtist.event)
  eventArtists!: EventArtist[];

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets!: Ticket[];

  @OneToMany(() => GalleryImage, galleryImage => galleryImage.event)
  galleryImages!: GalleryImage[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
} 