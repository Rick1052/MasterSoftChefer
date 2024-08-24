const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, 'public', 'data.json'); // Caminho para o arquivo JSON

// Carregar dados do arquivo JSON na memória
let receitas = [];
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
  } else {
    try {
      receitas = JSON.parse(data);
    } catch (parseError) {
      console.error('Erro ao processar o JSON:', parseError);
    }
  }
});

// Rota para GET de todas as receitas
app.get('/data.json', (req, res) => {
  res.json(receitas); // Retorna dados armazenados em memória
});

// Rota para GET de uma receita específica pelo ID
app.get('/data.json/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const receita = receitas.find(item => item.id === id);

  if (!receita) {
    return res.status(404).json({ error: 'Receita não encontrada' });
  }

  res.json(receita);
});

// Rota para POST de uma nova receita
app.post('/data.json', (req, res) => {
  const novaReceita = req.body;

  novaReceita.id = receitas.length + 1; // Gerar um ID único
  receitas.push(novaReceita); // Adiciona à memória

  fs.writeFile(filePath, JSON.stringify(receitas, null, 2), (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      res.status(500).send('Erro ao salvar o arquivo');
      return;
    }
    res.status(201).json(novaReceita); // Retorna a nova receita
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
