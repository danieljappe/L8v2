import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Event } from './Event';
import { User } from './User';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal')
  price: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ unique: true })
  ticketNumber: string;

  @Column({ default: false })
  isUsed: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 1 })
  quantity: number;

  @Column({ default: 0 })
  sold: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 