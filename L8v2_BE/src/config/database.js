"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../models/User");
var Artist_1 = require("../models/Artist");
var Event_1 = require("../models/Event");
var Venue_1 = require("../models/Venue");
var Ticket_1 = require("../models/Ticket");
var GalleryImage_1 = require("../models/GalleryImage");
var ContactMessage_1 = require("../models/ContactMessage");
var EventArtist_1 = require("../models/EventArtist");
var dotenv = require("dotenv");
dotenv.config();
var _a = process.env, _b = _a.DB_HOST, DB_HOST = _b === void 0 ? 'localhost' : _b, _c = _a.DB_PORT, DB_PORT = _c === void 0 ? '5432' : _c, _d = _a.DB_USER, DB_USER = _d === void 0 ? 'postgres' : _d, _e = _a.DB_PASSWORD, DB_PASSWORD = _e === void 0 ? 'postgres' : _e, _f = _a.DB_NAME, DB_NAME = _f === void 0 ? 'l8v2' : _f, _g = _a.NODE_ENV, NODE_ENV = _g === void 0 ? 'development' : _g;
// Debug logging
console.log('Database Configuration:');
console.log('Host:', DB_HOST);
console.log('Port:', DB_PORT);
console.log('User:', DB_USER);
console.log('Database:', DB_NAME);
console.log('Environment:', NODE_ENV);
console.log('Password length:', DB_PASSWORD ? DB_PASSWORD.length : 0);
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: NODE_ENV !== 'production',
    logging: true,
    extra: {
        ssl: false,
        trustServerCertificate: true,
        encrypt: false,
        authenticationMethod: 'scram-sha-256'
    },
    entities: [
        User_1.User,
        Artist_1.Artist,
        Event_1.Event,
        Venue_1.Venue,
        Ticket_1.Ticket,
        GalleryImage_1.GalleryImage,
        ContactMessage_1.ContactMessage,
        EventArtist_1.EventArtist
    ],
    migrations: ['src/migrations/*.ts'],
    subscribers: ['src/subscribers/*.ts']
});
