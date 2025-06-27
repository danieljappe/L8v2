import { AppDataSource } from './config/database';
import { User } from './models/User';
import { Artist } from './models/Artist';
import { Venue } from './models/Venue';
import { Event } from './models/Event';
import { Ticket } from './models/Ticket';
import { GalleryImage, GalleryCategory } from './models/GalleryImage';
import { ContactMessage, MessageType, MessageStatus } from './models/ContactMessage';
import { EventArtist } from './models/EventArtist';
import bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();

  // USERS
  const userRepo = AppDataSource.getRepository(User);
  const users = await Promise.all([
    userRepo.create({ firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', password: await bcrypt.hash('password1', 10), role: 'user', isActive: true }),
    userRepo.create({ firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', password: await bcrypt.hash('password2', 10), role: 'user', isActive: true }),
    userRepo.create({ firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', password: await bcrypt.hash('password3', 10), role: 'admin', isActive: true }),
    userRepo.create({ firstName: 'Dave', lastName: 'Brown', email: 'dave@example.com', password: await bcrypt.hash('password4', 10), role: 'user', isActive: true }),
  ].map(async u => {
    let existing = await userRepo.findOneBy({ email: u.email });
    if (!existing) return userRepo.save(u);
    return existing;
  }));

  // ARTISTS
  const artistRepo = AppDataSource.getRepository(Artist);
  const artists = await Promise.all([
    artistRepo.create({ name: 'Chrome!', bio: 'Chrome! er en dansk undergrunds rapper', genre: 'Opium', isActive: true }),
    artistRepo.create({ name: 'Skomager', bio: 'Skomager er også en dansk undergrunds rapper', genre: 'Opium', isActive: true }),
    artistRepo.create({ name: 'Jazz Cats', bio: 'Smooth jazz group.', genre: 'Jazz', isActive: true }),
    artistRepo.create({ name: 'Pop Stars', bio: 'Top pop artists.', genre: 'Pop', isActive: true }),
  ].map(async a => {
    let existing = await artistRepo.findOneBy({ name: a.name });
    if (!existing) return artistRepo.save(a);
    return existing;
  }));

  // VENUES
  const venueRepo = AppDataSource.getRepository(Venue);
  const venues = await Promise.all([
    venueRepo.create({ name: 'Rust', description: 'A large concert hall.', address: '123 Main St', city: 'Metropolis', state: 'NY', country: 'USA', zipCode: '10001', capacity: 1000, isActive: true }),
  ].map(async v => {
    let existing = await venueRepo.findOneBy({ name: v.name });
    if (!existing) return venueRepo.save(v);
    return existing;
  }));

  // EVENTS
  const eventRepo = AppDataSource.getRepository(Event);
  const events = await Promise.all([
    eventRepo.create({ title: 'CHROME! + SKOMAGER', description: 'Chrome og Skomager koncert på Rust.', date: new Date('2025-08-16'), startTime: '19:30', endTime: '23:00', ticketPrice: 50, totalTickets: 500, venue: venues[0], isActive: true }),
    eventRepo.create({ title: 'L8 Events @ Distortion', description: 'L8 Events overtager selveste distortion på Nørrebronx.', date: new Date('2025-06-07'), startTime: '20:00', endTime: '03:00', ticketPrice: 60, totalTickets: 1000, venue: venues[1], isActive: true }),
  ].map(async e => {
    let existing = await eventRepo.findOneBy({ title: e.title });
    if (!existing) return eventRepo.save(e);
    return existing;
  }));

  // EVENT ARTISTS
  const eventArtistRepo = AppDataSource.getRepository(EventArtist);
  const eventArtists = await Promise.all([
    eventArtistRepo.create({ event: events[0], artist: artists[0], performanceOrder: 1, performanceTime: '20:00', setDuration: 60, fee: 1000 }),
    eventArtistRepo.create({ event: events[0], artist: artists[1], performanceOrder: 2, performanceTime: '21:00', setDuration: 90, fee: 2000 }),
  ].map(async ea => {
    let existing = await eventArtistRepo.findOneBy({ event: { id: ea.event.id }, artist: { id: ea.artist.id } });
    if (!existing) return eventArtistRepo.save(ea);
    return existing;
  }));

  // TICKETS
  const ticketRepo = AppDataSource.getRepository(Ticket);
  const tickets = await Promise.all([
    ticketRepo.create({ event: events[0], user: users[0], ticketNumber: 'TICK-1001', price: 50, isUsed: false, isActive: true, quantity: 1, sold: 0 }),
  ].map(async t => {
    let existing = await ticketRepo.findOneBy({ ticketNumber: t.ticketNumber });
    if (!existing) return ticketRepo.save(t);
    return existing;
  }));

  // GALLERY IMAGES
  const galleryImageRepo = AppDataSource.getRepository(GalleryImage);
  const galleryImages = await Promise.all([
    galleryImageRepo.create({ filename: 'rocknight.jpg', url: '/images/rocknight.jpg', caption: 'Rock Night Crowd', photographer: 'Alice', category: GalleryCategory.EVENT, isPublished: true, event: events[0] }),
    galleryImageRepo.create({ filename: 'electrofest.jpg', url: '/images/electrofest.jpg', caption: 'DJ Spin Live', photographer: 'Bob', category: GalleryCategory.EVENT, isPublished: true, event: events[1] }),
    galleryImageRepo.create({ filename: 'jazzclub.jpg', url: '/images/jazzclub.jpg', caption: 'Jazz Cats on Stage', photographer: 'Carol', category: GalleryCategory.EVENT, isPublished: true, event: events[2] }),
    galleryImageRepo.create({ filename: 'popgala.jpg', url: '/images/popgala.jpg', caption: 'Pop Stars Performance', photographer: 'Dave', category: GalleryCategory.EVENT, isPublished: true, event: events[3] }),
  ].map(async gi => {
    let existing = await galleryImageRepo.findOneBy({ filename: gi.filename });
    if (!existing) return galleryImageRepo.save(gi);
    return existing;
  }));

  // CONTACT MESSAGES
  const contactMessageRepo = AppDataSource.getRepository(ContactMessage);
  await Promise.all([
    contactMessageRepo.create({ name: 'Eve', email: 'eve@example.com', message: 'Great event!', type: MessageType.FEEDBACK, status: MessageStatus.READ }),
    contactMessageRepo.create({ name: 'Frank', email: 'frank@example.com', message: 'Booking request for Rock Night.', type: MessageType.BOOKING, status: MessageStatus.PENDING }),
    contactMessageRepo.create({ name: 'Grace', email: 'grace@example.com', message: 'Support needed.', type: MessageType.SUPPORT, status: MessageStatus.PENDING }),
    contactMessageRepo.create({ name: 'Heidi', email: 'heidi@example.com', message: 'General inquiry.', type: MessageType.GENERAL, status: MessageStatus.REPLIED }),
  ].map(async cm => {
    let existing = await contactMessageRepo.findOneBy({ email: cm.email, message: cm.message });
    if (!existing) return contactMessageRepo.save(cm);
    return existing;
  }));

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
}); 