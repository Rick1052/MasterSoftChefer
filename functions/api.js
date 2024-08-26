const fs = require('fs');
const path = require('path');

module.exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '..', 'public', 'data.json'); // Ajuste conforme necessário
  let receitas;

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    receitas = JSON.parse(data);

    if (event.httpMethod === 'GET') {
      const { id } = event.queryStringParameters || {};

      if (id) {
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

    if (event.httpMethod === 'POST') {
      const novaReceita = JSON.parse(event.body);
      novaReceita.id = receitas.length + 1;
      receitas.push(novaReceita);

      fs.writeFileSync(filePath, JSON.stringify(receitas, null, 2));

      return {
        statusCode: 201,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaReceita),
      };
    }

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
