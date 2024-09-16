#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
INSERT INTO books
(title, author, description, pages)
VALUES 
    ('To Kill a Mockingbird', 'Harper Lee', 'A novel about the serious issues of rape and racial inequality told through the eyes of a child', 324),
    ('1984', 'George Orwell', 'A dystopian novel set in a totalitarian society ruled by the Party and Big Brother', 328),
    ('Pride and Prejudice', 'Jane Austen', 'A classic romantic novel that also critiques the British landed gentry at the end of the 18th century', 279),
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan', 180),
    ('Moby-Dick', 'Herman Melville', 'A novel about the voyage of the whaling ship Pequod, commanded by Captain Ahab, who is obsessed with revenge against Moby Dick, a white whale', 635), 
    ('The Catcher in the Rye', 'J.D. Salinger', 'A novel about a young man named Holden Caulfield and his experiences in New York City over a few days', 277),
    ('Brave New World', 'Aldous Huxley', 'A futuristic society where people are genetically engineered and conditioned to adhere to strict social orders', 268),
    ('The Hobbit', 'J.R.R. Tolkien', 'A fantasy novel that follows the adventures of Bilbo Baggins as he embarks on a journey to help dwarves recover their lost kingdom', 310),
    ('Crime and Punishment', 'Fyodor Dostoevsky', 'A psychological novel about the moral dilemmas faced by a young man who commits a murder', 671),
    ('The Catch-22', 'Joseph Heller', 'A satirical novel about World War II soldiers and the absurdities of war', 453);

`;


async function main() {
    console.log("seeding...");
    const client = new Client({
      host: process.env.DB_HOST, // or wherever the db is hosted
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432 // The default port
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();

