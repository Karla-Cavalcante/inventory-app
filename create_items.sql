CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    quantity INT NOT NULL,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL
);