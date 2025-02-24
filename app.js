// app.js
import express from 'express';
import pool from './db.js';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para exibir as categorias
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categories');
        res.render('categories', { categories: result.rows });
    } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        res.status(500).send('Erro ao buscar categorias');
    }
});

// Rota para exibir os itens de uma categoria
app.get('/category/:id', async (req, res) => {
    const categoryId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
        res.render('items', { items: result.rows, categoryId });
    } catch (err) {
        console.error('Erro ao buscar itens:', err);
        res.status(500).send('Erro ao buscar itens');
    }
});

// Rota para exibir o formulário de adição de item
app.get('/category/:id/add-item', (req, res) => {
    const categoryId = req.params.id;
    res.render('add-item', { categoryId });
});

// Rota para processar o formulário de adição de item
app.post('/category/:id/add-item', async (req, res) => {
    const { name, quantity, price } = req.body;
    const categoryId = req.params.id;

    try {
        await pool.query(
            'INSERT INTO items (name, quantity, price, category_id) VALUES ($1, $2, $3, $4)',
            [name, quantity, price, categoryId]
        );
        res.redirect(`/category/${categoryId}`);
    } catch (err) {
        console.error('Erro ao adicionar item:', err);
        res.status(500).send('Erro ao adicionar item');
    }
});

// Rota para deletar um item do inventário
app.post('/items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
      await pool.query('DELETE FROM items WHERE id = $1', [itemId]);
      res.redirect('back');
  } catch (err) {
      console.error('Erro ao deletar item:', err);
      res.status(500).send('Erro ao deletar item');
  }
});

// Rota para exibir todas as categorias
app.get('/categories', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM categories');
      res.render('categories', { categories: result.rows });
  } catch (err) {
      console.error('Erro ao buscar categorias:', err);
      res.status(500).send('Erro ao buscar categorias');
  }
});

// Rota para deletar uma categoria
app.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
      // Deletar itens associados à categoria (opcional)
      await pool.query('DELETE FROM items WHERE category_id = $1', [categoryId]);
      
      // Deletar a categoria
      await pool.query('DELETE FROM categories WHERE id = $1', [categoryId]);
      
      res.redirect('/categories');
  } catch (err) {
      console.error('Erro ao deletar categoria:', err);
      res.status(500).send('Erro ao deletar categoria');
  }
});

// Rota para exibir os itens de uma categoria específica
app.get('/category/:id/items', async (req, res) => {
  const categoryId = req.params.id;
  try {
      const { rows: items } = await pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]);
      res.render('items', { items });
  } catch (error) {
      console.error('Erro ao buscar itens da categoria:', error);
      res.status(500).send('Erro ao buscar itens da categoria');
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
