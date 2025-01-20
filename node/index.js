const express = require('express');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'node-db'
};
const mysql = require('mysql');
let connection;

function dropPeople() {
    connection.query(`DELETE from people`, (err) => {
        if (err) {
            console.error('Error executing exit query:', err);
        } else {
            console.log('Exit query executed successfully.');
        }
    });
}

function handleDisconnect() {
    connection = mysql.createConnection(config);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('Connected to database');
        }
    });

    connection.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();
dropPeople();

const sql = `INSERT INTO people(name) VALUES ('Ronaldo')`;


app.get('/', (req, res) => {
    const baseHtml = `
        <h1>Full Cycle Rocks!!!!</h1>
        <p>Para verificar a saúde da aplicação, acesse /health-check</p>
        <p>Nomes:</p>
        <ul>
    `;
    connection.query(sql, (err) => {
        if (err) {
            res.send(err);
        } else {
            console.log('Inserido com sucesso!');
            connection.query('SELECT name FROM people', (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    const namesList = result.map((item) => `<li>${item.name}</li>`).join('\n');
                    res.send(baseHtml + namesList + '</ul>');
                }
            });
        }
    });
});

app.get('/health-check', (req, res) => {
    console.log('health-check queried');
    res.status(200).send('app is healthy');
});

app.listen(port, () => {
    console.log('executando na porta ' + port);
});