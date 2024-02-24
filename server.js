const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

const mysql = require('mysql2');

      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'bruno',
        database: 'bd_teste',
      });

      connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao banco de dados Mysql');
      });

      app.use(express.json())

      app.get('/', (req, res) => {
        connection.query('SELECT * FROM teste', (err, results) => {
          if (err) throw err;

          res.json(results);
        });
      });

      app.post('/', (req, res) => {
        const { nome } = req.body;
        connection.query('INSERT INTO teste (nome) values(?)',[nome], (err, results) => {
          if (err) throw err;

          res.json(results);
        })
      })

  