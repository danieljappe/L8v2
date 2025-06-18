import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MessageType {
  FEEDBACK = 'FEEDBACK',
  BOOKING = 'BOOKING',
  SUPPORT = 'SUPPORT',
  GENERAL = 'GENERAL',
}

export enum MessageStatus {
  READ = 'READ',
  PENDING = 'PENDING',
  REPLIED = 'REPLIED',
}

@Entity()
export class ContactMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column('text')
  message: string;

  @Column({ type: 'enum', enum: MessageType, default: MessageType.GENERAL })
  type: MessageType;

  @Column({ type: 'enum', enum: MessageStatus, default: MessageStatus.PENDING })
  status: MessageStatus;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 