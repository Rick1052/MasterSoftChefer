const fs = require('fs');
const path = require('path');

// Função handler para Netlify Functions
module.exports.handler = async (event, context) => {
  const filePath = path.join(__dirname, '..', 'public', 'data.json'); // Caminho para o arquivo JSON

  try {
    // Ler o arquivo JSON
    const data = fs.readFileSync(filePath, 'utf8');
    let receitas = JSON.parse(data);

    // Lidar com GET
    if (event.httpMethod === 'GET') {
      const { id } = event.queryStringParameters || {};

      if (id) {
        // Buscar receita específica pelo ID
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

      // Retorna todas as receitas se nenhum ID for especificado
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receitas),
      };
    }

    // Lidar com POST
    if (event.httpMethod === 'POST') {
      const novaReceita = JSON.parse(event.body);

      // Adiciona nova receita
      novaReceita.id = receitas.length + 1; // Gerar ID único
      receitas.push(novaReceita);

      // Atualiza o arquivo JSON
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
