const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3005;

// Middleware
app.use(cors()); // Permite que el Frontend se comunique con el Backend
app.use(express.json()); // Permite recibir datos en formato JSON

// Base de datos en memoria (Arreglo de objetos)
let tasks = [
    { id: 1, text: "Aprender Vue.js" },
    { id: 2, text: "Configurar Express" }
];

// Listar tareas
app.get('/tasks', (req, res) => {
    console.log('--- [GET] Enviando lista de tareas ---');
    res.json(tasks);
});

// Agregar tarea
app.post('/tasks', (req, res) => {
    const newTask = { id: Date.now(), text: req.body.text };
    tasks.push(newTask);
    console.log(`--- [POST] Tarea creada: "${newTask.text}" ---`);
    res.status(201).json(newTask);
});

// Eliminar tarea
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    console.log(`--- [DELETE] Tarea eliminada ID: ${id} ---`);
    res.json({ message: "Tarea eliminada" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});