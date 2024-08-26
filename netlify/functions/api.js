const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { createServer, IncomingMessage, request, ServerResponse } = require('http');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const filePath = path.join(__dirname, '..', 'data.json'); // Caminho para o arquivo JSON

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

app.get('/api/receitas', (req, res) => {
  res.json(receitas);
});

app.get('/api/receitas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const receita = receitas.find(item => item.id === id);

  if (!receita) {
    return res.status(404).json({ error: 'Receita não encontrada' });
  }

  res.json(receita);
});

app.post('/api/receitas', (req, res) => {
  const novaReceita = req.body;

  if (!novaReceita.nome || !novaReceita.ingredientes) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  novaReceita.id = receitas.length + 1;
  receitas.push(novaReceita);

  fs.writeFile(filePath, JSON.stringify(receitas, null, 2), (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      res.status(500).send('Erro ao salvar o arquivo');
      return;
    }
    res.status(201).json(novaReceita);
  });
});

// Adaptar para função serverless
module.exports.handler = async (event, context) => {
  return new Promise((resolve, reject) => {
    createServer(app).listen(0, 'localhost', () => {
      const port = server.address().port;
      request({
        hostname: 'localhost',
        port,
        path: event.rawUrl,
        method: event.httpMethod,
        headers: event.headers,
      }, (response) => {
        let body = '';
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          resolve({
            statusCode: response.statusCode,
            headers: response.headers,
            body,
          });
        });
      }).end(event.body);
    });
  });
};
