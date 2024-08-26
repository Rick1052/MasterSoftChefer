const fs = require('fs');
const path = require('path');

// Handler da função
module.exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '..', 'public', 'data.json');
  let receitas;

  try {
    // Ler e analisar o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf8');
    receitas = JSON.parse(data);

    // Lidar com requisições GET
    if (event.httpMethod === 'GET') {
      const { id } = event.queryStringParameters || {};

      if (id) {
        // Procurar uma receita pelo ID
        const receita = receitas.find(item => item.id === parseInt(id, 10));
        if (!receita) {
          return {
            statusCode: 404,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Receita não encontrada' }),
          };
        }

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(receita),
        };
      }

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receitas),
      };
    }

    // Lidar com requisições POST
    if (event.httpMethod === 'POST') {
      const novaReceita = JSON.parse(event.body);
      novaReceita.id = receitas.length + 1;
      receitas.push(novaReceita);

      // Atualizar o arquivo data.json
      fs.writeFileSync(filePath, JSON.stringify(receitas, null, 2));

      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaReceita),
      };
    }

    // Método não permitido
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Método não permitido' }),
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erro interno do servidor' }),
    };
  }
};
