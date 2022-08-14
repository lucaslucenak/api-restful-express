const express = require('express');
const app = express();
const data = require('./data.json');

app.use(express.json());


app.get('/clients', function(req, res) {
    res.json(data)
});

app.get('/clients/:id', function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
    if (!client) {
        res.status(204).json({ error: 'Client not found' });
    }
    res.json(client);
});

app.post('/clients', function(req, res) {
    const { name, email } = req.body;
    
    //save logic

    res.json({ name, email})
});

app.put('/clients/:id', function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);
  
    if (!client) return res.status(204).json();
  
    const { name } = req.body;
  
    client.name = name;
  
    res.json(client);
});

app.delete('/clients/:id', function(req, res) {
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id);
  
    res.json(clientsFiltered);
});

app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
    console.log('Press Ctrl+C to quit.');
});
