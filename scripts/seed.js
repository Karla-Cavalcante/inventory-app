const pool = require('../db');

async function seed() {
    await pool.query("INSERT INTO categories (name, description) VALUES ('Electronics', 'Gadgets and devices')");
    await pool.query("INSERT INTO items (name, description, price, quantity, category_id) VALUES ('Laptop', 'A powerful laptop', 1500, 10, 1)");
    console.log('Database seeded!');
    process.exit();
}

seed();
