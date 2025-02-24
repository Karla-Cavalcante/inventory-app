import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Rota para exibir todas as categorias
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.render('categories', { categories: result.rows });
    } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        res.status(500).send('Erro ao buscar categorias');
    }
});

// Rota para exibir itens de uma categoria específica
router.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
        res.render('items', { items: result.rows });
    } catch (err) {
        console.error('Erro ao buscar itens da categoria:', err);
        res.status(500).send('Erro ao buscar itens da categoria');
    }
});

// Rota para exibir itens de uma categoria específica, incluindo quantidade e preço
router.get('/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const result = await pool.query(
            'SELECT name, quantity, price FROM items WHERE category_id = $1',
            [categoryId]
        );
        res.render('items', { items: result.rows });
    } catch (err) {
        console.error('Erro ao buscar itens da categoria:', err);
        res.status(500).send('Erro ao buscar itens da categoria');
    }
});


export default router;
