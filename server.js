const express = require('express');
const Task = require('./models/task');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load(fs.readFileSync('./openapi.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
  res.send(tasks);
});


app.get('/mockedtasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);

});


app.post('/tasks', (req, res) => {
  const task = { id: idCounter++, ...req.body };
  tasks.push(task);
  res.send(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (task) {
    Object.assign(task, req.body);
    res.send(task);
  } else {
    res.status(404).send();
  }
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index !== -1) {
    tasks.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = app;