const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const id = req.params.id;
    const nome = req.params.nome;
    const qtd = req.params.qtd;
    estoque.push({ id, nome, qtd });
    res.send(`Produto adicionado: ID=${id}, Nome=${nome}, Quantidade=${qtd}`);
});

app.get('/listar', (req, res) => {
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const id = req.params.id;
    const index = estoque.findIndex(item => item.id === id);
    if (index !== -1) {
        const removedItem = estoque.splice(index, 1);
        res.send(`Produto removido: ID=${removedItem[0].id}, Nome=${removedItem[0].nome}`);
    } else {
        res.send(`Produto com ID=${id} não encontrado.`);
    }
});

app.get('/editar/:id/:qtd', (req, res) => {
    const id = req.params.id;
    const qtd = req.params.qtd;
    const item = estoque.find(item => item.id === id);
    if (item) {
        item.qtd = qtd;
        res.send(`Produto atualizado: ID=${item.id}, Nome=${item.nome}, Quantidade=${item.qtd}`);
    } else {
        res.send(`Produto com ID=${id} não encontrado.`);
    }
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta: ${PORT}`);
});

