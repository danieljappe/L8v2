"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./config/database");
var User_1 = require("./models/User");
var Artist_1 = require("./models/Artist");
var Venue_1 = require("./models/Venue");
var Event_1 = require("./models/Event");
var Ticket_1 = require("./models/Ticket");
var GalleryImage_1 = require("./models/GalleryImage");
var ContactMessage_1 = require("./models/ContactMessage");
var EventArtist_1 = require("./models/EventArtist");
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo, users, artistRepo, artists, venueRepo, venues, eventRepo, events, eventArtistRepo, eventArtists, ticketRepo, tickets, galleryImageRepo, galleryImages, contactMessageRepo;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.AppDataSource.initialize()];
                case 1:
                    _a.sent();
                    userRepo = database_1.AppDataSource.getRepository(User_1.User);
                    return [4 /*yield*/, Promise.all([
                            userRepo.create({ firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', password: 'password1', role: 'user', isActive: true }),
                            userRepo.create({ firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', password: 'password2', role: 'user', isActive: true }),
                            userRepo.create({ firstName: 'Carol', lastName: 'Williams', email: 'carol@example.com', password: 'password3', role: 'admin', isActive: true }),
                            userRepo.create({ firstName: 'Dave', lastName: 'Brown', email: 'dave@example.com', password: 'password4', role: 'user', isActive: true }),
                        ].map(function (u) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, userRepo.findOneBy({ email: u.email })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, userRepo.save(u)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 2:
                    users = _a.sent();
                    artistRepo = database_1.AppDataSource.getRepository(Artist_1.Artist);
                    return [4 /*yield*/, Promise.all([
                            artistRepo.create({ name: 'The Rockers', bio: 'A rock band.', genre: 'Rock', isActive: true }),
                            artistRepo.create({ name: 'DJ Spin', bio: 'A famous DJ.', genre: 'Electronic', isActive: true }),
                            artistRepo.create({ name: 'Jazz Cats', bio: 'Smooth jazz group.', genre: 'Jazz', isActive: true }),
                            artistRepo.create({ name: 'Pop Stars', bio: 'Top pop artists.', genre: 'Pop', isActive: true }),
                        ].map(function (a) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, artistRepo.findOneBy({ name: a.name })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, artistRepo.save(a)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 3:
                    artists = _a.sent();
                    venueRepo = database_1.AppDataSource.getRepository(Venue_1.Venue);
                    return [4 /*yield*/, Promise.all([
                            venueRepo.create({ name: 'Grand Hall', description: 'A large concert hall.', address: '123 Main St', city: 'Metropolis', state: 'NY', country: 'USA', zipCode: '10001', capacity: 1000, isActive: true }),
                            venueRepo.create({ name: 'Open Air Arena', description: 'Outdoor venue.', address: '456 Park Ave', city: 'Metropolis', state: 'NY', country: 'USA', zipCode: '10002', capacity: 5000, isActive: true }),
                            venueRepo.create({ name: 'Jazz Club', description: 'Intimate jazz club.', address: '789 Jazz St', city: 'Metropolis', state: 'NY', country: 'USA', zipCode: '10003', capacity: 200, isActive: true }),
                            venueRepo.create({ name: 'Downtown Theater', description: 'Historic theater.', address: '101 Center Rd', city: 'Metropolis', state: 'NY', country: 'USA', zipCode: '10004', capacity: 800, isActive: true }),
                        ].map(function (v) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, venueRepo.findOneBy({ name: v.name })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, venueRepo.save(v)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 4:
                    venues = _a.sent();
                    eventRepo = database_1.AppDataSource.getRepository(Event_1.Event);
                    return [4 /*yield*/, Promise.all([
                            eventRepo.create({ title: 'Rock Night', description: 'A night of rock music.', date: new Date('2024-08-01'), startTime: '19:00', endTime: '23:00', ticketPrice: 50, totalTickets: 500, venue: venues[0], isActive: true }),
                            eventRepo.create({ title: 'Electronic Fest', description: 'Dance all night.', date: new Date('2024-08-10'), startTime: '20:00', endTime: '03:00', ticketPrice: 60, totalTickets: 1000, venue: venues[1], isActive: true }),
                            eventRepo.create({ title: 'Jazz Evening', description: 'Smooth jazz performances.', date: new Date('2024-08-15'), startTime: '18:00', endTime: '22:00', ticketPrice: 40, totalTickets: 200, venue: venues[2], isActive: true }),
                            eventRepo.create({ title: 'Pop Gala', description: 'Pop music extravaganza.', date: new Date('2024-08-20'), startTime: '19:30', endTime: '23:30', ticketPrice: 70, totalTickets: 800, venue: venues[3], isActive: true }),
                        ].map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, eventRepo.findOneBy({ title: e.title })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, eventRepo.save(e)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 5:
                    events = _a.sent();
                    eventArtistRepo = database_1.AppDataSource.getRepository(EventArtist_1.EventArtist);
                    return [4 /*yield*/, Promise.all([
                            eventArtistRepo.create({ event: events[0], artist: artists[0], performanceOrder: 1, performanceTime: '20:00', setDuration: 60, fee: 1000 }),
                            eventArtistRepo.create({ event: events[1], artist: artists[1], performanceOrder: 1, performanceTime: '21:00', setDuration: 90, fee: 2000 }),
                            eventArtistRepo.create({ event: events[2], artist: artists[2], performanceOrder: 1, performanceTime: '19:00', setDuration: 45, fee: 800 }),
                            eventArtistRepo.create({ event: events[3], artist: artists[3], performanceOrder: 1, performanceTime: '20:00', setDuration: 75, fee: 1500 }),
                        ].map(function (ea) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, eventArtistRepo.findOneBy({ event: { id: ea.event.id }, artist: { id: ea.artist.id } })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, eventArtistRepo.save(ea)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 6:
                    eventArtists = _a.sent();
                    ticketRepo = database_1.AppDataSource.getRepository(Ticket_1.Ticket);
                    return [4 /*yield*/, Promise.all([
                            ticketRepo.create({ event: events[0], user: users[0], ticketNumber: 'TICK-1001', price: 50, isUsed: false, isActive: true, quantity: 1, sold: 0 }),
                            ticketRepo.create({ event: events[1], user: users[1], ticketNumber: 'TICK-1002', price: 60, isUsed: false, isActive: true, quantity: 1, sold: 0 }),
                            ticketRepo.create({ event: events[2], user: users[2], ticketNumber: 'TICK-1003', price: 40, isUsed: false, isActive: true, quantity: 1, sold: 0 }),
                            ticketRepo.create({ event: events[3], user: users[3], ticketNumber: 'TICK-1004', price: 70, isUsed: false, isActive: true, quantity: 1, sold: 0 }),
                        ].map(function (t) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ticketRepo.findOneBy({ ticketNumber: t.ticketNumber })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, ticketRepo.save(t)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 7:
                    tickets = _a.sent();
                    galleryImageRepo = database_1.AppDataSource.getRepository(GalleryImage_1.GalleryImage);
                    return [4 /*yield*/, Promise.all([
                            galleryImageRepo.create({ filename: 'rocknight.jpg', url: '/images/rocknight.jpg', caption: 'Rock Night Crowd', photographer: 'Alice', category: GalleryImage_1.GalleryCategory.EVENT, isPublished: true, event: events[0] }),
                            galleryImageRepo.create({ filename: 'electrofest.jpg', url: '/images/electrofest.jpg', caption: 'DJ Spin Live', photographer: 'Bob', category: GalleryImage_1.GalleryCategory.EVENT, isPublished: true, event: events[1] }),
                            galleryImageRepo.create({ filename: 'jazzclub.jpg', url: '/images/jazzclub.jpg', caption: 'Jazz Cats on Stage', photographer: 'Carol', category: GalleryImage_1.GalleryCategory.EVENT, isPublished: true, event: events[2] }),
                            galleryImageRepo.create({ filename: 'popgala.jpg', url: '/images/popgala.jpg', caption: 'Pop Stars Performance', photographer: 'Dave', category: GalleryImage_1.GalleryCategory.EVENT, isPublished: true, event: events[3] }),
                        ].map(function (gi) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, galleryImageRepo.findOneBy({ filename: gi.filename })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, galleryImageRepo.save(gi)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 8:
                    galleryImages = _a.sent();
                    contactMessageRepo = database_1.AppDataSource.getRepository(ContactMessage_1.ContactMessage);
                    return [4 /*yield*/, Promise.all([
                            contactMessageRepo.create({ name: 'Eve', email: 'eve@example.com', message: 'Great event!', type: ContactMessage_1.MessageType.FEEDBACK, status: ContactMessage_1.MessageStatus.READ }),
                            contactMessageRepo.create({ name: 'Frank', email: 'frank@example.com', message: 'Booking request for Rock Night.', type: ContactMessage_1.MessageType.BOOKING, status: ContactMessage_1.MessageStatus.PENDING }),
                            contactMessageRepo.create({ name: 'Grace', email: 'grace@example.com', message: 'Support needed.', type: ContactMessage_1.MessageType.SUPPORT, status: ContactMessage_1.MessageStatus.PENDING }),
                            contactMessageRepo.create({ name: 'Heidi', email: 'heidi@example.com', message: 'General inquiry.', type: ContactMessage_1.MessageType.GENERAL, status: ContactMessage_1.MessageStatus.REPLIED }),
                        ].map(function (cm) { return __awaiter(_this, void 0, void 0, function () {
                            var existing;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, contactMessageRepo.findOneBy({ email: cm.email, message: cm.message })];
                                    case 1:
                                        existing = _a.sent();
                                        if (!existing)
                                            return [2 /*return*/, contactMessageRepo.save(cm)];
                                        return [2 /*return*/, existing];
                                }
                            });
                        }); }))];
                case 9:
                    _a.sent();
                    console.log('Seeding complete!');
                    return [4 /*yield*/, database_1.AppDataSource.destroy()];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
seed().catch(function (err) {
    console.error('Seeding error:', err);
    process.exit(1);
});
