import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Event } from './Event';

export enum GalleryCategory {
  EVENT = 'EVENT',
  // Add other categories as needed
}

@Entity()
export class GalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event)
  event: Event;

  @Column()
  filename: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  caption: string;

  @Column({ nullable: true })
  photographer: string;

  @Column({ type: 'enum', enum: GalleryCategory, default: GalleryCategory.EVENT })
  category: GalleryCategory;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 