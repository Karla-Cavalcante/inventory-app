
import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar itens:', err);
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

router.post('/items', async (req, res) => {
    const { name, price, description, quantity, category_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO items (name, price, description, quantity, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, price, description, quantity, category_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao adicionar item:', err);
        res.status(500).json({ error: 'Erro ao adicionar item' });
    }
});

export default router;
