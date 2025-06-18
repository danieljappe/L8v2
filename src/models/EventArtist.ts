import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from './Event';
import { Artist } from './Artist';

@Entity()
export class EventArtist {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => Artist)
  artist: Artist;

  @Column({ nullable: true })
  performanceOrder: number;

  @Column({ nullable: true })
  performanceTime: string;

  @Column({ nullable: true })
  setDuration: number;

  @Column({ nullable: true, type: 'decimal' })
  fee: number;
} 