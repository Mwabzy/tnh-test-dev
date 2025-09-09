import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

db.exec(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
        )
    `);

db.exec(`
    CREATE TABLE clinics(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    tagline TEXT,
    overview TEXT,
    features TEXT,
    testimonial TEXT, 
    contact TEXT,  
    clinics TEXT, 
    related_services TEXT, 
    image_url TEXT,
    image_alt TEXT
     )
    
    `);

export default db;
