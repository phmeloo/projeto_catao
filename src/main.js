const express = require('express');
const bodyParser = require('body-parser'); // importei o body-parser
const mongoose = require('mongoose');

// ***** ÍNÍCIO DA PARTE DO BANCO DE DADOS *****
// 1. Criando um esquema de banco de dados
const FilmeSchema = { 
  nome: String ,
  ano: Number ,
  avaliacao: Number
};
// 2. Criando um model (gera as funções de save, find ...)
const Filme = mongoose.model('Filme', FilmeSchema);
// 3. Conecta ao banco de dados
mongoose.connect('mongodb+srv://teste:123@cluster0.shbnhpy.mongodb.net/?retryWrites=true&w=majority').then( console.log("conectado"))
// ***** FIM DA PARTE DO BANCO DE DADOS *****

// ***** INÍCIO DA PARTE WEB *****
const app = express();

// adicionando o body-parser na aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fazendo a API REST para manter o recurso 'produtos'
app.get('/filmes', async (req, res) => {
  res.json(await Filme.find({})); // retorna todos os produtos do banco
});
app.get('/filmes/:id', (req, res) => {
  res.send('retorna o Filme com o id: ' + req.params.id);
});
app.post('/filmes', async (req, res) => {
  res.json(await Filme(req.body).save()); // salva um novo produto
});
app.put('/filmes/:id', (req, res) => {
  res.send('alterar Filme pelo id');
});
app.delete('/filmes/:id', (req, res) => {
  res.send('deletar um Filme pelo id');
});

console.log('Iniciando o servidor ...');
app.listen(5000, () => {
  console.log('Acesse em http://127.0.0.1:5000')
});
// ***** FIM DA PARTE WEB *****